define(['jquery', 'conf', 'game_manager', 'resource', 'lib/enchant'],
  function($, conf, GameManager) {

  enchant();

  // Main
  $(document).ready(function() {
    game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.fps = FPS;
    game.preload(PRELOAD_IMAGES);
    game.onload = function() {

      // initialize game
      var gm = new GameManager();

      // connect websocket server
      gm.connect();

      // try starting game
      gm.tryStarting();

      // keydown event handling
      var isKeyDown = false;
      document.addEventListener('keydown', function(e) {
        if (!isKeyDown) {
          if (37 <= e.keyCode && e.keyCode <= 40) {
            isKeyDown = !isKeyDown;
            var direction;
            switch(e.keyCode) {
              case 37: direction = 'left';  break;
              case 38: direction = 'up';    break;
              case 39: direction = 'right'; break;
              case 40: direction = 'down';  break;
            }
            gm.sendMove(direction);
          } else if (e.keyCode === 13) {
            if ($('#chatbox').hasClass('active')) {
              $('#chatbox').removeClass('active');
              $('#chatinput').blur();
            } else {
              $('#chatbox').addClass('active');
              $('#chatinput').focus();
            }
          }
        }
      }, true);
      document.addEventListener('keyup', function(e) {
        if (37 <= e.keyCode && e.keyCode <= 40) {
          isKeyDown = !isKeyDown;
        }
      }, true);

      // chat event handling
      $('#chatinput').keydown(function(e) {
        var input = $('#chatinput');
        // Enter Key
        if (e.keyCode === 13) {
          if (input.val() !== '') {
            gm.sendChat(input.val());
            input.val('');
            $('#chatbox').removeClass('active');
            $('#chatinput').blur();
            return false;
          } 
        }
        // Esc key
        if (e.keyCode === 27) {
          input.val('');
          $('#chatbox').removeClass('active');
          $('#chatinput').blur();
          return false;
        }
      });
    };

    // starting enchant.js
    //game.start();
    game.debug();

  });
});

