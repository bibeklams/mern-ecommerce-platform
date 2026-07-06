import { OAuth2Client } from "google-auth-library";
import { throwError } from "./errorHandler.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throwError("Invalid Google token", 401);
    }

    return payload;
  } catch (error) {
    throwError("Invalid or expired Google token", 401);
  }
};
