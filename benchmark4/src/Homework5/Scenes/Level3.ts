import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Color } from "../hw5_color";
import GameLevel from "./GameLevel";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";

export default class Level3 extends GameLevel {
    loadScene(): void {

        this.load.tilemap("level3", "hw5_assets/tilemaps/level3.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/julliet.json");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.spritesheet("water_bird", "hw5_assets/spritesheets/waterBird.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("gravity_flip", "hw5_assets/sounds/gravity_flip.wav");
        this.load.audio("level_complete", "hw5_assets/sounds/level_complete.wav");
        this.load.audio("out_of_flips", "hw5_assets/sounds/out_of_flips.wav");
        this.load.audio("player_death", "hw5_assets/sounds/player_death.wav");
        this.load.audio("traveling_to_next_planet", "hw5_assets/sounds/traveling_to_next_planet.wav");
        this.load.audio("level_music", "hw5_assets/music/level3.wav");
    }

    unloadScene() {
        
    }

    startScene(): void {
        // ADD THE LEVEL 3 TILEMAP
        this.add.tilemap("level3", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 25*32, 20*32);

        this.playerSpawn = new Vec2(2*32, 15*32);
        this.planetName = "Current Location: Laocoon"; //ADD NAME
        
        this.homeDistance = "145,325 Miles From Home"; //CHANGE TO SOME OTHER NUMBER
        this.planetIntroName = "Laocoon"; //ADD NAME

        this.thisLevel = Level3;
        this.nextLevel = Level4;

        this.cheat1 = Level1;
        this.cheat2 = Level2;
        this.cheat3 = Level3;
        this.cheat4 = Level4;
        this.cheat5 = Level5;
        this.cheat6 = Level6;
        
        this.totalFlips = 10; //CHANGE TO WHAT WE NEED FOR THIS LEVEL

        // Do generic setup for a GameLevel
        super.startScene();
        this.planetIntroLabel.backgroundColor = new Color(88, 8, 92, 0.8);
        this.planetIntroLabel.borderColor = Color.WHITE;
        this.planetNameLabel.positionX = 90; //CHANGE TO WHAT WE NEED SO IT FITS

        this.addEnemy("water_bird", new Vec2(9, 9), "flying");
        this.addEnemy("water_bird", new Vec2(21, 2), "floating");
        this.addEnemy("water_bird", new Vec2(8, 4), "flying");
        this.addEnemy("water_bird", new Vec2(5, 2), "floating");
        
        
        
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}