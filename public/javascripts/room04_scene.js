define(['base_scene', 'room04_map'], function(BaseScene, Room04Map) {

  var Room04Scene = enchant.Class.create(BaseScene, {

    initialize: function() {
      BaseScene.call(this);

      this.name = 'room04';
      this.stage = new Group();
      this.map = new Room04Map();
     
      this.stage.x = 240;

      this.stage.addChild(this.map);
      this.addChild(this.stage);
    }

  });

  return Room04Scene;
});

