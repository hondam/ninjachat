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
      var isFocus = true;
      document.addEventListener('keydown', function(e) {
        if (!isKeyDown) {
          if (e.keyCode === 13) {
            if ($('#chatbox').hasClass('active')) {
              isFocus = true;
              $('#chatbox').removeClass('active');
              $('#chatinput').blur();
            } else {
              isFocus = false;
              $('#chatbox').addClass('active');
              $('#chatinput').focus();
            }
          } else {
            if (isFocus) {
              isKeyDown = !isKeyDown;
              var direction;
              switch(e.keyCode) {
                case 37: case 72: direction = 'left';  break;
                case 38: case 75: direction = 'up';    break;
                case 39: case 76: direction = 'right'; break;
                case 40: case 74: direction = 'down';  break;
              }
              if (direction) {
                gm.sendMove(direction);
              }
            }
          }
        }
      }, true);
      document.addEventListener('keyup', function(e) {
        if ((37 <= e.keyCode && e.keyCode <= 40) || (72 <= e.keyCode && e.keyCode <= 76)) {
          isKeyDown = !isKeyDown;
        }
      }, true);

      // chat event handling
      $('#chatinput').keydown(function(e) {
        var input = $('#chatinput');
        // Enter Key
        if (e.keyCode === 13) {
          if (input.val() !== '') {
            isFocus = true;
            gm.sendChat(input.val());
            input.val('');
            $('#chatbox').removeClass('active');
            $('#chatinput').blur();
            return false;
          } 
        }
        // Esc key
        if (e.keyCode === 27) {
          isFocus = true;
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

