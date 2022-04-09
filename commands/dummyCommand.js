module.exports.run = async (client, message, continueFlag) => {
    //Temporary value
    let startFlag = true;

    function delay(ms) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    let testValue = ['String','TestString']

    return testValue

    /*
    let filter = m => m.content.includes('Auth');

    //Will delete the command message
    if(startFlag && !continueFlag) {
        message.channel.send('Test Loop Trial run 1').then (async (msg)=>{
            message.delete()
            await (delay(1000));
            message.channel.send('Enter Auth to continue:').then (async (input) => {
                message.channel.awaitMessages({filter, max: 1, time: 10000, errors: ['time']})
                    .then(collected => startFlag = false)
                    .catch(collected => message.channel.send('Loop Ended'))
            })
        })
    }
        
    if (continueFlag) {
        message.channel.send('Enter Input Below:').then (async (input) => {
            message.delete();
            await (delay(1000));
            message.channel.awaitMessages({max: 1, time: 5000, errors: ['time']})
                .catch(collected => message.channel.send('Loop has Ended'))
        }).then (async () => {
            await (delay(10000));
            if (continueFlag) {
                message.channel.send('===================\n     Loop Again    \n===================')
            }
            else {
                message.channel.send('Loop Ended');
                startFlag = true;
            }
        })
    }
    */
    //template for making your own commands
}