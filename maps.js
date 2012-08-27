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
//    console.log('Map - init()');

    var self = this;

    this.isLoaded = false;

    path.exists(aFile, function(aExists) {
      if (!aExists) {
//        console.log(aFile + " does'nt exist.");
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
//    console.log('Map - initMap()');

    this.maps = map.maps;
    this.isLoaded = true;

    //console.log(this.maps);
  },

  /**
   *
   * @public
   */
  getNextScene: function(aScene, aX, aY) {
//    console.log('map.js - getNextScene');

    var x = aX / 32;
    var y = aY / 32;

    for (var i in this.maps[aScene].door) {
      //console.log(this.maps[aScene].door[i]);
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
//    console.log('map.js - hitCheck', aScene, aX, aY);

    var x = aX / 32;
    var y = aY / 32;

  //  console.log(x, y, this.maps[aScene].collisions[y][x]);

    return this.maps[aScene].collisions[y][x];
  }
});

