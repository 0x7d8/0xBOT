"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Module Register
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAlias('@interfaces', __dirname + '/interfaces');
module_alias_1.default.addAlias('@functions', __dirname + '/functions');
module_alias_1.default.addAlias('@utils', __dirname + '/utils');
module_alias_1.default.addAlias('@config', __dirname + '/config.json');
const sleep = (milliseconds) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
const discord_js_1 = require("discord.js");
const getAllFiles_js_1 = require("@utils/getAllFiles.js");
const discord_js_2 = require("discord.js");
const timer_js_1 = require("@utils/timer.js");
const _config_1 = __importDefault(require("@config"));
const cliProgress = __importStar(require("cli-progress"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates
    ]
});
// Login Function
const timer = new timer_js_1.Timer();
let didload = false;
const login = (client, commandFiles) => {
    timer.start();
    client.login(_config_1.default.client.token).then(async () => {
        if (_config_1.default.client.quickload) {
            timer.stop();
            // Deploy Commands
            const commands = [];
            await Promise.all(commandFiles.map(async (file) => {
                const command = (await import(file)).default.default;
                command.data.toJSON();
                commands.push(command.data.toJSON());
            }));
            const clientCommands = commands;
            client.application?.commands.set(clientCommands);
            // Execute Event
            const ready = (await import('./events/ready.js')).default.default;
            while (!didload) {
                sleep(500);
            }
            return ready.execute(client, timer.getTime());
        }
        else {
            timer.stop();
            // Deploy Commands
            const commands = [];
            await Promise.all(commandFiles.map(async (file) => {
                const command = (await import(file)).default.default;
                command.data.toJSON();
                commands.push(command.data.toJSON());
            }));
            const clientCommands = commands;
            client.application?.commands.set(clientCommands);
            // Execute Event
            const ready = (await import('./events/ready.js')).default.default;
            return ready.execute(client, timer.getTime());
        }
    });
};
// MongoDB
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING 0xBOT ${_config_1.default.version}`);
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ LOADING COMMANDS AND EVENTS`);
console.log(' ');
// Bot Functions
const bot = __importStar(require("@functions/bot.js"));
client.config = _config_1.default;
/// Register External Files
// Init Progress Bar
const bars = new cliProgress.MultiBar({
    format: function (options, params, payload) {
        const value = (params.value > 9 ? params.value : '0' + params.value);
        const total = (params.total > 9 ? params.total : '0' + params.total);
        return cliProgress.Format.Formatter(Object.assign({}, options, {
            format: `[0xBOT] [i] [{bar}] ${value}/${total} {type}`
        }), params, payload);
    },
    barCompleteChar: '=',
    barIncompleteChar: '-',
    barsize: 14,
    hideCursor: true
});
// Get Files
const eventFiles = (0, getAllFiles_js_1.getAllFilesFilter)('./events', '.js');
const eventBar = bars.create(eventFiles.length, 0, {
    type: 'EVENTS LOADED'
});
const commandFiles = (0, getAllFiles_js_1.getAllFilesFilter)('./commands', '.js');
const commandBar = bars.create(commandFiles.length, 0, {
    type: 'COMMANDS LOADED'
});
const buttonFiles = (0, getAllFiles_js_1.getAllFilesFilter)('./buttons', '.js');
const buttonBar = bars.create(buttonFiles.length, 0, {
    type: 'BUTTONS LOADED'
});
const modalFiles = (0, getAllFiles_js_1.getAllFilesFilter)('./modals', '.js');
const modalBar = bars.create(modalFiles.length, 0, {
    type: 'MODALS LOADED'
});
// Login Quickload
if (_config_1.default.client.quickload)
    login(client, commandFiles);
// Load all Files Functions
const eventLoad = async () => {
    Promise.all(eventFiles.map(async (file) => {
        const event = (await import(file)).default.default;
        if (event.name.toUpperCase() !== 'START BOT' || !_config_1.default.client.quickload) {
            if (event.once) {
                client.once(event.event, (...args) => event.execute(...args));
            }
            else {
                client.on(event.event, (...args) => event.execute(...args, client));
            }
            eventBar.increment();
            bars.update();
            sleep(25);
        }
        else {
            eventBar.increment();
            bars.update();
        }
    }));
};
client.commands = new discord_js_1.Collection();
const commandLoad = async () => {
    Promise.all(commandFiles.map(async (file) => {
        const command = (await import(file)).default.default;
        client.commands.set(command.data.name, command);
        commandBar.increment();
        bars.update();
        sleep(25);
    }));
};
client.buttons = new discord_js_1.Collection();
const buttonLoad = async () => {
    Promise.all(buttonFiles.map(async (file) => {
        const button = (await import(file)).default.default;
        client.buttons.set(button.data.name, button);
        buttonBar.increment();
        bars.update();
        sleep(25);
    }));
};
client.modals = new discord_js_1.Collection();
const modalLoad = async () => {
    Promise.all(modalFiles.map(async (file) => {
        const modal = (await import(file)).default.default;
        client.modals.set(modal.data.name, modal);
        modalBar.increment();
        bars.update();
        sleep(25);
    }));
};
const fileLoad = async () => {
    eventLoad(),
        commandLoad(),
        buttonLoad(),
        modalLoad();
};
fileLoad();
bars.stop();
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [END] $$$$$ LOADED COMMANDS AND EVENTS`);
// Interaction Handler
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand() && !interaction.isButton() && !interaction.isModalSubmit())
        return;
    if (!interaction.guild)
        return;
    // Write to UserDB
    bot.userdb.add({
        avatar: (!!interaction.user.avatar) ? interaction.user.avatar : '',
        discriminator: interaction.user.discriminator,
        username: interaction.user.username,
        id: interaction.user.id
    });
    // Get Guild Language
    const guildlang = await bot.language.get(interaction.guild.id);
    // Get Vote Status
    let votet = 'VOTED';
    const lastVote = await bot.votes.get(interaction.user.id + '-T');
    if (lastVote < (Date.now() - 24 * 60 * 60 * 1000))
        votet = 'NOT VOTED';
    if (lastVote === 0)
        votet = 'NOT VOTED -> /VOTE';
    if (guildlang === 'de') {
        votet = 'GEVOTED';
        if (lastVote < (Date.now() - 24 * 60 * 60 * 1000))
            votet = 'NICHT GEVOTET';
        if (lastVote === 0)
            votet = 'NICHT GEVOTED -> /VOTE';
    }
    // Set User Language
    if (interaction.locale === 'de')
        bot.language.set(interaction.user.id, 'de');
    else
        bot.language.set(interaction.user.id, 'en');
    // Handle Commands
    if (interaction.isChatInputCommand()) {
        // Stats
        bot.stats('cmd', interaction.user.id, interaction.guild.id);
        // Check if Command Exists
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        // Execute Command
        try {
            await command.execute(interaction, client, guildlang, votet);
        }
        catch (e) {
            try {
                await bot.error(interaction, client, e, 'cmd', guildlang, votet);
            }
            catch (e) { }
        }
    }
    // Handle Modals
    if (interaction.isModalSubmit()) {
        try {
            // Stats
            bot.stats('mod', interaction.user.id, interaction.guild.id);
            let sc = false;
            // Special Button Cases
            const args = interaction.customId.split('-');
            if (args[0] === 'API') {
                let editedinteraction = interaction;
                editedinteraction.customId = "api";
                sc = true;
                const modal = client.modals.get(editedinteraction.customId);
                await modal.execute(editedinteraction, client, guildlang, votet, args[1], args[2].toLowerCase());
            }
            // Other Button Cases
            if (!sc) {
                const modal = client.modals.get(interaction.customId);
                if (!modal)
                    return;
                await modal.execute(interaction, client, guildlang, votet);
            }
            return;
        }
        catch (e) {
            try {
                await bot.error(interaction, client, e, 'mod', guildlang, votet);
            }
            catch (e) { }
        }
    }
    // Handle Buttons
    if (interaction.isButton()) {
        // Stats
        bot.stats('btn', interaction.user.id, interaction.guild.id);
        // Execute Button
        try {
            let sc = false;
            // Special Button Cases
            const args = interaction.customId.split('-');
            if (args[0] === 'BEG') {
                let editedinteraction = interaction;
                editedinteraction.customId = "beg";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[1], parseInt(args[2]), args[3], args[4]);
            }
            ;
            if (args[0] === 'RPS') {
                let choice;
                let editedinteraction = interaction;
                editedinteraction.customId = "rps-choice";
                if (args[1] === '1')
                    choice = 'ROCK';
                if (args[1] === '2')
                    choice = 'PAPER';
                if (args[1] === '3')
                    choice = 'SCISSORS';
                if (args[1] === 'YES')
                    editedinteraction.customId = "rps-yes";
                if (args[1] === 'NO')
                    editedinteraction.customId = "rps-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, parseInt(args[2]), choice);
            }
            ;
            if (args[0] === 'MEMORY') {
                let editedinteraction = interaction;
                editedinteraction.customId = "memory-choice";
                if (args[1] === 'YES')
                    editedinteraction.customId = "memory-yes";
                if (args[1] === 'NO')
                    editedinteraction.customId = "memory-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, parseInt(args[2]), parseInt(args[1]));
            }
            ;
            if (args[0] === 'TTT') {
                let editedinteraction = interaction;
                editedinteraction.customId = "ttt-choice";
                if (args[1] === 'YES')
                    editedinteraction.customId = "ttt-yes";
                if (args[1] === 'NO')
                    editedinteraction.customId = "ttt-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, parseInt(args[2]), parseInt(args[1]));
            }
            ;
            if (args[0] === 'STOCKNEXT') {
                let editedinteraction = interaction;
                editedinteraction.customId = "stocknext";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[1]);
            }
            ;
            if (args[0] === 'BUSINESS') {
                let editedinteraction = interaction;
                if (args[2] === 'YES')
                    editedinteraction.customId = "business-yes";
                if (args[2] === 'NO')
                    editedinteraction.customId = "business-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase());
            }
            ;
            if (args[0] === 'CAR') {
                let editedinteraction = interaction;
                if (args[2] === 'YES')
                    editedinteraction.customId = "car-yes";
                if (args[2] === 'NO')
                    editedinteraction.customId = "car-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase());
            }
            ;
            if (args[0] === 'ITEM') {
                let editedinteraction = interaction;
                if (args[2] === 'YES')
                    editedinteraction.customId = "item-yes";
                if (args[2] === 'NO')
                    editedinteraction.customId = "item-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], args[1].toLowerCase(), parseInt(args[5]));
            }
            ;
            if (args[0] === 'STOCKUPGRADE') {
                let editedinteraction = interaction;
                if (args[2] === 'YES')
                    editedinteraction.customId = "stockupgrade-yes";
                if (args[2] === 'NO')
                    editedinteraction.customId = "stockupgrade-no";
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[3], args[4], parseInt(args[5]));
            }
            ;
            if (args[0] === 'BOMB') {
                let editedinteraction = interaction;
                editedinteraction.customId = 'item-bomb';
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            ;
            if (args[0] === 'COUNT') {
                let editedinteraction = interaction;
                editedinteraction.customId = 'count';
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[1].toLowerCase());
            }
            ;
            if (args[0] === 'POLL') {
                let editedinteraction = interaction;
                editedinteraction.customId = 'poll';
                sc = true;
                const button = client.buttons.get(editedinteraction.customId);
                await button.execute(editedinteraction, client, guildlang, votet, args[1].toLowerCase());
            }
            // Other Button Cases
            if (!sc) {
                const button = client.buttons.get(interaction.customId);
                if (!button)
                    return;
                await button.execute(interaction, client, guildlang, votet);
            }
            return;
        }
        catch (e) {
            try {
                await bot.error(interaction, client, e, 'btn', guildlang, votet);
            }
            catch (e) { }
        }
    }
});
console.log(' ');
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] LOGGING IN...`);
if (!_config_1.default.client.quickload) {
    login(client, commandFiles);
}
else {
    didload = true;
}
// Top.gg Stats
if (_config_1.default.web.stats) {
    const { AutoPoster } = require('topgg-autoposter');
    const aP = AutoPoster(_config_1.default.web.keys.apikey, client);
    aP.on('posted', () => {
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] TOP.GG STATS POSTED');
    });
}
// Top.gg Voting
if (_config_1.default.web.votes) {
    const Topgg = require("@top-gg/sdk");
    const express = require("express");
    const app = express();
    const webhook = new Topgg.Webhook(_config_1.default.web.keys.webkey);
    app.post("/dblwebhook", webhook.listener(async (vote) => {
        if (!vote)
            return;
        if (!vote.user)
            return;
        const random = bot.random(7500, 15000);
        // Calculate Extra
        let extra;
        if ((await bot.votes.get(vote.user + '-A') + 1) % 10 === 0)
            extra = ((await bot.votes.get(vote.user + '-A') + 1) * 10000) / 2;
        // Create Embeds
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('» VOTING')
            .setDescription('» Thanks for Voting! You got **$' + random + '** from me :)\n» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
            .setFooter({ text: '» ' + _config_1.default.version });
        if (await bot.language.get(vote.user) === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Danke fürs Voten! Du hast **' + random + '€** von mir erhalten :)')
                .setFooter({ text: '» ' + _config_1.default.version });
        }
        else {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Thanks for Voting! You got **$' + random + '** from me :)')
                .setFooter({ text: '» ' + _config_1.default.version });
        }
        ;
        let messageBonus = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('» VOTING')
            .setDescription('» Thanks for Voting **' + ((await bot.votes.get(vote.user + '-A')) + 1) + '** times!\nAs A Gift I give you extra **$' + extra + '**!')
            .setFooter({ text: '» ' + _config_1.default.version });
        if (await bot.language.get(vote.user) === 'de') {
            messageBonus = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('» VOTING')
                .setDescription('» Danke, dass du **' + ((await bot.votes.get(vote.user + '-A')) + 1) + '** mal gevotet hast!\nAls Geschenk gebe ich dir extra **' + extra + '€**!')
                .setFooter({ text: '» ' + _config_1.default.version });
        }
        // Add Money
        await bot.money.add(false, vote.user, random);
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] VOTED : ' + vote.user + ' : ' + random + '€');
        // Send Message
        client.users.send(vote.user, { embeds: [message] });
        // Count to Stats
        if ((await bot.votes.get(vote.user + '-A') + 1) % 10 === 0) {
            bot.money.add(false, vote.user, extra);
            client.users.send(vote.user, { embeds: [messageBonus] });
        }
        ;
        bot.votes.add(vote.user + '-A', 1);
        bot.votes.set(vote.user + '-T', Date.now());
    }));
    app.listen(_config_1.default.web.ports.votes);
}
/// Cronjobs
// Stock Prices
const cron = __importStar(require("node-cron"));
client.stocks = {
    green: 0,
    blue: 0,
    yellow: 0,
    red: 0,
    black: 0,
    white: 0
};
const dostocks = () => {
    // Green Stock
    client.stocks.oldgreen = client.stocks.green;
    client.stocks.green = (Math.floor(Math.random()
        * (30 - 25 + 1)) + 25)
        * (Math.floor(Math.random()
            * (20 - 15 + 1)) + 15)
        + (Math.floor(Math.random()
            * (400 - 350 + 1))
            + 350);
    // Blue Stock
    client.stocks.oldblue = client.stocks.blue;
    client.stocks.blue = (Math.floor(Math.random()
        * (70 - 45 + 1)) + 45)
        * (Math.floor(Math.random()
            * (40 - 30 + 1)) + 30)
        - (Math.floor(Math.random()
            * (200 - 100 + 1))
            + 100);
    // Yellow Stock
    client.stocks.oldyellow = client.stocks.yellow;
    client.stocks.yellow = (Math.floor(Math.random()
        * (90 - 65 + 1)) + 65)
        * (Math.floor(Math.random()
            * (60 - 50 + 1)) + 50)
        + (Math.floor(Math.random()
            * (200 - 100 + 1))
            + 100);
    // Red Stock
    client.stocks.oldred = client.stocks.red;
    client.stocks.red = (Math.floor(Math.random()
        * (120 - 105 + 1)) + 105)
        * (Math.floor(Math.random()
            * (80 - 70 + 1)) + 70)
        + (Math.floor(Math.random()
            * (400 - 100 + 1))
            + 100);
    // White Stock
    client.stocks.oldwhite = client.stocks.white;
    client.stocks.white = (Math.floor(Math.random()
        * (150 - 130 + 1)) + 130)
        * (Math.floor(Math.random()
            * (120 - 100 + 1)) + 100)
        + (Math.floor(Math.random()
            * (600 - 100 + 1))
            + 100);
    // Black Stock
    client.stocks.oldblack = client.stocks.black;
    client.stocks.black = (Math.floor(Math.random()
        * (250 - 200 + 1)) + 200)
        * (Math.floor(Math.random()
            * (170 - 150 + 1)) + 150)
        + (Math.floor(Math.random()
            * (800 - 200 + 1))
            + 200);
};
dostocks();
cron.schedule('* * * * *', () => {
    dostocks();
    // Unix Time
    client.stocks.refresh = Math.floor(+new Date() / 1000) + 60;
});
//# sourceMappingURL=bot.js.map