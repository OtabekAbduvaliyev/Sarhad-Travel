const TELEGRAM_BOT_TOKEN = '7736775159:AAEF3duVBKvfMLWdi7V5iGJX-JUF6hBNjjM';
const TELEGRAM_CHAT_ID = '733611606';

// Get the latest chat ID from Telegram
const getUpdates = async () => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
        const data = await response.json();
        if (data.ok && data.result.length > 0) {
            const lastUpdate = data.result[data.result.length - 1];
            return lastUpdate.message.chat.id;
        }
        return null;
    } catch (error) {
        return null;
    }
};

// Format the current time in a readable format
const getFormattedTime = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium'
    }).format(now);
};

// Get user's location if they allow
const getUserLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
        
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
    } catch (error) {
        return null;
    }
};

export const sendToTelegram = async (formData) => {
    try {
        const location = await getUserLocation();
        const timestamp = getFormattedTime();
        
        // Check if this is a tour booking or general contact form
        const isTourBooking = formData.tourName !== undefined;
        
        const message = isTourBooking ? `
🎫 *New Tour Booking Request*
⏰ ${timestamp}

👤 *Customer Details*
• Name: \`${formData.name}\`
• Phone: \`${formData.phone}\`

🎯 *Tour Details*
• Tour: \`${formData.tourName}\`
• Price: \`${formData.tourPrice}\`
• Date: \`${formData.tourDate}\`

${location ? `📍 *Customer Location*\n• Coordinates: [View on Map](https://www.google.com/maps?q=${location.latitude},${location.longitude})` : ''}

⚡️ *Quick Actions*
• Call customer: [Call Now](tel:${formData.phone})
• Save contact: [Add to Contacts](tel:${formData.phone})
` : `
📧 *New Contact Form Submission*
⏰ ${timestamp}

👤 *Contact Details*
• Name: \`${formData.name}\`
• Email: \`${formData.email}\`
• Phone: \`${formData.phone || 'Not provided'}\`

📝 *Message Details*
• Subject: \`${formData.subject || 'Not provided'}\`
• Message:
\`\`\`
${formData.message}
\`\`\`

${location ? `📍 *User Location*\n• Coordinates: [View on Map](https://www.google.com/maps?q=${location.latitude},${location.longitude})` : ''}

⚡️ *Quick Actions*
• Reply via email: [Send Email](mailto:${formData.email})
• Save contact: [Add to Contacts](tel:${formData.phone})
`;

        const chatId = await getUpdates() || TELEGRAM_CHAT_ID;
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: false
            })
        });

        const data = await response.json();
        if (!data.ok) {
            throw new Error(data.description || 'Failed to send message to Telegram');
        }

        // Send quick action buttons based on the type of submission
        const quickActions = isTourBooking ? {
            inline_keyboard: [
                [
                    {
                        text: '📞 Call Customer',
                        url: `tel:${formData.phone}`
                    }
                ],
                [
                    {
                        text: '💾 Save Contact',
                        url: `tel:${formData.phone}`
                    }
                ]
            ]
        } : {
            inline_keyboard: [
                [
                    {
                        text: '✉️ Reply via Email',
                        url: `mailto:${formData.email}?subject=Re: ${formData.subject || 'Your inquiry'}`
                    }
                ],
                [
                    {
                        text: '📞 Save Contact',
                        url: `tel:${formData.phone}`
                    }
                ]
            ]
        };

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: '🔄 Quick Actions:',
                reply_markup: quickActions
            })
        });

        return true;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        throw error;
    }
};
