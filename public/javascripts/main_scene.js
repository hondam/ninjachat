define(['base_scene', 'main_map', 'entityfactory', 'lib/underscore-min'],
  function(BaseScene, MainMap, EntityFactory) {

  /**
   *
   */
  var MainScene = new enchant.Class.create(BaseScene, {

    /**
     *
     */
    initialize: function() {
      //console.log('MainScene - initialize');

      BaseScene.call(this);

      this.name = 'main';
      this.stage = new Group();
      this.map = new MainMap();
      this.player;

      this.stage.x = 0;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    },

    /**
     * Entity配置
     */
    waitInTheWings: function(entities) {
      //});
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
      console.log('MainScene - go');

      game.replaceScene(this);
    }
  });

  return MainScene;
});

