class character {
    constructor(HP, level) {
       this.HP = HP;
       this.level = level;
       this.experience = 5000;
       this.damage = level*3 + 10;
       this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage, this.damage*2];
       // 10% crit rate, on crit 2x damage
    }
    //getters
    get getHealth() {
        return this.HP;
    }
    get calculateDMG() {
        return this.damageArray[Math.floor(Math.random()*this.damageArray.length)];
    }
    //functions
    setHealth(HP) {
        this.HP = HP;
    }
    applyDamage(damage) {
        this.HP -= damage;
    }
    attack(opponent) {
        opponent.applyDamage(this.calculateDMG);
    }
    gainXP(xpGained) {
        this.experience += xpGained;
        this.level = this.experience/1000;
        this.setHealth(this.level*10 + 50);
        //updates level, you gain a level for each 1k xp you have.
    }
}

/*
//player = new character(1000, 10); //hp = 1000, level = 10
//enemy = new character (100, 10);

//Class & Class Function Tests
```All Tests Passed```
player = new character(1000, 10);
console.log(player.getHealth)
console.log(player.calculateDMG)
player.setHealth(900); // changing health
console.log(player.getHealth)
player.applyDamage(500); // recieving damage
console.log(player.getHealth)

goblin = new character(100, 10);
player.attack(goblin);
console.log(goblin.getHealth)
*/