const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const prefix = "!";
const fs = require('fs');
const permitted = require('./permitted.json'); // path may vary depending on the file location
const config = require('./config.json');
var data = JSON.parse(fs.readFileSync('./songs.json'));
let LOOP = false;

client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity("an orc kill me", {
        type: 'WATCHING'
    });
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
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    switch (command) {
        case "join":
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                console.log("Channel: " + message.member.voice.channel.name + " | Person: " + message.author);
            } else {
                message.channel.send({
                    embed: {
                        color: 15277667,
                        title: "Error: not in voice chat",
                        description: 'Join a VC and rerun this command',
                        footer: {
                            text: "D&D Player - TwilightBlood"
                        }
                    }
                });
            }
            break;
        case "stop":
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                try {
                    connection.dispatcher.pause(true);
                    if (Math.floor(Math.random() * 10) + 1 == 10) {
                        message.react("🖕");
                    } else {
                        message.react("👍");
                    }
                    console.log("Stopped playing music");
                } catch (error) {
                    console.log("stop command ran when no music has been played");
                }
            }
            break;

        case "leave":
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                if (Math.floor(Math.random() * 10) + 1 == 10) {
                  message.react("🖕");
                } else {
                  message.react("👍");
                }
                connection.disconnect();
            }
            break;
        case "help":
            message.channel.send({
                embed: {
                    color: 15277667,
                    title: "Invalid command!",
                    description: 'Available commands:',
                    fields: [{
                        name: "!join",
                        value: "Run this in VC to get D&D Player to join"
                    }, {
                        name: "!stop",
                        value: "Run this in VC to stop music"
                    }, {
                        name: "!leave",
                        value: "Run this in VC to make D&D Player leave"
                    }],
                }
            });
            break;
        case "list":
            var valid_cmds_json = Object.keys(data);
            message.channel.send({
                embed: {
                    color: 15277667,
                    title: "Available music",
                    description: `${valid_cmds_json}`,
                }
            });
            break;
        default:
            var valid_cmds = ['stop', 'join', 'leave', 'help']
            var valid_cmds_json = Object.keys(data);
            const valid_cmds_combined = valid_cmds.concat(valid_cmds_json);
            if (!valid_cmds_combined.includes(command)) return;
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                msg = await message.channel.send({
                    embed: {
                        color: 15277667,
                        title: "Fetching music",
                        description: "Please wait while D&D Player gets your music",
                    }
                });
                var music = data[command];
                console.log(music);
                const title = (await ytdl.getBasicInfo(music)).videoDetails.title;
                const thumbnail = ytdl.getURLVideoID(music);
                console.log("Playing", title);
                msg.edit({
                    embed: {
                        color: 15277667,
                        title: title,
                        description: 'Run `!stop` to stop',
                        thumbnail: {
                            url: `https://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`,
                        },
                        footer: {
                            text: "Coded by TwilightBlood, be amazed"
                        }
                    }
                });
                connection.play(ytdl(music, {
                    filter: 'audioonly'
                }, {
                    type: 'ogg/opus'
                }, {
                    volume: false
                }, {
                    quality: 'highestaudio'
                }, {
                    highWaterMark: 1 << 25
                }, {
                    highWaterMark: 1
                }))
            };
    }
});

// sekret
client.login(config.token);
