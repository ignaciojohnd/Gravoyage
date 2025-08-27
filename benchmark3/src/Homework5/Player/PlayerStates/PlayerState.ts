import State from "../../../Wolfie2D/DataTypes/State/State";
import StateMachine from "../../../Wolfie2D/DataTypes/State/StateMachine";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { HW5_Events } from "../../hw5_enums";
import PlayerController from "../PlayerController";


export default abstract class PlayerState extends State {
	owner: GameNode;
	gravity: number = 1000;
	parent: PlayerController;
	positionTimer: Timer;

	constructor(parent: StateMachine, owner: GameNode){
		super(parent);
		this.owner = owner;
		this.positionTimer = new Timer(250);
		this.positionTimer.start();
	}

	handleInput(event: GameEvent): void {
		if (this.parent.gravDir!="UP" && event.type == HW5_Events.GRAVITY_UP) {
			if(this.owner.onGround){
				this.parent.gravDir = "UP";
				this.owner.tweens.play("flipUp");
			}
			else {
				if((<Sprite>this.owner).invertY){
					this.parent.gravDir = "UP";
					this.owner.tweens.play("flipUp");
					(<Sprite>this.owner).invertY = MathUtils.sign(-1) > 0;
				}
				else{
					this.parent.gravDir = "UP";
					this.owner.tweens.play("flipUp");
				}
			}
		}
		if(this.parent.gravDir!="DOWN" && event.type == HW5_Events.GRAVITY_DOWN){
			if(this.owner.onCeiling){
				this.parent.gravDir = "DOWN";
				this.parent.velocity.y += this.gravity*1000;
				this.owner.tweens.play("flipDown");
			}
			else{
				if((<Sprite>this.owner).invertY){
					this.parent.gravDir = "DOWN";
					this.owner.tweens.play("flipDown");
					(<Sprite>this.owner).invertY = MathUtils.sign(-1) > 0;
				}
				else{
					this.parent.gravDir = "DOWN";
					this.owner.tweens.play("flipDown");
				}
				
			}
			
		}
		if (this.parent.gravDir!="LEFT" && event.type == HW5_Events.GRAVITY_LEFT) {
				if(this.owner.onWall){
					if((<Sprite>this.owner).invertY){
						(<Sprite>this.owner).invertY = MathUtils.sign(1) > 0;
						this.owner.tweens.play("flipLeft");
						this.parent.gravDir = "LEFT";
						this.parent.velocity.x = 600;
						this.parent.velocity.x -= this.gravity;
					}
					else{
						this.owner.tweens.play("flipLeft");
						this.parent.gravDir = "LEFT";
						this.parent.velocity.x = 600;
						this.parent.velocity.x -= this.gravity;
					}
					
				}
				else{
					if((<Sprite>this.owner).invertX){
						this.parent.gravDir = "LEFT";
						this.owner.tweens.play("flipLeft");
						(<Sprite>this.owner).invertX = MathUtils.sign(1) > 0;
					}
					else{
						this.parent.gravDir = "LEFT";
						this.owner.tweens.play("flipRight");
					}
					
					
				}
			
		}
		if (this.parent.gravDir!="RIGHT" && event.type == HW5_Events.GRAVITY_RIGHT) {
				if(this.owner.onWall){
					this.owner.tweens.play("flipRight");
					this.parent.gravDir = "RIGHT";
					this.parent.velocity.x = -600;
					this.parent.velocity.x += this.gravity;
				}
				else{
					if((<Sprite>this.owner).invertX){
						this.owner.tweens.play("flipRight");
					}
					else{
						this.owner.tweens.play("flipLeft");
					}
					this.parent.gravDir = "RIGHT";
				}
				
		}

		if(event.type == HW5_Events.INVINCIBLE){
			if(this.parent.invincible===false){
				this.parent.invincible = true;
			}

			else if(this.parent.invincible===true){
				this.parent.invincible = false;
			}
		}
	}

	/** 
	 * Get the inputs from the keyboard, or Vec2.Zero if nothing is being pressed
	 */
	getInputDirection(): Vec2 {
		let direction = Vec2.ZERO;
		direction.x = (Input.isPressed("left") ? -1 : 0) + (Input.isPressed("right") ? 1 : 0);
		direction.y = (Input.isJustPressed("jump") ? -1 : 0);
		return direction;
	}

	/**This function is left to be overrided by any of the classes that extend this base class. That way, each
	 * class can swap their animations accordingly.
	*/
	updateSuit() {
		
	}

	update(deltaT: number): void {
		// Do gravity
		this.updateSuit();
		if (this.positionTimer.isStopped()){
			this.emitter.fireEvent(HW5_Events.PLAYER_MOVE, {position: this.owner.position.clone()});
			this.positionTimer.start();
		}
		if(this.owner.frozen==false){
			if(this.parent.gravDir==="DOWN"){
				this.gravity = 1000;
				this.parent.velocity.y += this.gravity*deltaT;
			}
			else if(this.parent.gravDir==="UP" && !this.owner.onCeiling){
				this.gravity = 1000;
				this.parent.velocity.y -= this.gravity*deltaT;
			}
			else if(this.parent.gravDir==="LEFT" && !this.owner.onWall){
				this.gravity = 1000;
				this.parent.velocity.x -= this.gravity*deltaT;
			}
			else if(this.parent.gravDir==="RIGHT" && !this.owner.onWall){
				this.gravity = 1000;
				this.parent.velocity.x += this.gravity*deltaT;
			}
		}

		
	}
}