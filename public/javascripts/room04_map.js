define(['base_map', 'conf'], function(BaseMap, conf) {

  /**
   *
   */
  var Room04Map = enchant.Class.create(BaseMap, {

    /**
     *
     */
    initialize: function() {
      BaseMap.call(this);

      this.name = 'room04';
      this.backgroundColor = 'rgb(0, 0, 0)';
      this.image = game.assets[PRELOAD_IMAGES[Types.getImageIdByName(this.name)]];
      this.loadData(conf.maps.room04.data);
    }
  });

  return Room04Map;
});

