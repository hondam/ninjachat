define(function() {
  /**
   *
   */
  var Entity = enchant.Class.create(enchant.Sprite, {
    /**
     *
     */
    initialize: function(id, kind) {
      //console.log('Entity - initialize()');

      enchant.Sprite.call(this, 32, 32);

      this.id = id;
      this.kind = kind;
      this.image = game.assets[PRELOAD_IMAGES[kind]];
      this.walk = 0;
      this.direction = 0;
      this.speed = 4;
      this.isMoving = false;

      this.addEventListener('enterframe', this.onEnterFrame);
    },

    /**
     *
     */
    setGridPosition: function(x, y) {
      //console.log('Entity - setGridPosition');
      this.x = x;
      this.y = y;
    },

    /**
     *
     */
    onEnterFrame: function() {
      if (game.frame % 5 == 0) {
        this.walk++;
        this.walk %= 3+1;
        this.frame = this.walk + this.direction;
      }
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);
        if (this.x % 32 == 0 && this.y % 32 == 0) {
          this.isMoving = false;
        }
      } 
    },

    /**
     *
     */
    move: function(aDirection) {
      if (this.isMoving === false) {
        this.vx = this.vy = 0;
        switch(aDirection) {
          case 'down': 
            this.direction = 0;
            this.vy = this.speed;
            break;
          case 'right': 
            if (this.scaleX == -1) {
              this.scaleX *= -1;
            }
            this.direction = 4;
            this.vx = this.speed;
            break;
          case 'up':
            this.direction = 8;
            this.vy = this.speed * -1;
            break;
          case 'left':
            if (this.scaleX == 1) {
              this.scaleX *= -1;
            }
            this.direction = 4;
            this.vx = this.speed * -1;
            break;
        }
        this.isMoving = true;
      }
    },

    /**
     *
     */
    changeOfDirection: function(aDirection) {
      if (this.isMoving === false) {
	      this.vx = this.vy = 0;
	      switch(aDirection) {
	        case 'down':
	          this.direction = 0;
	          break;
	        case 'right':
	          if (this.scaleX == -1) {
	            this.scaleX *= -1;
	          }
	          this.direction = 4;
	          break;
	        case 'up':
	          this.direction = 8;
	          break;
	        case 'left':
	          if (this.scaleX == 1) {
	            this.scaleX *= -1;
	          }
	          this.direction = 4;
	          break;
	      }
	      this.isMoving = true;
	    }
    }
  });

  return Entity;
});

