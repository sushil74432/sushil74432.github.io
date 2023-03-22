const db = require("../db/dbConn");

const def = (req, res)=>{
    console.log("Empty response");
    res.json([{}]);
}
const getDefinition = (req, res, next) => {
    const word = req.params.word;
    const query = "select * from entries where word = '"+word+"'";
    console.log(query);
    db.getData(query, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error looking up word');
        } else {
            res.json(data);
        }
    });
}

module.exports = {
    def,
    getDefinition
}