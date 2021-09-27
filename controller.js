
const database = require('./database/database.js');

module.exports = {
    

    master: function (req, res) {
        return database.master(req.query.product_id)


    },

    reviews: function (req, res) {
        if (req.query.product_id === undefined) {
            req.query.product_id = req.headers.product_id;
        }
        
        database.reviews(req.query.product_id).then((results) => {
           
            for (let i = 0; i < results.rows.length; i++) {
                let dateObj = new Date(Number(results.rows[i].date))
                results.rows[i].date = dateObj
                results.rows[i].review_id = results.rows[i].id
                results.rows[i].helpfulness = Number(results.rows[i].helpfulness)
                if (results.rows[i].url === null) {
                    results.rows[i].photos = [];
                } else {
                    results.rows[i].photos = [{url: results.rows[i].url}]
                }
                if (results.rows[i].response == 'null') {
                    results.rows[i].response = null;
                }

            }
        
         res.send(results.rows)

        }).catch((err) => { console.log(err)})
    },
    meta: function(req, res) {
        if (req.query.product_id === undefined) {
            req.query.product_id = req.headers.product_id;
        }
        
        database.meta(req.query.product_id).then((results) => {
            let ratingSum = {};
            let characteristicObj = {};
            let namesObj = {};
            let recommended = 0;
            for (let i = 0; i < results.rows.length; i ++) {
                if (ratingSum[results.rows[i].rating] !== undefined) {
                    ratingSum[results.rows[i].rating] += 1;
                } else {
                    ratingSum[results.rows[i].rating] = 1;
                }
                
                if (characteristicObj[results.rows[i].id] !== undefined) {
                    characteristicObj[results.rows[i].id] += results.rows[i].value
                } else {
                    characteristicObj[results.rows[i].id] = results.rows[i].value
                    namesObj[results.rows[i].id] = results.rows[i].name
                    if (results.rows[i].recommend){
                       recommended += 1; 
                    }
                }
            }
            
            let characteristics = {};
            for (let key in characteristicObj) {
                characteristics[namesObj[key]] = {id: Number(key), value: characteristicObj[key]/(results.rows.length/Object.keys(characteristicObj).length)}


            }

             let metaResults = {product_id : req.query.product_id, 
                ratings: ratingSum,
                recommended: {true: recommended},
                characteristics: characteristics
            }
            res.send (metaResults)
        }).catch((err) => { console.log(err)})
    },
    help: function(req, res) {
        
        database.help(req.body.review_id).then((results) => { 
        res.send(201)
        }).catch((err) => { console.log(err)})
    },
    postReview: function(req, res) {
        database.postReview(req.body).then ((results) => {
            
            res.send(200)
        }).catch((err) => { console.log(err)})
    },
    report: function(req, res) {
        database.report(req.body.review_id).then((results) => {
            res.send(201)
        }).catch((err) => { console.log(err)})
    },

}

