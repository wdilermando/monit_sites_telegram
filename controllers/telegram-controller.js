const webhooks = require('node-webhooks');
const telegram = require('telegram-bot-api');
const convertT = require('../util/_helpers')

const api = new telegram({
    token:'949394330:AAGF9_jmWRj-RB2GQzEOgUicl9T1QiLcfzA',
    updates: {
        enabled: true
    }
});

const hooks = new webhooks({
    db: { 'send_command': ['http://localhost:3000/command'] }
});

api.on('message', message=>{    

    if(message.reply_to_message){
        const msg = message.reply_to_message.text
        let site = "";

        if(msg.startsWith(':')){
            site = msg.split(" ")[3];            
        } else {
            site = msg.split(" ")[2];
        }        
        const c = message.text.split(" ")[0]
        const service = message.text.split(" ")[1]

        const date = convertT.convertUnixToDate(message.date);

        const cmd = {
            host: site,
            command: c,
            service,
            data: date
        }
        hooks.trigger('send_command', cmd)
    }
})


exports.getBotInfo = (req, res, next) => { 
    api.getMe()
    .then(data =>{
        res.json(data);        
    })
    .catch(err =>{
        console.log(err);        
    });        
};

exports.sendMessageToBot = (req, res, next)=>{        
    
    api.sendMessage({
        chat_id: '929303387',
        text: req.body.msg
    }).then(data=>{
        res.json(data).status(200).end()       
    }).catch(err=>{
        res.json(err).status(500).end()    
    })

}

