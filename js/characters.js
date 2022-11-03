import { ctx } from "./script.js";
import { game } from "./script.js";
export class Player {
  constructor(name, element) {
    this.name = name || "noName";
    this.element = element || "fire";
    this.health = 100;
    this.position = { x: -65, y: 230};
    this.height = 2176 / 17;
    this.width = 6336 / 22;
    this.image = new Image();
    this.image.src = this.getImage();
    this.frameY = 1;
    this.frameX = 0;
    //this.states = [{idle},{run},{attack1},]
    this.states = [
        { frameY: 0, frameNum: 6 }, //idle 0
        {frameY: 1, frameNum: 7}, //running 1
        {frameY: 5, frameNum: 7}, //attack1 2
        {frameY: 10, frameNum: 16}, //heavyAttack 3
        {frameY: 3,frameNum: 3}];
    this.currentState = this.states[0];
    this.gameFrame = 0;
    this.staggerFrames = 5;
  }
  getImage() {
    switch (this.element) {
      case "fire":
        return (this.image.src = "../images/FireHero/fire-hero.png");
      case "water":
        return (this.image.src = "../images/WaterHero/water-hero.png");
      case "earth":
        return (this.image.src = "../images/EarthHero/earth-hero.png");
      case "metal":
        return (this.image.src = "../images/MetalHero/metal-hero.png");
    }
  }
  update(){
    switch(game.inputs.pressed[0]){
        case undefined:
            this.currentState = this.states[0];
            break;
        case 'ArrowLeft':
            this.currentState = this.states[1];
            if(this.position.x == -100){
                return;
            } else{
                this.position.x--;
            }
            break;
        case 'ArrowRight':
            this.currentState = this.states[1];
            if(this.position.x == 750){
                return;
            }else{
                this.position.x++
            }
            break;
        case 'a':
            this.currentState = this.states[2];
            break;
        case 's':
            this.currentState = this.states[3];
            break;
    }
  }
  draw(ctx) {
    ctx.save();

    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.currentState.frameY * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if(this.gameFrame % this.staggerFrames == 0){
        if (this.frameX < this.currentState.frameNum) this.frameX++;
        else this.frameX = 0;
    }
    
    this.gameFrame++;
    ctx.restore();
  }
}