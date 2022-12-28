import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../firebase/permissions.json");

const fullFillOrder = async (session) => {
  console.log("Full fill order", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100 || 30,
      images: JSON.parse(session.metadata.images),
      timeStamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`suess: oreder ${session.id} had been added to the DB`);
    })
    .catch((err) => console.log("Erreur a l'insertion !", err.message));
};

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecect = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payloade = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payloade, sig, endpointSecect);
    } catch (error) {
      console.log("Error", error.message);
      return res.status(400).send(`webhook error: ${error.message}`);
    }

    // handle the chckout session

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fullFillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false, // Useless for webhooks
    externalResolver: true,
  },
};
