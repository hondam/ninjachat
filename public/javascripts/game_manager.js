define(['ws_client', 'scene_factory', 'player', 'lib/class'], 
  function(WsClient, SceneFactory, Player) {

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
      this.scenes = [];
      this.sf = new SceneFactory();
      this.scenes['main'] = this.sf.createScene('main');
      this.scenes['room01'] = this.sf.createScene('room01');
      this.scenes['room02'] = this.sf.createScene('room02');
      this.currentScene = this.getSceneByName_('main');
    },

    /**
     * @private
     */
    initWsClient_: function() {
      var self = this;

      // WebSocket Client
      this.client = new WsClient('210.152.137.37', '3000');

      /**
       * サーバ接続時のコールバック
       */
      this.client.onConnected(function() {
        //console.log('GameManager - onConnected');
      });

      /**
       * サーバからウェルカムメッセージを受け取った場合のコールバック
       */
      this.client.onWelcome(function(aData) {
        //console.log('GameManager - onWelcome');
        self.player = new Player(aData[2].id, aData[2].name, aData[2].kind);
        self.player.setGridPosition(aData[2].x, aData[2].y);
        self.currentScene.setPlayer(self.player);
      });

      /**
       * サーバからキャラ追加メッセージを受け取った場合のコールバック
       */
      this.client.onSpawn(function(aData) {
        //console.log('GameManager - onSpawn');
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          // 追加キャラをシーンへ表示
        }
      });

      /**
       * サーバからキャラ削除メッセージを受け取った場合のコールバック
       */
      this.client.onDespawn(function(aData) {
        //console.log('GameManager - onDespawn');
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          // 追加キャラをシーンから削除
        }
      });

      /**
       * サーバから移動メッセージを受け取った場合のコールバック
       */
      this.client.onMove(function(aData) {
        console.log('GameManager - onMove', aData);
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          //self.player.move(aData[3]);
          self.currentScene.player.move(aData[3]);
        }
      });

      /**
       * サーバからチャットメッセージを受け取った場合のコールバック
       */
      this.client.onChat(function(aData) {
        //console.log('GameManager - onChat');
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          // チャットをシーンへ表示
        }
      });

      /**
       * サーバからシーン変更を受け取った場合のコールバック
       */
      this.client.onScene(function(aData) {
        //console.log('GameManager - onScene', aData);
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName !== cSceneName) {
          var moveWaiting = setInterval(function() {
            if (self.player.isMoving === false) {
              clearInterval(moveWaiting);
              self.player.x = aData[3];
              self.player.y = aData[4];
              // この処理以外に解決方法がわからなかった
              self.currentScene.removePlayer();
              self.scenes[mSceneName].setPlayer(self.player);
              self.changeScene(cSceneName, mSceneName);
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
        //console.log('GameManager - onEntities');
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          self.currentScene.waitInTheWings(aData[2]);
        }
      });

      /**
       *
       */
      this.client.onDirection(function(aData) {
        //console.log('GameManager - onDirection');
        var mSceneName = aData[1];
        var cSceneName = self.getCurrentSceneName();
        if (mSceneName === cSceneName) {
          self.player.changeOfDirection(aData[3]);
        }
      });

      this.client.onDisconnected(function(aData) {
        //console.log('GameManager - onDisconnected');
        // ...
      });

      this.client.onError(function() {
        //console.log('GameManager - onError');
        // ...
      });

    },

    /**
     * WebSocketサーバへ接続する
     * @public
     */
    connect: function() {
      //console.log('GameManager - connect');
      if (this.client) {
        this.client.connect();
      }
    },

    /**
     * ゲームを開始する
     * @public
     */
    tryStarting: function() {
      //console.log('GameManager - tryStarting');
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
      //console.log('GameManager - start_');
      this.currentScene.go();
    },

    /**
     * 指定IDのシーンへ変更する
     * @public
     */
    changeScene: function(aCSceneName, aNSceneName) {
      //console.log('GameManager - changeScene', aCSceneName, '>', aNSceneName);
      this.currentScene = this.getSceneByName_(aNSceneName);
      this.currentScene.go(aCSceneName);
    },

    /**
     * 現在のシーン名を返す
     * @public
     */
    getCurrentSceneName: function() {
      //console.log('GameManager - getCurrentSceneName');
      return this.currentScene.name;
    },

    /**
     * 指定IDのシーンを取得する
     * @private
     */
    getSceneByName_: function(aName) {
      //console.log('GameManager - getSceneByName_');
      return this.scenes[aName];
    },

    /**
     * サーバへMoveメッセージを送信する
     * @public
     */
    sendMove: function(aDirection) {
      this.client.sendMove(this.getCurrentSceneName(), this.player.id, aDirection);
    }

  });
  return GameManager;
});

