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
    spawn: function () {
        // The spawn object is static for now.
        const gameSpawn = Game.spawns['Spawn1']
        // number of harvesters before we add other creeps
        const minimumUpgrader = 1;
        // number of harvesters before we add other creeps
        const minimumRepairer = 2;
        // number of harvesters before we add other creeps
        const minimumHarvesters = 10;
        // number of builders before we add other creeps
        const minimumBuilders = 3;
        // current number of harvesters
        var numOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader')
        // current number of harvesters
        var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester')
        // current number of builders
        var numOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === 'builder')
        // current number of repairers
        var numOfRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer')
        // when we are under our minimum harvester count, we first generate more harvesters
        var newCreep = undefined;
        // maximum energy capacity 1/2 -> we spawn a creep when all containers are half filled
        var energy = Game.spawns.Spawn1.room.energyCapacityAvailable / 2;
        if (numOfHarvesters < minimumHarvesters) {
            newCreep = gameSpawn.createCustomCreep(energy, `harvester`, `to_base`);
            if (newCreep == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                // spawn one with the minimum energy
                newCreep = gameSpawn.createCustomCreep(200, `harvester`, `to_base`);
                }
        } else if (numOfUpgraders < minimumUpgrader) {
            newCreep = gameSpawn.createCustomCreep(energy, `upgrader`, `to_rcl`);
        } else if (numOfBuilders < minimumBuilders) {
            newCreep = gameSpawn.createCustomCreep(energy, `builder`, `to_build`);
        } else if (numOfRepairers < minimumRepairer) {
            newCreep = gameSpawn.createCustomCreep(energy, `repairer`, `to_repair`);
        }// defaulting to builders because they behave as upgraders when there is nothing to build 
        else {
            newCreep = gameSpawn.createCustomCreep(energy, `builder`, `to_build`);
        }
        if (!(newCreep < 0)) {
            console.log('🍾🍾🍾 We spawned a new Creep 🍾🍾🍾')
        }
    },

    /**
     * This function removes dead creeps from the memory.
     *
     */
    remove: function () {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
};