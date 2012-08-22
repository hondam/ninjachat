define(['entity'], function(Entity) {

  /**
   *
   */
  var Character = enchant.Class.create(Entity, {
    /**
     *
     */
    initialize: function(id, kind) {
      //console.log('Character - initialize()');

      Entity.call(this, id, kind);
    }
  });

  return Character;
});

