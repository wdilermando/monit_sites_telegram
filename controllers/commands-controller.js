const exec = require('../util/execute');

exports.sendCommandToServer = (req, res, next)=>{
    const body = req.body;   
    const cmd = body.command.toLowerCase();

    switch (cmd) {
        case 'status':
            exec.executeStatusCommand('is-active', body.host)
            break;
        case 'start': 
            if(body.service){
                exec.executeOtherCommands('start', body.host, body.service);
            } 
            break;
        case 'stop':  
            if(body.service){          
                exec.executeOtherCommands('stop' , body.host, body.service);
            }
            break;
    
        default:
            exec.executeStatusCommand('');
            break;
    }
    
}

