define(['base_map', 'conf'], function(BaseMap, conf) {

  /**
   *
   */
  var Room05Map = enchant.Class.create(BaseMap, {

    /**
     *
     */
    initialize: function() {
      BaseMap.call(this);

      this.name = 'room05';
      this.backgroundColor = 'rgb(0, 0, 0)';
      this.image = game.assets[PRELOAD_IMAGES[Types.getImageIdByName(this.name)]];
      this.loadData(conf.maps.room05.data);
    }
  });

  return Room05Map;
});

