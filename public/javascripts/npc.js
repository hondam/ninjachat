define(['character'], function(Character) {
  var NpcTalk = {
    'othernpc': [
      'lorem ipsum',
      'lorem ipsum lorem ipsum',
      'lorem ipsum lorem ipsum lorem ipsum'
    ]
  };

  /**
   *
   */
  var Npc = new enchant.Class.create(Character, {
    /**
     *
     */
    initialize: function(id, kind) {
      Character.call(this, id, kind);
      this.itemKind = Types.getKindAsString(this.kind);
      this.talkCount = NpcTalk[this.itemKind].length;
      this.talkIndex = 0;
    },

    /**
     *
     */
    talk: function() {
      var msg = null;
      if (this.talkIndex > this.talkCount) {
        this.talkIndex = 0;
      }
      if (this.talkIndex < this.talkCount) {
        msg = NpcTalk[this.itemKind][this.talkIndex];
      }
      this.talkIndex += 1;
      return msg;
    }
  });

  return Npc;
});

