define(['main_scene', 'room01_scene', 'lib/class'], function(MainScene, Room01Scene) {

  /**
   *
   */
  var SceneFactory = Class.extend({
    /**
     *
     */
    init: function() {
      //console.log('SceneFactory - init');
    },

    /**
     * シーンを生成する
     */
    createScene: function(aSceneName) {
      //console.log('SceneFactory - createScene');
      var scene;
      switch(aSceneName) {
        case 'main':
          scene = new MainScene();
          break;
        case 'room01':
          scene = new Room01Scene();
          break;
      }
      return scene;
    } 
  });
  return SceneFactory;
});
