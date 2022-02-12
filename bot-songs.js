const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const prefix = "!";
const fs = require('fs');
const permitted = require('./permitted.json'); // path may vary depending on the file location
const songs = require('./songs.json'); // path may vary depending on the file location

client.on('ready', () => {
    client.user.setActivity("an orc kill me", {
        type: 'WATCHING'
    })
    console.log("Logged in");
});

client.on('message', async message => {
  // Get args
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  // Get the command without the prefix
  const command = args.shift().toLowerCase();

  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

    // This right here detects if a user can run commands (ei: Hepno, and TwilightBlood)
    if (!permitted.includes(message.author.id)) return;
    switch(command) {
        case "stop" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.dispatcher.pause(true);
            }
            break;

        case "leave" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                connection.disconnect();
            }
            break;
        case "help" :
            message.channel.send({ embed: {
            color: 15277667,
            title: "Invalid command!",
            description: 'Available commands:',
            fields: [{
                name: "OUTDATED INFO, BUT IM TOO LAZY TO FIX",
                value: "INDEED"
            },
            {
                name: "!join",
                value: "Run this in vc to get D&D Player to join"
            },
            {
                name: "!stop",
                value: "Run this in vc to stop music"
            },
            {
                name: "!leave",
                value: "Run this in vc to make D&D Player leave"
            },
            {
                name: "!village",
                value: "Run this in vc to play village music"
            },
            {
                name: "!battle",
                value: "Run this in vc to play battle music"
            },
            {
                name: "!boss",
                value: "Run this in vc to play boss music"
            },
            {
                name: "!ominous",
                value: "Run this in vc to play ominous music"
            },
            {
                name: "!explore",
                value: "Run this in vc to play explory music"
            },
            {
                name: "!eery",
                value: "Run this in vc to play eery music"
            }
            ],
        }
        });
        break;

    }
});

// sekret
client.login('ODY2NzMxNDYyNTM5NzM5MTY2.YPW0kw.t1JVbyte2NGgI05tRM9k2VMpS8Q');
