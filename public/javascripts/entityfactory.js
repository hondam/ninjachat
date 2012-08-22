define(['mobs', 'npcs', 'player'], function(Mobs, NPCs, Player) {
  var EntityFactory = {};

  EntityFactory.createEntity = function(kind, id, name) {
    if (!kind) {
      console.log('kind is undefined', true);
      return;
    }
    if (!_.isFunction(EntityFactory.builders[kind])) {
      throw Error(kind + ' is not a valid Entity type');
    }
    return EntityFactory.builders[kind](id, name);
  };

  EntityFactory.builders = [];

  //============ player ===============
  EntityFactory.builders[Types.Entities.NINJA01] = function(id, name) {
    return new Player(id, name, Types.Entities.NINJA01);
  };
  EntityFactory.builders[Types.Entities.NINJA02] = function(id, name) {
    return new Player(id, name, Types.Entities.NINJA02);
  };
  EntityFactory.builders[Types.Entities.NINJA03] = function(id, name) {
    return new Player(id, name, Types.Entities.NINJA03);
  };
  EntityFactory.builders[Types.Entities.NINJA04] = function(id, name) {
    return new Player(id, name, Types.Entities.NINJA04);
  };
  EntityFactory.builders[Types.Entities.NINJA05] = function(id, name) {
    return new Player(id, name, Types.Entities.NINJA05);
  };
  EntityFactory.builders[Types.Entities.KUNOICHI01] = function(id, name) {
    return new Player(id, name, Types.Entities.KUNOICHI01);
  };
  EntityFactory.builders[Types.Entities.KUNOICHI02] = function(id, name) {
    return new Player(id, name, Types.Entities.KUNOICHI02);
  };
  EntityFactory.builders[Types.Entities.KUNOICHI03] = function(id, name) {
    return new Player(id, name, Types.Entities.KUNOICHI03);
  };
  EntityFactory.builders[Types.Entities.KUNOICHI04] = function(id, name) {
    return new Player(id, name, Types.Entities.KUNOICHI04);
  };
  EntityFactory.builders[Types.Entities.KUNOICHI05] = function(id, name) {
    return new Player(id, name, Types.Entities.KUNOICHI05);
  };
  EntityFactory.builders[Types.Entities.ELDER01] = function(id, name) {
    return new Player(id, name, Types.Entities.ELDER01);
  };
  EntityFactory.builders[Types.Entities.ELDER02] = function(id, name) {
    return new Player(id, name, Types.Entities.ELDER02);
  };
  EntityFactory.builders[Types.Entities.ELDER03] = function(id, name) {
    return new Player(id, name, Types.Entities.ELDER03);
  };
  EntityFactory.builders[Types.Entities.ELDER04] = function(id, name) {
    return new Player(id, name, Types.Entities.ELDER04);
  };
  EntityFactory.builders[Types.Entities.ELDER05] = function(id, name) {
    return new Player(id, name, Types.Entities.ELDER05);
  };
  //============ mobs ===============
  EntityFactory.builders[Types.Entities.KAPPA] = function(id) {
    return new Mobs.Kappa(id);
  };
  EntityFactory.builders[Types.Entities.KOMAINU] = function(id) {
    return new Mobs.Komainu(id);
  };
  //============ npcs ================
  EntityFactory.builders[Types.Entities.OHTERNPC] = function(id) {
    return new NPCs.OtherNpc(id);
  };

  return EntityFactory;
});
