import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda nuk lejohet" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Mesazh i ri nga Aplikacioni RentWay`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Mesazh i ri nga formulari i kontaktit Aplikacioni RentWay</h2>
          <p><strong>Emri:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mesazhi:</strong><br>${message}</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Mesazhi u dërgua me sukses!" });
  } catch (error) {
    console.error("Gabim gjatë dërgimit të emailit:", error);
    res.status(500).json({ message: "Gabim gjatë dërgimit të emailit!" });
  }
}