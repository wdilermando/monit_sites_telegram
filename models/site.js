const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const siteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    services: {
        type: Array,
        required: true
    },
    auth: {
        type: Object,
        required:true
    }
});

module.exports = mongoose.model('Site', siteSchema);



// const getDb = require('../util/database').getDb;

// class Site {
//     constructor(nome, services, auth){
//         this.nome = nome;
//         this.services = services;
//         this.auth = auth
//     }

//     save() {
//         const db = getDb();
//         return db.collection('sites')
//             .insertOne(this)
//             .then((result)=> console.log(result))
//             .catch(err => console.log(err));        
//     }


// }

// module.exports = Site