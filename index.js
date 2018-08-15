const Discord = require('discord.js');
const YTDL = require("ytdl-core");
const bot = new Discord.Client();

const PREFIX = "-"

function generateHex(){
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}




var servers = {};

function play(connection, message){
    var server = servers[message.guild.id]

    server.dispatcher = connection.playStream(YTDL(server.queue[0],{filter: "audioonly"} ));

    server.queue.shift();

    server.dispatcher.on("end",function(){
        if (server.queue[0]) play (connection, message);
        else connection.disconnect();
    })
}

var fortunes =[
    " YES",
    " NO",
    " Maybe",
    " FUCK U",
    " Все может быть"
];



bot.on('ready',function()
{
    console.log(bot.user.username, 'is online');


    bot.user.setActivity("КАК ИЛЮХА ДРОЧИТ", {type: "WATCHING"});



});



bot.on("guildMemberAdd", function(member){
    member.guild.channels.find("name","general").send(member.toString() + "Welcome bitchi ie boty");


    member.addRole(member.guild.roles.find("name","bitch"));
    member.user.username = '<new player>'

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions:[]
    }).then(function(role){

        member.addRole(role)

    })
});


bot.on('message', function(message)
{

        

    
if( message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()){
                case "ping":
                message.channel.send("Pong!")
            break;
                case "info":
                message.channel.send("Я бот созданный > afikei")
            break;
                case "check":
                if(args[1])
                    message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]); 
                    else message.channel.send("Can't read that")
                break;

                case "embed":
                    const embed = new Discord.RichEmbed()
                        .addField("ИЛЮХА","ХУЙ ТЕБЕ В УХО",true)
                        .addField("ТЕСТОВАЯ ","ПАНЕЛЬ",true)
                        .addField("ИЛЮХА","ХУЙ ТЕБЕ В УХО",true)
                        .setColor(0x00FFFF)
                        .setFooter("Он сосет члены каждый день))")
                        .setThumbnail(message.author.avatarURL)
                message.channel.send(embed);
                break;
                case "hello":
                    message.channel.send(message.author.toString() + " Hello");
                break;
                case "removerole":
                    message.member.removeRole(member.guild.roles.find("name","bitch"));
                break;

                case "deleterole":
                   message.member.guild.roles.find("name","bitch").delete();
                break;
                case "play":
                message.delete()
                if (!args[1]){
                    message.channel.send("Please provid a link")
                    return
                }

                if (!message.member.voiceChannel){
                    message.channel.send("You must be in a voice channel")
                    return
                }
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue:[]
                };

                var server = servers[message.guild.id];

                server.queue.push(args[1]);

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                    play(connection, message);
                });
                break;
                case "skip":

                var server = servers[message.guild.id];

                if(server.dispatcher) server.dispatcher.end();

                break;
                case "stop":
                message.delete()
                var server = servers[message.guild.id];

                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

                break;
                case "botinfo":
                    let bicon = bot.user.displayAvatarURL;
                    let botembed = new Discord.RichEmbed()
                    .setDescription("Bot Information")
                    .setColor("#9b42f4")
                    .setThumbnail(bicon)
                    .addField("Bot Name", bot.user.username)
                    .addField("Created on", bot.user.createdAt);
                    
                message.channel.send(botembed);
                break;
                case "serverinfo":
               
                    let sicon = message.guild.iconURL;
                    let serverembed = new Discord.RichEmbed()
                    .setDescription("Server Information")
                    .setColor("#f44159")
                    .setThumbnail(sicon)
                    .addField("Server Name", message.guild.name)
                    .addField("Created On", message.guild.createdAt)
                    .addField("You joined", message.member.joinedAt)
                    .addField("Total Members",message.guild.memberCount)
                 message.channel.send(serverembed);
                break;

                case "report":
                
                let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                if(!rUser) return message.channel.send("Couldn't find user.");
                let reason = args.join(" ").slice(22);
                
                let reportEmbed = new Discord.RichEmbed()
                .setDescription("Reports")
                .setColor("#f45241")
                .addField("Reported User",`${rUser} with ID: ${rUser.id}`)
                .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
                .addField("Channel", message.channel)
                .addField("Time", message.createdAt)
                .addField("Reason", reason);
                message.channel.send(reportEmbed);
/*
                let reportschannel = message.guild.channels.find(`name`, "reports");
                if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


                message.delete().catch(O_o=>{});
                reportschannel.send(reportEmbed);

                return;*/
            default:
            message.channel.send("Invalid command")
        }
    });
 
    

    
    bot.login(process.env.TOKEN);
