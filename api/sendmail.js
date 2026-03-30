import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // obligatoire pour accepter un fichier
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur formidable :", err);
      return res.status(500).json({ error: "Erreur lors du parsing" });
    }

    const { nom, cabinet, email, tel, immeubles } = fields;

    // Préparation des pièces jointes
    const attachments = [];

    if (files.file) {
      attachments.push({
        filename: files.file.originalFilename,
        content: fs.readFileSync(files.file.filepath),
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.fr",
        port: 465,
        secure: true,
        auth: {
          user: process.env.IONOS_USER,
          pass: process.env.IONOS_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.IONOS_USER,
        to: "contact@domexavisum.fr",
        subject: "Nouvelle demande de devis Domexa Visum",
        text: `
Nom : ${nom}
Cabinet : ${cabinet}
Email : ${email}
Téléphone : ${tel}
Immeubles :
${immeubles}
        `,
        attachments,
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Erreur SMTP :", error);
      return res.status(500).json({ error: "Erreur lors de l'envoi" });
    }
  });
}
