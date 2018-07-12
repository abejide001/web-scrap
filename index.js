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
    });

const url = 'http://www.cbn.gov.ng/rates/exchratebycurrency.asp';

axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        let html = response.data;
        let $ = cheerio.load(html);
        let currencies = [];
        let date = "";

        $('#ContentTextinner').find('table.othertables').first().find('tr').each((i, tr) => {
            anticipatedDate = $(tr).children().first().text();
            if (/\S/.test(anticipatedDate)) {
            date = anticipatedDate;
            }
            currencies.push (
            {
                date: date,
                currency: $(tr).children().eq(1).first().text(),
                buying: parseFloat($(tr).children().eq(2).first().text())*10000,
                central: parseFloat($(tr).children().eq(3).first().text())*10000,
                selling: parseFloat($(tr).children().eq(4).first().text())*10000
            }
            );
        });
        for (i in currencies) {
            let date = currencies[i].date;
            let currency = currencies[i].currency;
            let buying = currencies[i].buying;
            let central = currencies[i].central;
            let selling = currencies[i].selling;
            let sql = "INSERT INTO scrap(date, currency, buying, central, selling) VALUES ('"+date+"','"+currency+"','"+buying+"','"+central+"','"+selling+"')";
            con.query(sql, (err, result) => {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    }
}, (error) => console.log(err) );

