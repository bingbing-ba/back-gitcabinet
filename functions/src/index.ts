import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as _cors from "cors";

admin.initializeApp();
const cors = _cors({ origin: true });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const comments = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method === "POST") {
      await admin
        .firestore()
        .collection("comments")
        .add({ content: request.body });
      response.json({ status: "ok" });
    } else {
      response.status(405).json({ status: 405 });
    }
  });
});
