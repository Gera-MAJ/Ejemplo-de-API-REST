const { application } = require('express');
const express = require('express');
const mysql = require('mysql');

const app = express()
app.use(express.json())


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ejemplo'
});

app.get('/', (req, res) => {
    res.send('Bienvenido a mi API-REST <br> Acá te dejo los consejos: <br> para realizar un <br>GET /cliente')
})

app.get('/cliente', (req, res) => {
    connection.query('SELECT * FROM cliente', (error, results) => {
        if (error) throw error
        res.json(results)  
    })
})

app.get('/cliente/:id', (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM cliente WHERE id='+id, (error, results) => {
        if (error) throw error
        res.json(results)  
    }) 
})

app.post('/cliente', (req, res) => {
    connection.query('INSERT INTO cliente SET ?',{
        nombre: req.body.nombre,
        domicilio: req.body.domicilio,
        telefono: req.body.telefono
    },
    (error, results) => {
        if (error) throw error
        res.send(results)
    })
})

app.put("/cliente/:id", (req, res)=> {
    const id = req.params.id
    const { nombre, domicilio, telefono} = req.body
    connection.query(
        `UPDATE cliente SET nombre='${nombre}', domicilio='${domicilio}', telefono = '${telefono}' WHERE id =${id}`, 
    (error, results) => {
        if (error) throw error
        res.json(results)
    })
})

app.delete('/cliente/:id', (req, res)=>{
    const id = req.params.id
    connection.query(`DELETE FROM cliente WHERE id = ${id}`, 
    (error, results) => {
        if (error) throw error
        res.json(results)
    })
})



connection.connect(error =>{
    if (error) throw error
    console.log('Conexión Establecida')
})

app.listen(3006, () => console.log('Servicio escuchando en el puerto 3006'))