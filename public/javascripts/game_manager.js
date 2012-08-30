define(['ws_client', 'scene_factory', 'entityfactory', 'player', 'lib/class'], 
function(WsClient, SceneFactory, EntityFactory, Player) {

  /**
   *
   */
  var GameManager = Class.extend({

    /**
     * コンストラクタ
     * @constructor
     */
    init: function() {
      this.initScene_();
      this.initWsClient_();
    },

    /**
     * @private
     */
    initScene_: function() {
      var self = this;

      this.scenes = [];
      this.sf = new SceneFactory();
      ['main', 'room01', 'room02', 'room03', 'room04', 'room05', 'room06'].forEach(function(scene) {
        self.scenes[scene] = self.sf.createScene(scene);
      });
      this.currentScene = this.getSceneByName_('main');
    },

    /**
     * @private
     */
    initWsClient_: function() {
      var self = this;

      // WebSocket Client
      this.client = new WsClient(location.hostname, '3000');

      /**
       * サーバ接続時のコールバック
       */
      this.client.onConnected(function() {
        // ...
      });

      /**
       * サーバからウェルカムメッセージを受け取った場合のコールバック
       */
      this.client.onWelcome(function(aData) {
        self.player = new Player(aData[2].id, aData[2].name, aData[2].kind);
        self.player.setGridPosition(aData[2].x, aData[2].y);
        self.currentScene.addEntity(self.player);
      });

      /**
       * サーバからキャラ追加メッセージを受け取った場合のコールバック
       */
      this.client.onSpawn(function(aData) {
        var tSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (tSceneName === cSceneName) {
          var entity = EntityFactory.createEntity(aData[2].kind, aData[2].id, aData[2].name);
          entity.x = aData[2].x;
          entity.y = aData[2].y;
          self.currentScene.addEntity(entity);
        }
      });

      /**
       * サーバからキャラ削除メッセージを受け取った場合のコールバック
       */
      this.client.onDespawn(function(aData) {
        var tSceneName = aData[1];
        if (typeof self.scenes[tSceneName].entities[aData[2]] !== 'undefined') {
          self.scenes[tSceneName].removeEntity(self.scenes[tSceneName].entities[aData[2]]);
          var id = '#B' + aData[2];
          console.log(id);
          $(id).remove();
        }
      });

      /**
       * サーバから移動メッセージを受け取った場合のコールバック
       */
      this.client.onMove(function(aData) {
        console.log('onMove: ', aData[3]);
        var tSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (tSceneName === cSceneName) {
          self.currentScene.entities[aData[2]].move(aData[3]);
        }
      });

      /**
       * サーバからチャットメッセージを受け取った場合のコールバック
       */
      this.client.onChat(function(aData) {
        var tSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (tSceneName === cSceneName) {
          var isMainScene = (cSceneName == 'main') ? true : false;
          // チャットをシーンへ表示
          self.currentScene.entities[aData[2]].displayChatMessage(aData[3], isMainScene);
        }
      });

      /**
       * サーバからシーン変更を受け取った場合のコールバック
       */
      this.client.onScene(function(aData) {
        var tSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (tSceneName !== cSceneName) {
          var moveWaiting = setInterval(function() {
            if (self.player.isMoving === false) {
              clearInterval(moveWaiting);
              self.player.x = aData[3];
              self.player.y = aData[4];
              self.currentScene.removeEntity(self.player);
              self.scenes[tSceneName].addEntity(self.player);
              self.changeScene(cSceneName, tSceneName);

              // for balloon
              $('#balloons')[0].innerHTML = "";

            } else {
              console.log('move waiting...');
            }
          }, 100);
        }
      });

      /**
       * サーバからキャラクタリストメッセージを受け取った場合のコールバック
       */
      this.client.onEntities(function(aData) {
        self.scenes[aData[1]].waitInTheWings(aData[2]);
      });

      /**
       *
       */
      this.client.onDirection(function(aData) {
        var tSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (tSceneName === cSceneName) {
          //self.player.changeOfDirection(aData[3]);
          self.currentScene.entities[aData[2]].changeOfDirection(aData[3]);
        }
      });

      this.client.onDisconnected(function(aData) {
        // ...
      });

      this.client.onError(function() {
        // ...
      });

    },

    /**
     * WebSocketサーバへ接続する
     * @public
     */
    connect: function() {
      if (this.client) {
        this.client.connect();
      }
    },

    /**
     * ゲームを開始する
     * @public
     */
    tryStarting: function() {
      var self = this;
      var watchCanStart = setInterval(function() {
        if (self.client.connected) {
          clearInterval(watchCanStart);

          self.start_();

        } else {
          console.log('start waiting...');
        }
      }, 100);
    },

    /**
     * @private
     */
    start_: function() {
      this.currentScene.go();
    },

    /**
     * 指定IDのシーンへ変更する
     * @public
     */
    changeScene: function(aCSceneName, aNSceneName) {
      this.currentScene = this.getSceneByName_(aNSceneName);
      this.currentScene.go(aCSceneName);
    },

    /**
     * 現在のシーン名を返す
     * @public
     */
    getCurrentSceneName: function() {
      return this.currentScene.name;
    },

    /**
     * 指定IDのシーンを取得する
     * @private
     */
    getSceneByName_: function(aName) {
      return this.scenes[aName];
    },

    /**
     * サーバへMoveメッセージを送信する
     * @public
     */
    sendMove: function(aDirection) {
      if (this.player.isMoving === false) {
        this.client.sendMove(this.getCurrentSceneName(), this.player.id, aDirection);
      }
    },

    /**
     * サーバへChatメッセージを送信する
     * @public
     */
    sendChat: function(aChatMessage) {
      if (this.player.isMoving === false) {
        this.client.sendChat(this.getCurrentSceneName(), this.player.id, aChatMessage);
      }
    }

  });
  return GameManager;
});

