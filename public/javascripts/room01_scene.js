define(['base_scene', 'room01_map'], function(BaseScene, Room01Map) {

  var Room01Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room01';
      this.stage = new Group();
      this.map = new Room01Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room01Scene;
});

