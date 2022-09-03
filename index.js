const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, clientId, mongo } = require('./config.json');
const { getAllFilesFilter } = require('./utils/getAllFiles.js');
const { version } = require('./config.json');
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

// MongoDB Basic Economy Functions
global.cmds = require("./functions/cmds")
global.bals = require("./functions/economy")
global.quts = require("./functions/quotes")
global.apis = require("./functions/apis")


// MongoDB Advanced Economy Functions
global.sgrn = require("./functions/stocks/green")
global.sblu = require("./functions/stocks/blue")
global.syll = require("./functions/stocks/yellow")
global.sred = require("./functions/stocks/red")

global.sgrnx = require("./functions/stocks/greenmax")
global.sblux = require("./functions/stocks/bluemax")
global.syllx = require("./functions/stocks/yellowmax")
global.sredx = require("./functions/stocks/redmax")


// MongoDB Experimental Economy Functions
global.Lb1o = require("./functions/business/1/owner")
global.Lb1e = require("./functions/business/1/earning")
global.Lb1u = require("./functions/business/1/upgrade")
global.Lb1t = require("./functions/business/1/timedunix")

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

console.log('\n[0xBOT] [!] COMMANDS REGISTERED\n[0xBOT] [i] LOGGING IN')

// Login
client.login(token);