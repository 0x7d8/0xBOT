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
var cmds = require("./functions/cmds")
var bals = require("./functions/economy")
var quts = require("./functions/quotes")
var apis = require("./functions/apis")


var sgrn = require("./functions/stocks/green")
var sblu = require("./functions/stocks/blue")
var syll = require("./functions/stocks/yellow")
var sred = require("./functions/stocks/red")

var sgrnx = require("./functions/stocks/greenmax")
var sblux = require("./functions/stocks/bluemax")
var syllx = require("./functions/stocks/yellowmax")
var sredx = require("./functions/stocks/redmax")


var Lb1o = require("./functions/business/1/owner")
var Lb1e = require("./functions/business/1/earning")
var Lb1u = require("./functions/business/1/upgrade")
var Lb1t = require("./functions/business/1/timedunix")

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