
module.exports.run = async (client, message) => {
    // check if you are already in a thread
    if (message.channel.isThread()) {
        message.channel.send("You're already in a thread silly")
    } // otherwise your in a channel then...
    else {
        const adventureName = message.author.username + "'s Adventure"
        const threadCheck = message.channel.threads.cache.find(x => x.name === adventureName)

        // check if thread already exists
        if (!threadCheck){
            // if thread does NOT exist, make it
            const thread = await message.channel.threads.create({
                name: adventureName,
                autoArchiveDuration: 60,
                reason: 'To have the user play an rpg',
            });
            // thread.members.add(message.author.id);
            // message.author.username for their username
            // message.member.user.id //works for discord channels
            // message.author.id //works in more situations BETTER
            console.log(`user: ${message.author.username}`)
            console.log(`user id: ${message.author.id}`)
            console.log(`Created thread name: ${thread.name}`)
            console.log(`Created thread id: ${thread.id}`)
            message.reply("There you go")

            
        } else {
            // else remind user where thread is
            message.reply("You already have a thread you dum dum")
            const thread = message.channel.threads.cache.find(x=>x.name === adventureName)
            console.log(`ThreadID: ${thread.id}`)
            thread.send('Here is your thread <@' + message.author.id + '>' )
        }
    }
}