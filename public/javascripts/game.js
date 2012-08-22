define(['jquery', 'conf', 'game_manager', 'resource', 'lib/enchant'], function($, conf, GameManager) {

  enchant();

  // Main
  $(document).ready(function() {
    game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.fps = FPS;
    game.preload(PRELOAD_IMAGES);
    game.onload = function() {

      // ゲームマネージャ初期化
      var gm = new GameManager();

      // WebSocketサーバへ接続
      gm.connect();

      // ゲーム開始
      gm.tryStarting();

      // キーイベント
      var isKeyDown = false;
      $(window).keypress(function(e) {
        var direction;
        switch(e.keyCode) {
          case 37: direction = 'left';  break;
          case 38: direction = 'up';    break;
          case 39: direction = 'right'; break;
          case 40: direction = 'down';  break;
        }
        if (typeof direction !== 'undefined' && !isKeyDown) {
          isKeyDown = true;
          gm.sendMove(direction);
        }
      });
      $(window).keyup(function(e) {
        switch(e.keyCode) {
          case 37: case 38: case 39: case 40:
            isKeyDown = false;
            break;
        }
      });

      // チャットイベント
        // サーバへチャットメッセージをsend
        // アクション名、キャラID、シーンID、メッセージ
    };
    //game.start();
    game.debug();
  });
});

