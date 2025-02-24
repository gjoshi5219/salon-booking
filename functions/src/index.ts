import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as twilio from "twilio";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Get Twilio credentials from Firebase config
const accountSid: string = functions.config().twilio.sid;
const authToken: string = functions.config().twilio.token;
const twilioPhone: string = functions.config().twilio.phone;

const client = new twilio.Twilio(accountSid, authToken);

// Cloud Function to send SMS when an appointment is booked
export const sendAppointmentSMS = functions.https.onRequest(
  async (req, res): Promise<void> => {
    try {
      const phoneNumber: string = req.body.phoneNumber;
      const appointmentTime: string = req.body.appointmentTime;

      if (!phoneNumber || !appointmentTime) {
        res.status(400).json({
          error: "Phone number and appointment time are required.",
        });
        return;
      }

      const message = `Your appointment is confirmed for ${appointmentTime}.` +
                      " Thank you for choosing us!";

      const twilioResponse = await client.messages.create({
        body: message,
        from: twilioPhone,
        to: phoneNumber,
      });

      res.status(200).json({
        success: true,
        message: "SMS Sent!",
        sid: twilioResponse.sid,
      });
    } catch (error) {
      res.status(500).json({
        error: (error as Error).message,
      });
    }
  }
);
