const stripe = require('stripe')(process.env.STRIPE_KEY);
console.log(process.env.STRIPE_KEY)

exports.makeTrans= async (req, res) => {
    // console.log("inside stripe route")
    const {items} = req.body;
    console.log(req.body);

    const lineItems = items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name,
                images:[item.imgdata]
            },
            unit_amount: item.price * 100
        },
        quantity: 1
    }))
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            
        });
        
        res.json({ id: session.id })
        console.log(session.id);
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

