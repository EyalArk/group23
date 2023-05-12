const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.json());

app.post("/send-email", (req, res) => {
    const { email } = req.body;

    // Create a transporter object using your email service provider
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "a@gmail.com", // Your email address
            pass: "123455", // Your email password or app-specific password
        },
    });

    // Set up the email data
    const mailOptions = {
        from: "am@gmail.com", // Your email address
        to: email, // The recipient's email address
        subject: "Thank you for your purchase",
        text: "Thank you for your buying!",
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.send("Email sent successfully");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
