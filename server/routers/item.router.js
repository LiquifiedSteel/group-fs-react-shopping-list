const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET route to get all the items from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `SELECT * FROM items ORDER BY "id" ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got list back from the database`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})


// POST route to add a new item to the database
router.post('/', (req, res) => {
    const item = req.body;
    if (item.unit) {
        const sqlText = `INSERT INTO items ("name", "quantity", "unit")
                     VALUES ($1, $2, $3)`;
        pool.query(sqlText, [item.name, item.quantity, item.unit])
        .then((result) => {
            console.log(`Added item to the database`, item);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
    } else {
        const sqlText = `INSERT INTO items ("name", "quantity")
                     VALUES ($1, $2)`;
        pool.query(sqlText, [item.name, item.quantity])
        .then((result) => {
            console.log(`Added item to the database`, item);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
    }
    
})

// this put request marks the desired item as purchased or not purchased
router.put('/purchased/:id', (req, res) => {
    let reqId = req.params.id;
    console.log("In PUT purchase route");
    const query = `UPDATE items SET "isPurchased"=NOT "isPurchased" WHERE "id" = $1;`;
    pool.query(query, [reqId]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making PUT', error);
        res.sendStatus(500);
    });
  });// end put request

router.put('/ppu/:id', (req, res) => {
    let reqId = req.params.id;
    let edit = req.body.pricePerUnit;
    console.log("In PUT edit price route");
    const query = `UPDATE items SET "pricePerUnit"= $1 WHERE "id" = $2;`;
    pool.query(query, [edit, reqId]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error changing price', error);
        res.sendStatus(500);
    });
});// end put request


// this delete request removes a chosen item from the list
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log("In DELETE route");
    const query = `DELETE FROM items WHERE "id" = $1;`
    pool.query(query, [reqId]).then((results) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('Error making DELETE', error);
        res.sendStatus(500);
    });
  }); // end delete request


module.exports = router;