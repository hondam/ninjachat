define(['character'], function(Character) {

  /**
   *
   */
  var Player = enchant.Class.create(Character, {

    /**
     *
     */
    initialize: function(id, name, kind) {
      //console.log('Player - initialize');

      Character.call(this, id, kind);
    }
  });

  return Player;
});

