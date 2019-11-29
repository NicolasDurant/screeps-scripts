const gameSpawn = Game.spawns['Spawn1']
export default class Upgrader {
    run(creep){
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
        // else we sent it back to the spawn to unload its energy
        else {
            if (creep.transfer(gameSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to spawn`);
                creep.moveTo(gameSpawn);
            }
        }
    }
};
