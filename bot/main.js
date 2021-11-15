const { Telegraf } = require("telegraf");
const bot = new Telegraf("2142611389:AAGFW056C7GnrZbaldaCLKIDg6uGKYcFlp8");
bot.start((ctx) =>
  ctx.reply(`
    Привет ${ctx.from.first_name}! 
`)
);
bot.help((ctx) => ctx.reply("Я новый бот")); // список всех стран на английском языке можно взять в документации covid19-api
bot.on("text", async (ctx) => {
  try {
    const userText = ctx.message.text;
    ctx.reply(`Text - ${userText}`);
  } catch (e) {
    ctx.reply("error");
  }
});
bot.launch();
