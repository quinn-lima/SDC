var db = require('./index.js');

//different queries
/*
REVIEWS

headers: {
      Authorization: apiToken
    },
    params: {
      sort: sort,
      count: 100,
      product_id: product
    }



get product inserted in params, count with 100 results per page, sort by whatever is inserted into the 
    {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
    combine this with the meta data for initial requests
    combine this with characteristics reviews
        -each review has size, width, comfort and cooresponding number
    as well as recomended? 
    
*/

module.exports = {
      reviews: function (product_id) {
        return new Promise((resolve, reject) => {
         db.query(`SELECT reviews.id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommend, reviews.reported, reviews.reviewer_name, reviews.response, reviews.helpfulness, reviews_photos.url FROM reviews_schema.reviews LEFT JOIN reviews_schema.reviews_photos ON reviews.id = reviews_photos.review_id WHERE reviews.product_id = ${product_id}`, [], (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });
        
      // db.query('SELECT * FROM reviews WHERE reviews.product_id = 47421', []).then((results) => { console.log(results)}).catch((err)=>{console.log(err)})

        //console.log('some', someShit)
      },
      
    
      
      
      /*
      GET META
      return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${product}`, {
          headers: {
              Authorization: apiToken
            }
        }).then((results) => {
            console.log('getMetaaa', results.data)
            return results.data;
        */
       // make sure to take in the product id
       //
            meta: function (product_id) {
                return new Promise((resolve, reject) => {
                  db.query(`SELECT reviews.rating, reviews.recommend, characteristics.id, characteristics.name, characteristics_reviews.value FROM reviews_schema.reviews INNER JOIN reviews_schema.characteristics ON characteristics.product_id = reviews.product_id INNER JOIN reviews_schema.characteristics_reviews ON characteristics_reviews.characteristic_id = characteristics.id WHERE reviews.product_id = ${product_id} AND characteristics_reviews.review_id = reviews.id;`, [], (err, res) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(res);
                    }
                  });
                });
              },
          


            /*
            
            PUT HELP
            return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/helpful`, null, {
                headers: {
                    Authorization: apiToken
                }

                update reviews.helpfulness += 1
            */
                help: function (review_id) {
                    return new Promise((resolve, reject) => {
                      db.query(`UPDATE reviews_schema.reviews SET helpfulness = helpfulness + 1 WHERE reviews.id = ${review_id};`, [], (err, res) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(res);
                        }
              
                      });
                    });
                  },

               /* 
                POST REVIEW
                const data = { product_id: product_id, rating: rating, summary: summary, body: body, recommend: recommend, name: name, email: email, characteristics: characteristics, photos: [] };
                return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', data, {
                    headers: {
                        Authorization: apiToken
                    }
                });


                const { product_id, rating, summary, body, recommend, name, email, characteristics } = obj;
                const data = { product_id: product_id, rating: rating, summary: summary, body: body, recommend: recommend, name: name, email: email, characteristics: characteristics, photos: [] };
                this data object will be sent over. what is characteristics?


                */

                postReview: function (req) {
                    //generate query string for 
                    //characteristics keys 
                    var queryString = `WITH rev_key AS (INSERT INTO reviews_schema.reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${req.product_id}, ${req.rating}, null, '${req.summary}', '${req.body}', ${req.recommend}, false, '${req.name}', '${req.email}', null, 0) RETURNING id) INSERT INTO reviews_schema.characteristics_reviews (review_id, characteristic_id, value) VALUES`

                    for (let key in req.characteristics) {
                        queryString += ` ((SELECT rev_key.id FROM rev_key), ${key}, ${req.characteristics[key]}),`
                    }
                    queryString = queryString.slice(0, -1)

                    if (req.photos.length > 0) {
                      console.log('made it to photos')
                      queryString += ' INSERT INTO reviews_schema.reviews_photos (reviews_id, url) VALUES'
                      
                      for (let i = 0; i < req.photos.length; i++) {
                        queryString += ` (rev_key.id, '${req.url[i]}'),`
                      }
                      
                     queryString = queryString.slice(0, -1)
                    }

                    console.log('querystring', queryString)


                    // return new Promise((resolve, reject) => {
                    //   db.query(queryString + ';', [], (err, res) => {
                    //     if (err) {
                    //       reject(err);
                    //     } else {
                    //       resolve(res);
                    //     }
               
                    //   });
                    // });
                  },

                
                /*
                PUT REPORT
                return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/report`, null, {
                    headers: {
                        Authorization: apiToken
                    }
                });

                update reviews.reported to true for the review id should come in the url


                INSERT INTO reviews 
                    (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) 
                    VALUES (47421, 5, null, summary, bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, true, false, username, email@email.com, null, 0) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158622, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158623, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158624, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158625, 1)
error: syntax error at or near ";"
    at Parser.parseErrorMessage (/Users/quinnlima/repositories/SDC/node_modules/pg-protocol/dist/parser.js:287:98)
    at Parser.handlePacket (/Users/quinnlima/repositories/SDC/node_modules/pg-protocol/dist/parser.js:126:29)
    at Parser.parse (/Users/quinnlima/repositories/SDC/node_modules/pg-protocol/dist/parser.js:39:38)
    at Socket.<anonymous> (/Users/quinnlima/repositories/SDC/node_modules/pg-protocol/dist/index.js:11:42)
    at Socket.emit (events.js:400:28)
    at addChunk (internal/streams/readable.js:290:12)
    at readableAddChunk (internal/streams/readable.js:265:9)
    at Socket.Readable.push (internal/streams/readable.js:204:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:188:23) {
  length: 91,
  severity: 'ERROR',
  code: '42601',
  detail: undefined,
  hint: undefined,
  position: '245',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'scan.l',
  line: '1180',
  routine: 'scanner_yyerror'
}
[nodemon] restarting due to changes...
[nodemon] starting `node node app.js`
Listening on 5000
post review {
  product_id: 47421, 
  rating: 5,
  summary: 'summary',
  body: "bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd",
  recommend: true,
  name: 'username',
  email: 'email@email.com',
  characteristics: { '158622': 1, '158623': 1, '158624': 1, '158625': 1 }, 
  photos: []
}
     INSERT INTO reviews 
                    (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) 
                    VALUES (47421, 5, null, summary, bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, true, false, username, email@email.com, null, 0) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158622, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158623, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158624, 1) INSERT INTO characteristics_reviews (review_id, characteristic_id, value)
                        VALUES (SELECT reviews.id FROM reviews WHERE reviews.body = bodybodybodybodybodbykdsjaflskjd;lfajs;dljalkjsdaf'sdkjd, 158625, 1)




                */

                report: function (review_id) {
                  console.log('made it to retport')
                    return new Promise((resolve, reject) => {
                      db.query(`UPDATE reviews_schema.reviews SET reported = true WHERE reviews.id = ${review_id};`, [], (err, res) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(res);
                        }
              
                      });
                    });
                  },

                /*
                
                
                POST INTERACTION
                const time = new Date();
                console.log('date', time);
                return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', {
                    element: element,
                    widget: 'Rating & Reviews',
                    time: time
                }, {
                    headers: {
                        Authorization: apiToken
                    }
                    */



                }