/**
 * @author Nicolas Durant
 * @email nicolasdurant@t-online.de
 * @create date 2019-12-02 18:07:51
 * @modify date 2019-12-02 18:07:51
 * @desc Screeps that were close to the edge of the room could possibly push each other in the next room.
 */

module.exports = {
    /**
     * Function that checks if screeps accidently are in the wrong room.
     */
    checkRoom: function (creep, functionToExecute) {
        if (creep.room.name === 'E18S13'){
            creep.moveTo(Game.rooms['E19S13'])
        } else{
            functionToExecute()
        }
    },
};