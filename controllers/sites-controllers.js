const Site = require('../models/site')

exports.insertSite = (req, res, next) => {
    
    const name = req.body.name;
    const services = req.body.services;
    const auth = req.body.auth;

    const site = new Site({name, services, auth})

    site.save()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.status(500).end();
            console.log(err);
        })
    
}

exports.getSites = (req, res, next)=>{
    Site.find()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.status(500).end();
        console.log(err);
    })
}

exports.getSite = (req, res, next)=>{
    const siteId = req.params.siteId
    Site.findById(siteId)
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.status(500).end();
            console.log(err);
        })
}

exports.updateSite = (req,res,next)=>{

    const siteId = req.params.siteId
    const name = req.body.name;
    const services = req.body.services;
    const auth = req.body.auth;

    Site.findById(siteId)
        .then(site =>{
            site.name = name;
            site.services = services;
            site.auth = auth;
            return site.save();
        })
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            res.status(500).end();
            console.log(err);
        })    
    
}

exports.deleteSite = (req, res, next)=>{
    const siteId = req.params.siteId
    Site.deleteOne({_id: siteId})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.status(500).end();
            console.log(err);
        })
}