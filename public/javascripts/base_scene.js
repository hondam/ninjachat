define(['entityfactory', 'lib/underscore-min'], function(EntityFactory) {

  var BaseScene = enchant.Class.create(enchant.Scene, {

    initialize: function() {
      enchant.Scene.call(this);
      this.entities = {};
    },

    waitInTheWings: function(entities) {
      var self = this;
      for(var type in entities) {
        for (var i in entities[type]) {
          var e = entities[type][i];
          if (!(type == 'players' && e[1] in self.entities)) {
            var entity = EntityFactory.createEntity(e[2], e[1], null);
            entity.x = e[3];
            entity.y = e[4];
            self.addEntity(entity);
          }
        }
      }
    },

    addEntity: function(entity) {
      var self = this;
      if (this.entities[entity.id] === undefined) {
        this.entities[entity.id] = entity;
        this.stage.addChild(entity);
      } else {
        console.log('This entity already exists : ', entity.id);
      }
    },

    removeEntity: function(entity) {
      var self = this;
      if (entity.id in this.entities) {
        self.stage.removeChild(entity);
        delete self.entities[entity.id];
      } else {
        console.log('Connnot remove entity. Unknown ID :',  entity.id);
      }
    },

    go: function(aBeforeScene) {
      game.replaceScene(this);
    }
  });

  return BaseScene;
});

