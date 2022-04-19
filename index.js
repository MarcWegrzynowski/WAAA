const fs = require('fs')
const DiscordJS = { Client, Collection, Intents} = require('discord.js')
const { token } = require('./config.json')
const Discord = require("discord.js")

const character = require("./classes/character.js")


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

//=====================================================
//Delays the activation of following code
//  Input 1: Time in milliseconds (1 second = 1000 ms)
//  Output: N/A
//=====================================================
async function delay(ms) {
    return await(new Promise( resolve => setTimeout(resolve, ms) ));
}


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

var returnObject = {returnValue : 'string'}

async function combatLoop(message, player, enemy) { 
    while (returnObject.returnValue != "done") {
        await runCommand(message, '!fightButtons', returnObject)
        await delay(1000 * 10) //10 seconds to click
        console.log(returnObject.returnValue)
        await player.combat(message, player, enemy, returnObject);
    }
    returnObject.returnValue = 'string';
}

client.on('ready', () => {
    client.user?.setPresence({ activities: [{ name: 'with you probably' }], status: 'online' })
    console.log('The bot is ready')
})

var player = new character.character(200, 10, 'player');
player.player = true;

var textArray = ['First Text, Press continue to see second text', 'Second text, Press continue to see third text','Third text, no button after this']

async function storyLoop(message, array) {
    let story = await message.channel.send("story here");
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

client.on('messageCreate', async message => {
    if (message.content === '!test') {
        await storyLoop(message, textArray);
        await message.channel.send("Exited Continue Loop");
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
    }
    else if (message.content === '!continueButton' || message.content === 'continue') {
        client.commands.get('continueButton').run(client, message, returnObject);
        console.log(returnObject.returnValue);
    }
    else if (message.content.startsWith(prefix)) {
        //commands need ! before them
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if(!command) return
        command.run(client, message, args)
    }
})


client.login(token)