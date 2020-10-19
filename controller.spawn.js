/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-12-02 10:44:15
 * @desc Module that contains the logic for spawning creeps.
 */
require('prototype.spawn')();
module.exports = {
  /**
   * Spwaning new creeps with a specified role.
   */
  spawn: function (spawn) {
    var creepsInSpawnRoom = spawn.room.find(FIND_MY_CREEPS);
    // The spawn object is static for now.
    const gameSpawn = spawn;
    const mem = gameSpawn.memory;
    // initialising spawn specific memory if there's none
    if (!mem.minimumUpgraders) mem.minimumUpgraders = 2;
    if (!mem.minimumRepairers) mem.minimumRepairers = 0;
    if (!mem.minimumHarvesters) mem.minimumHarvesters = 2;
    if (!mem.minimumBuilders) mem.minimumBuilders = 0;
    if (!mem.minimumWallers) mem.minimumWallers = 0;
    if (!mem.resourceIDs) {
      let array = spawn.room.find(FIND_SOURCES);
      let resourceIds = ``;
      array.forEach((element) => {
        resourceIds += `|${element.id}|`;
      });
      mem.resourceIDs = resourceIds;
      mem.resourceCount = array.length;
    }
    // current number of harvesters
    var numOfUpgraders = _.sum(
      creepsInSpawnRoom,
      (c) => c.memory.role === 'upgrader'
    );
    // current number of harvesters
    var numOfHarvesters = _.sum(
      creepsInSpawnRoom,
      (c) => c.memory.role === 'harvester'
    );
    // current number of builders
    var numOfBuilders = _.sum(
      creepsInSpawnRoom,
      (c) => c.memory.role === 'builder'
    );
    // current number of repairers
    var numOfRepairers = _.sum(
      creepsInSpawnRoom,
      (c) => c.memory.role === 'repairer'
    );
    // current number of wallers
    var numOfWallers = _.sum(
      creepsInSpawnRoom,
      (c) => c.memory.role === 'waller'
    );
    // when we are under our minimum harvester count, we first generate more harvesters
    var newCreep = undefined;
    // maximum energy capacity 1/2 -> we spawn a creep when all containers are half filled
    var energy = gameSpawn.room.energyCapacityAvailable;
    if (numOfHarvesters < mem.minimumHarvesters) {
      newCreep = gameSpawn.createHarvesterCreep(energy, `harvester`, `to_base`);
      if (newCreep == ERR_NOT_ENOUGH_ENERGY) {
        // spawn one with the minimum energy
        newCreep = gameSpawn.createEqualCreep(200, `harvester`, `to_base`);
      }
    } else if (numOfUpgraders < mem.minimumUpgraders) {
      newCreep = gameSpawn.createCarrierCreep(energy, `upgrader`, `to_rcl`);
    } else if (numOfRepairers < mem.minimumRepairers) {
      newCreep = gameSpawn.createFastCreep(energy, `repairer`, `to_repair`);
    } else if (numOfBuilders < mem.minimumBuilders) {
      newCreep = gameSpawn.createFastCreep(energy, `builder`, `to_build`);
    } else if (numOfWallers < mem.minimumWallers) {
      newCreep = gameSpawn.createFastCreep(energy, `waller`, `to_wall`);
    } // defaulting to builders because they behave as upgraders when there is nothing to build
    else {
      newCreep = gameSpawn.createFastCreep(energy, `builder`, `to_build`);
    }
    if (!(newCreep < 0)) {
      console.log('🍾🍾🍾 We are spawning a new Creep 🍾🍾🍾');
    }
  },

  /**
   * This function removes dead creeps from the memory.
   *
   */
  remove: function () {
    for (var i in Memory.creeps) {
      if (!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  },

  setSpawnMemory: function (
    spawn,
    minimumHarvesters,
    minimumUpgraders,
    minimumBuilders,
    minimumRepairers,
    minimumWallers
  ) {
    const gameSpawn = spawn;
    const mem = gameSpawn.memory;
    console.log('setting min harvesters to: ', minimumHarvesters);
    mem.minimumHarvesters = minimumHarvesters;
    console.log('setting min upgraders to: ', minimumUpgraders);
    mem.minimumUpgraders = minimumUpgraders;
    console.log('setting min builders to: ', minimumBuilders);
    mem.minimumBuilders = minimumBuilders;
    console.log('setting min repairers to: ', minimumRepairers);
    mem.minimumRepairers = minimumRepairers;
    console.log('setting min wallers to: ', minimumWallers);
    mem.minimumWallers = minimumWallers;
  },
};
