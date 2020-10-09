class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        });
    }

    updateState(state){
        database.ref('/').update({
            gameState: state
        });
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");

            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }
    }

    async getCharecters(){
        var charecterListRef = await database.ref('charecters');
        charecterListRef.on("value", (data)=>{
            charecterList = data.val();
        });
    }

    async getPlayableCharecters(){
        var playableCharecterRef = await database.ref('availableCharecters')
        playableCharecterRef.on("value", (data)=>{
            charecters = data.val();
        });
    }

    updateCharecters(data){
        database.ref('/').update({
            charecters: data
        });
    }

    updatePlayableCharecters(data){
        database.ref('/').update({
            availableCharecters: data
        });
    }

    selectRoles(){
        console.log(charecterList);

        for(var x = 2; x < playerCount; x++){
            shuffle(charecterList, true);
            var chosenCharecter = charecterList.shift();
            console.log(chosenCharecter);
            charecters.push(chosenCharecter);

            this.updateCharecters(charecterList);
            this.updatePlayableCharecters(charecters);
        }

        shuffle(charecters);
        this.updatePlayableCharecters(charecters);

        console.log("finished");
    }

    giveRole(){
        var index = 0;

        for(var plr in allPlayers){
            index += 1;

            if(index === player.index){
                player.charecter = charecters[0];
            }else{
                charecters.shift();
            }
        }
    }

    getTimer(){
        var timerRef = database.ref('timer');
        timerRef.on("value", function(data){
            timer = data.val();
        });
    }

    updateTime(time){
        database.ref('/').update({
            timer: time
        });
    }

    getRolesAssigned(){
        var rolesRef = database.ref('rolesAssigned');
        rolesRef.on("value", function(data){
            rolesAssigned = data.val();
        });
    }

    updateRolesAssigned(data){
        rolesAssigned = data;
        database.ref('/').update({
            rolesAssigned: data
        });
    }

    createSprites(){
        for(var x = 0; x < playerCount; x++){
            var charecter = createSprite(random(0, 200), random(0,200));
            players.push(charecter);
        }
    }

    countdown(){
        this.getRolesAssigned();
        if(timer > 0){
            this.getTimer();

            if(frameCount % 60 === 0){
                this.updateTime(timer - 1);
                this.getCharecters();
                this.getPlayableCharecters();
                Player.getPlayerInfo();
            }
        }else if(rolesAssigned === false){
            this.selectRoles();
            this.updateRolesAssigned(true);
            this.giveRole();

            this.createSprites();

            gameState = 1;
            this.updateState(1);
        }
    }


    play(){
        form.hideAll();
        var index = 0;

        Player.getPlayerInfo();

        var x;
        var y;

        for(var plr in allPlayers){
            index += 1;

            x = allPlayers[plr].xPos;
            y = allPlayers[plr].yPos;

            if(index === player.index){
                fill("red");

                camera.position.x = players[index - 1].x;
                camera.position.y = players[index - 1].y;

            }else{
                fill("white");
            }
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            if(keyIsDown(38) && player.index !== null){
                player.yPos -= 1;
            }

            player.updateName();
        }

        drawSprites();
    }
}