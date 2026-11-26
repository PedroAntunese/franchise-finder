// Pool de conexões com o MySQL. Os repositories usam este arquivo.
const mysql = require("mysql2/promise");
const config = require("../config");

module.exports = mysql.createPool({ ...config.banco, connectionLimit: 10 });
