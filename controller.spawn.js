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
        const creepsInSpawnRoom = spawn.room.find(FIND_MY_CREEPS);
        const containerInSpawnRoom = spawn.room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType === STRUCTURE_CONTAINER
            }
        });
        const gameSpawn = spawn;
        const mem = gameSpawn.memory
        // initialising spawn specific memory if there's none
        if (!mem.minimumUpgraders) mem.minimumUpgraders = 1;
        if (!mem.minimumRepairers) mem.minimumRepairers = 1;
        if (!mem.minimumHarvesters) mem.minimumHarvesters = 5;
        if (!mem.minimumBuilders) mem.minimumBuilders = 2;
        if (!mem.minimumWallers) mem.minimumWallers = 0;
        if (!mem.resourceIDs) {
            let array = spawn.room.find(FIND_SOURCES);
            let resourceIds = ``;
            array.forEach(element => {
                resourceIds += `${element.id},`
            });
            mem.resourceIDs = resourceIds;
            mem.resourceCount = array.length;
        }
        // toggle dropMining to active when we have the same amount of containers as resources available in room
        if (containerInSpawnRoom.length === mem.resourceCount){
            mem.dropMining = true;
            mem.minimumMiners = mem.resourceCount;
            mem.minimumLorries = mem.resourceCount;
            if (mem.iterationMiner === mem.resourceCount) mem.iterationMiner = 0;
            if (mem.iterationLorry === mem.resourceCount) mem.iterationLorry = 0;
            mem.minimumHarvesters = 0;
        } else { 
            mem.dropMining = false 
            mem.minimumMiners = 0;
            mem.minimumLorries = 0;
            mem.minimumHarvesters = resourceCount;
        }
        if (!mem.iterationMiner) mem.iterationMiner = 0;
        if (!mem.iterationLorry) mem.iterationLorry = 0;
        // current numbers of a specific role
        var numOfUpgraders = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'upgrader')
        var numOfHarvesters = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'harvester')
        var numOfBuilders = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'builder')
        var numOfRepairers = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'repairer')
        var numOfWallers = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'waller')
        var numOfMiners = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'miner')
        var numOfLorries = _.sum(creepsInSpawnRoom, (c) => c.memory.role === 'lorry')


        // when we are under our minimum harvester count, we first generate more harvesters
        var newCreep = undefined;
        // maximum energy capacity 1/2 -> we spawn a creep when all containers are half filled
        var energy = gameSpawn.room.energyCapacityAvailable * 1/2;
        // array of energy sources
        let arrayIDs = this.getArrayOfStringSeperated(spawn.memory.resourceIDs);
        // spawn role specific creeps
        if (numOfHarvesters < mem.minimumHarvesters) {
            newCreep = gameSpawn.createHarvesterCreep(energy, `harvester`);
            if (newCreep == ERR_NOT_ENOUGH_ENERGY && numOfHarvesters == 0) {
                // spawn one with the minimum energy
                newCreep = gameSpawn.createEqualCreep(200, gameSpawn, `harvester`, `to_base`);
                }
        } else if (numOfUpgraders < mem.minimumUpgraders) {
            newCreep = gameSpawn.createCarrierCreep(energy, gameSpawn, `upgrader`, `to_rcl`);
        } else if (numOfRepairers < mem.minimumRepairers) {
            newCreep = gameSpawn.createFastCreep(energy, gameSpawn, `repairer`, `to_repair`);
        } else if (numOfBuilders < mem.minimumBuilders) {
            newCreep = gameSpawn.createFastCreep(energy, gameSpawn, `builder`, `to_build`);
        } else if (numOfWallers < mem.minimumWallers) {
            newCreep = gameSpawn.createFastCreep(energy, gameSpawn, `waller`, `to_wall`);
        } else if (numOfMiners < mem.minimumMiners) {
            let target = arrayIDs[iterationMiner]
            newCreep = gameSpawn.createMinerCreep(gameSpawn, target);
            if (!(newCreep < 0)) mem.iterationMiner ++;
        } else if (numOfLorries < mem.minimumLorries) {
            let target = arrayIDs[iterationLorry]
            newCreep = gameSpawn.createLorryCreep(energy, gameSpawn, target);
            if (!(newCreep < 0)) mem.iterationLorry ++;
        }
        // defaulting to builders because they behave as upgraders when there is nothing to build
        else {
            newCreep = gameSpawn.createFastCreep(energy, gameSpawn, `builder`, `to_build`);
        }
        if (!(newCreep < 0)) {
            console.log('🍾🍾🍾 We are spawning a new Creep 🍾🍾🍾')
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
    },

    /**
     * We can pass the minimums of each role to this function to be saved in the spawn memory.
     *
     * @param {*} spawn - requires the spwan to be passed, where the mems need to be set
     * @param {*} minimumHarvesters
     * @param {*} minimumUpgraders
     * @param {*} minimumBuilders
     * @param {*} minimumRepairers
     * @param {*} minimumWallers
     * @param {*} minimumMiners
     * @param {*} minimumLorries
     */
    setSpawnMemory: function (spawn, minimumHarvesters, minimumUpgraders, minimumBuilders, minimumRepairers, minimumWallers, minimumMiners, minimumLorries) {
        const gameSpawn = spawn;
        const mem = gameSpawn.memory;
        console.log('setting min harvesters to: ', minimumHarvesters)
        mem.minimumHarvesters = minimumHarvesters;
        console.log('setting min upgraders to: ', minimumUpgraders)
        mem.minimumUpgraders = minimumUpgraders;
        console.log('setting min builders to: ', minimumBuilders)
        mem.minimumBuilders = minimumBuilders;
        console.log('setting min repairers to: ', minimumRepairers)
        mem.minimumRepairers = minimumRepairers;
        console.log('setting min wallers to: ', minimumWallers)
        mem.minimumWallers = minimumWallers;
        console.log('setting min miners to: ', minimumMiners)
        mem.minimumMiners = minimumMiners;
        console.log('setting min lorries to: ', minimumLorries)
        mem.minimumLorries = minimumLorries;
    },

    /**
     * Helper function to split the comma seperated source ids and put them into an array
     *
     * @param {*} string - basically every comma seperated string
     * @returns an array of those strings
     */
    getArrayOfStringSeperated: function(string){
        let arrayIDs = string.split(',');
        arrayIDs.pop();
        return arrayIDs;
    },
};