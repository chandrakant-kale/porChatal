const pool = require("../db");

const chatHome = async (req , res)=>{
try {
    const id = req.chat;

    const result = await pool.query(`
        SELECT username 
        `)
} catch (error) {
    
}
}
module.exports = chatHome;