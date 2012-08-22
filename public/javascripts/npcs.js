define(['npc'], function(Npc) {
  var NPCs = {};

  /**
   *
   */
  NPCs.OtherNpc = new enchant.Class.create(Npc, {
    /**
     *
     */
    initialize: function(id) {
      this._super(id, Types.Entities.OTHERNPC, 1);
    }
  });

  return NPCs;
});

