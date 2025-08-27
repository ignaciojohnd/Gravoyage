import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";

export default class Level2 extends GameLevel {
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level2", "hw5_assets/tilemaps/level2.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.image("tutorialBox", "hw5_assets/images/infoBox2.png");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("gravity_flip", "hw5_assets/sounds/gravity_flip.wav");
        this.load.audio("level_complete", "hw5_assets/sounds/level_complete.wav");
        this.load.audio("out_of_flips", "hw5_assets/sounds/out_of_flips.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("traveling_to_next_planet", "hw5_assets/sounds/traveling_to_next_planet.wav");
        this.load.audio("level_music", "hw5_assets/music/level2.wav");
    }

    unloadScene() {
        
    }

    startScene(): void {
        // Add the level 2 tilemap
        this.add.tilemap("level2", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 24*32, 20*32);

        this.playerSpawn = new Vec2(2*32, 5*32);
        this.planetName = "Current Location: Frosterra";
        
        this.homeDistance = "200,155 Miles From Home";
        this.planetIntroName = "FROSTERRA";

        this.thisLevel = Level2;
        this.nextLevel = Level3;

        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;
        
        this.totalFlips = 15;

        super.startScene();
        this.planetIntroLabel.backgroundColor = new Color(107, 138, 240,0.8);
        this.planetIntroLabel.borderColor = Color.WHITE;
        this.planetNameLabel.positionX = 90;
        
        this.addInfoBox("tutorialBox",0.2,0.2,420,50);
        
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}