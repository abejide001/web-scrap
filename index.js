//load the modules
const  cheerio = require('cheerio');
const axios = require('axios');
const  mysql = require('mysql');
const express = require('express');
const home = require('./routes/select');
const con = require('./con');
const app = express();

app.use('/', home);

//connect to the db
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //create the table
    var sql = "CREATE TABLE IF NOT EXISTS scrap (id INT AUTO_INCREMENT PRIMARY KEY, currency_symbol VARCHAR(255), currency_value INT(30))";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
});

const url = 'http://www.cbn.gov.ng/rates/exchratebycurrency.asp';
//get the data with axios
axios.get(url)
.then((response) => {
if(response.status === 200) {
    let html = response.data;
    let $ = cheerio.load(html);
    let currencies = [];
//get the class, and the elements to scrap
$('#ContentTextinner').find('table.othertables').first().find('tr').each((i, tr) => {
    currencies.push ({
    currency_symbol: $(tr).children().eq(1).first().text(),
    currency_value: parseFloat($(tr).children().eq(3).first().text())*10000,
    });
});
//splice the first element in the array 
currencies.splice(0, 1);
//loop through the currencies   
for (i = 0; i < currencies.length; i++) {
    if (currencies[i].id === 1) continue;
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
//listen for the port
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});