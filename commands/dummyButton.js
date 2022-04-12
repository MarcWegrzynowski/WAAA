const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, interaction, args, argument) => {
    const row = new MessageActionRow() //first row of buttons
        .addComponents(
            new MessageButton()
                .setCustomId('continue') //you can name their ID whatever is easier for you
                .setEmoji('⚔') //emoji is optional but neat addition you can add
                .setLabel('WhatUserSeesOne')
                .setStyle('SUCCESS') //color for buttons
        )
        .addComponents(
            new MessageButton()
                .setCustomId('end')
                .setLabel('WhatUserSeesTwo')
                .setStyle('PRIMARY')
        )
        //the four color options for buttons: 'SUCCESS', 'PRIMARY', 'DANGER', 'SECONDARY'
        // there is also a style called 'LINK' for links to URLS
        // if your making a link button you also need to add .setURL('https://urlExample.com')
    let reply = await interaction.reply({
        content: 'Choose your action:',
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
        if (i.customId === 'continue' || i.customId === 'end') {
            if (i.customId === 'continue') {
                // await interaction.channel.send('buttonOne was clicked!')
                argument.customID = 'continue'
            }
            else if (i.customId === 'end') {
                // await interaction.channel.send('buttonTwo was clicked!')
                argument.customID = 'end'
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