var mysql = require ("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "vanessaotto",
	password: "L2lah2l2lah2",

	database: "Bamazon_db"

});

connection.connect(function(error){
	if (error) throw error;
});

var start = function(){
	inquirer.prompt({
		name: "displayProducts",
		type: "list",
		message: "Would you like to see the current products on the market?",
		choices: ["yes", "no"]
	}).then(function(answers){
		if(answers.displayProducts === "yes"){
			displayItems();
		}
	})
}
start();

function displayItems(){
	connection.query('SELECT * FROM products;', function(error, rows)
	{
		// if (error) throw error;
		console.log("database connected:\n");
		console.log(rows);
		inquirer.prompt({
			name:"ask",
			type:"list",
			message:"would you like to purchase an item?",
			choices:["yes","no"]
	}).then(function(answers){
		if(answers.ask === "yes"){
			selection();
		}
		else(console.log("Alright..."))
	})
})
}

function selection(){
	connection.query("SELECT * FROM products", function(error, results)
		{inquirer.prompt([
			{
					name:"which",
					type:"input",
					choices: function(){
						var choiceArray = [];
						for (var i = 0; i)
					}
					message: "what would you like to purchase? Please type in the ID number of the product"
			},
			{
				name:"amount",
				type:"input",
				message:"how many of this item would you like to purchase?"
		}]).then(function(answer)
				{
					// var chosenItem;
					// for (var i = 0; i<results.length; i++){
					// 	if (results[i].item_id === answer.which){
					// 		chosenItem = results[i];
					// 	}
					// }
					if (stock_quant >= parseInt(answer.amount)){
						console.log("you have purchased:" + answer.amount)
					}
					else
						{console.log("Insufficient quantity!")};
					// connection.query("SELECT * FROM products", 
					// {
					// 	item_id: answer.which,
					// 	stock_quant: answer.amount
					// }),then(function(answers){
					// 	if (parseInt(answer.amount)> stock_quant){
					// 	console.log("Insufficient quantity")}
					// 	}
				})
			})
		}