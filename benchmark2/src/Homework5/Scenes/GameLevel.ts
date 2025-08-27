import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import Game from "../../Wolfie2D/Loop/Game";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Point from "../../Wolfie2D/Nodes/Graphics/Point";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import BalloonController from "../Enemies/BalloonController";
import { HW5_Color } from "../hw5_color";
import { HW5_Events } from "../hw5_enums";
import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import Level1 from "./Level1";
import MainMenu from "./MainMenu";

// HOMEWORK 5 - TODO - DONE
/**
 * Add in some level music.
 * 
 * This can be done here in the base GameLevel class, or in Level1 and Level2,
 * it's up to you.
 */
export default class GameLevel extends Scene {
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
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

    protected currentLevel: number;

    //Have a few that we could use
    private infoBox: Sprite;
    private infoBox2: Sprite;
    private infoBox3: Sprite;
    private infoBox4: Sprite;
    
    private cooldown: boolean = false;

    protected end: Label;


    startScene(): void {
        this.flipsUsed = 0;
        // Do the game level standard initializations
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

        //CHANGE CONDITION
        // this.respawnTimer = new Timer(1000, () => {
        //     if(GameLevel.livesCount === 0){
        //         this.sceneManager.changeToScene(MainMenu);
        //     } else {
        //         this.respawnPlayer();
        //         this.player.enablePhysics();
        //         this.player.unfreeze();
        //     }
        // });
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(3000, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");

        
        this.textTimer = new Timer(500, () => {
            this.planetIntroLabel.tweens.play("slideIn");
        });
        this.textTimer.start();
        

        // Initially disable player movement
        Input.disableInput();
    }


    updateScene(deltaT: number){
        // Handle events and update the UI if needed
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            //CHANGE TO HITTING AN ENEMY
            switch(event.type){
            //     case HW5_Events.PLAYER_HIT_BALLOON:
            //         {
            //             let node = this.sceneGraph.getNode(event.data.get("node"));
            //             let other = this.sceneGraph.getNode(event.data.get("other"));
                        

            //             if(node === this.player){
            //                 // Node is player, other is balloon
                            
            //                 this.handlePlayerBalloonCollision(<AnimatedSprite>node, <AnimatedSprite>other);
            //             } else {
            //                 // Other is player, node is balloon
            //                 this.handlePlayerBalloonCollision(<AnimatedSprite>other,<AnimatedSprite>node);

            //             }
            //         }
            //         break;
                    
                case HW5_Events.PLAYER_ENTERED_LEVEL_END:
                    {
                        //CHANGE CONDITIONS
                        // //Check if the player has pressed all the switches and popped all of the balloons
                        // if (this.switchesPressed >= this.totalSwitches && this.balloonsPopped >= this.totalBalloons){
                        //     if(!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()){
                        //         // The player has reached the end of the level
                        //         this.levelEndTimer.start();
                        //         this.planetIntroLabel.tweens.play("slideIn");
                        //     }
                        // }
                    }
                    break;

                case HW5_Events.LEVEL_START:
                    {
                        // Re-enable controls
                        Input.enableInput();
                        this.textTimer = new Timer(3000, () => {
                            this.planetIntroLabel.tweens.play("slideOut");
                        });
                        this.textTimer.start();
                    }
                    break;
                
                case HW5_Events.LEVEL_END:
                    {
                        // Go to the next level
                        // if(this.nextLevel){
                        //     let sceneOptions = {
                        //         physics: {
                        //             groupNames: ["ground", "player", "balloon"],
                        //             collisions:
                        //             [
                        //                 [0, 1, 1],
                        //                 [1, 0, 0],
                        //                 [1, 0, 0]
                        //             ]
                        //         }
                        //     }
                        //     this.sceneManager.changeToScene(this.nextLevel, {}, sceneOptions);
                        // }
                        this.end.visible = true;
                    }
                    break;
                case HW5_Events.PLAYER_KILLED:
                    {
                        this.respawnPlayer();
                    }

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
                    groupNames: ["ground", "player", "balloon"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }

            if(this.currentLevel===1){
                this.sceneManager.changeToScene(Level1, {}, sceneOptions);
            }
            else if(this.currentLevel===2){
                console.log("other");
                //this.sceneManager.changeToScene(Level2, {}, sceneOptions);
            }
            else if(this.currentLevel===3){
                //this.sceneManager.changeToScene(Level3, {}, sceneOptions);
            }
            else if(this.currentLevel===4){
                //this.sceneManager.changeToScene(Level4, {}, sceneOptions);
            }
            else if(this.currentLevel===5){
                //this.sceneManager.changeToScene(Level5, {}, sceneOptions);
            }
            else if(this.currentLevel===6){
                //this.sceneManager.changeToScene(Level6, {}, sceneOptions);
            }
           
        }

        if(this.totalFlips>0){
            if (Input.isKeyJustPressed("arrowup")) {
                this.flipsLabel.text = "Flips Left: " + (this.totalFlips - 1);
                this.totalFlips--;
                this.emitter.fireEvent(HW5_Events.GRAVITY_UP, {});
            }
            if (Input.isKeyJustPressed("arrowdown")) {
                this.flipsLabel.text = "Flips Left: " + (this.totalFlips - 1);
                this.totalFlips--;
                this.emitter.fireEvent(HW5_Events.GRAVITY_DOWN, {});
            }
            if (Input.isKeyJustPressed("arrowleft")) {
                this.flipsLabel.text = "Flips Left: " + (this.totalFlips - 1);
                this.totalFlips--;
                this.emitter.fireEvent(HW5_Events.GRAVITY_LEFT, {});
            }
            if (Input.isKeyJustPressed("arrowright")) {
                this.flipsLabel.text = "Flips Left: " + (this.totalFlips - 1);
                this.totalFlips--;
                this.emitter.fireEvent(HW5_Events.GRAVITY_RIGHT, {});
            }
           

            if(this.totalFlips==0){
                this.flipsLabel.text = "Out Of Flips!"
                this.flipsLabel.textColor = Color.RED;
            }
        }
    }

    /**
     * Initialzes the layers
     */
    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("UI");

        // Add a layer for players and enemies
        this.addLayer("primary", 1);
    }

    /**
     * Initializes the viewport
     */
    protected initViewport(): void {
        this.viewport.setZoomLevel(2);
    }

    /**
     * Handles all subscriptions to events
     */
    protected subscribeToEvents(){
        this.receiver.subscribe([
            HW5_Events.PLAYER_HIT_ENEMY,
            HW5_Events.PLAYER_ENTERED_LEVEL_END,
            HW5_Events.LEVEL_START,
            HW5_Events.LEVEL_END,
            HW5_Events.PLAYER_KILLED
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
        this.flipsLabel.font = "Heather";
        this.flipsLabel.backgroundColor = new Color(58, 13, 82, 0.8);
        this.flipsLabel.borderColor = Color.BLACK;
        this.flipsLabel.borderWidth = 10;
        this.flipsLabel.borderRadius = 50;

        this.planetNameLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(102, 40), text: this.planetName});
        //this.planetName.backgroundColor = new Color(111, 69, 135, 1);
        this.planetNameLabel.textColor = Color.WHITE;
        this.planetNameLabel.font = "Heather";

        this.homeDistanceLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(90, 60), text: this.homeDistance});
        this.homeDistanceLabel.textColor = Color.WHITE;
        this.homeDistanceLabel.font = "Heather";

       

       
        
        this.planetIntroLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(300, 500), text: this.planetIntroName});
        this.planetIntroLabel.size.set(800, 400);
        this.planetIntroLabel.borderRadius = 50;
        this.planetIntroLabel.backgroundColor = new Color(107, 138, 240,0.8);
        this.planetIntroLabel.textColor = new Color(0,0,0,1);
        this.planetIntroLabel.fontSize = 100;
        this.planetIntroLabel.font = "OCR A EXTENDED";
        this.planetIntroLabel.setTextColor

        this.pauseBox = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(300, 200), text: "PAUSED"});
        this.pauseBox.size.set(1200, 800);
        this.pauseBox.backgroundColor = new Color(148, 148, 148,0.8);
        this.pauseBox.fontSize = 100;
        this.pauseBox.visible = false;

    
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
        this.end.fontSize = 45;
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
        //this.levelEndArea.setTrigger("player", HW5_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(0, 0, 0, 0);
    }


    //CHANGE THIS TO ADD AN ENEMY LATER
    // /**
    //  * Adds an balloon into the game
    //  * @param spriteKey The key of the balloon sprite
    //  * @param tilePos The tilemap position to add the balloon to
    //  * @param aiOptions The options for the balloon AI
    //  */
    // protected addBalloon(spriteKey: string, tilePos: Vec2, aiOptions: Record<string, any>): void {
    //     let balloon = this.add.animatedSprite(spriteKey, "primary");
    //     balloon.position.set(tilePos.x*32, tilePos.y*32);
    //     balloon.scale.set(2, 2);
    //     balloon.addPhysics();
    //     balloon.addAI(BalloonController, aiOptions);
    //     balloon.setGroup("balloon");
    //     //balloon.setTrigger("player", HW5_Events.PLAYER_HIT_BALLOON, null);

    // }

    protected addInfoBox(img: string, xScale: number, yScale: number, posx: number, posy: number){
        this.infoBox = this.add.sprite(img, "primary");
        this.infoBox.scaleX = xScale;
        this.infoBox.scaleY = yScale;
        this.infoBox.position.set(posx, posy);
    }
    
    //CHANGE THIS TO HANDLE ENEMY COLLISION LATER
    // protected handlePlayerBalloonCollision(player: AnimatedSprite, balloon: AnimatedSprite) {
    //     if (this.cooldown) {
    //         return;
    //     }
        
    //     const playerController = player['ai'] as PlayerController;
    //     const balloonController = balloon['ai'] as BalloonController;

    //     if(playerController.suitColor != balloonController.color){
    //         this.incPlayerLife(-1);
            
    //         this.emitter.fireEvent(HW5_Events.BALLOON_POPPED, { balloon });
    //     }
    //     else{
    //         this.emitter.fireEvent(HW5_Events.BALLOON_POPPED, { balloon });
    //     }

    // }

    /**
     * Increments the amount of life the player has
     * @param amt The amount to add to the player life
     */

    /**
     * Returns the player to spawn
     */
    //CALL THIS WHEN YOU DIE
    protected respawnPlayer(): void {
        this.sceneManager.changeToScene(MainMenu, {});
        Input.enableInput();
        this.system.stopSystem();
    }
}