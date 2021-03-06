/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:17:18
 * @modify date 2019-12-03 11:13:13
 * @desc Upgrader Role for a Creep. It will harvest Energy and put it into the Room Controller.
 */

module.exports =  {
    /**
     * The function that is defining the creeps behavior.
     * 
     * @param {any} creep - Creep Object
     * 
     * @memberOf Upgrader
     */
    run: function (creep){
        // room controller that we sent the upgrader to
        var roomController = creep.room.controller;
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
        // else we sent it to the room controller to transfer energy
        else {
            if (creep.upgradeController(roomController) === ERR_NOT_IN_RANGE){
                if (creep.memory.status != 'to_rcl'){
                    creep.say('To RCL 🚗 ')
                    creep.memory.status = `to_rcl`
                }
                creep.moveTo(roomController, {reusePath: 5});
            }
        }
    }
};