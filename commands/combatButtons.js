const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

//const {character} = require("./character.js")
//const {combat} = require("./combat.js")
// TODO: fix import for combat / character class, importing combat 
//       should bring in character class as well

module.exports.run = async (client, interaction) => {

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
        time: 1000 * 60, //60 seconds to confirm choice
    });

    collector.on('collect', async i => {
        if (i.customId === 'Attack'||i.customId === 'Defend'||i.customId === 'Potion'||i.customId === 'Flee') {
            if (i.customId === 'Attack') {
                await i.channel.send({ content: 'Attack was clicked!', components: [] })
                //attack action
            }
                        
            if (i.customId === 'Defend') {
                await i.channel.send({ content: 'Items was clicked!', components: [] })
                //defend action
            }
            if (i.customId === 'Potion') {
                await i.channel.send({ content: 'Items was clicked!', components: [] })
                //heal action
            }
            if (i.customId === 'Flee') {
                await i.channel.send({ content: 'Flee was clicked!', components: [] })
                //flee action
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
