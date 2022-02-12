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
        case "join" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                console.log("Channel: " + message.member.voice.channel.name + " | Person: " + message.author);
            } else {
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "Error: not in voice chat",
                    description: 'Join a vc and rerun this command',
                    footer: {
                        text: "D&D Player - TwilightBlood"
                    }
                }
                });
            }
            break;
        case "1" :
            // check if user is in vc
            if (message.member.voice.channel) {
                // get connection info
                const connection = await message.member.voice.channel.join();
                // init array of links
                const villageMusic = ["https://www.youtube.com/watch?v=70RNKIbZlhA"]
                // get a random link
                const random = Math.floor(Math.random() * villageMusic.length);
                // log that to console
                console.log(random, villageMusic[random]);
                // send embed
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "Playing intro music",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                // play music
                connection.play(ytdl(villageMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }
                ))};
            break;

        case "2" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const battleMusic = ["https://www.youtube.com/watch?v=A8qMyBWZNw0"]
                const random = Math.floor(Math.random() * battleMusic.length);
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "RPG Playlist - Peaceful/Travel Music",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                console.log(random, battleMusic[random]);
                connection.play(ytdl(battleMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }
                ))};
            break;

        case "3" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const bossMusic = ["https://www.youtube.com/watch?v=fIuO3RpMvHg&start=1669"]
                const random = Math.floor(Math.random() * bossMusic.length);
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "RPG Playlist - Tavern/Inn Music",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                console.log(random, bossMusic[random]);
                connection.play(ytdl(bossMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }
                ))};
            break;

        case "4" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const ominousMusic = ["https://www.youtube.com/watch?v=xt2DFT4JCBs"]
                const random = Math.floor(Math.random() * ominousMusic.length);
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "Inscryption OST 13 - The Temple of Magicks",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                console.log(random, ominousMusic[random]);
                connection.play(ytdl(ominousMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }
                ))};
            break;

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
        case "5" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const exploreMusic = ["https://www.youtube.com/watch?v=2F6-GCMHZNI"]
                const random = Math.floor(Math.random() * exploreMusic.length);
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "1 Hour | Epic Music | Audiomachine | Desolation and War",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                console.log(random, exploreMusic[random]);
                connection.play(ytdl(exploreMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }
                ))};
            break;

        case "6" :
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const eeryMusic = ["https://www.youtube.com/watch?v=9_gRgDO4rYI"]
                const random = Math.floor(Math.random() * eeryMusic.length);
                message.channel.send({ embed: {
                    color: 15277667,
                    title: "Dream Pastries",
                    description: 'Run `!stop` to stop',
                    footer: {
                        text: "Coded by TwilightBlood, be amazed"
                    }
                }
                });
                console.log(random, eeryMusic[random]);
                connection.play(ytdl(eeryMusic[random], { filter: 'audioonly' }, { type: 'ogg/opus', }

                ))};
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
