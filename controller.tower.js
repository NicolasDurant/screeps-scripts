/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-12-02 18:07:51
 * @modify date 2019-12-02 18:07:51
 * @desc This module contains all the functionality to control the towers we built.
 */

module.exports = {
    /**
     * Function that checks if there is any enemy in our room to shoot at it.
     */
    attackEnemies: function (spawn) {
        const towers = Game.spawns[spawn].room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType === STRUCTURE_TOWER
            }
        });
        for (const tower of towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) tower.attack(target);
        }
    },
};