var mysql = require ("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "vanessaotto",
	password: "L2lah2l2lah2",

	database: "Bamazon_db"

});

var start = function(){

	connection.connect(function(error){
		if (error) throw error;
		var tab = "\t";
		console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tAmount In Stock");
	    console.log("--------------------------------------------------------");
	    
		console.log("--------------------------------------------------------");
		displayItems();
		// inquirer.prompt({
		// 	name: "displayProducts",
		// 	type: "list",
		// 	message: "Would you like to see the current products on the market?",
		// 	choices: ["yes", "no"]
		// }).then(function(answers){
		// 	if(answers.displayProducts === "yes"){
		// 		displayItems();
		// 	}
		// })
	});
};
start();

var displayItems = function(){
	connection.query('SELECT * FROM products', function(error, rows)
	{
		if (error) throw error;
		// console.log(rows);
		// var table = "/t";
		// console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tAmount In Stock")
		// console.log("--------------------------------------------------------");
		// console.log("database connected:\n");
		// console.log(rows);
		for (var i = 0; i < rows.length; i++){
		console.log(rows[i].item_id + " | " + rows[i].product_name + " | " + rows[i].dept_name +
        " | " + rows[i].price + " | " + rows[i].stock_quant);
		}
		inquirer.prompt({
			name:"ask",
			type:"list",
			message:"would you like to purchase an item?",
			choices:["yes","no"]
		}).then(function(answers){
			if(answers.ask === "yes"){
				selectionPrompt(rows);
			}
			else(console.log("Alright..."))
		});
	});
}

var selectionPrompt = function(rows){
	// var productmatch = false;

		inquirer.prompt([
			{
				name:"which",
				type:"input",
				message: "what would you like to purchase?"
			}]).then(function(answer)
				{
					var productmatch = false;

					for (var i = 0; i < rows.length; i++){
						if (rows[i].product_name === answer.which){
							productmatch = true;
							var product = answer.which;
							var id = i;
							inquirer.prompt([{
								name:"amount",
								type:"input",
								message:"How many of this item would you like to purchase?"
							}]).then(function(answer){
								if((rows[id].stock_quant - answer.amount) > 0){
									connection.query(
										"UPDATE products SET stock_quant='" + (rows[id].stock_quant - answer.amount) + "' WHERE product_name='" + product + "'",
										function(error, response){
											if (error){
												throw error;
											}
											console.log("You've successfully purchased this product.");

											start();
										});
								}
								else {
									console.log("Entry not valid");
									selectionPrompt(rows);
								}
							});
						}
						if(answer.which === "Q" || answer.which === "q"){
							process.exit();
						}
					};
					});
					};
		// 			connection.query("INSERT INTO products(product_name, dept_name, price, stock_quant) VALUES('" + answer.which +"," + answer.dept + "," + answer.price + "," + answer.amount + ");",

		// 				function(error, res){
		// 					if (error){
		// 						throw error;
		// 					}
		// 					console.log("Item added!");
		// 					displayItems();
		// 				});
		// 			});
		// 		}
		// function addQuantity(){
		// 	inquirer.prompt([
		// 	{
		// 		type: "input",
		// 		name: "productName",
		// 		message: "What product are you updating?"
		// 	},
		// 	{
		// 		type: "input",
		// 		name: "new",
		// 		message: "How much of more of this item do you want?"
		// 	}
		// 	]).then(function(val){
		// 		connection.query(
		// 			"UPDATE products SET stock_quant = stock_quant" + val.newQuantity + " WHERE product_name ='" +val.productName + "'",
		// 			function(error, results){
		// 				if(error){
		// 					throw error;
		// 				}
		// 				if (results.affectedRows ===0){
		// 					console.log("That item is not available.");
		// 					displayItems();
		// 				}
		// 				else {
		// 					console.log("You have successfully added items!");
		// 					displayItems();
		// 				}
		// 			})
		// 	})
		// }
		// //product_name dept_name price stock_quant