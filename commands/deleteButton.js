const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (interaction, returnObject, flag) => {
    if (flag) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('keep')
                    .setLabel('Keep Text Above')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete Text Above')
                    .setStyle('DANGER')
            )
            
        let reply = await interaction.channel.send({
            components: [row],
        })

        
        const filter = (btnInt) => {
            return interaction.member.user.id === btnInt.user.id
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 100, //100 seconds to confirm choice
        });

        collector.on('collect', async i => {
            if (i.customId === 'delete' || i.customId === 'keep') {
                if (i.customId === 'delete') {
                    returnObject.returnValue = 'delete';
                }
                if (i.customId === 'keep') {
                    returnObject.returnValue = 'keep';
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
}