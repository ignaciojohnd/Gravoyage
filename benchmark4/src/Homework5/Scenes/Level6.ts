import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Color } from "../hw5_color";
import EndScreen from "./EndScreen";
import GameLevel from "./GameLevel";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";

export default class Level6 extends GameLevel {
    loadScene(): void {

        this.load.tilemap("level6", "hw5_assets/tilemaps/level6.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.spritesheet("poison_bird", "hw5_assets/spritesheets/poisonBird.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("gravity_flip", "hw5_assets/sounds/gravity_flip.wav");
        this.load.audio("level_complete", "hw5_assets/sounds/level_complete.wav");
        this.load.audio("out_of_flips", "hw5_assets/sounds/out_of_flips.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("traveling_to_next_planet", "hw5_assets/sounds/traveling_to_next_planet.wav");
        this.load.audio("level_music", "hw5_assets/music/level6.wav");
    }

    unloadScene() {
        
    }

    startScene(): void {
        // ADD THE LEVEL 6 TILEMAP
        this.add.tilemap("level6", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(2*32, 12*32);
        this.planetName = "Current Location: Merecai"; //ADD NAME
        
        this.homeDistance = "20,187 Miles From Home"; //CHANGE TO SOME OTHER NUMBER
        this.planetIntroName = "Merecai"; //ADD NAME

        this.thisLevel = Level6;
        

        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;
        
        this.totalFlips = 20; //CHANGE TO WHAT WE NEED FOR THIS LEVEL

        // Do generic setup for a GameLevel
        super.startScene();
        this.planetIntroLabel.backgroundColor = new Color(207, 136, 40,0.8);
        this.planetIntroLabel.borderColor = Color.WHITE;
        //this.planetNameLabel.positionX = 90; //CHANGE TO WHAT WE NEED SO IT FITS
        
        this.addEnemy("poison_bird", new Vec2(13.5, 12), "floating");
        this.addEnemy("poison_bird", new Vec2(19, 10), "flying");
        this.addEnemy("poison_bird", new Vec2(15, 3), "floating");
        this.addEnemy("poison_bird", new Vec2(19, 3), "flying");
        this.addEnemy("poison_bird", new Vec2(3, 4), "flying");
        this.addEnemy("poison_bird", new Vec2(4, 4), "floating");
        
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}