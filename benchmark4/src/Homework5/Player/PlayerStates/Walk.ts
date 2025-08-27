import Input from "../../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { HW5_Color } from "../../hw5_color";
import { HW5_Events } from "../../hw5_enums";
import { PlayerStates } from "../PlayerController";
import OnGround from "./OnGround";

export default class Walk extends OnGround {
	owner: AnimatedSprite;

	onEnter(options: Record<string, any>): void {
		this.parent.speed = this.parent.MIN_SPEED;
	}

	updateSuit() {
		this.owner.animation.playIfNotAlready("WALK", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);
		let dir = this.getInputDirection();

		if(dir.isZero()){
			this.finished(PlayerStates.IDLE);
		} 
		
		if(this.parent.gravDir=="UP" || this.parent.gravDir=="DOWN"){
			this.parent.velocity.x = dir.x * this.parent.speed;
		}
		if(this.parent.gravDir=="LEFT"){
			this.parent.velocity.y = dir.x * this.parent.speed;
		}
		if(this.parent.gravDir=="RIGHT"){
			this.parent.velocity.y = -dir.x * this.parent.speed;
		}

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}