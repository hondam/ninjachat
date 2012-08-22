define(['character'], function(Character) {

  /**
   *
   */
  var Mob = new enchant.Class.create(Character, {
    /**
     *
     */
    initialize: function(id, kind) {
      Character.call(this, id, kind);
    }
  });

  return Mob;
});

