define(['base_map', 'conf'], function(BaseMap, conf) {

  /**
   *
   */
  var Room01Map = enchant.Class.create(BaseMap, {

    /**
     *
     */
    initialize: function() {
      //console.log('Room01Map - initialize');

      BaseMap.call(this);

      this.name = 'room01';
      this.backgroundColor = 'rgb(0, 0, 0)';
      this.image = game.assets[PRELOAD_IMAGES[Types.getImageIdByName(this.name)]];
      this.loadData(conf.maps.room01.data);
    }
  });

  return Room01Map;
});

