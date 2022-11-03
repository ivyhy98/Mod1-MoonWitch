export class InputHandler{
    constructor(){
        this.pressed = [];
        document.addEventListener('keydown',(event)=>{
            if(!this.pressed.includes(`${event.key}`)){
                this.pressed.push(event.key);
                
            }
        })
        document.addEventListener('keyup',(event)=>{
            this.pressed.pop();

        })
    }
} 