//const master = require('./controller.js').master;
// const redis = require('redis');
// const e = require('express');
// const database = require('./database/database.js');

// const client = redis.createClient();

// client.on('connect', () => {
//   console.log('Connected!');
// });
// client.on('error', (err) => { console.log(err); });

// module.exports = { 
//   masterRedis: async (req, res) => {
//       console.log(req.url)
//     if (req.query.product_id === undefined) {
//         req.query.product_id = req.headers.product_id;
//     }
//     client.get(req.query.product_id, (err, response) => {
//       if (response !== null) {
//           console.log('from cache')
//         const parsedResponse = JSON.parse(response);
//         res.send(parsedResponse);
//       } else {
//           console.log('from DB')
//           database.master(req.query.product_id).then((results) => {

        
//             let ratingSum = {};
//             let characteristicObj = {};
//             let namesObj = {};
//             let recommended = 0;
//             let ratingCount = 0;
//             for (let i = 0; i < results.rows.length; i ++) {
//                 if (ratingSum[results.rows[i].rating] !== undefined) {
//                     ratingSum[results.rows[i].rating] += 1;
//                 } else {
//                     ratingSum[results.rows[i].rating] = 1;
//                     ratingCount += 1;
//                 }
                
//                 if (characteristicObj[results.rows[i].characteristic_id] !== undefined) {
//                     characteristicObj[results.rows[i].characteristic_id] += results.rows[i].value
//                 } else {
//                     characteristicObj[results.rows[i].characteristic_id] = results.rows[i].value
//                     namesObj[results.rows[i].characteristic_id] = results.rows[i].name
//                     if (results.rows[i].recommend){
//                        recommended += 1; 
//                     }
//                 }
//             }       
            
//             let characteristics = {};
//             for (let key in characteristicObj) {
//                 characteristics[namesObj[key]] = {id: Number(key), value: characteristicObj[key]/(results.rows.length/Object.keys(characteristicObj).length)}


//             }
//             const numberOfReviews = results.rows.length/(Object.keys(characteristics).length);
//             for (let key in ratingSum) {
//                 ratingSum[key] = ratingSum[key]/Object.keys(characteristics).length;
//             }

//              let metaResults = {product_id : req.query.product_id, 
//                 ratings: ratingSum,
//                 recommended: {true: recommended},
//                 characteristics: characteristics
//             }

//             // photos object and review object
//             let photosObj = {};
//             let reviewsObj = {};

//             for (let i = 0; i < results.rows.length; i++) {
//                 let dateObj = new Date(Number(results.rows[i].date))
//                 results.rows[i].date = dateObj
//                 results.rows[i].helpfulness = Number(results.rows[i].helpfulness)
//                 if (results.rows[i].url === null) {
//                     results.rows[i].photos = [];
//                 } else {
//                     if (photosObj[results.rows[i].review_id] === undefined) {
//                         photosObj[results.rows[i].review_id] = [{url: results.rows[i].url}]
//                     } else if (photosObj[results.rows[i].review_id].filter(e => e.url === results.rows[i].url).length === 0) {
//                         photosObj[results.rows[i].review_id].push({url: results.rows[i].url});
//                     }
//                 }
//                 if (results.rows[i].response == 'null') {
//                     results.rows[i].response = null;
//                 }
//                 reviewsObj[results.rows[i].review_id] = results.rows[i]
//             };

//             let photosKeys = Object.keys(photosObj);
//             for (let key in reviewsObj) {
//                 if (photosKeys.includes(key)) {
//                     reviewsObj[key].photos = photosObj[key]
//                 }
//             }

//              let reviewResultsArray = [];

//              for (let key in reviewsObj) {
//                  reviewResultsArray.push(reviewsObj[key])
//              }
//             //const reviewResults = results.rows.slice(0, numberOfReviews)
//             //iterate through again
//             // if 
           
            
//             client.set(req.query.product_id, JSON.stringify([reviewResultsArray, metaResults]))
//             //res.send([reviewResultsArray, metaResults])
//             res.send([reviewResultsArray, metaResults])

//         }).catch((err) => {
//             console.log(err)
//         })

//           //console.log((queryResult))
//           //client.set(req.query.product_id, JSON.stringify(queryResult))
//           //res.send(queryResult)
//       }
//     });
//   },
//   client: client
// };

