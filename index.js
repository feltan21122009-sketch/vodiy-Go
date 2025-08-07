const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен от BotFather
const token = '8319994093:AAFHIK-AqkXRqiHuFUg_dzJaKm84HUlptvQ';
const bot = new TelegramBot(token, { polling: true });

// 👉 Здесь указываем file_id заранее (выглядит как AgADBA... длинная строка)
const apkFile1Id = 'BQACAgIAAxkBAAPCaJSVjJHsLwXiCUV4tNWqNT7bQsoAArJyAAK3pgFIWNCg309D4bY2BA'; // замените на свой
const apkFile2Id = 'BQACAgIAAxkBAAPDaJSVjPtfTGQaPBaFpyd_0G-aFkMAAvByAAK3pgFIluwncoiaG1g2BA'; // замените на свой

// 🟢 /start обработка
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

    bot.sendMessage(chatId, 
    `👋 Ассалому алейкум, ${msg.from.first_name || 'фойдаланувчи'}!\n` +
    `Сизга керакли бўлган иловани танланг:\n\n` + 
    `Бизни кузатиб боринг <a href='https://t.me/vodiy_go'>Каналимиз</a>`, 
        {
            parse_mode: 'HTML',
            reply_markup: {
            inline_keyboard: [
                [
                    { text: '📱 Клиентлар учун', callback_data: 'apk1' },
                    { text: '📲 Хайдовчилар учун', callback_data: 'apk2' }
                ]
            ]
            }
        }
    );


});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'apk1') {
        bot.sendDocument(chatId, apkFile1Id, { caption: '📱 Мана сизнинг Клиентлар учун иловангиз' });
    }

    if (data === 'apk2') {
        bot.sendDocument(chatId, apkFile2Id, { caption: '📲 Мана сизнинг Хайдовчилар учун иловангиз' });
    }

    // Удалим "часики" у кнопки
    bot.answerCallbackQuery(query.id);
});