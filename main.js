const gameSpawn = Game.spawns['Spawn1']
for (const creep in Game.creeps) {
    if (Game.creeps.hasOwnProperty(creep)) {
        const creep = Game.creeps[creep];
        const name = creep.name;
        console.log('name of our creep:', name);

        if (creep.memory.idle && creep.carry.energy === creep.carryCapacity){
            creep.memory.idle = false;
        } else if (!creep.memory.idle && creep.carry.energy === 0){
            creep.memory.idle = true;
        }
        if (creep.memory.idle) {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        } else {
            if ( creep.transfer(gameSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                creep.moveTo(gameSpawn);
            }
        }
        
    }
}