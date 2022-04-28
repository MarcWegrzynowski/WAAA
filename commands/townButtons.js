const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, interaction, argument) => {
    const row = new MessageActionRow() //first row of buttons
        .addComponents(
            new MessageButton()
                .setCustomId('townSquare') //you can name their ID whatever is easier for you
                .setEmoji('⛲') //emoji is optional but neat addition you can add
                .setLabel('Remain in the town square')
                .setStyle('SECONDARY') //color for buttons
        )
        .addComponents(
            new MessageButton()
                .setCustomId('menu')
                .setEmoji('🎛️')
                .setLabel('Open menu')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('wilderness')
                .setEmoji('🌲')
                .setLabel('Enter the wilderness')
                .setStyle('SUCCESS')
        )
        //the four color options for buttons: 'SUCCESS', 'PRIMARY', 'DANGER', 'SECONDARY'
        // there is also a style called 'LINK' for links to URLS
        // if your making a link button you also need to add .setURL('https://urlExample.com')

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('alchemist')
                .setEmoji('🧍')
                .setLabel('Go to the alchemist')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('mayor')
                .setEmoji('🧍')
                .setLabel('Speak with the mayor')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('tavern')
                .setEmoji('🧍')
                .setLabel('Visit the tavern')
                .setStyle('PRIMARY')
        )
    let reply = await interaction.reply({
        content: '=====================================================\nStanding here, you wonder what your next move will be\n=====================================================',
        components: [row, row2], 
        //if you wish to define more buttonRows you can [rowOne, rowTwo]
        //limit should be 5 rows of buttons and 5 buttons per row
    }) // button prompt

    
    const filter = (btnInt) => { //checks if user who used command is one who clicked button
        return interaction.member.user.id === btnInt.user.id
    }

    const collector = interaction.channel.createMessageComponentCollector({
        // filter,
        max: 1, //change max to allow for multiple button clicks
        time: 1000 * 15, //60 seconds to confirm choice
    });
    
    collector.on('collect', async i => {
        if (i.customId === 'townSquare' || i.customId === 'alchemist' || i.customId === 'mayor' || i.customId === 'tavern' || i.customId === 'menu' || i.customId === 'wilderness') {
            if (i.customId === 'townSquare') {
                // await interaction.channel.send('buttonOne was clicked!')
                argument.customID = 'townSquare'
            }
            else if (i.customId === 'alchemist') {
                // await interaction.channel.send('buttonTwo was clicked!')
                argument.customID = 'alchemist'
            }
            else if (i.customId === 'menu') {
                argument.customID = 'menu'
            }
            else if (i.customId === 'wilderness') {
                argument.customID = 'wilderness'
            }
            else if (i.customId === 'mayor') {
                argument.customID = 'mayor'
            }
            else if (i.customId === 'tavern') {
                argument.customID = 'tavern'
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.id, click.user.username, click.customId)
            //logs userID, and nickname of who clicked button and what action
        })
        
        reply.delete()
        //deletes the buttons once action(s) is/are performed
    });
}