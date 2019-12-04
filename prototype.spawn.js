module.exports = function() {
    // create a new function for StructureSpawn that equally divides the body parts
    StructureSpawn.prototype.createEqualCreep =
        function(energy, roleName, status) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, roleName + Game.time, {memory: {role: roleName, idle: true, status: status }});
        };
        // create a new function for StructureSpawn that creates 2:1 carry/move to work body parts
        StructureSpawn.prototype.createFastCreep =
        function(energy, roleName, status) {
            // create a more speed focused body
            var numberOfParts = Math.floor(energy / 300);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, roleName + Game.time, {memory: {role: roleName, idle: true, status: status }});
        };
        // create a new function for StructureSpawn that creates 3:1:1 carry:move:work body parts
        StructureSpawn.prototype.createCarrierCreep =
        function(energy, roleName, status) {
            // create a carry focused creep
            var numberOfParts = Math.floor(energy / 300);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
                body.push(CARRY);
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, roleName + Game.time, {memory: {role: roleName, idle: true, status: status }});
        };
        // create a new function for StructureSpawn that creates 2:1:1 work:carry:move body parts
        StructureSpawn.prototype.createHarvesterCreep =
        function(energy, roleName, status) {
            // create a carry focused creep
            var numberOfParts = Math.floor(energy / 400);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
                body.push(WORK);
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, roleName + Game.time, {memory: {role: roleName, idle: true, status: status }});
        };

        // create a new function for StructureSpawn that creates a miner that sits on a container
        StructureSpawn.prototype.createMinerCreep =
        function(status) {
            // create a miner, it needs no carry part
            var body = [WORK, WORK, WORK, WORK, WORK, MOVE];
            // create creep with the created body and the given role
            return this.spawnCreep(body, `Miner` + Game.time, {memory: {role: roleName, idle: true, status: status }});
        };
};