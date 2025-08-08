const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// Замените на ваш токен от BotFather
const botToken = process.env.BOT_TOKEN
const token = botToken;
const bot = new TelegramBot(token, { polling: true });

// 👉 Здесь указываем file_id заранее (выглядит как AgADBA... длинная строка)
const apkFile1Id = 'BQACAgIAAyEFAASdo2dYAAMCaJWKGI7vphLi6R4L1qwQMmvXryIAAtp5AAIe0qlI_nz-PI_QNiE2BA'; // замените на свой
const apkFile2Id = 'BQACAgIAAyEFAASdo2dYAAMEaJWKwAGuvxwXlq76quufa267R6YAAu15AAIe0qlIn7zv40ofboU2BA'; // замените на свой
const iosFile1Id = `<a href='https://vodiy-go.vercel.app/'>IOS Клиентлар учун</a>`; // замените на свой
const iosFile2Id = `<a href='https://vodiy-go.vercel.app/driver/register'>IOS Хайдовчилар учун</a>`; // замените на свой

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
                    { text: '📱ANDROID Клиентлар', callback_data: 'apk1' },
                    { text: '📱ANDROID Хайдовчилар', callback_data: 'apk2' },
                ],
                [
                    { text: '📲IOS Клиентлар', callback_data: 'ios1', },
                    { text: '📲IOS Хайдовчилар', callback_data: 'ios2' },
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

    if (data === 'ios1') {
        bot.sendMessage(chatId, iosFile1Id, {parse_mode: 'HTML'});
    }

    if (data === 'ios2') {
        bot.sendMessage(chatId, iosFile2Id, {parse_mode: 'HTML'});
    }

    // Удалим "часики" у кнопки
    bot.answerCallbackQuery(query.id);
});
