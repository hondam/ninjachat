define(['mob'], function(Mob) {

  var Mobs = {};

  Mobs.Kappa = new enchant.Class.create(Mob, {
    initialize: function(id) {
      Mob.call(this, id, Types.Entities.KAPPA);
    }
  });

  Mobs.Komainu = new enchant.Class.create(Mob, {
    initialize: function(id) {
      Mob.call(this, id, Types.Entities.KOMAINU);
    }
  });

  return Mobs;
});
