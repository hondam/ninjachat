define(['lib/bison', 'lib/class'], function(BISON) {

  var BISON = window.BISON;

  /**
   *
   */
  var WsClient = Class.extend({

    /**
     *
     */
    init: function(host, port) {
      this.connected = false;
      this.connection = null;
      this.host = host;
      this.port = port;
      this.connected_callback = null;
    },

    /**
     *
     */
    connect: function() {
      var self = this;
      var url = 'ws://' + this.host + ':' + this.port;
      if (window.MozWebSocket) {
        this.connection = new MozWebSocket(url);
      } else {
        this.connection = new WebSocket(url);
      }

      /**
       *
       */
      this.connection.onopen = function() {
        self.connected = true;
        if (self.connected_callback) {
          self.connected_callback();
        }
      };

      /**
       *
       */
      this.connection.onmessage = function(e) {
        var data = BISON.decode(e.data);
        if (data instanceof Array) {
          if (data[0] instanceof Array) {
            // batch
            for (var i in data) {
              var action = data[i][0];
              if (action === Types.Messages.WELCOME) {
                self.receiveWelcome(data[i]);
              } else if (action === Types.Messages.SPAWN) {
                self.receiveSpawn(data[i]);
              } else if (action === Types.Messages.DESPAWN) {
                self.receiveDespawn(data[i]);
              } else if (action === Types.Messages.MOVE) {
                self.receiveMove(data[i]);
              } else if (action === Types.Messages.CHAT) {
                self.receiveChat(data[i]);
              } else if (action === Types.Messages.SCENE) {
                self.receiveScene(data[i]);
              } else if (action === Types.Messages.ENTITIES) {
                self.receiveEntities(data[i]);
              } else if (action === Types.Messages.DIRECTION) {
                self.receiveDirection(data[i]);
              } 
            }
          } else {
            var action = data[0];
            if (action === Types.Messages.WELCOME) {
              self.receiveWelcome(data);
            } else if (action === Types.Messages.SPAWN) {
              self.receiveSpawn(data);
            } else if (action === Types.Messages.DESPAWN) {
              self.receiveDespawn(data);
            } else if (action === Types.Messages.MOVE) {
              self.receiveMove(data);
            } else if (action === Types.Messages.CHAT) {
              self.receiveChat(data);
            } else if (action === Types.Messages.SCENE) {
              self.receiveScene(data);
            } else if (action === Types.Messages.ENTITIES) {
              self.receiveEntities(data);
            } else if (action === Types.Messages.DIRECTION) {
              self.receiveDirection(data);
            }
          }
        }
      };

      /**
       *
       */
      this.connection.onerror = function(e) {
        if (self.error_callback) {
          self.erro_callback();
        }
      };

      /**
       *
       */
      this.connection.onclose = function(e) {
        if (self.disconnected_callback) {
          self.disconnected_callback();
        }
      };
    },

    /**
     *
     */
    onConnected: function(callback) {
      this.connected_callback = callback;
    },

    /**
     *
     */
    onWelcome: function(callback) {
      this.welcome_callback = callback;
    },

    receiveWelcome: function(aData) {
      if (this.welcome_callback) {
        this.welcome_callback(aData); 
      }
    },

    onSpawn: function(callback) {
      this.spawn_callback = callback; 
    },

    receiveSpawn: function(aData) {
      if (this.spawn_callback) {
        this.spawn_callback(aData);
      }
    }, 

    onDespawn: function(callback) {
      this.despawn_callback = callback;
    },

    receiveDespawn: function(aData) {
      if (this.despawn_callback) {
        this.despawn_callback(aData);
      }
    },

    onMove: function(callback) {
      this.move_callback = callback;
    },

    receiveMove: function(aData) {
      if (this.move_callback) {
        this.move_callback(aData);
      }
    },

    onChat: function(callback) {
      this.chat_callback = callback;
    },

    receiveChat: function(aData) {
      if (this.chat_callback) {
        this.chat_callback(aData);
      }
    },

    onScene: function(callback) {
      this.scene_callback = callback;
    },

    receiveScene: function(aData) {
      if (this.scene_callback) {
        this.scene_callback(aData);
      }
    },

    onEntities: function(callback) {
      this.entities_callback = callback;
    },

    receiveEntities: function(aData) {
      if (this.entities_callback) {
        this.entities_callback(aData);
      }
    },

    onDirection: function(callback) {
      this.direction_callback = callback;
    },

    receiveDirection: function(aData) {
      if (this.direction_callback) {
        this.direction_callback(aData);
      }
    },

    onDisconnected: function(callback) {
      this.disconnected_callback = callback;
    },

    receiveDisconnected: function(aData) {
      if (this.disconnected_callback) {
        this.disconnected_callback(aData);
      }
    },

    sendMessage: function(msg) {
      this.connection.send(BISON.encode(msg));
    },

    sendMove: function(aScene, aId, aDirection) {
      this.sendMessage([Types.Messages.MOVE, aScene, aId, aDirection]);
    },

    sendChat: function(aScene, aId, aChatMessage) {
      this.sendMessage([Types.Messages.CHAT, aScene, aId, aChatMessage]);
    },

    onError: function(callback) {
      this.error_callback = callback;
    } 
  });

  return WsClient;
});

