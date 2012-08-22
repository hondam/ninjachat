define(['base_map', 'conf'], function(BaseMap, conf) {

  /**
   *
   */
  var MainMap = enchant.Class.create(BaseMap, {

    /**
     *
     */
    initialize: function() {
      //console.log('MainMap - initialize');

      BaseMap.call(this);

      this.name = 'main';
      this.image = game.assets[PRELOAD_IMAGES[Types.getImageIdByName(this.name)]];
      this.loadData(conf.maps.main.data);
    }
  });

  return MainMap;
});

