define(['base_scene', 'main_map'], function(BaseScene, MainMap) {

  var MainScene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'main';
      this.stage = new Group();
      this.map = new MainMap();

      this.stage.x = 0;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return MainScene;
});

