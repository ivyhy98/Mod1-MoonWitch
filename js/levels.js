const canvasText = document.querySelector("#canvas-text");

const ctx2 = canvasText.getContext("2d");
canvasText.width = 800;
canvasText.height = 30;
export const level1 = {
    background: '../images/backgrounds/firstBackground.gif',
    storyText: ["It's finally time for me to leave","I don't know whats in store","But i'll be ready for it"],
    start: function(ctx){
        const image = new Image();
        
        image.src = this.background;
        
        function animate(){
            ctx.drawImage(image, 0, 0);
            ctx.fillRect(0,0,400,100)
        }
     },
    setBackground: function(){

    },
    spawnEnemy: function(){

    },
    update: function(){

    }
     
} 