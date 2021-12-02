const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "zhanshuProduct"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer.prompt([
        {
            name: "choice",
            message: "What would you like to do?",
            type: "list",
            choices: [
                "Search products by name",
                "Searcg products by manufacturer",
                "Filter products within a specific price range",
                "Exit"
            ]
        }
    ]).then((answers) => {
        switch (answers.choice) {
            case "Search products by name": 
                searchByName();
                break;
            case "Searcg products by manufacturer": 
                searchByManufacturer();
                break;
            case "Filter products within a specific price range":
                filterProduct();
                break;
            case "Exit":
                connection.end();
                break;
            default: 
                console.log(`Invalid action: ${answers.action}`);
                break;
        }
    })
};

const searchByName = () => {
    inquirer.prompt([
        {
            name: "productName",
            message: "What product would you like to search for?",
            type: "input"
        }
    ]).then((answers) => {
        connection.query("SELECT * FROM products WHERE ?",
        {product: answers.productName}, 
        (err, res) => {
            if (err) throw err;
            if (res[0]) {
                console.log(`Price: ${res[0].price}. || Quantity: ${res[0].quantity}\n`);
                start();
            } else {
                console.log("Product not found. Please try again.\n");
                start();
            }
    })})
};

const filterProduct = () => {
    inquirer.prompt([
        {
            name: "rangeStart",
            message: "Enter the starting price:",
            type: "number",
            validate(value) {
                if (isNaN(value) === false) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            name: "rangeEnd",
            message: "Enter the ending price:",
            type: "number",
            validate(value) {
                if (isNaN(value) === false) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then((answers) => {
        connection.query("SELECT product, price, quantity FROM products WHERE price BETWEEN ? AND ?", 
        [answers.rangeStart, answers.rangeEnd],
        (err, res) => {
            if (err) throw err;
            res.forEach(({product, price, quantity}) => {
                console.log(`Product: ${product} || Price: ${price} || Quantity: ${quantity}`);
            });
            start();
        })
    })
}
