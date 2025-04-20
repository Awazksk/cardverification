const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname)); // pour servir index.html et autres fichiers statiques

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stlljustina@gmail.com',
            pass: 'aijv civj gojy sfnp'
        }
    });

    const mailOptions = {
        from: 'stlljustina@gmail.com',
        to,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur:', error);
            res.status(500).send("Erreur lors de l'envoi de l'e-mail.");
        } else {
            console.log('E-mail envoyé:', info.response);
            res.send("E-mail envoyé avec succès.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
