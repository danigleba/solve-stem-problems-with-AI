export default async function handler(req, res) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: 497,
        currency: "usd", 
      })
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      res.status(500).json({ error: "Failed to create Payment Intent" })
    }
  }