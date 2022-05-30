const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx /* Context */) => {
  ctx.reply('Welcome ' + ctx.from.first_name + '!!');
  ctx.reply('This is the "TecNM Pagos" bot 🤖');
  ctx.reply('Here, You can consult some information about our service: ');
});

bot.help((ctx /* Context */) => {
  ctx.reply('Esta es la lista de opciones que te permito hacer:');
});

bot.settings((ctx /* Context */) => {
  ctx.reply('Este es el menú de ajustes');
});

//Customized commands
bot.command(
  ['mycommand', 'MYCOMMAND', 'MyCommand', 'Mycommand'],
  (ctx /* Context */) => {
    ctx.reply('My custom command');
  }
);

bot.hears('computer', (ctx) => {
  ctx.reply("Hey, I'm selling a computer");
});

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.launch();
