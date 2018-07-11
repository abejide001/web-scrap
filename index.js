const  cheerio = require('cheerio');
const axios = require('axios');

let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';

axios.get(base_url).then( (response) => {
    let $ = cheerio.load(response.data);
    let kurs = [];
    $('tr', '.text-right').each( (i, elm) => {
        kurs.push( {
        currency: $(elm).children().first().text(),
        erate: {
            sell: $(elm).children().eq(1).first().text(),
            buy: $(elm).children().eq(2).first().text()
        },
        tt: {
            sell: $(elm).children().eq(3).first().text(),
            buy: $(elm).children().eq(4).first().text()
        },
        notes: {
            sell: $(elm).children().eq(5).first().text(),
            buy: $(elm).children().eq(6).first().text()
        }
        });
    });
    return(kurs);
    })
    .then ( (kurs) => {
    console.log(kurs);
});