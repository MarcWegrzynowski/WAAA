const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, interaction, argument) => {
    const row = new MessageActionRow() //first row of buttons
        .addComponents(
            new MessageButton()
                .setCustomId('talk') //you can name their ID whatever is easier for you
                .setEmoji('🔉') //emoji is optional but neat addition you can add
                .setLabel('Talk')
                .setStyle('SECONDARY') //color for buttons
        )
        .addComponents(
            new MessageButton()
                .setCustomId('buy')
                .setEmoji('💰')
                .setLabel('Shop')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('exit')
                .setEmoji('🚪')
                .setLabel('Return to townsquare')
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
        time: 1000 * 7, //60 seconds to confirm choice
    });
    
    collector.on('collect', async i => {
        if (i.customId === 'talk' || i.customId === 'buy' || i.customId === 'exit') {
            if (i.customId === 'talk') {
                // await interaction.channel.send('buttonOne was clicked!')
                argument.returnValue = 'talk'
            }
            else if (i.customId === 'buy') {
                // await interaction.channel.send('buttonTwo was clicked!')
                argument.returnValue = 'buy'
            }
            else if (i.customId === 'exit') {
                argument.returnValue = 'exit'
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