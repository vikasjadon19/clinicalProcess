const { Client } = require('pg'); 

// Can be updated from config file
const client = new Client({
    user: process.env.user || 'testUser',
    host: process.env.dbHost || 'host',
    database: process.env.db || 'pateintClinicalMetrics',
    password: process.env.dbPassword || 'password',
    port: process.env.port || 8000,
});

async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}


module.exports = {
    client,
    connectToDB
}
