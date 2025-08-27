import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import BirdState from "./BirdState";

export default class Floating extends BirdState {
	
	onEnter(): void {
        this.gravity = -this.parent.gravity;
        this.parent.speed = -100;

		(<AnimatedSprite>this.owner).animation.play("FLY", true);
	}

	update(deltaT: number): void {
		super.update(deltaT);



		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}