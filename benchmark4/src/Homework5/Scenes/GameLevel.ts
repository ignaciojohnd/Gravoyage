import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import BirdController from "../Enemies/BirdController";
import { HW5_Color } from "../hw5_color";
import { HW5_Events } from "../hw5_enums";
import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./MainMenu";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import EndScreen from "./EndScreen";


export default class GameLevel extends Scene {
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
    protected thisLevel: new (...args: any) => GameLevel;

    protected cheat1: new (...args: any) => GameLevel;
    protected cheat2: new (...args: any) => GameLevel;
    protected cheat3: new (...args: any) => GameLevel;
    protected cheat4: new (...args: any) => GameLevel;
    protected cheat5: new (...args: any) => GameLevel;
    protected cheat6: new (...args: any) => GameLevel;

    protected levelEndTimer: Timer;
    
    // Screen fade in/out for level start and end
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;
    
    // Custom particle sysyem
    protected system: HW5_ParticleSystem;

    protected totalFlips: number;
    protected flipsLabel: Label;
    protected flipsUsed: number;

    protected planetIntroLabel: Label;
    protected planetIntroName: String;

    protected planetNameLabel: Label;
    protected planetName: String;

    protected homeDistanceLabel: Label;
    protected homeDistance: String;

    protected textTimer: Timer

    protected pauseBox: Label;
    protected paused: boolean

    //Have a few that we could use
    private infoBox: Sprite;
    private infoBox2: Sprite;
    
    protected transitionBox: Label;
    
    protected rocket: AnimatedSprite;
    

    protected end: Label;

    protected out: boolean;

    startScene(): void {
        this.flipsUsed = 0;
        this.out = false;
        // Do the game level standard initializations
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

        
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(2000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Start the black screen fade out
        //this.levelTransitionScreen.tweens.play("fadeOut");

        this.rocket.tweens.play("move");
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "traveling_to_next_planet", loop: false, holdReference: false});
        // Initially disable player movement
        Input.disableInput();
    }


    updateScene(deltaT: number){
        // Handle events and update the UI if needed
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            
            switch(event.type){
                 case HW5_Events.PLAYER_HIT_ENEMY:
                     {
                         let node = this.sceneGraph.getNode(event.data.get("node"));
                         let other = this.sceneGraph.getNode(event.data.get("other"));
                         if(node === this.player){
                             // Node is player, other is enemy
                             this.handlePlayerEnemyCollision(<AnimatedSprite>node, <AnimatedSprite>other);

                         } else {
                             // Other is player, node is enemy
                             this.handlePlayerEnemyCollision(<AnimatedSprite>other,<AnimatedSprite>node);
                         }
                     }
                     break;
                case HW5_Events.FLIP:
                    {
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "gravity_flip", loop: false, holdReference: false});
                        this.flipsLabel.text = "Flips Left: " + (this.totalFlips - 1);
                        this.totalFlips--;
                        console.log("A");
                    }
                    break;

                case HW5_Events.OUT:
                    {
                        this.flipsLabel.text = "Out Of Flips!"
                        this.flipsLabel.textColor = Color.RED;
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "out_of_flips", loop: false, holdReference: false});
                    }
                    break;
                    
                case HW5_Events.PLAYER_ENTERED_LEVEL_END:
                    {
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_complete", loop: false, holdReference: false});
                        this.end.visible = true;
                        Input.disableInput();
                        if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
                            this.levelEndTimer.start();
                        }
                    }
                    break;
                
                case HW5_Events.TRANSITION_START:
                    {
                        this.transitionBox.visible = false;
                        this.rocket.position.set(-40,300);
                        this.layers.delete("transition");
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
                        this.levelTransitionScreen.tweens.play("fadeOut");

                    }
                    break;

                case HW5_Events.LEVEL_START:
                    {
                        // Re-enable controls
                        Input.enableInput();
                        this.planetIntroLabel.tweens.play("slideIn");

                        this.textTimer = new Timer(3000, () => {
                            this.planetIntroLabel.tweens.play("slideOut");
                        });
                        this.textTimer.start();
                    }
                    break;
                
                case HW5_Events.LEVEL_END:
                    {
                        this.end.visible = false;
                        // Go to the next level
                        if(this.nextLevel){
                            let sceneOptions = {
                                physics: {
                                    groupNames: ["ground", "player", "enemy"],
                                    collisions:
                                    [
                                        [0, 1, 1],
                                        [1, 0, 0],
                                        [1, 0, 0]
                                    ]
                                }
                            }
                            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
                            this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                        }
                        else{
                            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
                            this.sceneManager.changeToScene(EndScreen);
                        }
                        
                    }
                    break;
                case HW5_Events.PLAYER_KILLED:
                    {
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "player_death", loop: false, holdReference: false});
                        Input.disableInput();
                        this.player.freeze();
                        this.player.tweens.play("death");
                        //this.respawnPlayer();
                    }
                    break;
                case HW5_Events.RESPAWN:
                    this.respawnPlayer();

            }
        }

        
        if(Input.isKeyJustPressed("p")){
            if(this.pauseBox.visible==false){
                this.pauseBox.visible = true;
                this.player.freeze();
            }
            else if(this.pauseBox.visible==true){
                this.pauseBox.visible = false;
                this.setRunning(true);
                this.player.unfreeze();
            }
        }

        if(Input.isKeyJustPressed("r")){
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.sceneManager.changeToScene(this.thisLevel, {}, sceneOptions);
           
        }

        if(Input.isKeyJustPressed("1")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(1);
        }
        if(Input.isKeyJustPressed("2")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(2);
        }
        if(Input.isKeyJustPressed("3")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(3);
        }
        if(Input.isKeyJustPressed("4")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(4);
        }
        if(Input.isKeyJustPressed("5")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(5);
        }
        if(Input.isKeyJustPressed("6")){
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
            this.cheatToLevel(6);
        }

        if(Input.isKeyJustPressed("f")){
            this.totalFlips = 100;
            this.flipsLabel.text = "Flips Left: " + (this.totalFlips);
        }

        if(Input.isKeyJustPressed("i")){
            this.emitter.fireEvent(HW5_Events.INVINCIBLE, {});      
        }

        if(this.totalFlips>0){
            if (Input.isKeyJustPressed("arrowup")) {
                this.emitter.fireEvent(HW5_Events.GRAVITY_UP, {});
            }
            if (Input.isKeyJustPressed("arrowdown")) {
                this.emitter.fireEvent(HW5_Events.GRAVITY_DOWN, {});
            }
            if (Input.isKeyJustPressed("arrowleft")) {
                this.emitter.fireEvent(HW5_Events.GRAVITY_LEFT, {});
            }
            if (Input.isKeyJustPressed("arrowright")) {
                this.emitter.fireEvent(HW5_Events.GRAVITY_RIGHT, {});
            }
           

            
        }
        else if(this.out === false){
            this.out = true;
            this.emitter.fireEvent(HW5_Events.OUT, {});
        }
    }

    /**
     * Initialzes the layers
     */
    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("UI");
        this.addUILayer("transition");
        // Add a layer for players and enemies
        this.addLayer("primary", 1);

        
    }

    /**
     * Initializes the viewport
     */
    protected initViewport(): void {
        this.viewport.setZoomLevel(2);
        this.viewport.setBounds(0,0,800,640);
    }

    /**
     * Handles all subscriptions to events
     */
    protected subscribeToEvents(){
        this.receiver.subscribe([
            HW5_Events.PLAYER_HIT_ENEMY,
            HW5_Events.FLIP,
            HW5_Events.OUT,
            HW5_Events.PLAYER_ENTERED_LEVEL_END,
            HW5_Events.LEVEL_START,
            HW5_Events.TRANSITION_START,
            HW5_Events.LEVEL_END,
            HW5_Events.PLAYER_KILLED,
            HW5_Events.RESPAWN
        ]);
    }

    /**
     * Adds in any necessary UI to the game
     */
    protected addUI(){
        // In-game labels
        this.paused = false;

        this.flipsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(50, 20), text: "Flips Left: " + (this.totalFlips - this.flipsUsed)});
        this.flipsLabel.size.set(650,300)
        this.flipsLabel.textColor = Color.WHITE;
        this.flipsLabel.font = "PixelSimple";
        this.flipsLabel.backgroundColor = new Color(58, 13, 82, 0.8);
        this.flipsLabel.borderColor = Color.BLACK;
        this.flipsLabel.borderWidth = 10;
        this.flipsLabel.borderRadius = 50;

        this.planetNameLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(102, 40), text: this.planetName});
        this.planetNameLabel.textColor = Color.WHITE;
        this.planetNameLabel.font = "PixelSimple";

        this.homeDistanceLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(90, 60), text: this.homeDistance});
        this.homeDistanceLabel.textColor = Color.WHITE;
        this.homeDistanceLabel.font = "PixelSimple";

       

       
        
        this.planetIntroLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(300, 500), text: this.planetIntroName});
        this.planetIntroLabel.size.set(800, 400);
        this.planetIntroLabel.borderRadius = 50;
        this.planetIntroLabel.borderColor = Color.WHITE;
        this.planetIntroLabel.borderWidth = 5;
        this.planetIntroLabel.textColor = new Color(0,0,0,1);
        this.planetIntroLabel.fontSize = 100;
        this.planetIntroLabel.font = "PixelSimple";
        this.planetIntroLabel.setTextColor

        this.pauseBox = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(300, 200), text: "PAUSED"});
        this.pauseBox.size.set(1200, 800);
        this.pauseBox.backgroundColor = new Color(148, 148, 148,0.8);
        this.pauseBox.fontSize = 100;
        this.pauseBox.visible = false;

        this.transitionBox = <Label>this.add.uiElement(UIElementType.LABEL, "transition", {position: new Vec2(300, 200), text: "Travelling to next planet..."});
        this.transitionBox.size.set(1200, 800);
        this.transitionBox.textColor = Color.WHITE;
        this.transitionBox.backgroundColor = new Color(35,3,61);
        this.transitionBox.fontSize = 80;
        //this.transitionBox.visible = false;

        this.rocket = this.add.animatedSprite("rocket", "transition");
        this.rocket.position.set(-40,300);
        this.rocket.scale.set(3,3);
        this.rocket.animation.playIfNotAlready("MOVING", true);
    
        this.planetIntroLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 2000,
            effects: [
                {
                    property: TweenableProperties.posY,
                    start: 500,
                    end: 200,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        });

        this.planetIntroLabel.tweens.add("slideOut", {
            startDelay: 0,
            duration: 2000,
            effects: [
                {
                    property: TweenableProperties.posY,
                    start: 200,
                    end: -200,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        });

        this.rocket.tweens.add("move", {
            startDelay: 0,
            duration: 2500,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: -40,
                    end: 400,
                    ease: EaseFunctionType.IN_SINE
                }
            ],
            onEnd: HW5_Events.TRANSITION_START
        });

        // Create our particle system and initialize the pool
        this.system = new HW5_ParticleSystem(100, new Vec2((5 * 32), (10 * 32)), 2000, 3, 1, 100);
        this.system.initializePool(this, "primary");

        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "UI", {position: new Vec2(300, 200), size: new Vec2(600, 400)});
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: "alpha",
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW5_Events.LEVEL_END
        });

        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW5_Events.LEVEL_START
        });

        this.end = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(300, 200), text: "LEVEL COMPLETE"});
        this.end.fontSize = 100;
        this.end.textColor = Color.RED;
        this.end.visible = false;
        
    }

    /**
     * Initializes the player
     */
    protected initPlayer(): void {
        // Add the player
        this.player = this.add.animatedSprite("player", "primary");
        this.player.scale.set(2, 2);
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main", color: HW5_Color.RED});

        this.player.setGroup("player");

        this.viewport.follow(this.player);

        
    }

    /**
     * Initializes the level end area
     */
    protected addLevelEnd(startingTile: Vec2, size: Vec2): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, "primary", {position: startingTile.scale(32), size: size.scale(32)});
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger("player", HW5_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(0, 0, 0, 0);
    }


     /**
      * Adds an enemy into the game
      * @param spriteKey The key of the enemy sprite
      * @param tilePos The tilemap position to add the enemy to
      * @param aiOptions The options for the enemy AI
      */
     protected addEnemy(spriteKey: string, tilePos: Vec2, aiOptions: String): void {
         let enemy = this.add.animatedSprite(spriteKey, "primary");
         enemy.position.set(tilePos.x*32, tilePos.y*32);
         enemy.scale.set(2, 2);
         enemy.addPhysics();
         enemy.addAI(BirdController, aiOptions);
         enemy.setGroup("enemy");
         enemy.setTrigger("player", HW5_Events.PLAYER_HIT_ENEMY, null);

     }

    protected addInfoBox(img: string, xScale: number, yScale: number, posx: number, posy: number){
        this.infoBox = this.add.sprite(img, "primary");
        this.infoBox.scaleX = xScale;
        this.infoBox.scaleY = yScale;
        this.infoBox.position.set(posx, posy);
    }
    
    protected handlePlayerEnemyCollision(player: AnimatedSprite, enemy: AnimatedSprite) {
         const playerController = player['ai'] as PlayerController;
         if(playerController.invincible===false){
                playerController.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
        }
    }

    /**
     * Returns the player to spawn
     */
    
    protected respawnPlayer(): void {
        this.sceneManager.changeToScene(this.thisLevel, {}, this.sceneOptions);
        Input.enableInput();
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music", loop: true, holdReference: true});
        this.system.stopSystem();
    }

    protected cheatToLevel(lev: number): void {
        let sceneOptions = {
            physics: {
                groupNames: ["ground", "player", "enemy"],
                collisions:
                [
                    [0, 1, 1],
                    [1, 0, 0],
                    [1, 0, 0]
                ]
            }
        }

        if(lev===1){
            this.sceneManager.changeToScene(this.cheat1, {}, sceneOptions);
        }
        else if(lev===2){
            this.sceneManager.changeToScene(this.cheat2, {}, sceneOptions);
        }
        else if(lev===3){
            this.sceneManager.changeToScene(this.cheat3, {}, sceneOptions);
        }
        else if(lev===4){
            this.sceneManager.changeToScene(this.cheat4, {}, sceneOptions);
        }
        else if(lev===5){
            this.sceneManager.changeToScene(this.cheat5, {}, sceneOptions);
        }
        else if(lev===6){
            this.sceneManager.changeToScene(this.cheat6, {}, sceneOptions);
        }
    }
}