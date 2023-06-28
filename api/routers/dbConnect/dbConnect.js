const config = require('../../config/config.json');
const { MongoClient } = require('mongodb');

// Fonction de connexion à la base de données
exports.connect = async function connect() {
    const client = await MongoClient.connect(config.dbURL, {
        useUnifiedTopology: true,
    });
    const db = client.db();
    return { client, db };
};
