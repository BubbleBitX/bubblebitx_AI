import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

// Helper for Resend client initialization
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is required");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // API Route for sending emails via Resend
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, servicesText, message } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
      }

      // Check if Resend API key is available
      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not configured. Email will not be delivered, but mimicking success for testing.");
        return res.status(200).json({ 
          success: true, 
          message: "Email sending simulated because RESEND_API_KEY is not set." 
        });
      }

      const resend = getResendClient();

      const { data, error } = await resend.emails.send({
        from: "BubbleBitX AI Workforce <onboarding@resend.dev>",
        to: "bubblebitxt@gmail.com",
        subject: `🚀 New AI Strategy Request - ${name.trim()}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; background-color: #f9fafb; border-radius: 12px; color: #1f2937; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb;">
            <h2 style="color: #0b1528; margin-top: 0; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px;">🚀 New AI Workforce Strategy Request</h2>
            
            <p style="margin-top: 18px; margin-bottom: 6px; font-weight: bold; color: #4b5563;">👤 Requester Name</p>
            <p style="margin-top: 0; font-size: 16px; font-weight: 500; color: #111827; background-color: #ffffff; padding: 10px 14px; border-radius: 8px; border: 1px solid #f3f4f6;">${name.trim()}</p>
            
            <p style="margin-top: 18px; margin-bottom: 6px; font-weight: bold; color: #4b5563;">✉️ Business Email</p>
            <p style="margin-top: 0; font-size: 16px; font-weight: 500; color: #111827; background-color: #ffffff; padding: 10px 14px; border-radius: 8px; border: 1px solid #f3f4f6;"><a href="mailto:${email.trim()}" style="color: #2563eb; text-decoration: none;">${email.trim()}</a></p>
            
            <p style="margin-top: 18px; margin-bottom: 6px; font-weight: bold; color: #4b5563;">🛠️ Requested Services</p>
            <p style="margin-top: 0; font-size: 15px; color: #1f2937; background-color: #ffffff; padding: 10px 14px; border-radius: 8px; border: 1px solid #f3f4f6;">${servicesText}</p>
            
            <p style="margin-top: 18px; margin-bottom: 6px; font-weight: bold; color: #4b5563;">💬 Challenges / Business Goals</p>
            <div style="margin-top: 0; font-size: 15px; line-height: 1.5; color: #1f2937; background-color: #ffffff; padding: 12px 14px; border-radius: 8px; border: 1px solid #f3f4f6; white-space: pre-wrap;">${message.trim() || "No message provided."}</div>
            
            <footer style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
              Sent automatically from the BubbleBitX AI Workspace Platform.
            </footer>
          </div>
        `
      });

      if (error) {
        console.error("Resend API error:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, data });
    } catch (err: any) {
      console.error("Unhandled error sending email:", err);
      return res.status(500).json({ error: err.message || "An unexpected error occurred" });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
