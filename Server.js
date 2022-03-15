const express = require("express")

const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({path: './Config/.env'})
const app = express()
const stripe = require("stripe")('sk_test_VePHdqKTYQjKNInc7u56JBrQ');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
	const { items } = req.body;
  
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
	  amount: calculateOrderAmount(items),
	  currency: "eur",
	  automatic_payment_methods: {
		enabled: true,
	  },
	});
  
	res.send({
	  clientSecret: paymentIntent.client_secret,
	});
  });
  
  app.listen(4242, () => console.log("Node server listening on port 4242!"));


app.use(cors({origin:"*"}))
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/GamesList"));
app.use(require("./routes/Userlist"));

mongoose.connect(process.env.MONGO_URI, 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
	})
.then(()=>{
	console.log('DATA BASE CONNECTED');
	})
.catch((error)=>{
	console.log( error);
	})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))