import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe';
import User from "../models/User.js"

// Place Order COD : /api/orders/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "invalid data" })
        }

        //Calculate amount using items;
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add tax charge (2%);
        amount += Math.floor(amount * 0.2);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })

        return res.status(200).json({ success: true, message: 'Order placed successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Place Order COD : /api/orders/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "invalid data" })
        }

        let productData = [];

        //Calculate amount using items;

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add tax charge (2%);
        amount += Math.floor(amount * 0.2);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        })

        // Stripe Gateaway Initialize 
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        //create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            }
        })

        // create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        })

        return res.status(200).json({ success: true, url: session.url })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Stripe webhooks to verify payments : /stripe
export const stripeWebhooks = async (req, res) => {
    //Stripe gateaway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

    const sig = req.headers['stripe-signature']
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOKS_SECRET
        )
    } catch (error) {
        res.status(400).send(`Webhooks error: ${error.message}`)
    }

    //Handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Getting Session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { orderId, userId } = session.data[0].metadata;
            
            //Mark payment as paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            
            // Clear user cart
            await User.findByIdAndUpdate(userId, { cartItems: {} })
            
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
    
            //Getting Session metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })
    
            const { orderId } = session.data[0].metadata;

            await Order.findByIdAndDelete(orderId)
            break;
        }

        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }

    res.status(200).json({ received: true })
}


// Get order by userid : /api/orders/:userId
export const getUserOrderById = async (req, res) => {
    try {
        const userId = req.params.userId

        const orders = await Order.find({ userId, $or: [{ paymentType: "COD" }, { isPaid: true }] }).populate("items.product address").sort({ createdAt: -1 })

        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get all orders ( for seller / admin ) : /api/orders/seller;
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address")

        res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}
