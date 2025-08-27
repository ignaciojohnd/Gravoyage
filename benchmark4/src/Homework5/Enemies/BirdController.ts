import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { HW5_Events } from "../hw5_enums";
import Flying from "./Flying";
import Floating from "./Floating";

export enum BirdStates {
	FLYING = "flying",
	FLOATING = "floating"
}

export default class BirdController extends StateMachineAI {
	owner: GameNode;
	direction: Vec2 = Vec2.ZERO;
	velocity: Vec2 = Vec2.ZERO;
	speed: number = 100;
	ySpeed: number = 100;
	gravity: number = 0;

	initializeAI(owner: GameNode, options: String){
		this.owner = owner;


		 let flying = new Flying(this, owner);
		 this.addState(BirdStates.FLYING, flying);
		 let floating = new Floating(this, owner);
		 this.addState(BirdStates.FLOATING, floating);

		 this.direction = new Vec2(-1, 0);
		
		 if(options === "flying") {
			this.initialize(BirdStates.FLYING);
		 }
		 else {
			this.speed = 0;
			this.gravity = 5;
			this.initialize(BirdStates.FLOATING);
		 }
	}

	changeState(stateName: string): void {
        super.changeState(stateName);
	}

	update(deltaT: number): void {
		super.update(deltaT);
	}
}