define(function() {
  /**
   *
   */
  var BaseMap = enchant.Class.create(enchant.Map, {
    /**
     *
     */
    initialize: function() {
      //console.log('BaseMap - initialize');

      enchant.Map.call(this, 32, 32);
    }
  });
  return BaseMap;
});
