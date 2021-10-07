const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);
const pg = require('pg')
const { password } = require('../config');

//const cn = `postgres://quinnlima:password@localhost:5429/sdc`;
//postgres://userName:password@serverName/ip:port/nameOfDatabase";
//var db = new pg.Client(cn);
const cn= {
    "host": "ec2-3-138-186-135.us-east-2.compute.amazonaws.com",
    "port": 5432,
    "database": "sdc",
    "password": `password`,
    "user": "quinnlima"
  };
const db = new pg.Client(cn)
//const db = pgp(cn);
db.connect()// .then((result) => {console.log(result)}).catch((err) => {console.log(err)})

module.exports = db 