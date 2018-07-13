const fs = require('fs')
const express = require('express');
const router = express.Router();
const app = express();
const con = require('../con');
app.use(express.json())
//home route
router.get('/', (req, res) => {
    var sql = "SELECT * FROM scrap LIMIT 10";
    con.query(sql, function (err, result) {
    if (err) throw err;
        fs.writeFileSync('scrap.json', JSON.stringify(result));//converting to JSON
    });
})

module.exports = router;
