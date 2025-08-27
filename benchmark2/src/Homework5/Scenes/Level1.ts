import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2";

export default class Level1 extends GameLevel {
    
    
    music:boolean = true;
    

    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "hw5_assets/tilemaps/level1_demo.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.image("tutorialBox", "hw5_assets/images/infoBox.png");
        // this.load.spritesheet("red", "hw5_assets/spritesheets/redBalloon.json");
        // this.load.spritesheet("blue", "hw5_assets/spritesheets/blueBalloon.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        
        //this.load.audio("level_music", "hw5_assets/music/level_music.wav");
    }

    unloadScene(){
        
    }

    startScene(): void {
        this.add.tilemap("level1", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(5*32, 14*32);
        this.planetName = "Current Location: Demo Planet";
        this.homeDistance = "238,855 Miles From Home";
        this.planetIntroName = "DEMO PLANET";
        //ALWAYS ADD THIS FOR EACH LEVEL
        this.currentLevel = 1;
        this.totalFlips = 10;

        // Do generic setup for a GameLevel
        super.startScene();

        this.addInfoBox("tutorialBox",0.2,0.2,100,450);
       
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}