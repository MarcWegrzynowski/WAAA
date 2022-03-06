class character {
    constructor(HP, level) {
       this.HP = HP;
       this.level = level;
       this.damage = level*10;
       this.damageArray = [this.damage, this.damage, this.damage, this.damage, this.damage*2];
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