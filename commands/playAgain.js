const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');


module.exports.run = async (client, interaction, returnObject) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER')
        )
        
    let reply = await interaction.reply({
        content: 'Choose your action:',
        components: [row],
    })

    
    const filter = (btnInt) => {
        return interaction.member.user.id === btnInt.user.id
    }

    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 20, //20 seconds to confirm choice
    });

    collector.on('collect', async i => {
        if (i.customId === 'yes'||i.customId === 'no') {
            if (i.customId === 'yes') {
                returnObject.returnValue = 'yes'
            }
                        
            if (i.customId === 'no') {
                returnObject.returnValue = 'no'
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.username, click.customId)
        })
        reply.delete()
        //deletes the buttons once action is performed
    });
}
