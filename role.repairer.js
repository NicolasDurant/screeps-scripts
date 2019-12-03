/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-12-03 11:13:11
 * @desc Repairer Role for a Creep. It will harvest Energy and put it into decaying structures.
 */
var _BUILDER = require('role.builder');
module.exports = {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * 
     * @memberOf Upgrader
     */
    run: function (creep) {
        // the creep is fully packed
        if (creep.memory.idle && creep.store.getUsedCapacity() === creep.store.getCapacity()){
            creep.say('Harvested👍')
            creep.memory.idle = false;
        }
        // if the creep is empty or has not the idle memory yet
        else if (!creep.memory.idle && creep.store.getUsedCapacity() === 0){
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
        // else we sent it to repair decaying structures
        else {
            const structures = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                }
            });
            if (structures) {
                structures.sort((a,b) => {
                    return a.hits - b.hits
                })
                if (creep.repair(structures[0]) === ERR_NOT_IN_RANGE){
                    if (creep.memory.status != 'to_repair'){
                        creep.say('To repair 🔄')
                        creep.memory.status = `to_repair`
                    }
                    creep.moveTo(structures[0], {reusePath: 5});
                }
            }// if there are no more constructions to be build atm, we make the creep an upgrader
            else{
                _BUILDER.run(creep);
            }
        }
    }
};