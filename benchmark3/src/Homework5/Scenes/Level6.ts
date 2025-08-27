import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";

export default class Level6 extends GameLevel {
    loadScene(): void {

        // CHANGE TO LEVEL 6 TILEMAP
        this.load.tilemap("level6", "hw5_assets/tilemaps/level6.json"); 
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        //this.load.image("tutorialBox", "hw5_assets/images/infoBox2.png");
        
        // this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        // this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        
        this.load.audio("level_music", "hw5_assets/music/level6.wav");
    }

    unloadScene() {
        
    }

    startScene(): void {
        // ADD THE LEVEL 6 TILEMAP
        this.add.tilemap("level6", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(2*32, 5*32);
        this.planetName = "Current Location: Anmut"; //ADD NAME
        
        this.homeDistance = "59,117 Miles From Home"; //CHANGE TO SOME OTHER NUMBER
        this.planetIntroName = "Anmut"; //ADD NAME

        this.thisLevel = Level6;

        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;
        
        this.totalFlips = 10; //CHANGE TO WHAT WE NEED FOR THIS LEVEL

        // Do generic setup for a GameLevel
        super.startScene();
        //this.planetNameLabel.positionX = 90; //CHANGE TO WHAT WE NEED SO IT FITS
        
        
        
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}