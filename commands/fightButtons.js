const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');


module.exports.run = async (client, interaction, args, returnObject) => {

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
                .setCustomId('Potion')
                .setEmoji('🍯')
                .setLabel('Potion')
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
        if (i.customId === 'Attack'||i.customId === 'Defend'||i.customId === 'Potion'||i.customId === 'Flee') {
            if (i.customId === 'Attack') {
                await i.channel.send({ content: 'Attack was selected!', components: [] })
                returnObject.returnValue = 'attack'
            }
                        
            if (i.customId === 'Defend') {
                await i.channel.send({ content: 'Defend was selected!', components: [] })
                //defend action
                returnObject.returnValue = 'defend'
            }
            if (i.customId === 'Potion') {
                await i.channel.send({ content: 'Potion was selected!', components: [] })
                //heal action
                returnObject.returnValue = 'heal'
            }
            if (i.customId === 'Flee') {
                await i.channel.send({ content: 'Flee was selected!', components: [] })
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
        //deletes the buttons once action is performed
        
    });
}
