const fs = require('fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const Discord = require("discord.js")
const character = require ('./classes/character.js')


const client = new DiscordJS.Client({
    intents: [ 
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
    ],
})

const prefix = "!"

client.commands = new DiscordJS.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (file of commandFiles) {
	const commandName = file.split(".")[0] //getting the command name
    const command = require(`./commands/${commandName}`)
    client.commands.set(commandName, command)
}


client.on('ready', () => {
    client.user?.setPresence({ activities: [{ name: 'with you probably' }], status: 'online' })
    console.log('The bot is ready')
})

client.on('messageCreate', message => {
    if (message.content.startsWith(prefix)) {
        //commands need ! before them
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        
        if(!command) return
        command.run(client, message, args)
    }
})

client.login(token)

//==============================
//Takes the name of a command and runs the command.
//  Input 1: The message sent to discord
//  Input 2: The name of a command to execute
//  Input 3: Object passed through are referenced by
//  Output: Passes through any values that are returned
//==============================
function runCommand(message, nameOfCommand, argument) {
    message.content = nameOfCommand
    const args = message.content.slice(prefix.length).trim().split(/ + /g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)

    if(!command) {
        message.channel.send('Error: what was passed through was NOT a command, check your syntax')
        return
    }

    return command.run(client, message, args, argument)
}

//=====================================================
//Delays the activation of following code
//  Input 1: Time in milliseconds (1 second = 1000 ms)
//  Output: N/A
//=====================================================
async function delay(ms) {
    return await(new Promise( resolve => setTimeout(resolve, ms) ));
}

//Command to run multiple functions
let menuFlag = false;
let townFlag = false;
let wildFlag = false;

client.on('messageCreate', message => {
    if (message.content.includes('start') && message.content.startsWith(prefix)) {
        //commands need ! before them
        // let value = 'overwrite this'
        //Calls runCommand and runs the command !introText
        // let aMessage = 'overwrite this'

        // runCommand(message, '!introText')

        // //Takes (2000/1000 + 1) seconds to execute the command !combatButtons
        // delay(2000)
        //     .then(async() => {console.log(await(runCommand(message, '!templateButton')))})
        //     .then(async() => {await(result = runCommand(message, '!dummyCommand'))})
        //     .then(async() => {await(result.then(value => aMessage = value[1]))})
        //     .then(async() => {message.channel.send(aMessage)})
        // }

        // async () => {let A = await runCommand(mesage, '!templateButton').then(console.log(A))}

        //runCommand(message, '!dummyButton')
        menuFlag = true
        message.channel.send('Starting the game...').then(async(msg) => msg.edit('Started!'))
    }

    //  Proof that you can alter the content of a message
    // if (message.content === 'mirror') {
    //     message.content = 'rirrom'
    //     message.channel.send(message.content)
    // }
})

// runs combat in a loop until somebody loses
var returnObject = {returnValue : 'string'}

let GValue = 0
var StoporGo = {customID : 'string'}
async function menuloop(message) {
    await(runCommand(message, '!dummyButton', StoporGo))
    await(delay(6000))
    console.log(StoporGo.customID)

    if (StoporGo.customID === 'combat') {
        //Disable GFlag for combat
        // This is so any edited messages don't mess up the combat loop
        menuFlag = false
        message.edit('Beginning Combat loop...')
        let player = new character.character(200, 10, 'player');
        let enemy = new character.character(100, 10, 'goblin');
        message.edit('Your HP: 200\nOpponent HP: 100')
        while (returnObject.returnValue != "done") {
            await runCommand(message, '!combatButtons', returnObject)
            await delay(1000 * 10) //10 seconds to click
            console.log(returnObject.returnValue)
            player.combat(message, player, enemy, returnObject);
        }
        //Reset the combat loop values
        returnObject.returnValue = 'string';
        //Enable the GFlag for messageUpdate to run properly
        await(delay(4000))
        message.edit('Combat loop has ended')
        menuFlag = true
    }
    else if (StoporGo.customID === 'end') {
        menuFlag = false
        message.edit('Ending the Loop')
    }
    else if (StoporGo.customID === 'town') {
        menuFlag = false
        message.edit('Heading to town...')
        await(delay(5000))
        townFlag = true
        message.edit('Standing here, I realise, \nyou were just like me, \ntrying to make history!')
    }
    else {
        await(delay(1000))
        if (GValue % 6 === 0) { message.edit('Have you tried starting over?'); }
        else if (GValue % 6 === 2) { message.edit('Uh... the hampster powering this bot has broken free, dont panic'); }
        else if (GValue % 6 === 4) { message.edit('Rhyme with orange, I dare ya!'); }
        else {message.edit('WAAA presents a discord bot!');}

        GValue++
        console.log(GValue)
        
        if (GValue >= 10) {
            menuFlag = false
            message.edit('Demo over, go home now.')
        }
    }
}

var townAction = {customID : 'townSquare'}
async function loopTown(message) {
    await(runCommand(message, '!townButtons', townAction))
    await(delay(10000))
    console.log(townAction.customID)

    if (townAction.customID === 'townSquare') {
        message.edit('And whos to judge, the right from wrong\n when your guard is down, I think well both agree\n that violence breeds violence')
    }
    else if (townAction.customID === 'alchemist') {
        townFlag = false
        while (returnObject.returnValue != 'done') {
            await(runCommand(message, '!alchemistButtons', returnObject))
            await delay(1000 * 8) //8 seconds to click
            console.log(returnObject.returnValue)
        }
        townFlag = true
        message.edit('but thats the way, it has to be!\n New life will be born beneath these blood stained sands!')
    }
    else if (townAction.customID === 'Wilderness') {
        townFlag = false
        wildFlag = true
    }
    else if (townAction.customID === 'menu') {
        townFlag = false
        menuFlag = true
        message.edit('Returning to menu...')
        await(delay(4000))
    }
}

client.on('messageUpdate', message => {
    //Potential security:
    // Check thread id of the message
    if (menuFlag) {
        menuloop(message)    
    }
    else if (townFlag) {
        loopTown(message)
    }
    else if (wildFlag) {
        loopWild(message)
    }
    
 
})