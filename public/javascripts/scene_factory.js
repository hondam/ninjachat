define(['main_scene', 'room01_scene', 'room02_scene', 'room03_scene', 'room04_scene', 'room05_scene', 'room06_scene', 'lib/class'],
function(MainScene, Room01Scene, Room02Scene, Room03Scene, Room04Scene, Room05Scene, Room06Scene) {

  /**
   *
   */
  var SceneFactory = Class.extend({
    /**
     *
     */
    init: function() {
    },

    /**
     * シーンを生成する
     */
    createScene: function(aSceneName) {
      var scene;
      switch(aSceneName) {
        case 'main':
          scene = new MainScene();
          break;
        case 'room01':
          scene = new Room01Scene();
          break;
        case 'room02':
          scene = new Room02Scene();
          break;
        case 'room03':
          scene = new Room03Scene();
          break;
        case 'room04':
          scene = new Room04Scene();
          break;
        case 'room05':
          scene = new Room05Scene();
          break;
        case 'room06':
          scene = new Room06Scene();
          break;
      }
      return scene;
    } 
  });
  return SceneFactory;
});

