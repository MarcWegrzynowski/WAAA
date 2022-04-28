//=================================================================================
//  Imports
//=================================================================================
const fs = require('fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const Discord = require("discord.js")
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

let menuFlag = false;
let townFlag = false;
let wildFlag = false;
let gameFlag = false;
var player = new character.character(200, 10, 'player');
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

client.on('messageCreate', message => {
    if (message.content === prefix + 'startDemo') {
        gameFlag = true;
        message.channel.send('Starting the game...')
            .then(async(msg) => msg.edit('Started!'))
    }
    else if (message.content.startsWith(prefix)) {
        //commands need ! before them
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        
        if(!command) return
        command.run(client, message)
    }
    if (message.content.includes ==='!start') {
        menuFlag = true
        message.channel.send('Starting the game...').then(async(msg) => msg.edit('Started!'))
    }
    if (message.content === '!storyLoop') {
        await storyLoop(message, textArray);
        await message.channel.send("Exited Continue Loop");
    }
    if (message.content === '!storyForLoop') {
        await storyForLoop(message, textArray, 2);
        await message.channel.send("Exited Continue Loop");
    }
    if (message.content === 'combatLoop') {
        let enemy = new character.character(200, 10, 'goblin')
        combatLoop(message, player, enemy)
    }
    if (message.content === '!demo') {
        let goblin = new character.character(100, 10, 'goblin');
        let hobGob = new character.character(200, 14, 'Hobgoblin');

        await message.channel.send("You wakeup in a wagon.\nAs you start to come to you notice the wagon is smack dab in the middle of a forest and you're laying in the back full of hay.\nYou're confused, dehydrated and seem to have an aching pain on the left side of your jaw.\n\n");
        await delay(1000*5) //5 seconds
        await message.channel.send("The Wagon Driver notices the noise you're making behind him. He doesn't seem to appreciate that you're in his wagon for free. Halfway through the trip he kicks you off the wagon to fend for yourself. You give him some rude gesture which he returns in kind, only afterwards do you think it was a bad idea realizing your now stuck in the middle of some forest.\n\n")
        await delay(1000*5) //5 seconds
        await message.channel.send("Seeing as you have nothing better to do you start walking around the forest. You take a stop by a river to get some water and you decide to pee by nearby greenery.");
        await delay(1000*5) //5 seconds
        await message.channel.send("As you relieve yourself you notice the greenery is making some strange noises. Suddenly you see the greenery stand up. At this point you notice it wasn't greenery... It was a goblin, and you just pissed on him. He clearly doesn't seem very happy.\n\n");
        await delay(1000*10) //5 seconds
        await message.channel.send("The goblin is making a bunch of noises and while you can't understand him, you figured he's not saying very nice things about you. After the goblin has had his fill at yelling at you he takes out his club and decides that words are not enough and violence was the answer. You also prepare yourself to fight, grabbing a nearby pointy stick.\n\n");
        await delay(1000*10) //3 seconds
        await combatLoop(message, player, goblin);
        if (player.HP > 0) {
            await delay(1000*10) //3 seconds
            await message.channel.send("After dealing with the goblin and having finished your not so peaceful trip to empty the waters, you decide it's probably time to make a break out of the forest to so you can find a way back to town.\n\n");
            await delay(1000*10) //2 seconds
            await message.channel.send("Sometime later...\n\n")
            await delay(1000*5) //5 seconds
            await message.channel.send("After a few hours of walking and almost losing your life after snacking on a few colorful mushrooms you found along the way, you're fairly certain that you have no idea how to get out of the forest.\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send("Using all of your grand brilliant mind you pick up a nearby stick *that isn't your trusty weapon of choice (sharp stick)*, and you throw it to the ground,"); 
            await delay(1000*10) //5 seconds
            await message.channel.send("letting it land, it points to a direction, you're not too sure if it's North or South but you decide that's the way you're gonna go until you get out of the forest. Tired and hungry, you march onward.\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send("A few hours later...\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send("You're still walking with no end insight of the forest and man, you are HUNGRY. Your nose twitches like an animal, swearing to you that it smells something tasty in the distance.");
            await delay(1000*10) //4 seconds
            await message.channel.send("Losing control of your legs, you find your body limping towards that direction...\n\n");
            await delay(1000*10) //3 seconds
            await message.channel.send("As you get closer to the smell of the food you also notice the scent and light of a campfire in the dark and next to it, a rabbit on a stick, roasting on an open fire. Practically calling your name.\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send("You look around... ");
            await delay(1000*5) //2 seconds
            await message.channel.send("No one seems to be around...");
            await delay(1000*5) //2 seconds
            await message.channel.send("Surely one bite wouldn't hurt.");
            await delay(1000*5) //2 seconds
            await message.channel.send("...\n\n");
            await delay(1000*2) //2 seconds
            await message.channel.send("In a matter of seconds the whole rabbit is gone and you're feeling great. You stand up and get ready to keep going on your way to leave the forest.");
            await delay(1000*10) //3 seconds
            await message.channel.send("As you whistle and walk away, you bump into a pretty sturdy tree... For a tree it didn't seem so bad bumping into it.\n\n");
            await delay(1000*10) //3 seconds
            await message.channel.send("You look up at the tree that you bumped into only to find out it wasn't a tree but a fairly upset looking hobgoblin. Needless to say you're pretty sure why he's upset. But before you can think of anything else. He's already trying murder you for eating his dinner.\n\n");
            await delay(1000*10) //5 seconds
            await combatLoop(message, player, hobGob);
        }
        if (player.HP > 0) {
            await message.channel.send("You somehow manage to survive an encounter with the hobgoblin. You felt a bit bad for stealing his dinner but the empathy wore off pretty quickly after you remember him trying to murder you. Looking back you sure are glad you had that rabbit before fighting him.\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send("Thinking about your next course of action you look up the sky taking a look at the stars. Its gotten pretty late. You decide to camp in what used to be the hobgoblin's den.\n\n");
            await delay(1000*10) //5 seconds
            await message.channel.send(`As you lay in this surprisingly comfortable pile of leaves and grasses that was a "bed" you try and get some sleep. You count some rabbits to fall asleep, getting a bit hungry again thanks to the brawl with that hobgoblin. Eventually you doze off and begin falling asleep... As you sleep, you dream that you get out of the forest and making it back to town. After that the dream gets a bit more crazy. But that's a story for another time...\n\n`)
            await delay(1000*10) //5 seconds
            await message.channel.send("THE END")
        }
    }
    else if (message.content === '!status') {
        const cmd = client.commands.get('status');
        cmd.run(client, message, player);
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


var textArray = ['First Text, Press continue to see second text', 'Second text, Press continue to see third text','Third text, no button after this']

async function storyLoop(message, array) {
    let story = await message.channel.send("``` ```");
    let allowButtonsFlag = true;
    const continueB = client.commands.get("continueButton");
    for (let i=0; i < array.length; i++) {
        await continueB.run(client, message, returnObject, allowButtonsFlag);
        await delay(1000*10) //10 seconds to click
        console.log(returnObject.returnValue);
        if (returnObject.returnValue = 'continue') {
            story.edit(array[i]);
            returnObject.returnValue = 'string'
        }
    }
    const deleteB = client.commands.get('deleteButton');
    await deleteB.run(client, message, returnObject, allowButtonsFlag);
    await delay(1000*10) //10 sec
    console.log(returnObject.returnValue);
    if (returnObject.returnValue === 'delete') {
        story.delete()
    }
    returnObject.returnValue = 'string';
}

async function storyForLoop(message, array, iterations) {
    let story = await message.channel.send("``` ```");
    let allowButtonsFlag = true;
    const continueB = client.commands.get("continueButton");
    for (let i=0; i < iterations; i++) {
        await continueB.run(client, message, returnObject, allowButtonsFlag);
        await delay(1000*10) //10 seconds to click
        console.log(returnObject.returnValue);
        if (returnObject.returnValue = 'continue') {
            story.edit(array[i]);
            returnObject.returnValue = 'string'
        }
    }
    const deleteB = client.commands.get('deleteButton');
    await deleteB.run(client, message, returnObject, allowButtonsFlag);
    await delay(1000*10) //10 sec
    console.log(returnObject.returnValue);
    if (returnObject.returnValue === 'delete') {
        story.delete()
    }
    returnObject.returnValue = 'string';
}

async function combatLoop(message, player, enemy) { 
    while (returnObject.returnValue != "done") {
        await runCommand(message, 'fightButtons', returnObject)
        await delay(1000 * 10) //10 seconds to click
        console.log(returnObject.returnValue)
        await player.combat(message, player, enemy, returnObject);
        if (returnObject.returnValue==='items') {
            await runCommand(message, 'consumableButtons', returnObject)
            await delay(1000 * 10) //10 seconds to click
            await player.combat(message, player, enemy, returnObject);
            console.log(returnObject.returnValue)
        }
    }
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