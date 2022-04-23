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
        this.potionUses = 10;
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
        let dmg = opponent.calculateDMG*(1-defense);
        this.applyDamage(dmg);
        opponent.lastDamageDealt = dmg
        //defend message
        this.lastAction = 'defend';
    }
    heal(){
        if (this.potionUses > 0 ) {
            this.HP += this.level*10;
            //heal message
            this.lastHealAmount = this.level*10;
            this.lastAction = 'heal';
            this.potionUses -= 1;
        } else {
            this.lastHealAmount = 0;
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
            message.channel.send(`You leveled up!\nPlayer Level: ${oldLevel} -> ${this.level}\nPlayer HP: ${oldMaxHP} -> ${this.maxHP}\nPlayer Attack: ${oldDamage} -> ${this.damage}\nPlayer Defense %${1-oldDefense} -> %${1-this.defense}\nPlayer Heal: ${oldHeal} -> ${this.level*6}`)
        }
    }


    combat(message, player, opponent, userChoice) {
        // prompt player with choices
        // if player choice is to attack, attack
        let flee = false;

        message.channel.send(`Your HP: ${player.getHealth}\nOpponent HP: ${opponent.getHealth}`)
        if (userChoice.returnValue === "attack") {
            //prompt user for small/medium/large potion
            player.attack(message, opponent);
            message.channel.send(`You dealt ${player.lastDamageDealt} damage to the ${opponent.name}`)
        } 
        if (userChoice.returnValue === "defend") {
            //prompt user for small/medium/large potion
            player.defend(opponent);
            message.channel.send("You braced yourself for an attack")
            message.channel.send(`The opponent did ${opponent.lastDamageDealt} damage`)
        } 
        if (userChoice.returnValue === "heal") {
            player.heal()
            message.channel.send(`You took a sip of your potion to heal ${player.lastHealAmount} HP\nPotion Uses Left: ${player.potionUses}`)
            if (player.potionUses < 1) { message.channel.send("You realize the bottle is empty!")}
        } 
        if (userChoice.returnValue === "flee") {
            flee = true;
            message.channel.send("You ran away with your tail between your legs while your opponent laughs at you deciding to let you leave...")
        } 
        if (userChoice.returnValue === 'string') {
            //if player chooses to attack or otherwise if all else fails they still attack
            message.channel.send("You stood still in fear, while you were distracted you got attacked!")
        } 
        
        // after player choice 
        if (userChoice.returnValue != "defend" && flee != true && opponent.getHealth > 0) {
            opponent.attack(message, player);
            message.channel.send(`The ${opponent.name} attacked you!\nThey dealt ${opponent.lastDamageDealt} damage`)
        }

        //display HP after dmg
        message.channel.send(`Your HP: ${player.getHealth}\nOpponent HP: ${opponent.getHealth}`);
        if (flee) {
            userChoice.returnValue = "done"
        }
        if (player.getHealth <= 0) {
            message.channel.send("**YOU DIED...\nGAME OVER...**")
            console.log("GAME OVER")
            userChoice.returnValue = "done"
        }
        if (opponent.getHealth <= 0 ) {
            message.channel.send(`You have slayed the ${opponent.name}!\nYou gain ${opponent.level*100} experience for winning!`)
            player.gainXP(message, opponent.level * 100);
            console.log("YOU WIN")
            userChoice.returnValue = "done"
        }
    }  
}

module.exports.character = character;

