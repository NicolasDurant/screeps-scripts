/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-12-02 18:07:51
 * @modify date 2019-12-04 10:10:27
 * @desc Controller that executes all the creep roles.
 */
var _HARVESTER = require('role.harvester');
var _UPGRADER = require('role.upgrader');
var _BUILDER = require('role.builder');
var _REPAIRER = require('role.repairer');
var _WALLER = require('role.waller');
var _ROOM = require('controller.room');
module.exports = {
    /**
     * Function that checks if screeps accidently are in the wrong room.
     */
    creepLogic: function (spawn) {
        var creepsInSpawnRoom = spawn.room.find(FIND_MY_CREEPS);
        // loop that executes the working commands for our creeps per tick
        for (const creep of creepsInSpawnRoom) {
            // decide the actions of our creep depending on its role memory
            let fn;
            let roomToBeIn = spawn.room.name;
            if (creep.memory.role === 'harvester') {
                fn = function() {_HARVESTER.run(creep)}
                _ROOM.checkRoom(creep, roomToBeIn, fn);
            } else if (creep.memory.role === 'upgrader') {
                fn = function() {_UPGRADER.run(creep)}
                _ROOM.checkRoom(creep, roomToBeIn, fn);
            } else if (creep.memory.role === 'builder') {
                fn = function() {_BUILDER.run(creep)}
                _ROOM.checkRoom(creep, roomToBeIn, fn);
            } else if (creep.memory.role === 'repairer') {
                fn = function() {_REPAIRER.run(creep)}
                _ROOM.checkRoom(creep, roomToBeIn, fn);
            } else if (creep.memory.role === 'waller') {
                fn = function() {_WALLER.run(creep)}
                _ROOM.checkRoom(creep, roomToBeIn, fn);
            }
        }
    },
};