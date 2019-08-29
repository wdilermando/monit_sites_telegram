const exec = require('ssh-exec');
const webhooks = require('node-webhooks');
const Site = require('../models/site');

const hooks = new webhooks({
    db: { 'callback_hook': ['http://localhost:3000/telegram/send'] }
});

exports.executeStatusCommand = (command, host) => {

    Site.find().then(result => {
        const s = result;
        return s;
    })
        .then((sites) => {
            setTimeout(() => {
                executeCommand(sites)
            }, 500)
        })
        .catch(err => {
            console.log('Falha', err);
        });

    function executeCommand(serverCredentials) {

        if (command == '') {
            hooks.trigger('callback_hook', { msg: `Comando não reconhecido` });
        } else {
            serverCredentials.forEach((elemento) => {
                if (elemento.name == host) {
                    elemento.services.forEach(elem => {
                        exec(`systemctl ${command} ${elem.name}`, elemento.auth, (err, stdout, stderr) => {
                            hooks.trigger('callback_hook', { msg: `${elem.name} - ${elemento.name} - ${stdout}` })
                        });
                    })
                }
            });
        }
    }

}

exports.executeOtherCommands = (command, host, service) => {

    Site.find().then(result => {
        const s = result;
        return s;
    })
        .then((sites) => {
            setTimeout(() => {
                executeCommand2(sites)
            }, 500)
        })
        .catch(err => {
            console.log('Falha', err);
        });

    function executeCommand2(serverCredentials) {

        if (command == '' || service == '') {
            hooks.trigger('callback_hook', { msg: `Comando não reconhecido` });
        } else {
            serverCredentials.forEach((elemento) => {
                if (elemento.name == host) {
                    elemento.services.forEach(elem => {
                        if (elem.name == service) {
                            exec(`systemctl ${command} ${service}`, elemento.auth, (err, stdout, stderr) => {
                                hooks.trigger('callback_hook', { msg: `Comando ${command} enviado para o serviço ${service}` })
                            });
                        }
                    })
                }
            });
        }
    }
}




