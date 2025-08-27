import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import ShaderRegistry from "../../Wolfie2D/Registry/Registries/ShaderRegistry";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";

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
        this.load.image("menu_bg", "hw5_assets/images/menu_background.png");
        this.load.audio("menu_music", "hw5_assets/music/menu_music.wav")
        this.load.audio("select", "hw5_assets/sounds/select.wav")
    }

    startScene(): void {
        this.viewport.setBounds(0,0,1200,800);
        
        this.addLayer("background", 0);
        this.addLayer("backing", 1);
        this.main = this.addUILayer("Main");

        let bg = this.add.sprite("menu_bg", "background");
		bg.scale.set(2, 2);
		bg.position.copy(this.viewport.getCenter());

        let box = <Rect>this.add.graphic("RECT", "backing", {position: new Vec2(600, 300), size: new Vec2(1200, 1000)});
        box.color = new Color(122, 122, 122, 0.8);
        box.visible = false;
        
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);

        this.viewport.setZoomLevel(1);

        //MAIN MENU PAGE

        this.logo = this.add.sprite("logo", "Main");
        this.logo.scaleX = 0.5;
        let center = this.viewport.getCenter();
        this.logo.position.set(center.x, center.y - 270);
        


        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 40), text: "Play Game"});
        playBtn.backgroundColor = new Color(58, 13, 82, 0.8);
        playBtn.borderColor = Color.BLACK;
        playBtn.borderRadius = 10;
        playBtn.borderWidth = 5;
        playBtn.setPadding(new Vec2(70, 50));
        playBtn.size = new Vec2(300,70);
        playBtn.fontSize = 50;

        let controlsBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 130), text: "Controls"});
        controlsBtn.backgroundColor = new Color(58, 13, 82, 0.8);
        controlsBtn.borderColor = Color.BLACK;
        controlsBtn.borderRadius = 10;
        controlsBtn.borderWidth = 5;
        controlsBtn.setPadding(new Vec2(70, 50));
        controlsBtn.size = new Vec2(300,70);
        controlsBtn.fontSize = 50;

        controlsBtn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: true});
            this.controls.setHidden(false);
            this.main.setHidden(true);
            box.visible = true;
        }

        



        let levelSelectBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 220), text: "Level Select"});
        levelSelectBtn.backgroundColor = new Color(58, 13, 82, 0.8);
        levelSelectBtn.borderColor = Color.BLACK;
        levelSelectBtn.borderRadius = 10;
        levelSelectBtn.borderWidth = 5;
        levelSelectBtn.setPadding(new Vec2(70, 50));
        levelSelectBtn.size = new Vec2(300,70);
        levelSelectBtn.fontSize = 50;

        levelSelectBtn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            this.levelSelect.setHidden(false);
            this.main.setHidden(true);
        }
        

        let aboutBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {position: new Vec2(size.x, size.y + 300), text: "About"});
        aboutBtn.backgroundColor = new Color(58, 13, 82, 0.8);
        aboutBtn.borderColor = Color.BLACK;
        aboutBtn.borderRadius = 10;
        aboutBtn.borderWidth = 5;
        aboutBtn.setPadding(new Vec2(50, 10));
        aboutBtn.size = new Vec2(300,50);
        aboutBtn.fontSize = 40;


        aboutBtn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            this.about.setHidden(false);
            this.main.setHidden(true);
            box.visible = true;
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

        let freeflips = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x - 300, size.y + 300), text: "CHEAT: F - Give yourself more flips"});
        freeflips.textColor = Color.WHITE;

        let godmode = <Label>this.add.uiElement(UIElementType.LABEL, "controls", {position: new Vec2(size.x + 300, size.y + 300), text: "CHEAT: I - Godmode"});
        godmode.textColor = Color.WHITE;

        
        let controlsBack = this.add.uiElement(UIElementType.BUTTON, "controls", {position: new Vec2(size.x, size.y + 350), text: "Back"});
        controlsBack.size.set(200, 50);
        controlsBack.borderRadius = 10;
        controlsBack.borderColor = Color.BLACK;
        controlsBack.borderWidth = 5;
        controlsBack.backgroundColor = new Color(58, 13, 82, 0.8);
        controlsBack.onClick = () =>{
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            this.controls.setHidden(true);
            this.main.setHidden(false);
            box.visible = false;
        }

        //ABOUT PAGE
        this.about = this.addUILayer("about");
        this.about.setHidden(true);
        const text2 = <Label>this.add.uiElement(UIElementType.LABEL, "about", {position: new Vec2(size.x, size.y - 250), text: "About"});
        text2.textColor = Color.WHITE;

        let aboutBack = <Button>this.add.uiElement(UIElementType.BUTTON, "about", {position: new Vec2(size.x, size.y + 350), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderRadius = 10;
        aboutBack.borderColor = Color.BLACK;
        aboutBack.borderWidth = 5;
        aboutBack.backgroundColor = new Color(58, 13, 82, 0.8);

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
        

        aboutBack.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            this.about.setHidden(true);
            this.main.setHidden(false);
            box.visible = false;
        };



        //LEVEL SELECT PAGE
        this.levelSelect = this.addUILayer("levelSelect");
        this.levelSelect.setHidden(true);
        let levelSelectLabel = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(size.x, size.y - 300), text: "Level Select"});
        levelSelectLabel.textColor = Color.WHITE;
        levelSelectLabel.fontSize = 40;
        levelSelectLabel.useCustomShader(ShaderRegistry.LABEL_SHADER);

        let level1Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x - 300, size.y - 100), text: "Cathonis", color: Color.BLACK});
        level1Btn.size = new Vec2(150,150);
        level1Btn.borderColor = Color.BLACK
        level1Btn.borderRadius = 75;
        level1Btn.backgroundColor = Color.MAGENTA;
        


        let level2Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y - 100), text: "Frosterra"});
        level2Btn.size = new Vec2(150,150);
        level2Btn.borderColor = Color.WHITE
        level2Btn.borderRadius = 75;
        level2Btn.backgroundColor = Color.CYAN;

        let level3Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x + 300, size.y - 100), text: "Laocoon"});
        level3Btn.size = new Vec2(150,150);
        level3Btn.borderColor = Color.WHITE
        level3Btn.borderRadius = 75;
        level3Btn.backgroundColor = new Color(88, 8, 92, 100);

        let level4Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x - 300, size.y + 100), text: "Simerra"});
        level4Btn.size = new Vec2(150,150);
        level4Btn.borderColor = Color.WHITE
        level4Btn.borderRadius = 75;
        level4Btn.backgroundColor = new Color(191, 189, 28, 1);

        let level5Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y + 100), text: "Vulcanus"});
        level5Btn.size = new Vec2(150,150);
        level5Btn.borderColor = Color.WHITE
        level5Btn.borderRadius = 75;
        level5Btn.backgroundColor = Color.RED;

        let level6Btn = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x + 300, size.y + 100), text: "Merecai"});
        level6Btn.size = new Vec2(150,150);
        level6Btn.borderColor = Color.WHITE
        level6Btn.borderRadius = 75;
        level6Btn.backgroundColor = Color.ORANGE;

        let levelSelectback = this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x, size.y + 280), text: "Back"});
        levelSelectback.size.set(200, 50);
        levelSelectback.borderWidth = 10;
        levelSelectback.borderColor = Color.BLACK;
        levelSelectback.borderWidth = 5;
        levelSelectback.backgroundColor = new Color(58, 13, 82, 0.8);


        level1Btn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
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
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level2, {}, sceneOptions);
        }

        level3Btn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level3, {}, sceneOptions);
        }

        level4Btn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level4, {}, sceneOptions);
        }

        level5Btn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level5, {}, sceneOptions);
        }

        level6Btn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
                    collisions:
                    [
                        [0, 1, 1],
                        [1, 0, 0],
                        [1, 0, 0]
                    ]
                }
            }
            this.sceneManager.changeToScene(Level6, {}, sceneOptions);
        }
 
        levelSelectback.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});
            this.levelSelect.setHidden(true);
            this.main.setHidden(false);
        };



        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "select", loop: false, holdReference: false});

            let sceneOptions = {
                physics: {
                    groupNames: ["ground", "player", "enemy"],
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
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "menu_music"});
    }
}

