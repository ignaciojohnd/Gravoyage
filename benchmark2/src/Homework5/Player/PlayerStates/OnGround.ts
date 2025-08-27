import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Input from "../../../Wolfie2D/Input/Input";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import PlayerState from "./PlayerState";

export default class OnGround extends PlayerState {
	onEnter(options: Record<string, any>): void {}

	update(deltaT: number): void {
		if(this.parent.velocity.y > 0){
			this.parent.velocity.y = 0;
		}
		super.update(deltaT);

		let direction = this.getInputDirection();

		if(direction.x !== 0 && this.owner.onGround && this.parent.gravDir=="DOWN"){
			(<Sprite>this.owner).invertX = MathUtils.sign(direction.x) < 0;
		}
		else if(direction.x !== 0 && this.owner.onCeiling && this.parent.gravDir=="UP"){
			(<Sprite>this.owner).invertX = MathUtils.sign(direction.x) > 0;
		}
		else if(direction.x !== 0 && this.owner.onWall && (this.parent.gravDir=="LEFT" || this.parent.gravDir=="RIGHT")){
			if((<Sprite>this.owner).invertX){
				(<Sprite>this.owner).invertY = MathUtils.sign(direction.x) > 0;
			}
			else{
				(<Sprite>this.owner).invertY = MathUtils.sign(direction.x) < 0;
			}
		}

		//JUMP WHILE ON THE FLOOR
		if(Input.isJustPressed("jump") && this.parent.gravDir==="DOWN"){
			this.finished("jump");
			this.parent.velocity.y = -500;
		} 
		else if(!this.owner.onGround && this.parent.gravDir==="DOWN"){
			this.finished("fall");
		}
		
		//JUMP WHILE ON THE CEILING
		if(Input.isJustPressed("jump") && this.parent.gravDir==="UP"){
			this.finished("jump");
			this.parent.velocity.y = +500;
		} 
		else if(!this.owner.onCeiling && this.parent.gravDir==="UP"){
			this.finished("fall");
		}

		//JUMP WHILE ON THE LEFT WALL
		if(Input.isJustPressed("jump") && this.parent.gravDir==="LEFT"){
			this.finished("jump");
			this.parent.velocity.x = +500;
		} 
		else if(!this.owner.onWall && this.parent.gravDir==="LEFT"){
			this.finished("fall");
		}

		//JUMP WHILE ON THE RIGHT WALL
		if(Input.isJustPressed("jump") && this.parent.gravDir==="RIGHT"){
			this.finished("jump");
			this.parent.velocity.x = -500;
		} 
		else if(!this.owner.onWall && this.parent.gravDir==="RIGHT"){
			this.finished("fall");
		}
	}

	onExit(): Record<string, any> {
		return {};
	}
}