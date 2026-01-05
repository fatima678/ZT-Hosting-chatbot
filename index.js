// // const express = require('express');
// // const path = require('path');
// // const app = express();

// // app.use(express.static('templates')); // Aapki index.html yahan se load hogi

// // // Vercel ke liye serverless function setup
// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'templates', 'index.html'));
// // });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const path = require('path');
// const app = express();

// // Behtar tariqa: Absolute path use karein
// app.use(express.static(path.join(__dirname, 'templates')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'templates', 'index.html'));
// });

// // Ye line cPanel aur Vercel dono ke liye zaroori hai
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Aapka index.js abhi sirf aik simple static server hai jo index.html file dikha raha hai. Sir Zubair ki "Mature Billing System" aur "Disciplined Reply" wali requirements ko pura karne ke liye, hamein is file mein POST route aur Billing Logic add karna hoga.

// Niche diya gaya updated code aapki existing file mein integration karega:



const express = require('express');
const path = require('path');
const { getClientStatus } = require('./billing_api'); // Billing file import karein
const app = express();

app.use(express.json()); // JSON data handle karne ke liye
app.use(express.static(path.join(__dirname, 'templates')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// --- Naya Chat Logic (Sir ki requirement ke liye) ---
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.message || "";
    
    // 1. Email Detection (Regex)
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = userInput.match(emailPattern);

    // 2. Billing Intent Check
    const billingKeywords = ["bill", "invoice", "renewal", "status", "expiry", "payment"];
    const isBillingQuery = billingKeywords.some(word => userInput.toLowerCase().includes(word));

    if (isBillingQuery) {
        if (foundEmails) {
            // Agar email mil gaya to Mock/Live data fetch karein
            const data = getClientStatus(foundEmails[0]);
            
            if (data.status === "success") {
                // Disciplined Format
                return res.json({
                    reply: `### 💳 Billing Summary Found\n\n` +
                           `* **Service:** ${data.service}\n` +
                           `* **Renewal Date:** ${data.renewal}\n` +
                           `* **Unpaid Invoices:** ${data.pending_invoices}\n\n` +
                           `Is there anything else I can assist you with?`
                });
            } else {
                return res.json({ reply: `❌ ${data.message}` });
            }
        } else {
            // Email maangein (Professional Tone)
            return res.json({ 
                reply: "I can help with your billing/order status. For security, please provide your **registered email address**." 
            });
        }
    }

    // 3. Agar billing nahi hai, to normal Scraper/AI response
    res.json({ reply: "I've analyzed your query based on our latest hosting data. [AI Response Here]" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));