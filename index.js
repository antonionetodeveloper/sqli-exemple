const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// yes.. i know... but it's just a example
const db = {
    host : "sql10.freemysqlhosting.net",
    user : "sql10635988",
    password : "aDJ7fxvQg7",
    database: "sql10635988"
}
const connection = mysql.createConnection({
    host : db.host,
    user : db.user,
    password : db.password,
    database : db.database
})
connection.connect()

app.post('/', async (request, response) => {
    const { login, password } = request.body
    const loginQuery = `SELECT * FROM users WHERE user = '${login}' AND password = '${password}';`

    connection.query(loginQuery, async(error, result) => {
        (error || result.length === 0)
            ? response.status(400).send("Usuário e/ou senha inválidos")
            : response.status(200).send("Usuário logado com sucesso")
    })
    
})

const port = 3001
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})
