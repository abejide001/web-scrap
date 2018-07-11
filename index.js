const  cheerio = require('cheerio');
const axios = require('axios');

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
                buying: $(tr).children().eq(2).first().text(),
                central: $(tr).children().eq(3).first().text(),
                selling: $(tr).children().eq(3).first().text()
            }
            );
        });
        console.log(currencies);
    }
}, (error) => console.log(err) );