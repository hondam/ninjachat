var cls = require('./lib/class'),
  path = require('path'),
  fs = require('fs');

/**
 *
 */
module.exports = Maps = cls.Class.extend({

  /**
   * @public
   */
  init: function(aFile) {
    var self = this;

    this.isLoaded = false;

    path.exists(aFile, function(aExists) {
      if (!aExists) {
        return;
      }
      fs.readFile(aFile, function(aErr, aFile) {
        var json = JSON.parse(aFile.toString());
        self.initMap_(json);
      });
    });
  },

  /**
   *
   * @private
   */
  initMap_: function(map) {
    this.maps = map.maps;
    this.isLoaded = true;
  },

  /**
   *
   * @public
   */
  getNextScene: function(aScene, aX, aY) {
    var x = aX / 32;
    var y = aY / 32;

    for (var i in this.maps[aScene].door) {
      if (this.maps[aScene].door[i].x == x && this.maps[aScene].door[i].y == y) {
        return { name: this.maps[aScene].door[i].s,
                 defaultX: this.maps[aScene].door[i].tx * 32,
                 defaultY: this.maps[aScene].door[i].ty * 32};
      }
    } 
    return;
  },

  /**
   *
   * @public
   */
  hitCheck: function(aScene, aX, aY) {
    var x = aX / 32;
    var y = aY / 32;

    return this.maps[aScene].collisions[y][x];
  }
});

