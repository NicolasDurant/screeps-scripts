/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-12-03 11:13:15
 * @desc Harvester Role for a Creep. It will harvest Energy and put it into the closest empty energy store.
 */

module.exports = {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * @param {any} spawn - Spawn Object
     * 
     * @memberOf Upgrader
     */
    run: function (creep) {
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
                if (creep.memory.status != 'to_work'){
                    creep.say('To work 🤮')
                    creep.memory.status = `to_work`
                }
                creep.moveTo(target, {reusePath: 5});
            }
        }
        // else we sent it to the closest not filled energy store to unload its energy
        else {
            const towers = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => {
                    return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity
                }
            });
            const structures = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_EXTENSION 
                        || s.structureType == STRUCTURE_SPAWN) 
                        && s.energy < s.energyCapacity
                }
            });
            if (towers) {
                if (creep.transfer(towers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    if (creep.memory.status != 'to_tower'){
                        creep.say('To tower 🗼')
                        creep.memory.status = `to_tower`
                    }
                    creep.moveTo(towers, {reusePath: 5});
                }
            }
            if (structures && !towers) {
                if (creep.transfer(structures, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    if (creep.memory.status != 'to_store'){
                        creep.say('To store 🚛')
                        creep.memory.status = `to_store`
                    }
                    creep.moveTo(structures, {reusePath: 5});
                }
            }// there should always be somewhere to store
            else{}
        }
    }
};