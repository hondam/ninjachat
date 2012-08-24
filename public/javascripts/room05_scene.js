define(['base_scene', 'room05_map'], function(BaseScene, Room05Map) {

  var Room05Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room05';
      this.stage = new Group();
      this.map = new Room05Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room05Scene;
});

