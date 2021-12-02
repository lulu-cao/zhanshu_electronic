// the company can add products with their price and quantity or delete products (using mysql and node.js)
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "zhanshuProduct"
});

const start = () => {
    inquirer.prompt({
        name: "choice",
        message: "Would you like to add or delete products?",
        type: "list",
        choices: ["Add", "Delete", "Exit"]
    }).then((answer) => {
        if (answer.choice === "Add") {
            addProducts()
        } else if (answer.choice === "Delete") {
            deleteProducts()
        } else {
            connection.end()
        }
    })
}
// the company can add products with their price and quantity
const addProducts = () => {
    inquirer.prompt([
        {
            name: "product",
            message: "What is the name of product?",
            type: "input",
        },
        {
            name: "price",
            message: "How much is this product?",
            type: "number",
            validate(value) {
                if (isNaN(value) === false) {
                    return true
                } else {
                    return false
                }},
        },
        {
            name: "quantity",
            message: "How many products do you have in stock?",
            type: "number",
            validate(value) {
                if (isNaN(value) === false) {
                    return true
                } else {
                    return false
                }},
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO products SET ?", 
            {
                product: answer.product,
                price: answer.price,
                quantity: answer.quantity, 
            },
            (err, res) => {
                if (err) throw err;
                console.log("The product is successfully added.\n");
                start()
            })
        })
};

// the company can delete products 
const deleteProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "product",
                message: "What product would you like to delete?",
                type: "rawlist",
                choices() {
                    const array = [];
                    res.forEach(({product}) => {
                        array.push(product)
                    });
                    return array;
                }
            },
            {
                name: "confirm",
                message: "Are you sure that you want to delete this item?",
                type: "confirm"
            }
        ]).then((answer => {
            if (answer.confirm) {
                console.log("Deleting the product...\n");
                connection.query(
                    "DELETE FROM products WHERE ?",
                    {product: answer.product},
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} rows have been deleted.\n`);
                        start()
                    }
                );
                start()
            } else {
                start()
            }
        }))
    }
    )
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}.\n`);
    start()
})