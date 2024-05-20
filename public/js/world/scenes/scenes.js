const Phaser = require("phaser")



export class BaseScene extends Phaser.Scene {
    loadTextureSet = (set) => {
        for(var x in set){
            console.log(set)
        }
    }
}
