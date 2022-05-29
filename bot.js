const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx /*Context*/) => {
  ctx.reply('Welcome to the pagos tec bot!!');
});

bot.help((ctx /*Context*/) => {
  ctx.reply('Esta es la lista de opciones que te permito hacer:');
});

bot.settings((ctx /*Context*/) => {
  ctx.reply('Este es el menú de ajustes');
});

bot.launch();
