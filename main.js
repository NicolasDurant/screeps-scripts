const gameSpawn = Game.spawns['Spawn1']
for (const selectedCreep in Game.creeps) {
    if (Game.creeps.hasOwnProperty(selectedCreep)) {
        const creep = Game.creeps[selectedCreep];
        const name = creep.name;
        console.log(`name of our creep: ${name}`);

        if (creep.memory.idle && creep.carry.energy === creep.carryCapacity){
            console.log(`${name} finished harvesting`);
            creep.memory.idle = false;
        } else if (!creep.memory.idle && creep.carry.energy === 0){
            console.log(`${name} finished depositing`);
            creep.memory.idle = true;
        }
        if (creep.memory.idle) {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to work`);
                creep.moveTo(target);
            }
        } else {
            if (creep.transfer(gameSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                console.log(`sending ${name} to spawn`);
                creep.moveTo(gameSpawn);
            }
        }
        
    }
}