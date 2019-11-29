import Harvester from './roles/harvester';
import Upgrader from './roles/upgrader';

module.exports.loop = function () {
    for (const selectedCreep in Game.creeps) {
        if (Game.creeps.hasOwnProperty(selectedCreep)) {
            // our creep
            const creep = Game.creeps[selectedCreep];
            // and its name
            const name = creep.name;
            console.log(`name of our creep: ${name}`);

            // decide the actions of our creep depending on its role memory
            if (creep.role === 'harvester') {
                Harvester.run(creep);
            } else if (creep.role === 'upgrader') {
                Upgrader.run(creep);
            }
        }
    }
}