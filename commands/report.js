const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   

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
                        let reportchannel = message.guild.channels.find(`name`, "incidents");
                        if(!reportchannel) return message.channel.send("Couldn't find reports channel.");
                    
                    
                        
                        reportchannel.send(reportEmbed);
                        
                //return message.channel.send(reportEmbed);
    }




module.exports.help = {
    name: "report"
}
