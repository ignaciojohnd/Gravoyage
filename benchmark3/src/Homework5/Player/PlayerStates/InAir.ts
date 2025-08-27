import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerStates } from "../PlayerController";
import PlayerState from "./PlayerState";

export default abstract class InAir extends PlayerState {
    
    update(deltaT: number): void {
        super.update(deltaT);

        let dir = this.getInputDirection();
        
        if(this.parent.gravDir=="UP" || this.parent.gravDir=="DOWN"){
            this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
        }
        else if(this.parent.gravDir=="LEFT" || this.parent.gravDir=="RIGT"){
            this.parent.velocity.y += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.y;
        }
		

		this.owner.move(this.parent.velocity.scaled(deltaT));

        if(this.owner.onGround || this.owner.onCeiling || this.owner.onWall){
			this.finished(PlayerStates.PREVIOUS);
		}
       
    }
}