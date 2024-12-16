const TELEGRAM_BOT_TOKEN = '7651029960:AAE17FHcjA8CygDxAt0Xy154m4706CK0jT4';
let TELEGRAM_CHAT_ID = null;

// Get the latest chat ID from Telegram
const getUpdates = async () => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
        const data = await response.json();
        console.log('Updates response:', data);
        if (data.ok && data.result.length > 0) {
            const lastUpdate = data.result[data.result.length - 1];
            if (lastUpdate.message && lastUpdate.message.chat) {
                return lastUpdate.message.chat.id;
            }
        }
        return null;
    } catch (error) {
        console.error('Error getting updates:', error);
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

// Test function to verify bot configuration
export const testTelegramBot = async () => {
    try {
        // First test if the bot is valid
        const botResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
        );
        const botData = await botResponse.json();
        if (!botData.ok) {
            throw new Error(`Bot verification failed: ${botData.description}`);
        }
        console.log('Bot verification successful:', botData.result);

        // Get the latest chat ID
        const chatId = await getUpdates();
        if (!chatId) {
            throw new Error('Could not find chat ID. Please message the bot first with /start');
        }
        console.log('Found chat ID:', chatId);
        TELEGRAM_CHAT_ID = chatId;

        // Verify we can access the chat
        const chatResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID
                })
            }
        );
        const chatData = await chatResponse.json();
        if (!chatData.ok) {
            throw new Error(`Chat verification failed: ${chatData.description}`);
        }
        console.log('Chat verification successful:', chatData.result);
        
        return true;
    } catch (error) {
        console.error('Bot verification error:', error);
        throw error;
    }
};

export const sendToTelegram = async (formData) => {
    try {
        if (!TELEGRAM_CHAT_ID) {
            // Try to get the chat ID if we don't have it
            const chatId = await getUpdates();
            if (!chatId) {
                throw new Error('Could not find chat ID. Please message the bot first with /start');
            }
            TELEGRAM_CHAT_ID = chatId;
        }

        const timestamp = new Date().toLocaleString();
        
        const message = `
🔔 Yangi Buyurtma!
—————————————————
👤 Mijoz ma'lumotlari:
• Ismi: ${formData.name || 'Kiritilmagan'}
• Telefon: ${formData.phone || 'Kiritilmagan'}
• Email: ${formData.email || 'Kiritilmagan'}

✉ Xabar:
${formData.message || 'Xabar kiritilmagan'}

⏰ Buyurtma vaqti: ${timestamp}

🌐 Veb-sayt: https://sarhad-travel.vercel.app/

🔗 #YangiBuyurtma #SarhadTravel
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
                    text: message
                }),
            }
        );

        const responseData = await response.json();
        console.log('Telegram send message response:', responseData);

        if (!response.ok || !responseData.ok) {
            throw new Error(`Failed to send message: ${responseData.description || 'Unknown error'}`);
        }

        return true;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        throw error;
    }
};
