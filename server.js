import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, Email and Message are required.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify Gmail login
    await transporter.verify();
    console.log("✅ Gmail connected successfully");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact - ${subject || "New Message"}`,
      html: `
        <h2>New Portfolio Contact</h2>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Phone:</b> ${phone || "Not provided"}</p>

        <p><b>Subject:</b> ${subject || "No Subject"}</p>

        <hr>

        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");

    res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (err) {
    console.error("❌ EMAIL ERROR");
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});