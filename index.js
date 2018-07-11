const  cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const axios = require('axios');

axios.get('https://www.oanda.com/currency/live-exchange-rates/#Majors')
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
            const $ = cheerio.load(html); 
            let currency = [];
            $('.inline_rates_container').each(function(i, elem) {
                currency[i] = {
                    title: $(this).find('.bigger').text().trim().split(' ')
                } 
            })  
            console.log(currency);
            
    }
    }, (error) => console.log(err) );