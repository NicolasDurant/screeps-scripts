/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:18:41
 * @modify date 2019-12-01 22:09:37
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
        // shorthand variables for creep memory
        var moving = creep.memory.moving;
        var idle = creep.memory.idle;
        var status = creep.memory.status;
        // the creep is fully packed
        if (idle && creep.carry.energy === creep.carryCapacity){
            creep.say('Harvested👍')
            idle = false;
            moving = false;
        }
        // if the creep is empty or has not the idle memory yet
        else if (!idle && creep.carry.energy === 0){
            creep.say('Deposited👍')
            idle = true;
            moving = false;
        }
        // if the creep is idle, we sent it to the next source that is still harvestable (ACTIVE)
        if (idle) {
            const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE && !moving){
                if (status != 'to_work'){
                    creep.say('To work 🤮')
                    status = `to_work`
                }
                creep.moveTo(target);
                // the creep should only get the move command once or it might get stuck in the middle
                moving = true;
            }
        }
        // else we sent it to repair decaying structures
        else {
            const structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => {
                    return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                }
            });
            if (structures && !moving) {
                if (creep.repair(structures) === ERR_NOT_IN_RANGE){
                    if (status != 'to_repair'){
                        creep.say('To repair 🔄')
                        status = `to_repair`
                    }
                    creep.moveTo(structures);
                    // the creep should only get the move command once or it might get stuck in the middle
                    moving = true;
                }
            }// if there are no more constructions to be build atm, we make the creep an upgrader
            else{
                _BUILDER.run(creep);
            }
        }
    }
};
