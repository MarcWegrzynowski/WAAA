const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

//const {character} = require("./character.js")
//const {combat} = require("./combat.js")
// TODO: fix import for combat / character class, importing combat 
//       should bring in character class as well


module.exports.run = async (client, interaction, returnObject) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('attack')
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
                .setCustomId('flee')
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
        //filter,
        max: 1,
        time: 1000 * 9, //60 seconds to confirm choice
    });

    collector.on('collect', async i => {

        if (i.customId === 'attack' || i.customId === 'defend' || i.customId === 'heal' || i.customId === 'flee') {
            // await i.reply({ content: 'A button was clicked!', components: [] });
            if (i.customId === 'attack') {
                returnObject.returnValue = 'attack'
            }
            else if (i.customId === 'defend') {
                returnObject.returnValue = 'defend'
            }
            else if (i.customId === 'heal') {
                returnObject.returnValue = 'heal'
            }
            else if (i.customId === 'flee') {
                returnObject.returnValue = 'flee'
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.id, click.customId)
        })
        //deletes the buttons once action is performed
       
        reply.delete();

    });

    
}
