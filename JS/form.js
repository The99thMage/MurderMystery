class Form{
    constructor(){
        this.input = createInput();
        this.button = createButton("Join");
        this.title = createElement("h1");
        this.greeting = createElement("h1");

        this.reset = createButton("Reset");

        this.title.html("Murder Mystery");
    }

    hide(){
        this.input.hide();
        this.button.hide();
    }

    hideAll(){
        this.greeting.hide();
        this.title.hide();
    }

    display(){
        this.title.position(displayWidth/2, displayHeight/3);
        this.greeting.position(displayWidth/2, displayHeight/3 + 30);
        this.title.center("horizontal");

        this.input.position(displayWidth/2, displayHeight/2);
        this.input.center("horizontal");
        this.button.position(displayWidth/2, displayHeight/2 + 40);
        this.button.center("horizontal");

        this.reset.position(0,0);

        this.button.mousePressed(()=>{
            this.hide();

            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.updateName();
            player.updateCount(playerCount);

            this.title.html("Welcome " + player.name + "!");
            this.greeting.html("Now waiting for other players...");
            this.greeting.center("horizontal");
        });

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.updateState(0);
            game.updateTime(3);
            game.updateRolesAssigned(false);

            game.updateCharecters(["civilian","psychic", "bodybuilder", "veteran", "runner"]);
            game.updatePlayableCharecters(["detective", "murderer"]);
            database.ref('/').update({
                players: null
            });
        });

        if(rolesAssigned === true){
            this.greeting.html("You will be..." + charecters[player.index - 1]);
        }
    }
}