# Phaser 2D Tycoon Game
Simple Multiplayer 2D Game



## Idé
2D Hotel Manager,
- 2D Top Down
- Pixel Art
- 64 and 32 pixels ( Must use the same design style )




**OBS**
-------
```js
/// Node Packet Import on Frontend ( User Page )
const foo = require("foo")

/// Local File Import on Frontend ( User Page )
import { foo } from "./path/to/foo.js"


/**
 * - Must Use .js on local files
 * - Must have path to local file
 * - Must use import
 */


/// Foo.js
export myFunc(){
    console.log("FOO BOO")
}

/**
 * Must Use export in local file
 */
```



When Code don't start, run
```bash
npm install
```



### Connection
```bash
ws://<ip>:<port>

# Example
ws://192.168.0.1:8080
```



### Project Structure
Project consists of a monorepo, that is "more than one package in the same project".
This is not needed but good to learn because companies like Google, Facebook and more
use monorepos.

Therefore this project consists of:
- Utils : A Package for Application Functions like ```sleep(<ms>)``` and Configuration Managing.
- Components : Taken from Unity, I made a package for game components like ```UI``` or ```entities```

To start all of these components I use [Turborepo](https://turbo.build).
```bash
npm start # Runs Turbo

npm run build-dev # Runs Turbo pre-build for some packages.
```
