define(['base_scene', 'room02_map'], function(BaseScene, Room02Map) {

  var Room02Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room02';
      this.stage = new Group();
      this.map = new Room02Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room02Scene;
});

