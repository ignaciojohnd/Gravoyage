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
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { HW5_Events } from "../hw5_enums";
import MainMenu from "./MainMenu";

export default class EndScreen extends Scene{
    
    
    private main: Layer;
    private screen: Layer;

    private planet: Sprite;
    private moon: Sprite;
    protected rocket: AnimatedSprite;

    protected levelTransitionScreen: Rect;

    loadScene(): void {
        // Load the menu song
        this.load.image("planet", "hw5_assets/images/Planet.png");
        this.load.image("moon", "hw5_assets/images/Moon.png");
        this.load.image("end_bg", "hw5_assets/images/end_background.png");
        this.load.spritesheet("rocket", "hw5_assets/spritesheets/rocket.json");
        this.load.audio("level_music", "hw5_assets/music/EndScreen.wav")
    }


    startScene(): void {
        this.main = this.addUILayer("Main");
        this.addLayer("background", 0);
        this.screen = this.addUILayer("Screen");

        let bg = this.add.sprite("end_bg", "background");
		bg.scale.set(2, 2);
		bg.position = new Vec2(610,400);

        this.subscribeToEvents();

        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);
        this.planet = this.add.sprite("planet", "Main");
        this.planet.scaleX = 8;
        this.planet.scaleY = 8;
        this.planet.position.set(580, 200 );

        this.planet = this.add.sprite("moon", "Main");
        this.planet.scaleX = 5;
        this.planet.scaleY = 5;
        this.planet.position.set(980, 100 );


        this.rocket = this.add.animatedSprite("rocket", "Main");
        this.rocket.position.set(580,500);
        this.rocket.rotation = 1.6;
        this.rocket.scale.set(4,4);
        this.rocket.animation.playIfNotAlready("MOVING", true);

        this.addScreen();

        let message1 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {position: new Vec2(210, 150), text: "CONGRATULATIONS!"});
        message1.textColor = Color.YELLOW;
        message1.fontSize = 40;

        let message2 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {position: new Vec2(210, 200), text: "YOU MADE IT"});
        message2.textColor = Color.YELLOW;
        message2.fontSize = 40;

        let message3 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {position: new Vec2(210, 250), text: "BACK HOME!"});
        message3.textColor = Color.YELLOW;
        message3.fontSize = 40;



        

        this.levelTransitionScreen.tweens.play("fadeOut");

        this.rocket.tweens.play("moveUp");
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    protected subscribeToEvents(){
        this.receiver.subscribe([
            HW5_Events.FLOAT_UP,
            HW5_Events.FLOAT_DOWN
        ]);
    }

    addScreen(){
        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "Screen", {position: new Vec2(600, 400), size: new Vec2(1200, 800)});
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 3000,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
        });

        this.rocket.tweens.add("moveDown", {
            startDelay: 0,
            duration: 3000,
            effects: [
                {
                    property: TweenableProperties.posY,
                    start: 470,
                    end: 500,
                    ease: EaseFunctionType.IN_SINE
                }
            ],
            onEnd: HW5_Events.FLOAT_UP
        });


        this.rocket.tweens.add("moveUp", {
            startDelay: 0,
            duration: 3000,
            effects: [
                {
                    property: TweenableProperties.posY,
                    start: 500,
                    end: 470,
                    ease: EaseFunctionType.IN_SINE
                }
                
            ],
            
            onEnd: HW5_Events.FLOAT_DOWN
        });


        
    }

    updateScene(deltaT: number): void {
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            //CHANGE TO HITTING AN ENEMY
            switch(event.type){
             
                case HW5_Events.FLOAT_UP:
                    {
                        this.rocket.tweens.play("moveUp")
                    }
                    break;
                
                case HW5_Events.FLOAT_DOWN:
                    {
                        
                        this.rocket.tweens.play("moveDown")
                    }
                    break;
                
               
            }
        }
    }
}