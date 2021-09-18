//MAIN JS FILE FOR THE BOT
//https://discord.js.org/#/docs/main/stable/general/welcome
//required constants
const discord = require("discord.js");
const {Client, Intents} = require("discord.js");
const config = require("./config.json");

//youtube search consts
const search = require("youtube-search");
const opts = {
    maxResults : 1,
    key : config.API_YOUTUBE,
    type : "video"
}

//LOGIN
const client = new Client({intents:[
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES]
});
client.on("ready", () => {
    var d = new Date();
    console.log(`LOGGED IN AT ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
});
client.login(config.TOKEN);

//msg for sian yin
client.on("messageCreate", (message) => {
    if(message.author.bot){ 
        return 
    }
    else if(message.content == "is sian yin best girl?"){
        message.reply("yes, sian yin is best girl");
    }
});

//youtube search
client.on("messageCreate", async function(message) {
    if(message.author.bot){
        return
    }

    //commands
    switch(message.content.toLowerCase()){
        case "!fsearch":
            //creating an embed message and sending
            let embedNotif = new discord.MessageEmbed()
                .setColor("#086fff")
                .setTitle("YouTube Search API")
                .setDescription("Please enter a search query.");
            await message.channel.send({embeds: [embedNotif]});

            //ensuring the collected msg is from the person who wanted to search
            let filter = (m) => {
                m.author.id === message.author.id
            };

            //collecting the next message that the user inputs
            let query = await message.channel.awaitMessages({max : 1});
            let results = await search(query.first().content, opts);

            if(results){
                //handling the search result
                let youtubeResult = results.results;

                //mapping
                let title = youtubeResult.map(function(result){
                    return result.title;
                });
                let channelName = youtubeResult.map(function(result){
                    return result.channelTitle;
                });
                let link = youtubeResult.map(function(result){
                    return result.link;
                });

                //creating and sending the result as an embed message
                let embedResult = new discord.MessageEmbed()
                .setTitle(`Now Playing: ${title}`)
                .setDescription(`Channel: ${channelName}\nLink: ${link}`);
                message.channel.send({embeds: [embedResult]});
            }
        break;
    }
});