module.exports.run = async (client, message, player) => {
    message.channel.send(`Your Status:\nLevel: ${player.level}\nHP: ${player.HP}/${player.maxHP}\nAttack Power: ${player.damage}, on crit ${player.damage*2}\nDefense Negation: ${player.defense}\nHeal Strength: ${player.level*10}\n`)

}