/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:25:36
 * @modify date 2019-12-03 15:00:18
 * @desc Entry Script for our Colony.
 */
var _HARVESTER = require('role.harvester');
var _UPGRADER = require('role.upgrader');
var _BUILDER = require('role.builder');
var _REPAIRER = require('role.repairer');
var _WALLER = require('role.waller');
var _ROOM = require('controller.room');
var _SPAWN = require('controller.spawn');
var _TOWER = require('controller.tower');
// spawn new creeps
_SPAWN.spawn();
// remove dead creeps from memory
_SPAWN.remove();
// this will let all towers look out for hostile creeps
_TOWER.attackEnemies();
// loop that executes the working commands for our creeps per tick
for (const selectedCreep in Game.creeps) {
    if (Game.creeps.hasOwnProperty(selectedCreep)) {
        // our creep
        const creep = Game.creeps[selectedCreep];
        // decide the actions of our creep depending on its role memory
        let fn;
        let roomToBeIn = Game.spawns['Spawn1'].name;
        if (creep.memory.role === 'harvester') {
            fn - function() {_HARVESTER.run(creep)}
            _ROOM.checkRoom(creep, roomToBeIn, fn);
        } else if (creep.memory.role === 'upgrader') {
            fn - function() {_UPGRADER.run(creep)}
            _ROOM.checkRoom(creep, roomToBeIn, fn);
        } else if (creep.memory.role === 'builder') {
            fn - function() {_BUILDER.run(creep)}
            _ROOM.checkRoom(creep, roomToBeIn, fn);
        } else if (creep.memory.role === 'repairer') {
            fn - function() {_REPAIRER.run(creep)}
            _ROOM.checkRoom(creep, roomToBeIn, fn);
        } else if (creep.memory.role === 'waller') {
            fn - function() {_WALLER.run(creep)}
            _ROOM.checkRoom(creep, roomToBeIn, fn);
        }
    }
}
