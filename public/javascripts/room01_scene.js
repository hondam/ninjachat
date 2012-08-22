define(['base_scene', 'room01_map'], function(BaseScene, Room01Map) {

  /**
   *
   */
  var Room01Scene = new enchant.Class.create(BaseScene, {

    /**
     *
     */
    initialize: function() {
      //console.log('Room01Scene - initialize');

      BaseScene.call(this);

      this.name = 'room01';
      this.stage = new Group();
      this.map = new Room01Map();
     
      // ハーフサイズマップなのでセンターへ 
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    },

    /**
     * Entity配置
     */
    waitInTheWings: function(entities) {
      // ...
    },

    /**
     *
     */
    setPlayer: function(aPlayer) {
      if (!this.player) {
        this.player = aPlayer;
        this.stage.addChild(this.player);
      } else {
        this.addChild(this.stage);
      }
    },


    /**
     *
     */
    go: function(aBeforeScene) {
      console.log('Room01Scene - go');

      game.replaceScene(this);
    }
  });

  return Room01Scene;
});

