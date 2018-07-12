const  cheerio = require('cheerio');
const axios = require('axios');
const  mysql = require('mysql');
const express = require('express');

var con = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7247101",
    password: "xWTKZU6SU8",
    database: "sql7247101"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS scrap (id INT AUTO_INCREMENT PRIMARY KEY, currency_symbol VARCHAR(255), currency_value INT(30))";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
});
const url = 'http://www.cbn.gov.ng/rates/exchratebycurrency.asp';

axios.get(url)
.then((response) => {
if(response.status === 200) {
    let html = response.data;
    let $ = cheerio.load(html);
    let currencies = [];

$('#ContentTextinner').find('table.othertables').first().find('tr').each((i, tr) => {
    currencies.push ({
    currency_symbol: $(tr).children().eq(1).first().text(),
    currency_value: parseFloat($(tr).children().eq(3).first().text())*10000,
        }
        );
        });
for (i = 0; i < currencies.length; i++) {
    if (currencies[i] === 0) continue;
    let currency = currencies[i].currency_symbol;
    let value = currencies[i].currency_value;
    let sql = "INSERT INTO scrap(currency_symbol, currency_value) VALUES ('"+currency+"','"+value+"')";
        con.query(sql, (err, result) => {
            if (err) throw err;
                console.log("1 record inserted");
            });
        }
    }
}, (error) => console.log(err) );

