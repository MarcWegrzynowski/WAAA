const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (interaction, returnObject, flag) => {
    if (flag) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('continue')
                    .setEmoji('✅')
                    .setLabel('continue')
                    .setStyle('SUCCESS')
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
            if (i.customId === 'continue') {
                if (i.customId === 'continue') {
                    returnObject.returnValue = 'continue';
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