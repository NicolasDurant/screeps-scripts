/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:25:36
 * @modify date 2019-11-29 14:35:15
 * @desc Entry Script for our Colony.
 */
var _HARVESTER = require('role.harvester');
var _UPGRADER = require('role.upgrader');

// The spawn object is static for now.
const gameSpawn = Game.spawns['Spawn1']
/**
 * The loop that gets executed on every game tick.
 * 
 * The speed of a tick depends on the server.
 * 
 */
module.exports.loop = function () {
    // number of harvesters before we add other creeps
    const minimumHarvesters = 10;
    // current number of harvesters
    var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester')
    // loop that executes the working commands for our creeps per tick
    for (const selectedCreep in Game.creeps) {
        if (Game.creeps.hasOwnProperty(selectedCreep)) {
            // our creep
            const creep = Game.creeps[selectedCreep];
            // and its name
            const name = creep.name;
            console.log(`name of our creep: ${name} its role is ${creep.memory.role}`);
            // decide the actions of our creep depending on its role memory
            if (creep.memory.role === 'harvester') {
                _HARVESTER.run(creep, gameSpawn, name);
            } else if (creep.memory.role === 'upgrader') {
                _UPGRADER.run(creep, gameSpawn, name);
            }
        }
    }
    // when we are under our minimum harvester count, we first generate more harvesters
    var newCreep = undefined;
    console.log(`Number of Harvesters: ${numOfHarvesters}`)
    if (numOfHarvesters < minimumHarvesters) {
        var newName = 'harvester' + Game.time;
        newCreep = gameSpawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: `harvester` , idle : true}});
    } else {
        var newName = 'upgrader' + Game.time;
        newCreep = gameSpawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: `upgrader` , idle : true}});
    }
    if (!(newCreep < 0)) {
        console.log(`!!!We spawned a new Creep: ${newName}!!!`)
    }
    // check if we can remove dead creeps from the memory
    for (const memoryCreeps in Memory.creeps) {
        if (Memory.creeps.hasOwnProperty(memoryCreeps)) {
            const element = Memory.creeps[memoryCreeps];
            if (Game.creeps[element] == undefined){
                delete element
            }
        }
    }
}