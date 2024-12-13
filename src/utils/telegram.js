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
        
        // Create a detailed message
        const message = `
🆕 New Booking Request!
—————————————————
👤 Customer Details:
• Name: ${formData.name}
• Phone: ${formData.phone}

🎫 Tour Information:
• Tour: ${formData.tourName}
• Price: ${formData.tourPrice}
• Date: ${formData.tourDate}

⏰ Booking Time: ${timestamp}

${location ? `📍 Customer Location:
• Latitude: ${location.latitude}
• Longitude: ${location.longitude}
• Maps Link: https://www.google.com/maps?q=${location.latitude},${location.longitude}` : ''}

🌐 Website: https://sarhad-travel.vercel.app/

#NewBooking #SarhadTravel
—————————————————`;

        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to send message to Telegram');
        }

        return true;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        throw error;
    }
};
