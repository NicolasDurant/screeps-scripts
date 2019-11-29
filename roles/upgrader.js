/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:17:18
 * @modify date 2019-11-29 14:18:02
 * @desc Upgrader Role for a Creep. It will harvest Energy and put it into the Room Controller.
 */

module.exports =  {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * @param {any} spawn - Spawn Object
     * 
     * @memberOf Upgrader
     */
    run(creep, spawn){
        // room controller that we sent the upgrader to
        const roomController = creep.room.controller;
        // the creep is fully packed
        if (creep.memory.idle && creep.carry.energy === creep.carryCapacity){
            console.log(`${name} finished harvesting`);
            creep.memory.idle = false;
        }
        // if the creep is empty or has not the idle memory yet
        else if (!creep.memory.idle && creep.carry.energy === 0){
            console.log(`${name} finished depositing`);
            creep.memory.idle = true;
        }
        // if the creep is idle, we sent it to the next source that is still harvestable (ACTIVE)
        if (creep.memory.idle) {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to work`);
                creep.moveTo(target);
            }
        }
        // else we sent it to the room controller to transfer energy
        else {
            if (creep.upgradeController(roomController) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to the room controller`);
                creep.moveTo(roomController);
            }
            if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to spawn`);
                creep.moveTo(spawn);
            }
        }
    }
};
