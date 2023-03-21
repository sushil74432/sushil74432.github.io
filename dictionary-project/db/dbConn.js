var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "entries",
});

const getData = (query, callback) => {
  return conn.query(query, (err, result) => {
    if (err) {
        callback(err, null);
    } else if (result.length === 0) {
        callback(null, null);
    } else {
        // const definitions = result.map(entry => entry.definition);
        // const data = { term: term, definitions: definitions };
        callback(null, result);
    }
    // if (err) {
    //     throw err;
    // } else {
    //     // console.log(result);
    //     // return result;
    // }
  });
};

module.exports = {
  getData,
};
