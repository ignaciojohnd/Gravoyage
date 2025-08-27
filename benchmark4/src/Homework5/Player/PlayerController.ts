import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { HW5_Color } from "../hw5_color";
import { HW5_Events } from "../hw5_enums";
import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import InAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Walk from "./PlayerStates/Walk";

export enum PlayerType {
    PLATFORMER = "platformer",
    TOPDOWN = "topdown"
}

export enum PlayerStates {
    IDLE = "idle",
    WALK = "walk",
	JUMP = "jump",
    FALL = "fall",
	PREVIOUS = "previous"
}

export default class PlayerController extends StateMachineAI {
    protected owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 200;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;
    suitColor: HW5_Color;
    gravDir: string = "DOWN";
    alive: boolean = true;
    invincible: boolean = false;
    end: boolean = false;

    
    initializeAI(owner: GameNode, options: Record<string, any>){
        this.owner = owner;

        this.initializePlatformer();

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        this.suitColor = options.color;

        this.receiver.subscribe(HW5_Events.GRAVITY_UP);
        this.receiver.subscribe(HW5_Events.GRAVITY_DOWN);
        this.receiver.subscribe(HW5_Events.GRAVITY_LEFT);
        this.receiver.subscribe(HW5_Events.GRAVITY_RIGHT);

        this.receiver.subscribe(HW5_Events.PLAYER_KILLED);
        this.receiver.subscribe(HW5_Events.PLAYER_HIT_ENEMY);

        this.receiver.subscribe(HW5_Events.RESPAWN);
        this.receiver.subscribe(HW5_Events.INVINCIBLE);

        let doneFlag = false;

        owner.tweens.add("flipUp", {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: "rotation",
                    start: 0,
                    end: (0.5)*2*Math.PI,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        });

        owner.tweens.add("flipDown", {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: "rotation",
                    start: (0.5)*2*Math.PI,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        });

        owner.tweens.add("flipRight", {
            startDelay: 0,
            duration: 500, 
            effects: [
                {
                    property: "rotation",
                    start: 0, 
                    end: -Math.PI / 2, 
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        });

        owner.tweens.add("flipLeft", {
            startDelay: 0,
            duration: 500, 
            effects: [
                {
                    property: "rotation",
                    start: 0, 
                    end: Math.PI / 2, 
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        });

        owner.tweens.add("death", {
            startDelay: 0,
            duration: 3000,
            effects: [
                {
                    property: "rotation",
                    start: 0,
                    end: 10*Math.PI,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.OUT_SINE
                }
            ],
            onEnd: HW5_Events.RESPAWN
        });

        // const checkDone = () => {
        //     if (owner.alpha === 0 && !doneFlag) {
        //         doneFlag = true;
        //         this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
        //     }
           
        // };

        //setInterval(checkDone, 100);

    }

    initializePlatformer(): void {
        this.speed = 400;

        let idle = new Idle(this, this.owner);
		this.addState(PlayerStates.IDLE, idle);
		let walk = new Walk(this, this.owner);
		this.addState(PlayerStates.WALK, walk);
		let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        
        this.initialize(PlayerStates.IDLE);
    }

    changeState(stateName: string): void {
        // If we jump or fall, push the state so we can go back to our current state later
        // unless we're going from jump to fall or something
        

        if((stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) && !(this.stack.peek() instanceof InAir)){
            this.stack.push(this.stateMap.get(stateName));
        }
        super.changeState(stateName);
    }

    
    update(deltaT: number): void {
		super.update(deltaT);

        //IF TOUCHED THE CRYSTAL
        //HAVE TO CHANGE TO ROTATED VERSIONS

        //console.log(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y)));

        if(this.end===false){
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y + 16)) === 9){
                this.end = true;
                this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
            }
            else if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x + 16,this.owner.position.y)) === 9){
                this.end = true;
                this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
            }
            else if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y)) === 9){
                this.end = true;
                this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
            }
            else if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y)) === 9){
                this.end = true;
                this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
            }
            else if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y)) === 1073741833){
                this.end = true;
                this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
            }
        }

        
        if(this.invincible===false){
            //IF TOUCHED A SPIKE
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x,this.owner.position.y + 16)) === 23 && this.alive === true){
                this.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
            }
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x + 12,this.owner.position.y)) === 1610612759 && this.alive === true){ //These numbers are weird because they are tile 23 rotated
                this.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
            }
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x ,this.owner.position.y)) === 2684354583 && this.alive === true){ //These numbers are weird because they are tile 23 rotated
                this.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
            }
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x ,this.owner.position.y )) === 1073741847 && this.alive === true){ //These numbers are weird because they are tile 23 rotated
                this.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
            }
            if(this.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x ,this.owner.position.y )) === 3221225495 && this.alive === true){ //These numbers are weird because they are tile 23 rotated
                this.alive = false;
                this.emitter.fireEvent(HW5_Events.PLAYER_KILLED);
            }
        }

        
		if(this.currentState instanceof Jump){
			Debug.log("playerstate", "Player State: Jump");
           
		} else if (this.currentState instanceof Walk){
            
			Debug.log("playerstate", "Player State: Walk");
		} else if (this.currentState instanceof Idle){       
			Debug.log("playerstate", "Player State: Idle");
		} else if(this.currentState instanceof Fall){
            Debug.log("playerstate", "Player State: Fall");
        }
	}
}