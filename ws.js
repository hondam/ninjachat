var cls = require('./lib/class'),
  WebSocketServer = require('ws').Server,
  WS = {},
  BISON = require('bison'),
  Types = require('./public/javascripts/resource.js'),
  Maps = require('./maps');

module.exports = WS;

/**
 *
 */
WS.Server = cls.Class.extend({

  /**
   *
   */
  init: function(server) {
    var self = this;

    this.connections = {};
    this.maps = new Maps('public/javascripts/conf/world_server.json');

    this.entities = {};
    ['main', 'room01', 'room02', 'room03', 'room04', 'room05', 'room06'].forEach(function(scene) {
      self.entities[scene] = { mobs: [], npcs: [], players: [] };
    });

    // dummy data
    var mobs = [
      {"s": 'main', "id":80001, "k":16, "x":416, "y":288},
      {"s": 'main', "id":80002, "k":17, "x":896, "y":352},
      {"s": 'room01', "id":80003, "k":16, "x":128, "y":128}
    ];
    var npcs = [
      {"s": 'main', "id":90001, "k":2, "x":192, "y":128},
      {"s": 'room01', "id":90002, "k":2, "x":256, "y":160}
    ];
    // -------

    for (var i in mobs) {
      var scene = mobs[i].s;
      this.entities[scene].mobs.push([mobs[i].s, mobs[i].id, mobs[i].k, mobs[i].x, mobs[i].y]);
    }
    for (var i in npcs) {
      var scene = npcs[i].s;
      this.entities[scene].npcs.push([npcs[i].s, npcs[i].id, npcs[i].k, npcs[i].x, npcs[i].y]);
    }

    setInterval(function() {
      for (var s in self.entities) {
        for (var i in self.entities[s].mobs) {
          var m = self.entities[s].mobs[i];
          var way = Math.floor(Math.random() * 4);
          var x, y, d;
          switch(way) {
            case 0: x = m[3] - 32; y = m[4]; d = 'left'; break;
            case 1: x = m[3] + 32; y = m[4]; d = 'right'; break;
            case 2: x = m[3]; y = m[4] - 32; d = 'up'; break;
            case 3: x = m[3]; y = m[4] + 32; d = 'down'; break;
          }
          if (self.maps.hitCheck(s, x, y)) {
            self.broadcastAll(BISON.encode([Types.Messages.DIRECTION, s, m[1], d]));
          } else {
            self.broadcastAll(BISON.encode([Types.Messages.MOVE, s, m[1], d]));
            self.entities[s].mobs[i][3] = x;
            self.entities[s].mobs[i][4] = y;
          }
          self.broadcastAll(BISON.encode([Types.Messages.CHAT, s, m[1], 'chat message']));
        }
      }
    }, 3000);

    this.wss = new WebSocketServer({server: server});
    this.wss.on('connection', function(conn) {
//      console.log('websocket connection');

      var id;
      while(true) {
        id = (10000 + Math.floor(Math.random() * 10000)) + '';
        if (!(id in self.connections)) {
          break;
        }
      }

      // 接続プールへ追加
      self.connections[id] = conn;

      // 新規プレーヤー追加 dummy
      var player = {
        s: 'main',
        id: id,
        kind: Math.floor(Math.random() * 15),
        x: 480,
        y: 288,
        name: 'lorem ipsum'
      };
      self.entities.main.players.push([player.s, player.id, player.kind, player.x, player.y, player.name]);

      // 接続者にはWELCOME & LIST & SCENEメッセージ
//      console.log('send welcome');
//      console.log('send entities');
//      console.log('send scene');
      conn.send(BISON.encode([
        [Types.Messages.WELCOME, Types.Scenes.MAIN, player],
        [Types.Messages.SCENE, Types.Scenes.MAIN],
        [Types.Messages.ENTITIES, Types.Scenes.MAIN, self.entities.main]
      ]));

      // 接続者以外には新規接続者のSPAWNメッセージ
      self.broadcast(id, BISON.encode([Types.Messages.SPAWN, 'main', player]));

      /**
       * receive message
       *
       */
      conn.on('message', function(aMessage) {
        var mess = BISON.decode(aMessage);

        if (mess[0] === Types.Messages.MOVE) {
//          console.log('receive move', mess);

          //-----------------------------
          var currentScene = mess[1];
          var id = mess[2];
          var direction = mess[3];
          var x, y;

          for (var i in self.entities[currentScene].players) {
            if (id === self.entities[currentScene].players[i][1]) {
              p = self.entities[currentScene].players[i];
              switch(direction) {
                case 'left':  x = p[3] - 32; y = p[4]; break;
                case 'right': x = p[3] + 32; y = p[4]; break;
                case 'up':    x = p[3]; y = p[4] - 32; break;
                case 'down':  x = p[3]; y = p[4] + 32; break;
              }

//              console.log(currentScene, id, direction, x, y);
 
              // ドア判定
              var nextScene = self.maps.getNextScene(currentScene, x, y);
              if (nextScene) {
//                console.log('send move');
//                console.log('send entities');
//                console.log('send scene', nextScene);

//console.log(self.entities[nextScene.name].players);

                // 自身はシーン移動
                conn.send(BISON.encode([
                  [Types.Messages.MOVE, currentScene, p[1], direction],
                  [Types.Messages.SCENE, nextScene.name, p[1], nextScene.defaultX, nextScene.defaultY],
                  [Types.Messages.ENTITIES, nextScene.name, self.entities[nextScene.name]]
                ]));

                // それ以外はMOVE, DESPAWN, SPAWN
                player.x = nextScene.defaultX;
                player.y = nextScene.defaultY;
                self.broadcast(id, BISON.encode([
                  [Types.Messages.MOVE, currentScene, p[1], direction],
                  [Types.Messages.DESPAWN, currentScene, id],
                  [Types.Messages.SPAWN, nextScene.name, player]
                ]));

                //delete self.entities[currentScene].players[i];
                self.entities[currentScene].players.splice([i], 1);
                self.entities[nextScene.name].players.push([
                  nextScene.name,
                  p[1],
                  p[2],
                  nextScene.defaultX,
                  nextScene.defaultY,
                  p[5]
                ]);

              } else {
                // 衝突判定
                if (self.maps.hitCheck(currentScene, x, y)) {
//                  console.log('send direction');

                  self.broadcastAll(BISON.encode([Types.Messages.DIRECTION, currentScene, p[1], direction]));
                } else {
//                  console.log('send move');

                  self.broadcastAll(BISON.encode([Types.Messages.MOVE, currentScene, p[1], direction]));
                  self.entities[currentScene].players[i][3] = x;
                  self.entities[currentScene].players[i][4] = y;
                }
              }
//console.log(self.entities.room02.players);
            }
          }
          //-----------------------------

        } else if (mess[0] === Types.Messages.CHAT) {
//          console.log('receive chat');
        } else {
//          console.log('receive other');
        }
        console.log("");
      });

      /**
       * connection close
       *
       */
      conn.on('close', function() {
        for (var scene in self.entities) {
          for(var i in self.entities[scene].players) {
            if (player.id === self.entities[scene].players[i][1]) {
              self.broadcast(id, BISON.encode([Types.Messages.DESPAWN, scene, player.id]));
              delete self.connections[player.id];
              //delete self.entities[scene].players[i];
              self.entities[scene].players.splice([i], 1);
            }
          }
        }
      });

    });
  },

  /**
   *
   */
  broadcast: function(aId, aMess) {
    for (var i in this.connections) {
      if (i !== aId) {
        this.connections[i].send(aMess);
      } 
    }
  },

  /**
   *
   */
  broadcastAll: function(aMess) {
    for (var i in this.connections) {
      this.connections[i].send(aMess);
    }
  }
});
