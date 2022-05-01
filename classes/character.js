class character {
    constructor(HP, level, name) {
        this.player = false;
        this.maxHP = level*20;
        this.HP = HP;
        this.level = level;
        this.experience = level*1000;
        this.damage = level*3 + 10;
        this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage*2];
        // 10% crit rate, on crit 2x damage
        this.defense = .50 + .01*this.level;
        this.lastDamageDealt = 0;
        this.lastHealAmount = 0;
        this.lastAction = 'attack';
        this.lastXpGained = 0;
        this.levelUp = false;
        this.itemsArray = [1, 1 , 1, 1, 1, 1];
        // lowP, midP, lowB, midB, lowD, midD
        if (name === null) {
            this.name = 'opponent';
        } else {
            this.name = name;
        }
        
    }
    //getters
    get getHealth() {
        return this.HP;
    }
    get calculateDMG() {
        return this.damageArray[Math.floor(Math.random()*this.damageArray.length)];
    }
    //functions
    isPlayer(boolean) {
        if (boolean) {
            this.player = true
        } else {
            this.player = false
        }
    }
    setHealth(HP) {
        this.HP = HP;
    }
    applyDamage(damage) {
        this.HP -= damage;
    }
    attack(message, opponent) {
        let dmg = this.calculateDMG;
        if (dmg > this.damage) {
            message.channel.send("Critical Hit!!!")
        }
        opponent.applyDamage(dmg);
        this.lastAction = 'attack'
        this.lastDamageDealt = dmg
        //damage message
    }
    defend(opponent) {
        let dmg = opponent.calculateDMG*(1-this.defense);
        this.applyDamage(dmg);
        opponent.lastDamageDealt = dmg
        //defend message
        this.lastAction = 'defend';
    }
    lowHeal(){
        if (this.itemsArray[0] > 0 ) {
            this.HP += this.level*10;
            //heal message
            this.lastHealAmount = this.level*10;
            this.lastAction = 'heal';
            this.itemsArray[0] -= 1;
        } else {
            this.lastHealAmount = 0;
        }
    }
    midHeal(){
        if (this.itemsArray[1] > 0 ) {
            this.HP += (this.level*10)*1.5; //50% better than regular potion
            //heal message
            this.lastHealAmount = (this.level*10)*1.5;
            this.lastAction = 'heal';
            this.itemsArray[1] -= 1;
        } else {
            this.lastHealAmount = 0;
        }
    }
    angryAle(){
        if (this.itemsArray[2] > 0 ) {
            this.damage = this.damage*1.25; // 25% damage increase, for the combat session
            this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage*2];
            this.itemsArray[2] -= 1;
        }
    }
    ragingAle(){
        if (this.itemsArray[3] > 0 ) {
            this.damage = this.damage*1.5; // 50% damage increase, for the combat session
            this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage*2];
            this.itemsArray[3] -= 1;
        }
    }
    throwingKnife(opponent){
        if (this.itemsArray[4] > 0 ) {
            opponent.applyDamage(this.damage*1.75) // near critical amounts of damage!
            this.lastAction = 'attack'
            this.lastDamageDealt = this.damage*1.75
            this.itemsArray[4] -= 1;
        } else {
            this.lastDamageDealt = 0;
        }
    }
    throwingAxe(opponent){
        if (this.itemsArray[5] > 0 ) {
            opponent.applyDamage(this.damage*2.25) // more than critical damage!
            this.lastAction = 'attack'
            this.lastDamageDealt = this.damage*2.25
            this.itemsArray[5] -= 1;
        } else {
            this.lastDamageDealt = 0;
        }
    }
    updateStats(){
        this.maxHP = this.level*20
        this.damage = this.level*3 + 10
        this.defense = .50 + .01*this.level
        this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage*2];
        this.setHealth(this.level*10 + 50);
    }
    gainXP(message, xpGained) {
        this.experience += xpGained;
        this.lastXpGained = xpGained;
        let oldLevel = this.level;
        let oldMaxHP = this.maxHP;
        let oldDamage = this.damage;
        let oldHeal = this.level*6;
        let oldDefense = this.defense;
        this.level = Math.floor(this.experience/1000);
        this.updateStats()
        //updates level, you gain a level for each 1k xp you have.
        //xp gained message
        if (oldLevel != this.level) {
            this.levelUp = true;
            this.HP = this.maxHP;
            message.channel.send(`You leveled up!\nPlayer Level: ${oldLevel} -> ${this.level}\nPlayer HP: ${oldMaxHP} -> ${this.maxHP}\nPlayer Attack: ${oldDamage} -> ${this.damage}\nPlayer Defense ${oldDefense}% -> ${this.defense}%\nPlayer Heal: ${oldHeal} -> ${this.level*6}`)
        }
    }


    async combat(message, player, opponent, userChoice) {
        // prompt player with choices
        // if player choice is to attack, attack
        let flee = false;

        let health = await message.channel.send(`Your HP: ${player.getHealth}\nOpponent HP: ${opponent.getHealth}`)
        if (userChoice.returnValue === "attack") {
            //prompt user for small/medium/large potion
            player.attack(message, opponent);
            message.channel.send(`You dealt ${player.lastDamageDealt} damage to the ${opponent.name}`)
        } 
        else if (userChoice.returnValue === "defend") {
            //prompt user for small/medium/large potion
            player.defend(opponent);
            message.channel.send("You braced yourself for an attack")
            message.channel.send(`The opponent did ${opponent.lastDamageDealt} damage`)
        }
        else if (userChoice.returnValue === 'items') {
            message.channel.send(`You quickly pull out a...`)
        }
        else if (userChoice.returnValue === "lowP") {
            if (player.itemsArray[0] < 1) { message.channel.send("You planned to take a sip of your potion only to realize that the bottle is empty!")}
            else {
                player.lowHeal()
                message.channel.send(`You took a sip of your potion to heal ${player.lastHealAmount} HP\nPotion Uses Left: ${player.itemsArray[0]}`)
            }
        } 
        else if (userChoice.returnValue === "midP") {
            if (player.itemsArray[0] < 1) { message.channel.send("You planned to take a sip of your potion only to realize that the bottle is empty!")}
            else {
                player.midHeal()
                message.channel.send(`You took a sip of your potion to heal ${player.lastHealAmount} HP\nPotion Uses Left: ${player.itemsArray[1]}`)
            }
        } 
        else if (userChoice.returnValue === "lowB") {
            if (player.itemsArray[2] < 1) { message.channel.send("You planned to take a sip of angry ale just to realize the ale jug was empty!")}
            else {
                player.angryAle();
                message.channel.send(`You took a sip of your angry ale to buff your damage! Damage: ${player.level*3+10} -> ${player.damage}\nAngry Ale Uses Left: ${player.itemsArray[2]}`)
            }
        }
        else if (userChoice.returnValue === "midB") {
            if (player.itemsArray[3] < 1) { message.channel.send("You planned to take a sip of raging ale just to realize the ale jug was empty!")}
            else {
                player.ragingAle();
                message.channel.send(`You took a sip of your raging ale to buff your damage! Damage: ${player.level*3+10} -> ${player.damage}\nRaging Ale Uses Left: ${player.itemsArray[3]}`)
            }
        }
        else if (userChoice.returnValue === "lowD") {
            if (player.itemsArray[4] < 1) { message.channel.send("You planned to throw a knife at them quickly and skillfully but then you realized you're out of them!")}
            else {
                player.throwingKnife(opponent)
                message.channel.send(`You quickly throw a knife at the ${opponent.name} dealing ${player.lastDamageDealt} damage!\nThrowing Knives Left: ${player.itemsArray[4]}`)
            }  
        } 
        else if (userChoice.returnValue === "midD") {
            if (player.itemsArray[4] < 1) { message.channel.send("You planned to throw an axe at them quickly and skillfully but then you realized you're out of them!")}
            else {
                player.throwingAxe(opponent)
                message.channel.send(`You quickly throw an axe at the ${opponent.name} dealing a devastating ${player.lastDamageDealt} damage!\nThrowing Axes Left: ${player.itemsArray[5]}`)
            }
        } 
        else if (userChoice.returnValue === "flee") {
            flee = true;
            message.channel.send("You ran away with your tail between your legs while your opponent laughs at you deciding to let you leave...")
        } 
        else {
            message.channel.send("You stood still in fear, while you were distracted you got attacked!")
        }
        
        // after player choice 
        if (userChoice.returnValue != "defend" && flee != true && opponent.getHealth > 0) {
            if (userChoice.returnValue != "items") {
                opponent.attack(message, player);
                message.channel.send(`The ${opponent.name} attacked you!\nThey dealt ${opponent.lastDamageDealt} damage`)
            }
        }

        //display HP after dmg
        health.edit(`Your HP: ${player.getHealth}\nOpponent HP: ${opponent.getHealth}`);
        if (flee) {
            userChoice.returnValue = "done"
        }
        else if (player.getHealth <= 0) {
            message.channel.send("**YOU DIED...\nGAME OVER...**")
            console.log("GAME OVER")
            userChoice.returnValue = "done"
        }
        else if (opponent.getHealth <= 0 ) {
            message.channel.send(`You have slayed the ${opponent.name}!\nYou gain ${opponent.level*100} experience for winning!`)
            player.gainXP(message, opponent.level * 100);
            console.log("YOU WIN")
            userChoice.returnValue = "done"
        }
    }  
}

module.exports.character = character;

