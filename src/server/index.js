// eslint-disable-next-line no-undef
const { Client } = require('pg');
const express = require('express');
//require('dotenv').config();
const jsforce = require('jsforce');

const { SF_USERNAME, SF_PASSWORD } = process.env;
if (!(SF_USERNAME && SF_PASSWORD)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
});
conn.login(SF_USERNAME, SF_PASSWORD, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});

module.exports = app => {
    // put your express app logic here
    app.use(express.json());

    app.get('/data/products', (req, res) => {
        var products = [];

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect();

        client.query(
            'SELECT sfid,name,picture_url__c,price__c FROM salesforce.product__c;',
            (err, data) => {
                if (err) console.log(err);
                products = data.rows.map(productRecord => {
                    return {
                        id: productRecord.sfid,
                        name: productRecord.name,
                        price: '$' + productRecord.price__c,
                        quantity: 0,
                        picture: productRecord.picture_url__c
                    };
                });
                res.json(products);
                client.end();
            }
        );
    });

    app.post('/data/placeOrder', (req, res) => {
        conn.apex.post('/placeOrder/', req.body, (err, data) => {
            if (err) {
                console.error(err);
            }
            res.json(data);
        });
    });
};
