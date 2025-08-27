import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level5 from "./Level5";
import Level6 from "./Level6";

export default class Level4 extends GameLevel {
    loadScene(): void {

        this.load.tilemap("level4", "hw5_assets/tilemaps/level4.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.spritesheet("electric_bird", "hw5_assets/spritesheets/electricBird.json");
        this.load.image("tutorialBox", "hw5_assets/images/infoBox3.png");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("gravity_flip", "hw5_assets/sounds/gravity_flip.wav");
        this.load.audio("level_complete", "hw5_assets/sounds/level_complete.wav");
        this.load.audio("out_of_flips", "hw5_assets/sounds/out_of_flips.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("traveling_to_next_planet", "hw5_assets/sounds/traveling_to_next_planet.wav");
        this.load.audio("level_music", "hw5_assets/music/level4.wav");
    }

    unloadScene() {
        
    }

    startScene(): void {
        // ADD THE LEVEL 4 TILEMAP
        this.add.tilemap("level4", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 25*32, 20*32);

        this.playerSpawn = new Vec2(2*32, 3*32);
        this.planetName = "Current Location: Simerra"; //ADD NAME
        
        this.homeDistance = "101,977 Miles From Home"; //CHANGE TO SOME OTHER NUMBER
        this.planetIntroName = "Simerra"; //ADD NAME

        this.thisLevel = Level4;
        this.nextLevel = Level5;
        
        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;
        
        this.totalFlips = 18; //CHANGE TO WHAT WE NEED FOR THIS LEVEL

        // Do generic setup for a GameLevel
        super.startScene();
        this.planetIntroLabel.backgroundColor = new Color(222, 227, 23,0.8);
        this.planetIntroLabel.borderColor = Color.WHITE;
        this.planetNameLabel.positionX = 90; //CHANGE TO WHAT WE NEED SO IT FITS
        
        this.addInfoBox("tutorialBox",0.2,0.2,50,250);

        this.addEnemy("electric_bird", new Vec2(16, 2), "floating");
       
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}