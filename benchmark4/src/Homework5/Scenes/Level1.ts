import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import GameLevel from "./GameLevel";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";

export default class Level1 extends GameLevel {
    
    
    music:boolean = true;
    

    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "hw5_assets/tilemaps/level1.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.image("tutorialBox", "hw5_assets/images/infoBox.png");
        //this.load.spritesheet("water_bird", "hw5_assets/spritesheets/waterBird.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("gravity_flip", "hw5_assets/sounds/gravity_flip.wav");
        this.load.audio("level_complete", "hw5_assets/sounds/level_complete.wav");
        this.load.audio("out_of_flips", "hw5_assets/sounds/out_of_flips.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("traveling_to_next_planet", "hw5_assets/sounds/traveling_to_next_planet.wav");
        this.load.audio("level_music", "hw5_assets/music/level1.wav");
    }

    unloadScene(){
        
    }

    startScene(): void {
        this.add.tilemap("level1", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(5*32, 14*32);
        this.planetName = "Current Location: Cathonis";
        this.homeDistance = "238,855 Miles From Home";
        this.planetIntroName = "Cathonis";

        
        //ALWAYS ADD THIS FOR EACH LEVEL
        this.thisLevel = Level1;
        this.nextLevel = Level2;

        
        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;

        this.totalFlips = 10;

        
        // Do generic setup for a GameLevel
        super.startScene();
        this.planetIntroLabel.backgroundColor = new Color(135, 84, 93,0.8);
        this.planetIntroLabel.borderColor = Color.WHITE;
        this.planetNameLabel.positionX = 90;
        this.addInfoBox("tutorialBox",0.2,0.2,150,450);

        // this.addEnemy("water_bird", new Vec2(12, 17), "flying");
        // this.addEnemy("water_bird", new Vec2(20, 12), "floating");
       
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);

        
    }
}