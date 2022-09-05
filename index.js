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
}).then(console.log('\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] LOADING BOT, VERSION ' + version + '\n[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] CONNECTED TO MONGODB\n\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] LOADING COMMANDS AND EVENTS...'))

// Deploy Commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load all Events
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file);
	if (event.once) {
		client.once(event.event, (...args) => event.execute(...args));
	} else {
		client.on(event.event, (...args) => event.execute(...args));
	}
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] LOADING EVENT ${event.name}`);
}

// Load all Commands
client.commands = new Collection();

const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.data.name, command);
    let cmd = command.data.name.toUpperCase()
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] LOADING COMMAND ${cmd}`);
}

// Load all Buttons
client.buttons = new Collection();

const buttonFiles = getAllFilesFilter('./buttons', '.js');
for (const file of buttonFiles) {
	const button = require(file);
	client.buttons.set(button.data.name, button);
    let btn = button.data.name.toUpperCase()
	console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] LOADING BUTTON ${btn}`);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isButton()) return;

	if (interaction.isChatInputCommand()) {

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
    		console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] ERROR :')
			console.error(error);
        
    		// Create Error Embed
    		const message = new EmbedBuilder()
        		.setTitle('» FEHLER')
  				.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Befehls aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Befehl wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de0`')
    			.setFooter({ text: '» ' + version });

    		// Send Message
			await interaction.reply({ embeds: [message.toJSON()], ephemeral: true });
		}

	}

	if (interaction.isButton()) {

		try {
			let sc = false

			if (interaction.customId.toString().substring(0, 3) == 'BEG') {
				const cache = interaction.customId.split('-');
				const [cmd, reciever, amount] = cache;
				let editedinteraction = interaction
				editedinteraction.customId = "beg"
				sc = true

				const button = client.buttons.get(editedinteraction.customId);
				await button.execute(editedinteraction, reciever, amount);
			}

			if (sc == false) {
				const button = client.buttons.get(interaction.customId);
				if (!button) return;

				await button.execute(interaction);
			}

			return;
		} catch (error) {
			console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] ERROR :')
			console.error(error);
        
    		// Create Error Embed
    		const message = new EmbedBuilder()
        		.setTitle('» FEHLER')
  				.setDescription('**»» INFO**\n» WAS?\n`Ein Fehler ist beim ausführen dieses Befehls aufgetreten.`\n\n» WIESO?\n`Dies kann an vielem liegen, der Code wird für Fehler vorm Release einer neuen Version gecheckt und es kann sein, das ein Fehler enthalten war.`\n\n» WAS TUN?\n`Nichts. Einfach warten, der Befehl wurde geloggt und sollte in der nächsten Version schon behoben werden!`\n\n**»» KONTAKT**\n» EMAIL\n`kontakt@rjansen.de0`')
    			.setFooter({ text: '» ' + version });

    		// Send Message
			await interaction.reply({ embeds: [message.toJSON()], ephemeral: true });
		}

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

console.log('\n[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] COMMANDS REGISTERED\n[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] LOGGING IN')

// Login
client.login(token);