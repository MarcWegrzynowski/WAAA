const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (interaction, returnObject) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('Attack')
                .setEmoji('⚔')
                .setLabel('Attack')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('Defend')
                .setEmoji('🛡️')
                .setLabel('Defend')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('Items')
                .setEmoji('👝')
                .setLabel('Item Bag')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('Flee')
                .setEmoji('💨')
                .setLabel('Flee')
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
        if (i.customId === 'Attack'||i.customId === 'Defend'||i.customId === 'Items'||i.customId === 'Flee') {
            if (i.customId === 'Attack') {
                
                await i.channel.send('Attack was selected!')
                returnObject.returnValue = 'attack'
            }
                        
            if (i.customId === 'Defend') {
                await i.channel.send('Defend was selected!')
                //defend action
                returnObject.returnValue = 'defend'
            }
            if (i.customId === 'Items') {
                await i.channel.send('Items was selected!')
                //heal action
                returnObject.returnValue = 'items'
            }
            if (i.customId === 'Flee') {
                await i.channel.send('Flee was selected!')
                //flee action
                returnObject.returnValue = 'flee'
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.username, click.customId)
        })

        reply.delete()
    });
}


