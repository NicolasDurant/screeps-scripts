/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-12-02 18:25:08
 * @desc Waller Role for a Creep. It will harvest Energy and put it into walls.
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
            const target = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE){
                if (creep.memory.status != 'to_work'){
                    creep.say('To work 🤮')
                    creep.memory.status = `to_work`
                }
                creep.moveTo(target);
            }
        }
        // else we sent it to repair walls
        else {
            const walls = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => {
                    return s.hits < 5000 && s.structureType === STRUCTURE_WALL
                }
            });
            // we want to heal the walls with lowest hitpoints first
            if (walls) {
                if (creep.repair(walls) === ERR_NOT_IN_RANGE){
                    if (creep.memory.status != 'to_wall'){
                        creep.say('To wall 🧱')
                        creep.memory.status = `to_wall`
                    }
                    creep.moveTo(walls, {reusePath: 5});
                }
            }// if there are no more walls to be repaired atm, we make the creep a builder
            else{
                _BUILDER.run(creep);
            }
        }
    }
};