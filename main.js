/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-11-29 14:25:36
 * @modify date 2019-12-04 10:10:01
 * @desc Entry Script for our Colony.
 */
var _SPAWN = require('controller.spawn');
var _TOWER = require('controller.tower');
var _ROLES = require('controller.roles');

var gameTime = Game.time / 25;
for (const spawns in Game.spawns) {
  if (Game.spawns.hasOwnProperty(spawns)) {
    const element = Game.spawns[spawns];
    // this checks if the game time divided by 25 is not a float -> every 25th tick we try to spawn a creep (ALL HAIL CPU)
    if (
      !(+gameTime === gameTime && (!isFinite(gameTime) || !!(gameTime % 1)))
    ) {
      // spawn new creeps
      _SPAWN.spawn(element);
      // remove dead creeps from memory
      _SPAWN.remove();
    }
    // this will let all towers look out for hostile creeps
    _TOWER.attackEnemies(element);
    // loop that executes the working commands for our creeps per tick
    _ROLES.creepLogic(element);
  }
}
