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

bot.command('menu', (ctx) => {
  ctx.reply('Este es el menú');
});

bot.command('qna', (ctx) => {
  questionsAndAnswers(ctx);
});

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  //ctx.leaveChat();
});

// Actions

bot.action('A1', (ctx) => {
  ctx.deleteMessage();

  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
Puedes pagar los siguientes servicios:

✅ Constancia de estudios ---> $20.00
✅ Kardex de Calificaciones -> $50.00
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Regresar',
              callback_data: 'go-back',
            },
            /* {
              text: 'Salir del chat',
              callback_data: 'leave-chat',
            }, */
          ],
        ],
      },
    }
  );
});

bot.action('go-back', (ctx) => {
  questionsAndAnswers(ctx);
});

bot.action('leave-chat', (ctx) => {
  // Explicit usage
  //ctx.telegram.leaveChat(ctx.message.chat.id);
  // Using context shortcut
  //ctx.leaveChat();
});

//Listeners
bot.on('text', (ctx) => {
  console.log(ctx.message.text);
  const msg = ctx.message.text.toLowerCase();
  if (msg.includes('')) {
  }
});

/* bot.hears('computer', (ctx) => {
  ctx.reply("Hey, I'm selling a computer");
}); */

//Functions and Methods

const questionsAndAnswers = (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    'Esta es la sección de preguntas frecuentes',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Servicios ofrecidos',
              callback_data: 'A1',
            },
          ],
          [{ text: 'Pregunta 2', url: 'www.google.com' }],
          [{ text: 'Pregunta 3', url: 'www.google.com' }],
        ],
      },
    }
  );
};

bot.launch();
