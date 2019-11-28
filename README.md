"# screeps-scripts" 

To make VS Code to work with ScreepsAutocomplete the following Steps are necessary:

1. Downloading https://github.com/Garethp/ScreepsAutocomplete
2. Putting it into the project folder
3. Creating a jsconfig.json on root level like in this project
4. Creating a _references.js in the ScreepsAutocomplete folder and filling it with the same information as in this ScreepsAutocomplete/_references.js
5. Downloading https://github.com/screepers/Screeps-Typescript-Declarations
6. Copying the file from dist/screeps.d.ts into our root level
7. Installing https://github.com/typings/typings globally with npm install typings --global