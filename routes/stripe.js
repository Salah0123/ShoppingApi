const express = require("express");
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY);



const router= express.Router()


// router.post("/create-checkout-session", async (req, res,next) => {
router.post("/", async (req, res,next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
          shipping_address_collection: {
            allowed_countries: ["US", "CA"],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 0,
                  currency: "usd",
                },
                display_name: "Free shipping",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 5,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 1500,
                  currency: "usd",
                },
                display_name: "Next day air",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 1,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 1,
                  },
                },
              },
            },
          ],
          line_items: req.body.cart.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [item.product],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.Quantity,
          })),

          mode: "payment",
          success_url: `${process.env.CLIENT_URL}/success.html`,
          cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });
        res.status(200).json(session)
    } catch (error) {
        next(error)
    }
});


module.exports=router;