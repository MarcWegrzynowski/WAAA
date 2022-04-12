import "character.js";
import { character } from "character.js";
//import { character } from "characer.js";

function promptUserCombat() {
    //TODO: Figure out how the bot is ggoing
    combat(player, opponent, userChoice);
}

function combat(player, opponent, userChoice) {
    // prompt player with choices
    // if player choice is to attack, attack
    let flee = false;
    if (userChoice === "attack") {
        //prompt user for small/medium/large potion
        player.attack(opponent);
    }
    if (userChoice === "defend") {
        //prompt user for small/medium/large potion
        player.defend(opponent);
    }
    if (userChoice === "heal") {
        player.heal()
    } 
    if (userChoice === "flee") {
        flee = true;
    } else {
        //if player chooses to attack or otherwise if all else fails they still attack
        player.attack(opponent);
    } 
    
    // after player choice 

    opponent.attack(player);
    if (!flee) {
        if (player.getHealth > 0) {
            if (opponent.getHealth > 0) {
                //opponent alive combat continues
                //prompt user again before recursively running combatButton prompt

            } else {
                //opponent dead combat ends, player gains experience, can level up
                player.gainXP(500);
            }
        } else {
            //player died, game over.
        }
    } else {
        //user decides to flee
        //flee message then continue text adventure
    }

}

``` 
NOTE: This code is unfinished do not use! 
Uploaded only for the purpose of making 
edits on another computer

TODO: Figure out how the bot is going to pass
on the users choices into the combat class  
```