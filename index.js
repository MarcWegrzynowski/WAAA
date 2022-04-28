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