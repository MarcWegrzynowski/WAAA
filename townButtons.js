const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, interaction, args, argument) => {
    const row = new MessageActionRow() //first row of buttons
        .addComponents(
            new MessageButton()
                .setCustomId('townSquare') //you can name their ID whatever is easier for you
                .setEmoji('⚔') //emoji is optional but neat addition you can add
                .setLabel('Remain in the town suqare')
                .setStyle('SUCCESS') //color for buttons
        )
        .addComponents(
            new MessageButton()
                .setCustomId('alchemist')
                .setLabel('Go to the alchemist')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('menu')
                .setLabel('Leave town')
                .setStyle('PRIMARY')
        )
        //the four color options for buttons: 'SUCCESS', 'PRIMARY', 'DANGER', 'SECONDARY'
        // there is also a style called 'LINK' for links to URLS
        // if your making a link button you also need to add .setURL('https://urlExample.com')
    let reply = await interaction.reply({
        content: '=====================================================\nStanding here, you wonder what your next move will be\n=====================================================',
        components: [row], //if you wish to define more buttonRows you can [rowOne, rowTwo]
        //limit should be 5 rows of buttons and 5 buttons per row
    }) // button prompt

    
    const filter = (btnInt) => { //checks if user who used command is one who clicked button
        return interaction.member.user.id === btnInt.user.id
    }

    const collector = interaction.channel.createMessageComponentCollector({
        // filter,
        max: 1, //change max to allow for multiple button clicks
        time: 1000 * 5, //60 seconds to confirm choice
    });
    
    collector.on('collect', async i => {
        if (i.customId === 'townSquare' || i.customId === 'alchemist' || i.customId === 'menu') {
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