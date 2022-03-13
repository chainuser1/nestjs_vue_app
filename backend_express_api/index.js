const express = require('express');
const cors = require('cors');
const app = express();
const bodyParse = require('body-parser');
PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
app.use(bodyParse.json());
app.use(cors());

// create a mysql connection
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_php_db'
});

app.get('/products',(req, res) => {
    conn.query('SELECT * FROM products', (err, rows, fields) => {
        if(err) throw err;
        res.send(rows);
    });

})

app.post('/products/add', (req, res) => {
    const { name, price, stock, description } = req.body;
    
    conn.query(`INSERT INTO products (name, price,stock,description) VALUES ('${name}', ${price},${stock},'${description}')`, (err, rows, fields) => {
        if(err) throw err;
        res.send({
            message: 'Product added successfully'
        });
    });
})

app.put('/products/:id/edit', (req, res) => {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    // res.send(id);
    conn.query(`UPDATE products SET name='${name}', price=${price}, stock=${stock}, description='${description}' WHERE id=${id}`, (err, rows, fields) => {
        if(err) return res.send(err);
      
        res.send({
            message: 'Product updated successfully'
        });
    });
})

app.delete('/products/:id/delete', (req, res) => {
    const { id } = req.params;
    
    conn.query(`DELETE FROM products WHERE id=${id}`, (err, rows, fields) => {
        if(err) return res.send(err)
        res.send({
            message: 'Product deleted successfully'
        });
    });
})