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
}).then(console.log('\n[0xBOT] [i] LADE BOT VERSION ' + version + '\n[0xBOT] [!] ZU MONGODB VERBUNDEN\n\n[0xBOT] [i] LADE BEFEHLE UND EVENTS...'))

// Log if Maintenance or not
if (maintenance == 'yes') {
    console.log('[0xBOT] [!] LADE BOT IN WARTUNGSMODUS\n')
} else {
    console.log('[0xBOT] [i] LADE BOT IN NORMALEN MODUS\n')
}

// Deploy Commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Create Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/* Create client
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_SCHEDULED_EVENTS
	]
});
*/

// Load all events
const eventFiles = getAllFilesFilter('./events', '.js');
for (const file of eventFiles) {
	const event = require(file);
	if (event.once) {
		client.once(event.event, (...args) => event.execute(...args));
	} else {
		client.on(event.event, (...args) => event.execute(...args));
	}
	console.log(`[0xBOT] [i] LADE EVENT ${event.name}`);
}

// Set Status
client.on("ready", () => { 
	client.user.setStatus("online");
	client.user.setActivity('mit Robert', { type: "PLAYING"})
})

// Load all commands
client.commands = new Collection();

const commandFiles = getAllFilesFilter('./commands', '.js');
for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.data.name, command);
    let cmd = command.data.name.toUpperCase()
	console.log(`[0xBOT] [i] LADE BEFEHL ${cmd}`);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
        console.log('[0xBOT] [!] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] FEHLER :')
		console.error(error);
        
        // Create Error Embed
        var err = new EmbedBuilder()
            .setTitle('» FEHLER')
  			.setDescription('» Ein Fehler ist beim ausführen dieses Befehls aufgetreten!\nDieser Fehler wurde gespeichert und sollte bald behoben werden!')
        	.setFooter({ text: '» ' + version });

		await interaction.reply({ embeds: [err.toJSON()], ephemeral: true });
	}
});

// Economy Functions
const moneySchema = require('./schema/money');

getbal = (userId) => new Promise(async ful => {
    const data = await moneySchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.money);
})

addbal = (userId, money) => {
    moneySchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.money += money;
        } else {
            data = new moneySchema({
                userId,
                money
            })
        }
        data.save();
    })
}

rembal = (userId, money) => {
    moneySchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.money -= money;
        } else {
            data = new moneySchema({
                userId,
                money: -money
            })
        }
        data.save();
    })
}

// Quote Functions
const quoteSchema = require('./schema/quotes');

getqut = (userId) => new Promise(async ful => {
    const data = await quoteSchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.quotes);
})

addqut = (userId, quotes) => {
    quoteSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.quotes += quotes;
        } else {
            data = new quoteSchema({
                userId,
                quotes
            })
        }
        data.save();
    })
}

remqut = (userId, quotes) => {
    quoteSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.quotes -= quotes;
        } else {
            data = new quoteSchema({
                userId,
                quotes: -quotes
            })
        }
        data.save();
    })
}

// API Functions
const apischema = require('./schema/apis');

getapi = (userId) => new Promise(async ful => {
    const data = await apischema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.apis);
})

addapi = (userId, apis) => {
    apischema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.apis += apis;
        } else {
            data = new apischema({
                userId,
                apis
            })
        }
        data.save();
    })
}

remapi = (userId, apis) => {
    apischema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.apis -= apis;
        } else {
            data = new apischema({
                userId,
                apis: -apis
            })
        }
        data.save();
    })
}

// Cmd Functions
const cmdschema = require('./schema/cmds');

getcmd = (userId) => new Promise(async ful => {
    const data = await cmdschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.cmds);
})

addcmd = (userId, cmds) => {
    cmdschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.cmds += cmds;
        } else {
            data = new cmdschema({
                userId,
                cmds
            })
        }
        data.save();
    })
}

remcmd = (userId, cmds) => {
    cmdschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.cmds -= cmds;
        } else {
            data = new cmdschema({
                userId,
                cmds: -cmds
            })
        }
        data.save();
    })
}

/* Stock Functions
Blue */

const stockblueschema = require('./schema/stockblue');

getblu = (userId) => new Promise(async ful => {
    const data = await stockblueschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockblue);
})

addblu = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue += stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue
            })
        }
        data.save();
    })
}

remblu = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue -= stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue: -stockblue
            })
        }
        data.save();
    })
}

/* Stock Functions
Yellow */

const stockyellowschema = require('./schema/stockyellow');

getyll = (userId) => new Promise(async ful => {
    const data = await stockyellowschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellow);
})

addyll = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow += stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow
            })
        }
        data.save();
    })
}

remyll = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow -= stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow: -stockyellow
            })
        }
        data.save();
    })
}

/* Stock Functions
Red */

const stockredschema = require('./schema/stockred');

getred = (userId) => new Promise(async ful => {
    const data = await stockredschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockred);
})

addred = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred += stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred
            })
        }
        data.save();
    })
}

remred = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred -= stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred: -stockred
            })
        }
        data.save();
    })
}

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

console.log('\n[0xBOT] [!] BEFEHLE REGISTRIERT')

// Login
client.login(token);