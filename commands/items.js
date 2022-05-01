const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (interaction, returnObject) => {
    const row1 = new MessageActionRow() //first row of buttons
        .addComponents(
            new MessageButton()
                .setCustomId('lowP')
                .setEmoji('❤️')
                .setLabel('Low Quality Potion')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('midP')
                .setEmoji('❤️')
                .setLabel('Mid Quality Potion')
                .setStyle('PRIMARY')
        )
    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('lowB')
                .setEmoji('💪') 
                .setLabel('Angry Ale')
                .setStyle('SECONDARY') 
        )
        .addComponents(
            new MessageButton()
                .setCustomId('midB')
                .setEmoji('💪')
                .setLabel('Raging Ale')
                .setStyle('PRIMARY')
        )
    const row3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('lowD')
                .setEmoji('☠️')
                .setLabel('Throwing Knife')
                .setStyle('SECONDARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('midD')
                .setEmoji('☠️')
                .setLabel('Throwing Axe')
                .setStyle('PRIMARY')
        )
        
    let reply = await interaction.reply({
        content: 'Choose your action:',
        components: [row1, row2, row3], 
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
        if (i.customId === 'lowP'||i.customId === 'midP'||i.customId === 'lowB'||i.customId === 'midB'||i.customId === 'lowD'||i.customId === 'midD') {
            if (i.customId === 'lowP') {
                await i.channel.send('low quality potion!')
                returnObject.returnValue = 'lowP'
            }
            else if (i.customId === 'midP') {
                await i.channel.send('mid quality potion!')
                returnObject.returnValue = 'midP'
            }
            else if (i.customId === 'lowB') {
                await i.channel.send('angry ale!')
                returnObject.returnValue = 'lowB'
            }
            else if (i.customId === 'midB') {
                await i.channel.send('raging ale!')
                returnObject.returnValue = 'midB'
            }
            else if (i.customId === 'lowD') {
                await i.channel.send('throwing knife!')
                returnObject.returnValue = 'lowD'
            }
            else if (i.customId === 'midD') {
                await i.channel.send('throwing axe!')
                returnObject.returnValue = 'midD'
            } else {
                returnObject.returnValue = "no item picked?"
            }
        }
    });

    collector.on('end', async collection => {
        collection.forEach((click) => {
            console.log(click.user.id, click.user.username, click.customId)
        }) 
        reply.delete()
    });
}
