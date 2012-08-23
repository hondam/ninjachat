define(['base_scene', 'room01_map', 'entityfactory', 'lib/underscore-min'],
function(BaseScene, Room01Map, EntityFactory) {

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
      var self = this;
      for(var type in entities) {
        for (var i in entities[type]) {
          var e = entities[type][i];
          // 自身以外
          if (!(type == 'players' && e[1] == this.player.id)) {
            var entity = EntityFactory.createEntity(e[2], e[1], null);
            entity.x = e[3];
            entity.y = e[4];
            self.stage.addChild(entity);
          }
        }
      }
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
    removePlayer: function() {
      this.stage.removeChild(this.player);
      delete this.player;
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

