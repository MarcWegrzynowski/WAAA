const fs = require('fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const Discord = require("discord.js")


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
let GFlag = false;

client.on('messageCreate', message => {
    if (message.content.includes('demo') && message.content.startsWith(prefix)) {
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
        GFlag = true
        message.channel.send('test').then(async(msg) => msg.edit('Edit Test'))
    }

    //  Proof that you can alter the content of a message
    // if (message.content === 'mirror') {
    //     message.content = 'rirrom'
    //     message.channel.send(message.content)
    // }
})

let GValue = 0
var StoporGo = {customID : 'string'}
async function loop(message) {
    await(runCommand(message, '!dummyButton', StoporGo))
    await(delay(6000))
    console.log(StoporGo.customID)

    if (StoporGo.customID === 'end') {
        GFlag = false
        message.edit('Ending Loop Early')
    }
    else {
        await(delay(1000))
        if (GValue % 6 === 0) { message.edit('So, there was an editted message eh?'); }
        else if (GValue % 6 === 2) { message.edit('Have you tried a loop yet?'); }
        else if (GValue % 6 === 4) { message.edit('Lets try looping shall we?'); }
        else {message.edit('Random message here');}


        //Parse through the collection and pull out the customID
        // console.log(Object.values(collection))

        GValue++
        console.log(GValue)
        
        if (GValue >= 10) {
            GFlag = false
            message.edit('Ending Loop')
        }
    }
}

client.on('messageUpdate', message => {
    if (GFlag) {
        loop(message)    
    }
})