const webhooks = require('node-webhooks');
const request = require('request');
const Site = require('../models/site');

const hooks = new webhooks({
    db: { 'callback_hook': ['http://localhost:3000/telegram/send'] }
});

exports.getWebStatus = (req, res, next) => {  
    
    Site.find().then(result=>{
        const s = result;
        return s;     
    })
    .then((sites)=>{        
        const s = sites.map((el) => el.name);
        setTimeout(()=>{
            getWebStatus(s);
        },500)
    })
    .catch(err=>{
        console.log('Falha', err);        
    });
    
    const sites = [];
    let completed_requests = 0;

    function getWebStatus(urls) {
        
        if(urls.length){
            for (i in urls) {
                request.get({
                    url: urls[i],
                    time: true
                }, (err, response) => {                    
                    const site = {
                        host: response.request.uri.href,
                        status: response.statusCode,
                        time: response.elapsedTime
                    }
                    sites.push(site)
                    completed_requests++;
                    if (completed_requests == urls.length) {
                        sites.forEach((elem) => {
                            if (elem.status != 200) {
                                hooks.trigger('callback_hook', { msg: `::Aviso:: O site ${elem.host} está indisponível - Tendo como status code ${elem.status}` })
                            }
                            if (elem.time >= 300) {
                                hooks.trigger('callback_hook', { msg: `::Aviso:: O site ${elem.host} está lento - Tempo médio de resposta ${elem.time} ms` })
                            }
                        });
                        res.json(sites);
                    } 
                });
            }
        } else {
            res.json({ msg: "Não foi possível processar essa informação, tente novamente mais tarde!" }).status(500).end();
        }
    }
    
}

