define(function() {
  /**
   *
   */
  var BaseScene = enchant.Class.create(enchant.Scene, {
    /**
     *
     */
    initialize: function() {
      //console.log('BaseScene - initialize');

      enchant.Scene.call(this);
    }
  });
  return BaseScene;
});
