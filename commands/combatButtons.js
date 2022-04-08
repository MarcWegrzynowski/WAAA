const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

///module.exports.run = async (client, interaction, args) => {}
//template above when needing async functionality


module.exports.run = async (client, interaction, args) => {
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
                .setCustomId('Items')
                .setEmoji('👝')
                .setLabel('Items')
                .setStyle('PRIMARY')
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
        ephemeral: true,
        components: [row],
        })

    
    const filter = (btnInt) => {
        return interaction.member.user.id === btnInt.user.id
    }

    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 60, //60 seconds to confirm choice
    });

    collector.on('collect', async i => {
        if (i.customId === 'Attack' || i.customId === 'Items' || i.customId === 'Flee') {
            if (i.customId === 'Attack') {
                await i.channel.send({ content: 'Attack was clicked!', components: [] });
            }
            if (i.customId === 'Items') {
                await i.channel.send({ content: 'Items was clicked!', components: [] });
            }
            if (i.customId === 'Flee') {
                await i.channel.send({ content: 'Flee was clicked!', components: [] });
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.id, click.customId)
        })
        if (collection.first()?.customId === 'Attack') {
            //attack opponent
            interaction.channel?.send({
                content: 'You attacked',
            })
        }
        else if (collection.first()?.customId === 'Items') {
            //open items
            interaction.channel?.send({
                content: 'You opened your bag',
            })
        }
        else if (collection.first()?.customId === 'Flee') {
            //flee
            interaction.channel?.send({
                content: 'You fled',
            })
        }
        else {
            //continue waiting for input???
            console.log('Unknown action performed')
        }
        reply.delete()
        //deletes the buttons once action is performed
        
    });
}
