# Screeps Scripts
This is my repository for the game [Screeps](https://www.screeps.com).

A documentation can be found [here](https://docs.screeps.com/) and its related API [here](https://docs.screeps.com/api/).

## Gitflow
It only makes sense to push the changes directly to the `master` branch, that is, because the local project files that screeps  generate, will only get overwritten when changes happen to the master. Notice that every local files will get overwritten as well when commits get pushed to the master. So either copy changes beforehand or work in the repo directly.

## Project Setup with VS Code
To make VS Code work with ScreepsAutocomplete to enjoy auto-completion functionality with the Screeps API the following Steps are necessary:

* Downloading https://github.com/screepers/Screeps-Typescript-Declarations
* Copying the file from `dist/screeps.d.ts` into our root level
* Installing https://github.com/typings/typings globally with `npm install typings --global`
* Downloading https://github.com/Garethp/ScreepsAutocomplete
* Extracting it into the project folder (location shouldn't matter)
* Creating a `jsconfig.json` on root level with
`{ "compilerOptions": { "target": "ES6" }, "exclude": [ "node_modules" ] }`
* Creating a `_references.js` in the ScreepsAutocomplete folder and filling it with this info:
```javascript
/// <reference path="ConstructionSite.js" />
/// <reference path="Creep.js" />
/// <reference path="Flag.js" />
/// <reference path="Game.js" />
/// <reference path="Memory.js" />
/// <reference path="Mineral.js" />
/// <reference path="Nuke.js" />
/// <reference path="Order.js" />
/// <reference path="OwnedStructure.js" />
/// <reference path="PathFinder.js" />
/// <reference path="RawMemory.js" />
/// <reference path="Resource.js" />
/// <reference path="Room.js" />
/// <reference path="RoomObject.js" />
/// <reference path="RoomPosition.js" />
/// <reference path="Source.js" />
/// <reference path="Structure.js" />
/// <reference path="Structures/StructureContainer.js" />
/// <reference path="Structures/StructureController.js" />
/// <reference path="Structures/StructureExtension.js" />
/// <reference path="Structures/StructureExtractor.js" />
/// <reference path="Structures/StructureKeeperLair.js" />
/// <reference path="Structures/StructureLab.js" />
/// <reference path="Structures/StructureLink.js" />
/// <reference path="Structures/StructureNuker.js" />
/// <reference path="Structures/StructureObserver.js" />
/// <reference path="Structures/StructurePortal.js" />
/// <reference path="Structures/StructurePowerBank.js" />
/// <reference path="Structures/StructurePowerSpawn.js" />
/// <reference path="Structures/StructureRampart.js" />
/// <reference path="Structures/StructureRoad.js" />
/// <reference path="Structures/StructureSpawn.js" />
/// <reference path="Structures/StructureStorage.js" />
/// <reference path="Structures/StructureTerminal.js" />
/// <reference path="Structures/StructureTower.js" />
/// <reference path="Structures/StructureWall.js" />
/// <reference path="Global/Constants.js" />
```
### License

screeps-scripts is [MIT licensed](./LICENSE).
