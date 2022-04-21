const { Interaction, MessageComponentInteraction, MessageActionRow, MessageButton } = require('discord.js');

///module.exports.run = async (client, interaction, args) => {}
//template above when needing async functionality

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
                .setCustomId('heal')
                // .setEmoji('')
                .setLabel('Heal')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('defend')
                // .setEmoji('')
                .setLabel('Defend')
                .setStyle('SUCCESS')
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
        ephemeral: true,
        components: [row],
        });
    
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
        reply.delete();
    });

    
}

/*
import { Interaction, MessageActionRow, MessageButton, MessageComponentInteraction} from "discord.js";
import { ICommand } from "wokcommands";


export default {
    category: 'Testing',
    description: 'begin combat test',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel }) => {
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
        await msgInt.reply({
            content: 'Choose your action:',
            components: [row],
            ephemeral: true,
        })


        const filter = (btnInt: Interaction) => {
            return msgInt.user.id === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 60, //60 seconds to confirm choice
        })

        
        collector.on('collect', (i: MessageComponentInteraction) => {
            i.reply({
                content: 'You clicked a button',
                ephemeral: true
            })
        })
        

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })
            if (collection.first()?.customId === 'Attack') {
                //attack opponent
                msgInt.channel?.send({
                    content: 'You attacked',
                })
            }
            else if (collection.first()?.customId === 'Items') {
                //open items
                msgInt.channel?.send({
                    content: 'You opened your bag',
                })
            }
            else if (collection.first()?.customId === 'Flee') {
                //flee
                msgInt.channel?.send({
                    content: 'You fled',
                })
            }
            else {
                //continue waiting for input???
                console.log('Unknown action performed')
            }

            await msgInt.editReply({
                content:'Your action:',
                components: []
            })
            
        })
    },
} as ICommand
*/