import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { nom, cabinet, email, tel, immeubles } = req.body;

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
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erreur SMTP :", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi" });
  }
}

