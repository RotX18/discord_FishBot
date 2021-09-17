//constants
const {Client, Intents} = require("discord.js");
const config = require("./config.json");
const search = require("youtube-search");

const client = new Client({intents:[
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES]});
const prefix = "!f";

//msg for sian yin
client.on("messageCreate", (message) => {
    if(message.author.bot){ 
        return 
    }
    else if(message.content == "is sian yin best girl?"){
        message.reply("yes, sian yin is best girl");
    }
});

//login
client.on("ready", () => {
    var d = new Date();
    console.log(`LOGGED IN AT ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
});
client.login(config.TOKEN);