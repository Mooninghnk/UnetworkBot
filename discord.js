const rp = require('request-promise');
var request = require("request");
const TelegramBot = require('node-telegram-bot-api');
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');
const projectId = 'PROJECT ID';
const translate = new Translate({
  projectId: projectId,
  key: "GOOGLE KEY"
});

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=UUU',
  headers: {
    'X-CMC_PRO_API_KEY': 'YOUR CMC API KEY'
  },
  json: true,
  gzip: true
};

function getdata() {
  rp(requestOptions).then(response => {
    xmo = response;
  }).catch((err) => {
    console.log('API call error:', err.message);
  });
}



// replace the value below with the Telegram token you receive from @BotFather
const token = 'TELEGRAM API TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/ko (.+)/, (msg, match) => {
  const chatId = msg.chat.id; // the captured "whatever"
  const toTrans = match[1];
  let text = toTrans;
  const target = 'ko';
  translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];
    bot.sendMessage(chatId, `translation from @${msg.from.username} :\n` +translation);
  });
});

bot.onText(/\/en (.+)/, (msg, match) => {
  const chatId = msg.chat.id; // the captured "whatever"
  const toTrans = match[1];
  let text = toTrans;
  const target = 'en';
  translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];
    bot.sendMessage(chatId, `translation from @${msg.from.username} :\n` +translation);
  });
});

bot.onText(/\/zh (.+)/, (msg, match) => {
  const chatId = msg.chat.id; // the captured "whatever"
  const toTrans = match[1];
  let text = toTrans;
  const target = 'zh';
  translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];
    bot.sendMessage(chatId, `translation from @${msg.from.username} :\n` +translation);
  });
});







bot.onText(/\/calc (.+)/, (msg, match) => {
  getdata();
  const chatId = msg.chat.id; // the captured "whatever"
  const number = Number(match[1]);
  let result = xmo.data.UUU.quote.USD.price * number;
  let res = result.toString().split(".").shift();
  setTimeout(() => bot.sendMessage(chatId, res+ "$"), 1000);
});

bot.on('new_chat_members', (ctx) => {
    const chatId  = ctx.chat.id;
    bot.sendMessage(chatId, "Welcome To UUU @" + ctx.new_chat_member.username);
});

//bot.on('left_chat_member', (usr) => {
//    const chatID = usr.chat.id;
//   bot.sendMessage(chatID, "We will miss you @" + usr.left_chat_member.username);
//});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if(msg.text === "/rank@Unetworkbot") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Current Rank: "+xmo.data.UUU.cmc_rank), 1000);
  }
  else if(msg.text === "/rank") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Current Rank: "+xmo.data.UUU.cmc_rank), 1000);
  }
  if(msg.text === "/volume@Unetworkbot" ) {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "$"+xmo.data.UUU.quote.USD.volume_24h + " 24/hr"), 1000);
  }
  else if(msg.text === "/volume" ) {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "$"+xmo.data.UUU.quote.USD.volume_24h + " 24/hr"), 1000);
  }

  if(msg.text === "/tsupply@Unetworkbot") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Total Supply: "+xmo.data.UUU.total_supply+" UUU"), 1000);
  }
  else if(msg.text === "/tsupply") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Total Supply: "+xmo.data.UUU.total_supply+" UUU"), 1000);
  }
  if(msg.text === "/cmc@Unetworkbot") {
    bot.sendMessage(chatId, "https://coinmarketcap.com/currencies/u-network");
  }
  else if(msg.text === "/cmc") {
    bot.sendMessage(chatId, "https://coinmarketcap.com/currencies/u-network");
  }
  if(msg.text === "/ustart@Unetworkbot") {
    bot.sendMessage(chatId, "https://ustart.u.network/");
  }
  else if(msg.text === "/ustart") {
    bot.sendMessage(chatId, "https://ustart.u.network/");
  }
  if(msg.text === "/twitter@Unetworkbot") {
    bot.sendMessage(chatId, "https://twitter.com/UNetworkHQ");
  }
  else if(msg.text === "/twitter") {
    bot.sendMessage(chatId, "https://twitter.com/UNetworkHQ");
  }
  if(msg.text === "/cap@Unetworkbot") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Market Cap: $"+xmo.data.UUU.quote.USD.market_cap + " USD"), 1000);
  }
  else if(msg.text === "/cap") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Market Cap: $"+xmo.data.UUU.quote.USD.market_cap + " USD"), 1000);
  }
  if (msg.text === "/buyu@Unetworkbot") {
    bot.sendMessage(msg.chat.id, "Buy with ETH: https://www.hbg.com/en-us/exchange/?s=uuu_eth" + "Buy with BTC: https://www.hbg.com/en-us/exchange/?s=uuu_btc"); 
  }
  else if (msg.text === "/buyu") {
    bot.sendMessage(msg.chat.id, "Buy with ETH: https://www.hbg.com/en-us/exchange/?s=uuu_eth" + "Buy with BTC: https://www.hbg.com/en-us/exchange/?s=uuu_btc"); 
  } 

  if  (msg.text === "/circsup@Unetworkbot") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Circulating Supply: "+xmo.data.UUU.circulating_supply), 1000);
  }
  else  if(msg.text === "/circsup") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Circulating Supply: "+xmo.data.UUU.circulating_supply+ " UUU"), 1000);
  }

  if  (msg.text === "/price@Unetworkbot") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Current Price: "+xmo.data.UUU.quote.USD.price+"$  " +xmo.data.UUU.quote.USD.percent_change_24h+ "%"), 1000);
  }
  else  if(msg.text === "/price") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Current Price: "+xmo.data.UUU.quote.USD.price+ "$  "+xmo.data.UUU.quote.USD.percent_change_24h+ "%"), 1000);
  }
  
  //Intaractions
  if(msg.text === "Hi") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"),0);
  }
  else if(msg.text === "hi") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"), 0);
  }
  if(msg.text === "Hello") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"), 0);
  }
  else if(msg.text === "hello") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"), 0);
  }
  if(msg.text === "hey") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"), 0);
  }
  else if(msg.text === "Hey") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Welcome To The UUU Community"), 0);
  }
  if(msg.text === "Bye") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Oh no don't leave us :("), 0);
  }
  else if(msg.text === "bye") {
    getdata();
    setTimeout(() => bot.sendMessage(chatId, "Oh no don't leave us :("), 0);
  }
});






