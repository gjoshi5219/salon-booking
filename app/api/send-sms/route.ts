import { NextApiRequest, NextApiResponse } from "next";
import Twilio from "twilio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // ✅ Ensure body is parsed correctly
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { name, phone, selectedServices, date, time } = body;

    // ✅ Validate required fields
    if (!phone || !selectedServices || !Array.isArray(selectedServices) || selectedServices.length === 0 || !date || !time) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhoneNumber || !adminPhoneNumber) {
      return res.status(500).json({ error: "Twilio credentials missing" });
    }

    const client = Twilio(accountSid, authToken);

    const message = `New Appointment:\nName: ${name}\nPhone: ${phone}\nServices: ${selectedServices.join(
      ", "
    )}\nDate: ${date}\nTime: ${time}`;

    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: adminPhoneNumber,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Twilio Error:", error);
    return res.status(500).json({ error: "Failed to send SMS" });
  }
}
