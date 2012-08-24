define(['base_map', 'conf'], function(BaseMap, conf) {

  /**
   *
   */
  var Room06Map = enchant.Class.create(BaseMap, {

    /**
     *
     */
    initialize: function() {
      BaseMap.call(this);

      this.name = 'room06';
      this.backgroundColor = 'rgb(0, 0, 0)';
      this.image = game.assets[PRELOAD_IMAGES[Types.getImageIdByName(this.name)]];
      this.loadData(conf.maps.room06.data);
    }
  });

  return Room06Map;
});

