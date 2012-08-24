define(['base_scene', 'room06_map'], function(BaseScene, Room06Map) {

  var Room06Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room06';
      this.stage = new Group();
      this.map = new Room06Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room06Scene;
});

