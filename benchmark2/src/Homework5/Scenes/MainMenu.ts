import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import { HW5_Events } from "../hw5_enums";
import Level1 from "./Level1";

export default class MainMenu extends Scene {

    animatedSprite: AnimatedSprite;

    private main: Layer;
    private controls: Layer;
    private levelSelect: Layer;
    private about: Layer;

    private logo: Sprite;

    loadScene(): void {
        // Load the menu song
        this.load.image("logo", "hw5_assets/images/logo.png");
    }

    startScene(): void {

        this.main = this.addUILayer("Main");

        
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        //MAIN MENU PAGE

        this.logo = this.add.sprite("logo", "Main");
        this.logo.scaleX = 0.5;
        let center = this.viewport.getCenter();
        this.logo.position.set(center.x, center.y - 270);
        


        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y), text: "Play Game"});
        playBtn.backgroundColor = Color.TRANSPARENT;
        playBtn.borderColor = Color.WHITE;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(70, 50));
        playBtn.size = new Vec2(300,70);
        playBtn.fontSize = 50;
        playBtn.font = "Sterion-BLLld";

        let controlsBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 90), text: "Controls"});
        controlsBtn.backgroundColor = Color.TRANSPARENT;
        controlsBtn.borderColor = Color.WHITE;
        controlsBtn.borderRadius = 0;
        controlsBtn.setPadding(new Vec2(70, 50));
        controlsBtn.size = new Vec2(300,70);
        controlsBtn.fontSize = 50;
        controlsBtn.font = "PixelSimple";

        controlsBtn.onClick = () => {
            this.controls.setHidden(false);
            this.main.setHidden(true);
        }



        let levelSelectBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 180), text: "Level Select"});
        levelSelectBtn.backgroundColor = Color.TRANSPARENT;
        levelSelectBtn.borderColor = Color.WHITE;
        levelSelectBtn.borderRadius = 0;
        levelSelectBtn.setPadding(new Vec2(70, 50));
        levelSelectBtn.size = new Vec2(300,70);
        levelSelectBtn.fontSize = 50;
        levelSelectBtn.font = "PixelSimple";

        levelSelectBtn.onClick = () => {
            this.levelSelect.setHidden(false);
            this.main.setHidden(true);
        }
        

        let aboutBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 270), text: "About"});
        aboutBtn.backgroundColor = Color.TRANSPARENT;
        aboutBtn.borderColor = Color.WHITE;
        aboutBtn.borderRadius = 0;
        aboutBtn.setPadding(new Vec2(50, 10));
        aboutBtn.size = new Vec2(300,50);
        aboutBtn.fontSize = 40;
        aboutBtn.font = "PixelSimple";


        aboutBtn.onClick = () => {
            this.about.setHidden(false);
            this.main.setHidden(true);
        }


        //CONTROLS PAGE
        this.controls = this.addUILayer("controls");
        this.controls.setHidden(true);

        const controlsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x, size.y - 300), text: "Controls"});
        controlsLabel.textColor = Color.WHITE;
        controlsLabel.fontSize = 40;
        controlsLabel.font = "Pacifico";

        let left = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 275, size.y - 200), text: "A - Move left relative to the gravity direction"});
        left.textColor = Color.WHITE;

        let right = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 265, size.y - 150), text: "D - Move right relative to the gravity direction"});
        right.textColor = Color.WHITE;

        let jump = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 500, size.y - 100), text: "W - Jump"});
        jump.textColor = Color.WHITE;
        
        let arrowUp = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 190, size.y), text: "Up Arrow - Change the direction of gravity to be upwards"});
        arrowUp.textColor = Color.WHITE;
        
        let arrowDown = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 150, size.y + 50), text: "Down Arrow - Change the direction of gravity to be downwards"});
        arrowDown.textColor = Color.WHITE;

        let arrowLeft = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 175, size.y + 100), text: "Left Arrow - Change the direction of gravity to be leftwards"});
        arrowLeft.textColor = Color.WHITE;

        let arrowRight = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 160, size.y + 150), text: "Right Arrow - Change the direction of gravity to be rightwards"});
        arrowRight.textColor = Color.WHITE;

        let pause = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 300, size.y + 250), text: "P - Pause the game"});
        pause.textColor = Color.WHITE;

        let reset = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x + 300, size.y + 250), text: "R - Reset current level"});
        reset.textColor = Color.WHITE;

        
        let controlsBack = this.add.uiElement(UIElementType.BUTTON, "controls", {position: new Vec2(size.x, size.y + 350), text: "Back"});
        controlsBack.size.set(200, 50);
        controlsBack.borderWidth = 2;
        controlsBack.borderColor = Color.WHITE;
        controlsBack.backgroundColor = Color.TRANSPARENT;

        controlsBack.onClick = () =>{
            this.controls.setHidden(true);
            this.main.setHidden(false);
        }

        //ABOUT PAGE
        this.about = this.addUILayer("about");
        this.about.setHidden(true);
        const text2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x, size.y - 250), text: "About"});
        text2.textColor = Color.WHITE;

        let back3 = <Button>this.add.uiElement(UIElementType.BUTTON, "about", {position: new Vec2(size.x, size.y + 350), text: "Back"});
        back3.size.set(200, 50);
        back3.borderWidth = 2;
        back3.borderColor = Color.WHITE;
        back3.backgroundColor = Color.TRANSPARENT;

        let storyLabel = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 490, size.y - 160), text: "STORY:"});
        storyLabel.textColor = Color.YELLOW;
        storyLabel.fontSize = 45;

        let storyText = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 20, size.y - 100), text: "Julliet is a space explorer trying to get back to her home plant after her most recent"});
        storyText.textColor = Color.WHITE;
        let storyText2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 10, size.y - 60), text: "expedition, but her ship doesn't have enough power to make it all the way. She has to"});
        storyText2.textColor = Color.WHITE;
        let storyText3 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 10, size.y - 20), text: "traverse different planets on her path to home and collect energy crystals that power"});
        storyText3.textColor = Color.WHITE;
        let storyText4 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 10, size.y + 20), text: "her ship in order to continue her journey a little at a time. Her special space suit allows"});
        storyText4.textColor = Color.WHITE;
        let storyText5 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 10, size.y + 60), text: "her to control her own gravity independent of the planet she's on, giving her the ability"});
        storyText5.textColor = Color.WHITE;
        let storyText6 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 160, size.y + 100), text: "to traverse her unfamiliar terrain and find th crystals she needs."});
        storyText6.textColor = Color.WHITE;

        let devLabel = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 420, size.y + 180), text: "DEVELOPERS:"});
        devLabel.textColor = Color.YELLOW;
        devLabel.fontSize = 45;
        let devText = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 10, size.y + 240), text: "This game was Developped by Lena Girdhar, John Turrigiano, and John Ignacio using"});
        devText.textColor = Color.WHITE;
        let devText2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x - 57, size.y + 280), text: "the Wolfie2D engine created by students and faculty at Stony Brook University."});
        devText2.textColor = Color.WHITE;
        

        back3.onClick = () => {
            this.about.setHidden(true);
            this.main.setHidden(false);
        };



        //LEVEL SELECT PAGE
        this.levelSelect = this.addUILayer("levelSelect");
        this.levelSelect.setHidden(true);
        let levelSelectLabel = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(size.x, size.y - 300), text: "Level Select"});
        levelSelectLabel.textColor = Color.WHITE;
        levelSelectLabel.fontSize = 40;

        let level1Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x - 300, size.y - 100), text: "Level 1"});
        level1Btn.size = new Vec2(100,100);
        level1Btn.borderColor = Color.WHITE
        level1Btn.borderRadius = 10;
        level1Btn.backgroundColor = Color.TRANSPARENT;


        let level2Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y - 100), text: "Level 2"});
        level2Btn.size = new Vec2(100,100);
        level2Btn.borderColor = Color.WHITE
        level2Btn.borderRadius = 10;
        level2Btn.backgroundColor = Color.TRANSPARENT;

        let level3Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x + 300, size.y - 100), text: "Level 3"});
        level3Btn.size = new Vec2(100,100);
        level3Btn.borderColor = Color.WHITE
        level3Btn.borderRadius = 10;
        level3Btn.backgroundColor = Color.TRANSPARENT;

        let level4Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x - 300, size.y + 100), text: "Level 4"});
        level4Btn.size = new Vec2(100,100);
        level4Btn.borderColor = Color.WHITE
        level4Btn.borderRadius = 10;
        level4Btn.backgroundColor = Color.TRANSPARENT;

        let level5Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y + 100), text: "Level 5"});
        level5Btn.size = new Vec2(100,100);
        level5Btn.borderColor = Color.WHITE
        level5Btn.borderRadius = 10;
        level5Btn.backgroundColor = Color.TRANSPARENT;

        let level6Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x + 300, size.y + 100), text: "Level 6"});
        level6Btn.size = new Vec2(100,100);
        level6Btn.borderColor = Color.WHITE
        level6Btn.borderRadius = 10;
        level6Btn.backgroundColor = Color.TRANSPARENT;

        let levelSelectback = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y + 250), text: "Back"});
        levelSelectback.size.set(200, 50);
        levelSelectback.borderWidth = 2;
        levelSelectback.borderColor = Color.WHITE;
        levelSelectback.backgroundColor = Color.TRANSPARENT;


        level1Btn.onClick = () => {
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
        this.sceneManager.changeToScene(Level1, {}, sceneOptions);
        }

        level2Btn.onClick = () => {
        console.log("level2");
        }

        level3Btn.onClick = () => {
        console.log("level3");
        }

        level4Btn.onClick = () => {
        console.log("level4");
        }

        level5Btn.onClick = () => {
        console.log("level5");
        }

        level6Btn.onClick = () => {
        console.log("level6");
        }
 
        levelSelectback.onClick = () => {
            this.levelSelect.setHidden(true);
            this.main.setHidden(false);
        };



        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            /*
                Init the next scene with physics collisions:

                          ground  player  balloon 
                ground    No      --      -- 
                player    Yes      No      --  
                balloon   Yes      No      No  

                Each layer becomes a number. In this case, 4 bits matter for each

                ground:  self - 000, collisions - 011
                player:  self - 001, collisions - 100
                balloon: self - 010, collisions - 000
            */

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
            this.sceneManager.changeToScene(Level1, {}, sceneOptions);
        }

        // Scene has started, so start playing music
        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});

    }

    unloadScene(): void {

        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music"});
    }
}

