/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-11-29 14:21:56
 * @desc Harvester Role for a Creep. It will harvest Energy and put it into the Spawn.
 */

module.exports = {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * @param {any} spawn - Spawn Object
     * @param {any} name - Name of our Creep
     * 
     * @memberOf Upgrader
     */
    run: function (creep, spawn, name) {
        // the creep is fully packed
        if (creep.memory.idle && creep.carry.energy === creep.carryCapacity){
            creep.say('Harvested👍')
            creep.memory.idle = false;
        }
        // if the creep is empty or has not the idle memory yet
        else if (!creep.memory.idle && creep.carry.energy === 0){
            creep.say('Deposited👍')
            creep.memory.idle = true;
        }
        // if the creep is idle, we sent it to the next source that is still harvestable (ACTIVE)
        if (creep.memory.idle) {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE){
                creep.say('To work 🤮')
                creep.moveTo(target);
            }
        }
        // else we sent it back to the spawn to unload its energy
        else {
            if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                creep.say('To base 🚛')
                creep.moveTo(spawn);
            }
        }
    }
};
