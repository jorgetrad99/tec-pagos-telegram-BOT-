const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx /* Context */) => {
  menu(ctx);
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
              callback_data: 'qna',
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

bot.action('qna', (ctx) => {
  questionsAndAnswers(ctx);
});

bot.action('menu', (ctx) => {
  menu(ctx);
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

const menu = (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
    Bienvenido ${ctx.from.first_name}!!
    Este es el bot "TecNM Pagos" 🤖
    Aquí podrás consultar información sobre este nuevo servicio:
    👇🏻 Aquí te dejo algunos comandos a usar 👇🏻
    Selecciona alguno y escribelo o presionalo aquí mismo 😸
    
    /menu --> Ver todas las opciones que tienes a disposición con este bot
    /qna ---> Mostar lista de preguntas y respuestas frecuentes (Q&A)
    /quit --> Sal y deja este chat
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Menu', callback_data: 'menu' },
            { text: 'Preguntas frecuentes', callback_data: 'qna' },
          ],
          [{ text: 'Dejar chat', callback_data: 'quit' }],
        ],
      },
    }
  );
};

const questionsAndAnswers = (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `Esta es la sección de preguntas frecuentes. Selecciona alguna de estas opciones:

1. ¿Qué servicios o tramites puedo obtener con esta increíble herramienta?

2. ¿Cómo accedo a la plataforma para solicitar un servicio?

3. ¿Cuál es el proceso a seguir para obtener un sercicio?

4. ¿Cómo solicito un servicio?

5. ¿Cuál es el método de pago?

6. ¿Cuándo o de qué hora a qué hora esta disponible este servicio?

7. ¿Puedo solicitar más de un servicio?

`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '1', callback_data: 'A1' },
            { text: '2', callback_data: 'A2' },
            { text: '3', callback_data: 'A3' },
            { text: '4', callback_data: 'A4' },
          ],
          [
            { text: '5', callback_data: 'A5' },
            { text: '6', callback_data: 'A6' },
            { text: '7', callback_data: 'A7' },
            { text: '8', callback_data: 'A8' },
          ],
          [{ text: 'Menu', callback_data: 'menu' }],
        ],
      },
    }
  );
};

bot.launch();
