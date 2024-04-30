const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware

const app = express();
dotenv.config();

// Enable CORS for all routes
app.use(cors());

function sendSMS(phone, message) {
        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        return client.messages
                .create({ body: message, from: '+12513136160', to: `+${phone}` })
                .then(message => {
                        console.log(message, "Message sent")
                })
                .catch(err => {
                        console.log(err, "Message NOT sent")
                });
}

app.get('/send-sms', (req, res) => {
        const phoneNumber = req.query.phone; // Access query parameters using req.query
        const message = req.query.message;
        console.log(phoneNumber, message);
        sendSMS(phoneNumber, message)
                .then(() => {
                        res.send('SMS sent successfully!');
                })
                .catch((error) => {
                        res.status(500).send('Error sending SMS: ' + error.message);
                });
});

app.listen(5000, () => console.log('Listening at port 5000'));
