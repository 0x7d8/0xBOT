const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, mongo } = require('./config.json');
const { getAllFilesFilter } = require('./utils/getAllFiles.js');
const { version, maintenance } = require('./config.json');
const { EmbedBuilder } = require('@discordjs/builders');

// MongoDB
const mongoose = require('mongoose')
mongoose.connect(mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('\n[0xBOT] [i] LOADING BOT, VERSION ' + version + '\n[0xBOT] [!] CONNECTED TO MONGODB\n\n[0xBOT] [i] LOADING COMMANDS AND EVENTS...'))

// Deploy Commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load all events
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file);
	if (event.once) {
		client.once(event.event, (...args) => event.execute(...args));
	} else {
		client.on(event.event, (...args) => event.execute(...args));
	}
	console.log(`[0xBOT] [i] LOADING EVENT ${event.name}`);
}

// Load all commands
client.commands = new Collection();

const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.data.name, command);
    let cmd = command.data.name.toUpperCase()
	console.log(`[0xBOT] [i] LOADING COMMAND ${cmd}`);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
        console.log('[0xBOT] [!] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] ERROR :')
		console.error(error);
        
        // Create Error Embed
        const err = new EmbedBuilder()
            .setTitle('» FEHLER')
  			.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Befehls aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Befehl wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de0`')
        	.setFooter({ text: '» ' + version });

        // Send Message
		await interaction.reply({ embeds: [err.toJSON()], ephemeral: true });
	}
});

// MongoDB Functions
const cmds = require("./functions/cmds.js")

import {getbal, addbal, rembal} from "./functions/economy.js"
import {getqut, addqut, remqut} from "./functions/quotes.js"
import {getapi, addapi, remapi} from "./functions/apis.js"


import {getgrn, getblu, getyll, getred} from "./functions/stocks.js"
import {addgrn, addblu, addyll, addred} from "./functions/stocks.js"
import {remgrn, remblu, remyll, remred} from "./functions/stocks.js"

import {getgrnx, getblux, getyllx, getredx} from "./functions/stocksmax.js"
import {addgrnx, addblux, addyllx, addredx} from "./functions/stocksmax.js"
import {remgrnx, remblux, remyllx, remredx} from "./functions/stocksmax.js"

import {getLb1o, getLb1e, getLb1u, getLb1t} from "./functions/business1.js"
import {addLb1o, addLb1e, addLb1u, addLb1t} from "./functions/business1.js"
import {remLb1o, remLb1e, remLb1u, remLb1t} from "./functions/business1.js"

// Deploy Commands
const commands = [];

for (const file of commandFiles) {
	const command = require(file);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
);

console.log('\n[0xBOT] [!] COMMANDS REGISTERED')

// Login
client.login(token);