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


        var balloon = '<div id="B' + entity.id + '" class="balloon"><p>test</p></div>';
        $(balloon).appendTo("#balloons");
        var id = '#B' + entity.id;
        var x = (entity.x + 16) - ($(id).width() / 2);
        var y = entity.y - $(id).height();
        $(id).css('left', x + 'px');
        $(id).css('top', y + 'px');


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
      console.log(this.name + ' scene - go');
      game.replaceScene(this);
    }
  });

  return BaseScene;
});

