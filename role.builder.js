/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-12-01 21:59:53
 * @modify date 2019-12-01 22:09:50
 * @desc Role for screeps that should build construction sites.
 */
var _UPGRADER = require('role.upgrader');
module.exports =  {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * 
     * @memberOf Upgrader
     */
    run: function (creep){
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
        // else we sent it to the next construction site to transfer energy
        else {
            const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite) {
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE && !moving){
                    if (status != 'to_build'){
                        creep.say('To Build 🔨')
                        status = `to_build`
                    }
                    creep.moveTo(constructionSite);
                    // the creep should only get the move command once or it might get stuck in the middle
                    moving = true;
                }
            }// if there are no more constructions to be build atm, we make the creep an upgrader
            else{
                _UPGRADER.run(creep);
            }
        }
    }
};
