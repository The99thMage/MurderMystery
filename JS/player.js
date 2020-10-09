class Player{
    constructor(){
        this.index = null;
        this.xPos = 0;
        this.yPos = 0;
        this.name = null;
        this.charecter = null;
    }

    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on('value', (data)=>{
            playerCount = data.val();
        });
    }

    updateCount(count){
        database.ref('/').update({
            playerCount: count
        });
    }

    updateName(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            charecter: this.charecter,
            xPos: this.xPos,
            yPos: this.yPos
        });
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        });
    }
}