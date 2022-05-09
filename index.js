//=================================================================================
//  Imports
//=================================================================================
const fs = require('node:fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const character = require ('./classes/character.js')

//=================================================================================
//  Client Delcaration
//=================================================================================

const client = new DiscordJS.Client({
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
    ],
})

//=================================================================================
//  Command Handler
//=================================================================================

const prefix = "!"

client.commands = new DiscordJS.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))



for (file of commandFiles) {
	const commandName = file.split(".")[0] //getting the command name
    const command = require(`./commands/${commandName}`)
    client.commands.set(commandName, command)
}

//=================================================================================
//  Global Variables
//=================================================================================

// Angels Variables
var player = new character.character(200, 10, 'player');
var returnObject = {returnValue: 'string'}
var itemObject = {returnValue: 'string'}
var textArray = ['First Text, Press continue to see second text', 'Second text, Press continue to see third text','Third text, no button after this']

var actOneArray = [
    "You wakeup in a wagon.\nAs you start to come to you notice the wagon is smack dab in the middle of a forest and you're laying in the back full of hay.\nYou're confused, dehydrated and seem to have an aching pain on the left side of your jaw.",
    "The Wagon Driver notices the noise you're making behind him. He doesn't seem to appreciate that you're in his wagon for free. Halfway through the trip he kicks you off the wagon to fend for yourself. You give him some rude gesture which he returns in kind, only afterwards do you think it was a bad idea realizing your now stuck in the middle of some forest.",
    "Seeing as you have nothing better to do you start walking around the forest. You take a stop by a river to get some water and you decide to pee by nearby greenery.",
    "As you relieve yourself you notice the greenery is making some strange noises. Suddenly you see the greenery stand up. At this point you notice it wasn't greenery... It was a goblin, and you just pissed on him. He clearly doesn't seem very happy.",
    "The goblin is making a bunch of noises and while you can't understand him, you figured he's not saying very nice things about you. After the goblin has had his fill at yelling at you he takes out his club and decides that words are not enough and violence was the answer. You also prepare yourself to fight, grabbing a nearby pointy stick.",
    "After dealing with the goblin and having finished your not so peaceful trip to empty the waters, you decide it's probably time to make a break out of the forest to so you can find a way back to town.",
    "Sometime later...\n\nAfter a few hours of walking and almost losing your life after snacking on a few colorful mushrooms you found along the way, you're fairly certain that you have no idea how to get out of the forest.",
    "Using all of your grand brilliant mind you pick up a nearby stick *that isn't your trusty weapon of choice (sharp stick)*, and you throw it to the ground,",
    "letting it land, it points to a direction, you're not too sure if it's North or South but you decide that's the way you're gonna go until you get out of the forest. Tired and hungry, you march onward.",
    "A few hours later...\n\nYou're still walking with no end insight of the forest and man, you are HUNGRY. Your nose twitches like an animal, swearing to you that it smells something tasty in the distance.",
    "Losing control of your legs, you find your body limping towards that direction...",
    "As you get closer to the smell of the food you also notice the scent and light of a campfire in the dark and next to it, a rabbit on a stick, roasting on an open fire. Practically calling your name.",
    "You look around...\nNo one seems to be around...\nSurely one bite wouldn't hurt.\n...",
    "In a matter of seconds the whole rabbit is gone and you're feeling great. You stand up and get ready to keep going on your way to leave the forest.",
    "As you whistle and walk away, you bump into a pretty sturdy tree... For a tree it didn't seem so bad bumping into it.",
    "You look up at the tree that you bumped into only to find out it wasn't a tree but a fairly upset looking hobgoblin. Needless to say you're pretty sure why he's upset. But before you can think of anything else. He's already trying murder you for eating his dinner.",
    "You somehow manage to survive an encounter with the hobgoblin. You felt a bit bad for stealing his dinner but the empathy wore off pretty quickly after you remember him trying to murder you. Looking back you sure are glad you had that rabbit before fighting him.",
    "Thinking about your next course of action you look up the sky taking a look at the stars. Its gotten pretty late. You decide to camp in what used to be the hobgoblin's den.",
    `As you lay in this surprisingly comfortable pile of leaves and grasses that was a "bed" you try and get some sleep. You count some rabbits to fall asleep, getting a bit hungry again thanks to the brawl with that hobgoblin. Eventually you doze off and begin falling asleep... As you sleep, you dream that you get out of the forest and making it back to town. After that the dream gets a bit more crazy. But that's a story for another time...`,
    "THE END",
]

//story segment continuing after demo below

/* Opening */

var theArray1 = [
	"You wakeup in a wagon.\nAs you start to come to you notice the wagon is leaving the city and you're laying in the back full of hay. \nYou\'re confused, dehydrated and seem to have an aching pain on the left side of your jaw.",
	"The Wagon Driver hears some noise behind him. He notices you and he doesn't appreciate that you're in his wagon for free. Halfway through the trip he kicks you off the wagon to fend for yourself. Realizing you have no idea where you are and there seems to be no road, you start walking after the wagon until it fades from sight. Wandering through the forest for what feels like hours, you begin to feel the soreness in your feet and contemplate setting up some traps for hunting when a cry erupts from a nearby part of the woods.",
	"Help, anyone help! Echoes through the forest, and following the sound leads you to a young boy who looks to be 11 or 12 years old.",
	"Stranger, please help! Me and my sister were gathering some food and tinder from the woods when these bandits appears and-!",
	"As the young boy stops talking, a gruff man appears and looks directly at you and the boy. Hand over the kid and you don't have to get hurt... too much... And with that he brandishes a hatchet..."
]

/* Combat 1 */
//Normal Bandit combatant

var theArray2 = [
	"After a brief battle, a well timed strike takes the bandit down, and the boy looks at you in bewilderment. W-wow! Can you help me rescue my sister? She shouldn't be too far from here. Please Please Please?",
	"Realizing you got yourself into something, you decide to do the honorable thing and rescue the boy's sister. After an hour of following the trail the bandit left, you find another trail that leads to a camp.",
	"Luckily, the sister seems to be unharmed but is tied to a poll. With a little effort you free the boy's sister and turn to leave, but are confronted by another bandit.", "Oi, who are you suppose to be, some sort of hero? We don't like hero's around here.",
	"And with that the bandit draws a scimitar."
]

/* Combat 2 */
//Weak Bandit combatant

var theArray3 = [
	"Much like the first bandit, this one also falls after a single well timed strike. Unfortunately, this camp was for more than two bandits and multiple seem to have arrived and simply watched the fight.",
	" One seems to think themselves brave enough to face you, but a quick glance causes them to trip backwards. A couple of the bandits cry out Now you've done it, just wait until the boss learns about this! as you leave the camp with the kids."
]

/* Scene change */

var theArray4 = [
	"The two kids are happy to be reunited and ask that you follow them home so they aren't ambushed by the bandits again. Complying, you help guide them back to a small town in the forest before having the realization you have no idea where you are.",
	"After saying farewell to the kids, they scamper off to find their parents and tell them all about the stranger who saved them. Now, hopefully this town will have someone who can point you in the right direction to get back to the city."
]

/* Character is at town */
/* Alchemist lines */

var npcDialogue = [
	"Welcome to the shop, I sell consumables",
	/*Alchemist Attempt Dialogue*/
	"No, I don't chat about people's lives, I only sell things. Now buy, browse or leave",
	/* Alchemist sells consumables */
	/*Tavern  lines */
	"Welcome to the tavern, want a drink?",
	/*Tavern Attempt Dialogue*/
	"Sorry, this isn't the right time for a chat",
	/* Tavern sells full heal (Simple) */
	/* Mayor lines */
	"Greetings stranger!",
	/*Mayor Attempt Dialogue*/
	"Sorry, I can't talk now.",
	/*Mayor Attempt Quest*/
	"You want a map to get back to where again? I'm afraid I can't help ya there but I can get you a map to the nearest crossroads.",
	"How long? Tomorrow I'll have it so why don't ya take a rest now. Those kids are mightily grateful for what you did"
]


/* This beings the village siege */
/* Defending Village */
var defendVillageArr = [
	"After a rest, you awake to shouts and panic. Exiting your room at the tavern, you notice the tavern keep fighting some bandits that have stormed the tavern.",
	"Realizing the town is under attack, you rush over to help the tavern keep fend off the bandits. The tavern keep quickly shouts to you, You take that one, I got these two."
]

/* Combat 1 */
//Normal bandit

var normalBanditArray = [
	"After defeating the bandit, you feel dismay as there seems to be many more that still remain. Just as you are about to check outside, two more bandits enter before being taken down by the tavern keep.",
	"Giving a slight nod, you move outside the tavern to see fighting in the streets as guards and bandits battle it out. Looking around, a larger, more intimidating bandits seems to be giving orders and organizing the assault.",
	"You reason that taking him down will turn the tides, so you charge and brace for battle."
]

/* Combat 2 */
//Stronger bandit

var strongerBandit = [
	"After beating that bandit into submission, you realize the battlefield had grown silent and everyone watched your fight.",
	"Somewhere from within the town, a rallying cry could be heard and the guards pushed with renewed spirits against the bandits, driving them from the town.",
	"Deciding that the action was over, you return to your room to rest up and prepare for tomorrow."
]

/* Free roam */

/* Mayor Quest */
var mayorQuest = [
	"Thank you for your help during that, but I have some bad news for ya. The only way out of this forest is through either royal checkpoint, which are closed during this time, or the old bridge.",
	"See, the old bridge is where the bandits reside. But, I have some spare healing potions that you can have so the journey is safer to take.",
	"Good luck!"
]

/* Obtain map */


/* Embarking on the final mission */
var finalMission1 = [
	"Waving goodbye to the village, you head off towards the old bridge and wonder what kind of danger you'll have to face.",
	"Reaching the bridge you notice a way to sneak in, but it might be difficult to do. (Level 12+ required) Or, the other option is to take down the two bandit guards that stand between you and escaping this forest.",
]
var finalMission2 = [
	/* Skip route */
	"Thankfully, that time in the forest made you more adept at sneaking around and you manage to make it to the other side of the bridge.",
]
var finalMission3 = [	/* Fight route */
	"Deciding that sneaking around might be too difficult, you decide to get close to the first bandit and jump out and surprise them."
]
/*Combat 1*/
//Normal Bandit
var finalMission4 = [
	"Taking the first one down, the second one seems shocked before readying themselves for combat",
]

var theArray5 = [
	/*Combat 2*/
	//Normal Bandit
	"After taking the bandit guards out, you manage to sneak the rest of the way and get across the bridge.",
	/* After either route */
	"After crossing the bridge, you breathe a sigh of relief before a hatchet buries itself into the tree next to you.",
	"Looking from where the hatchet came from you see a man who is flanked by bandits.This man walks over and introduces himself as Ubba and tells you that there is a toll to pay for crossing the bridge.",
	"Upon realizing you can\'t pay 1 Million coins, he decided to settle your tab by combat. He is, of course a fair sport and heals you, even if you didn\'t need it in the first place."
]

/* Combat 3 */
//Strong Bandit

var theArray6 = [
	"After dodding a hatchet to the neck you move to take him down but a graceful dodge later leaves you exposed. However, Ubba merely congratulates you for lasting in combat and lets you go with a pat on the back.",
	"This wasn't the ending you expected, but a welcome one at that."
]

/* Story End */
var endArray = [
	"You follow your map to the crossroads, and from there navigate back to Rivendale. Returning home to your small yet affordable house, next saturday you'll have an interesting story to tell the others down at the tavern.",
	"THE END."
]

// Marc's Variables
let menuFlag = false;
let townFlag = false;
let wildFlag = false;
let gameFlag = false;
var botID = '942950840174514206';
var genericReturnValue = {returnValue : 'null'}
var townAction = {customID : 'townSquare'}
var wildAction  = {customID : 'wilderness'}
var menuAction = {customID : 'null'}

//=================================================================================
//  Client.on Functions
//=================================================================================

client.on('ready', () => {
    client.user?.setPresence({ activities: [{ name: 'with you probably' }], status: 'online' })
    console.log('The bot is ready')
})
client.login(token)

client.on('messageCreate', async message => {
    if (message.content === prefix + 'startDemo') {
        gameFlag = true;
        message.channel.send('Starting the game...')
            .then(async(msg) => msg.edit('Started!'))
    }
    if (message.content.includes ==='!start') {
        menuFlag = true
        message.channel.send('Starting the game...').then(async(msg) => msg.edit('Started!'))
    }
    /* //Functions for Testing Functionality, comment out to improve bot performance, uncomment out for testing purposes DO NOT DELETE
    if (message.content === '!storyLoop') {
        await storyLoop(message, textArray);
        await message.channel.send("Exited Continue Loop");
    }
    if (message.content === '!storyForLoop') {
        message.channel.send("From First Index to Second Index 0-1");
        await storyForLoop(message, textArray, 2);
        await message.channel.send("Exited Continue Loop");
        await message.channel.send("From second index to third 1-2");
        await storyForLoop(message, textArray, 2, 1);
    }
    if (message.content === 'combatLoop') {
        let enemy = new character.character(200, 10, 'goblin')
        combatLoop(message, player, enemy)
    }
    if (message.content === 'combat') {
        let goblin = new character.character(200, 10, 'goblin');
        combat(message, player, goblin)
    }
    */
    if (message.content === '!demo') {
        let goblin = new character.character(100, 10, 'goblin');
        let hobGob = new character.character(200, 14, 'Hobgoblin');
        
        await storyForLoop(message, actOneArray, 4) // 4 iterations
        await combat(message, player, goblin);
        if (player.HP > 0) { // index 5 to 15, 10 iterations
            await storyForLoop(message, actOneArray, 10, 5) //starts on index 5, 10 iterations
            await combat(message, player, hobGob);
        }
        if (player.HP > 0) { //index 16- , 4 iterations
            await storyForLoop(message, actOneArray, 4, 16) //starts on index 16, 4  iterations
            message.channel.send("You have played through the demo of the game!")
        }
    }
    else if  (message.content === '!play') {
        await storyLoop(message, theArray1);
        let weakBandit = new character.character(100, 10, 'Arrogant Bandit');
        await combat(message, player, weakBandit)
        if (player.HP > 0) { //checks if player survives combat
            await storyLoop(message, theArray2);
            let meekBandit = new character.character(120, 12, 'Meek Bandit')
            await combat(message, player, meekBandit)
        }
        if (player.HP > 0) {
            await storyLoop(message, theArray3);
            await storyLoop(message, theArray4);
            //character enters town, access npc dialouge with npcDialouge array

        }
        if (player.HP > 0) {
            //Defending village arc
            await storyLoop(message, defendVillageArr);
            let startledBandit = new character.character(140, 15, "Startled Bandit")
            await combat(message, player, startledBandit)
        }
        if (player.HP > 0) {
            await storyLoop(message, normalBanditArray);
            let impressiveBandit = new character.character(160, 20, "Impressive Bandit")
            await combat(message, player, impressiveBandit)
        }
        if (player.HP > 0) {
            await storyLoop(message, strongerBandit)
            //Free Roam here
        }
        if (player.HP > 0) {
            //Mayor Quest Start
            await storyLoop(message, mayorQuest);
            //potions get!
            player.itemsArray[0] += 2; // two low potions
            // map obtained, embark to final mission
            await storyLoop(message, finalMission1)
            if (player.level > 18) { //player should be lvl 15~16 by now
                await storyLoop(message, finalMission2)
                //encounter skipped
            } else {
                await storyLoop(message, finalMission3)
                let formidableBandit = new character.character(180, 25, "Formidable Bandit")
                await combat(message, player, formidableBandit)
                if (player.HP > 0) {
                    await storyLoop(message, finalMission4)
                    let menacingBandit = new character.character(200, 25, "Menacing Bandit")
                    await combat(message, player, menacingBandit)
                    if (player.HP > 0) {
                        await storyLoop(message, theArray6)
                        await storyLoop(message, endArray)
                    }
                }
            }
        }
        if (player.HP > 0) {
            await storyForLoop(message, theArray5, 3, 2); //index 2-4
            let banditBoss = new character.character(300, 25, "Bandit Boss")
            await combat(message, player, banditBoss)
        }
        if (player.HP > 0) {
            await storyLoop(message, endArray)
        }
    }
    else if (message.content === '!status') {
        const cmd = client.commands.get('status');
        cmd.run(client, message, player);
    }
    else if (message.content.startsWith(prefix)) {
        //commands need ! before them
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if(!command) return
        command.run(client, message)
    }
}) 

client.on('messageUpdate', message => {
    if (message.author.id === botID) {
        //Potential security:
        // Check thread id of the message
        if (menuFlag) {
            loopMenu(message)    
        }
        else if (townFlag) {
            loopTown(message)
        }
        else if (wildFlag) {
            loopWild(message)
        } 
        else if (gameFlag) {
            gameIntro(message)
        }    
    }
    else {
        //Ignore message edit
    }
})

//=================================================================================
//  Helper Functions
//=================================================================================

// storyLoop used when you wish to go through an entire array of text
async function storyLoop(message, array) {
    let story = await message.channel.send("``` ```");
    let allowButtonsFlag = true;
    const continueB = client.commands.get("continueButton");
    for (let i=0; i < array.length; i++) {
        await continueB.run(message, returnObject, allowButtonsFlag);
        await delay(1000*10) //10 seconds to click
        console.log(returnObject.returnValue);
        if (returnObject.returnValue = 'continue') {
            story.edit(array[i]);
            returnObject.returnValue = 'string'
        }
    }
    const deleteB = client.commands.get('deleteButton');
    await deleteB.run(message, returnObject, allowButtonsFlag);
    await delay(1000*10) //10 sec
    console.log(returnObject.returnValue);
    if (returnObject.returnValue === 'delete') {
        story.delete()
    }
    returnObject.returnValue = 'string';
}

// storyForLoop used when wanting to go through a portion of text from an array and not the whole array
async function storyForLoop(message, array, iterations, startIndex = 0) {
    let story = await message.channel.send("``` ```");
    let allowButtonsFlag = true;
    const continueB = client.commands.get("continueButton");
    for (let i = startIndex; i < (iterations + startIndex + 1); i++) {
        await continueB.run(message, returnObject, allowButtonsFlag);
        while (returnObject.returnValue === 'string') {
            await delay(1000)
        }
        console.log(returnObject.returnValue);
        if (returnObject.returnValue = 'continue') {
            story.edit(array[i]);
            returnObject.returnValue = 'string'
        }
    }
    const deleteB = client.commands.get('deleteButton');
    await deleteB.run(message, returnObject, allowButtonsFlag);
    while (returnObject.returnValue === 'string') {
        await delay(1000)
    }
    console.log(returnObject.returnValue);
    if (returnObject.returnValue === 'delete') {
        story.delete()
    }
    returnObject.returnValue = 'string';
}

//combatLoop can now be replaced by combat function, however if stability issues show up with combat function use combatLoop
async function combatLoop(message, player, enemy) { 
    while (returnObject.returnValue != "done") {
        await runCommand(message, 'fightButtons', returnObject)
        await delay(1000 * 10) //10 seconds to click
        console.log(returnObject.returnValue)
        await player.combat(message, player, enemy, returnObject);
        if (returnObject.returnValue === 'items') {
            await runCommand(message, 'consumableButtons', returnObject)
            await delay(1000 * 10) //10 seconds to click
            await player.combat(message, player, enemy, returnObject);
            console.log(returnObject.returnValue)
        }
    }
    console.log(returnObject.returnValue);
    
}

async function combat(message, player, enemy) { 
    while (returnObject.returnValue != 'done') {
        await simpleCommand(message, 'fight', returnObject)
        console.log(returnObject.returnValue)
        //input not yet recieved log should say 'string'
        while (returnObject.returnValue === 'string') {
            await delay(1000);
        }    
        console.log(returnObject.returnValue)
        //input should be received by now, shown in console
        await player.combat(message, player, enemy, returnObject)
        if (returnObject.returnValue === 'done') { break }
        else {
            if (returnObject.returnValue != 'items') {
                returnObject.returnValue = 'string'
            } else {
                returnObject.returnValue = 'string'
                itemObject.returnValue = 'string'
                console.log(itemObject.returnValue)
                await simpleCommand(message, 'items', itemObject)
                while (itemObject.returnValue === 'string') {
                    await delay(1000);
                }
                await player.combat(message, player, enemy, itemObject);
                console.log(itemObject.returnValue)
                if (itemObject.returnValue === 'done') { break }
            }
        }
    }
    console.log(`process ended, value should be done: ${returnObject.returnValue}`)
    returnObject.returnValue = 'string'
    console.log(`reset return value to: ${returnObject.returnValue}`)
}

async function gameIntro(message) {
    gameFlag = false;
    //Paragraph of text
    message.edit('===============================================================================================\nComing to your senses, you feel a welt forming on the back of your head as the fading rays of light dance between your eyes.\nThe thumping of the road sends small jolts of pain through your body, letting you know that you are still alive.\nFeeling around, you notice hay, and a surprisingly large amount of it.\nA rather hard bump aggravates your sore body, and a sharp pain erupts from hitting you head on the wood beneath you.\nAfter a few moments, the wagon stops and the driver looks over and seems angry at your presence, yelling at you to get off their wagon.\nAfter a not so quick dismount from the wagon, the driver takes off, leaving you along in the woods.\n===============================================================================================')
    while (genericReturnValue.returnValue != "done") {
        await runCommand(message, 'conversationButtons', genericReturnValue)
        await delay(1000 * 8.1) //Ten seconds
    }
    townFlag = true;
    genericReturnValue.returnValue = 'null'
    message.edit('===============================================================================================\nFading rays of light poorly illuminate the forest road, showing a path deeper into the woods. Eventually, you find yourself in a small village.\n===============================================================================================')
}

function simpleCommand(message, commandName, argument) {
    const command = client.commands.get(commandName)
    if (!command) {
        return("Error running command")
    }
    return command.run(message, argument)
}

//==============================
//Takes the name of a command and runs the command.
//  Input 1: The message sent to discord
//  Input 2: The name of a command to execute
//  Input 3: Object passed through are referenced by
//  Output: Passes through any values that are returned
//==============================
function runCommand(message, nameOfCommand, argument) {
    const command = client.commands.get(nameOfCommand)

    if(!command) {
        message.channel.send('Error: what was passed through was NOT a command, check your syntax')
        return
    }

    return command.run(client, message, argument)
}

//=====================================================
//Delays the activation of following code
//  Input 1: Time in milliseconds (1 second = 1000 ms)
//  Output: N/A
//=====================================================
async function delay(ms) {
    return await(new Promise( resolve => setTimeout(resolve, ms) ));
}


let GValue = 0
async function loopMenu(message) {
    await runCommand(message, 'menuButton', menuAction)
    await delay(1000 * 6) //Wait 6 seconds
    console.log(menuAction.customID)

    if (menuAction.customID === 'end') {
        menuFlag = false
        message.edit('Ending the Loop')
    }
    else if (menuAction.customID === 'town') {
        menuFlag = false
        message.edit('Heading to town...')
        await(delay(5000))
        townFlag = true
        menuAction.customID = 'menu';
        message.edit('The world fades back into view, and you find yourself back at the town')
    }
    else{
        //Loop back around and try again
        message.edit('The menu just floats there menacingly')
    }
}


async function loopTown(message) {
    await(runCommand(message, 'townButtons', townAction))
    await(delay(1000 * 15)) //20 second wait time
    console.log(townAction.customID)

    if (townAction.customID === 'townSquare') {
        message.edit('You stand still, trying to mimic the nearby statues...\n\nThey are not impressed.')
    }
    else if (townAction.customID === 'alchemist') {
        townFlag = false
        message.edit("You enter the alchemist's shop")
        while (genericReturnValue.returnValue != 'exit') {
            await(runCommand(message, 'npcButtons', genericReturnValue))
            await delay(1000 * 8) //10 seconds to click
        }
        townFlag = true
        message.edit('You return to the town square')
    }
    else if (townAction.customID === 'mayor') {
        townFlag = false
        message.edit("You enter a large building that serves as the town hall")
        while (genericReturnValue.returnValue != 'exit') {
            await(runCommand(message, 'importantNpcButtons', genericReturnValue))
            await delay(1000 * 8) //10 seconds to click
        }
        townFlag = true
        message.edit('You return to the town square')
    }
    else if (townAction.customID === 'tavern') {
        townFlag = false
        message.edit("You enter the tavern.\npleasant smells and the sound of music uplifts your spirit.")
        while (genericReturnValue.returnValue != 'exit') {
            await(runCommand(message, 'npcButtons', genericReturnValue))
            await delay(1000 * 8) //10 seconds to click
        }
        townFlag = true
        message.edit('You return to the town square')
    }
    else if (townAction.customID === 'wilderness') {
        townFlag = false
        wildFlag = true
        message.edit('Heading into the wilderness')
    }
    else if (townAction.customID === 'menu') {
        townFlag = false
        menuFlag = true
        message.edit('The world fades away as a looming menu appears menacingly.')
        await(delay(4000))
    }
    else {
        message.edit('Standing still, you listen to the wind as it blows through the town')
    }
}


async function loopWild(message) {
    await(runCommand(message, 'wildButtons', wildAction))
    await(delay(10000))
    console.log(wildAction.customID)
    if (wildAction.customID === 'search') {

        wildFlag = false;
        // message.edit('Beginning Combat loop...')
        
        let enemy = new character.character(100, 10, 'goblin');
        message.edit('Your HP: 200\nOpponent HP: 100')
        while (genericReturnValue.returnValue != "done") {
            await runCommand(message, 'fightButtons', genericReturnValue)
            await delay(1000 * 10) //10 seconds to click
            player.combat(message, player, enemy, genericReturnValue);
        }
        //Reset the combat loop values
        genericReturnValue.returnValue = 'string';
        //Enable the GFlag for messageUpdate to run properly
        await(delay(4000))
        wildFlag = true;
        message.edit('You emerge the victor, and the spoils are yours')
    }
    else if (wildAction.customID === 'town') {
        //Return to town
        townFlag = true
        wildFlag = false
        message.edit('Heading back to Town')
    }
    else if (wildAction.customID === 'exit') {
        if (GValue >= 1) {
            //Start first Act boss
        }
        else {
            message.edit('The woods seem to bend and you find yourself back where you started')
        }
        //Procceed to act 2 (End of the game currently)
    }
}