var GAME_WIDTH = 960;
var GAME_HEIGHT = 480;
var FPS = 30;
var NINJA01_IMAGE = '/images/player_ninja_01.png',
  NINJA02_IMAGE = '/images/player_ninja_02.png',
  NINJA03_IMAGE = '/images/player_ninja_03.png',
  NINJA04_IMAGE = '/images/player_ninja_04.png',
  NINJA05_IMAGE = '/images/player_ninja_05.png',
  KUNOICHI01_IMAGE = '/images/player_kunoichi_01.png',
  KUNOICHI02_IMAGE = '/images/player_kunoichi_02.png',
  KUNOICHI03_IMAGE = '/images/player_kunoichi_03.png',
  KUNOICHI04_IMAGE = '/images/player_kunoichi_04.png',
  KUNOICHI05_IMAGE = '/images/player_kunoichi_05.png',
  ELDER01_IMAGE = '/images/player_elder_01.png',
  ELDER02_IMAGE = '/images/player_elder_02.png',
  ELDER03_IMAGE = '/images/player_elder_03.png',
  ELDER04_IMAGE = '/images/player_elder_04.png',
  ELDER05_IMAGE = '/images/player_elder_05.png',
  KAPPA_IMAGE = '/images/mob_kappa.png',
  KOMAINU_IMAGE = '/images/mob_komainu.png',
  OTHERNPC_IMAGE = '/images/npc_unknown.png',
  MAIN_MAP_IMAGE = '/images/map_base03.png';

var PRELOAD_IMAGES = [
  NINJA01_IMAGE,
  NINJA02_IMAGE,
  NINJA03_IMAGE,
  NINJA04_IMAGE,
  NINJA05_IMAGE,
  KUNOICHI01_IMAGE,
  KUNOICHI02_IMAGE,
  KUNOICHI03_IMAGE,
  KUNOICHI04_IMAGE,
  KUNOICHI05_IMAGE,
  ELDER01_IMAGE,
  ELDER02_IMAGE,
  ELDER03_IMAGE,
  ELDER04_IMAGE,
  ELDER05_IMAGE,
  KAPPA_IMAGE,
  KOMAINU_IMAGE,
  OTHERNPC_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE,
  MAIN_MAP_IMAGE
];

var images = {
  ninja01: 0,
  ninja02: 1,
  ninja03: 2,
  ninja04: 3,
  ninja05: 4,
  kunoichi01: 5,
  kunoichi02: 6,
  kunoichi03: 7,
  kunoichi04: 8,
  kunoichi05: 9,
  elder01: 10,
  elder02: 11,
  elder03: 12,
  elder04: 13,
  elder05: 14,
  kappa: 15,
  komainu: 16,
  other: 17,
  main: 18,
  room01: 19,
  room02: 20,
  room03: 21,
  room04: 22,
  room05: 23,
  room06: 24
};

var Types = {
  Messages: {
    HELLO: 0,
    WELCOME: 1,
    SPAWN: 2,
    DESPAWN: 3,
    MOVE: 4,
    CHAT: 11,
    TELEPORT: 15,
    POPULATION: 17,
    LIST: 19,
    SCENE: 20,
    ENTITIES: 21,
    DIRECTION: 22,
    DUMMY: 99
  },
  Scenes: {
    MAIN: 'main',
    ROOM01: 'room01',
    ROOM02: 'room02',
    ROOM03: 'room03',
    ROOM04: 'room04',
    ROOM05: 'room05',
    ROOM06: 'room06'
  },
  Entities: {
    // Player
    NINJA01: 1,
    NINJA02: 2,
    NINJA03: 3,
    NINJA04: 4,
    NINJA05: 5,
    KUNOICHI01: 6,
    KUNOICHI02: 7,
    KUNOICHI03: 8,
    KUNOICHI04: 9,
    KUNOICHI05: 10,
    ELDER01: 11,
    ELDER02: 12,
    ELDER03: 13,
    ELDER04: 14,
    ELDER05: 15,
    // Mobs
    KAPPA: 16,
    KOMAINU: 17,
    // Npcs
    OTHERNPC: 99
  }
};

Types.getImageIdByName = function(name) {
  return images[name];
};

if (!(typeof exports === 'undefined')) {
  module.exports = Types;
}
