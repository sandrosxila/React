const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port     : '3306',
    password : 'Mora$$.99',
    database : 'react_expressjs_mysql'

});

connection.connect((error) => {
    if(!!error){
        console.log(error);
    }
    else console.log('connected!!!')
});

module.exports = connection;