define(['base_scene', 'room03_map'], function(BaseScene, Room03Map) {

  var Room03Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room03';
      this.stage = new Group();
      this.map = new Room03Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room03Scene;
});

