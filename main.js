// Screeps-Colony
// by Whimsickal
// -------------
const Phases = require('./phases');
const Room = require('./rooms');
const Spawner = require('./struct-spawner');
const Harvester = require('./role.harvester');
const Upgrader = require('./role.upgrader');
const Builder = require('./role.builder');

module.exports.loop = function() {
    for(name in Memory.creeps) {
        let creep = Game.creeps[name];
        if(!creep) {
            delete Memory.creeps[name];
        }
    }

    for(name in Game.rooms) {
        let room = Game.rooms[name];

        Room.initRoomMemory(room);
        Phases.checkPhaseNo(room);

        let structures = room.find(FIND_MY_STRUCTURES).filter(s => {
            if(s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER) {
                return s;
            }
        })

        for(name in structures) {
            let s = structures[name];
            if(s.structureType == STRUCTURE_SPAWN) {
                Spawner.run(s);
            }
            else if(s.structureType == STRUCTURE_TOWER) {
                // RUN TOWER CODE HERE
                ;
            }
        }
    }

    for(name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == Harvester.roleName) {
            Harvester.run(creep);
        }
        else if(creep.memory.role == Upgrader.roleName) {
            Upgrader.run(creep);
        }
        else if(creep.memory.role == Builder.roleName) {
            Builder.run(creep);
        }
    }
};
