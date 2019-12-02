/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:25:36
 * @modify date 2019-12-02 15:27:57
 * @desc Entry Script for our Colony.
 */
var _HARVESTER = require('role.harvester');
var _UPGRADER = require('role.upgrader');
var _BUILDER = require('role.builder');
var _REPAIRER = require('role.repairer');
var _SPAWN = require('spawn');
// spawn new creeps
_SPAWN.spawn();
// remove dead creeps from memory
_SPAWN.remove();
// loop that executes the working commands for our creeps per tick
for (const selectedCreep in Game.creeps) {
    if (Game.creeps.hasOwnProperty(selectedCreep)) {
        // our creep
        const creep = Game.creeps[selectedCreep];
        // decide the actions of our creep depending on its role memory
        if (creep.memory.role === 'harvester') {
            _HARVESTER.run(creep);
        } else if (creep.memory.role === 'upgrader') {
            _UPGRADER.run(creep);
        } else if (creep.memory.role === 'builder') {
            _BUILDER.run(creep);
        } else if (creep.memory.role === 'repairer') {
            _REPAIRER.run(creep);
        }
    }
}
