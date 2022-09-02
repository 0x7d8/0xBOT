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
Green */

const stockgreenschema = require('./schema/stockgreen');

getgrn = (userId) => new Promise(async ful => {
    const data = await stockgreenschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreen);
})

addgrn = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen += stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen
            })
        }
        data.save();
    })
}

remgrn = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen -= stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen: -stockgreen
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

/* Stock Max Functions
Green */

const stockgreenmaxschema = require('./schema/stockgreenmax');

getgrnx = (userId) => new Promise(async ful => {
    const data = await stockgreenmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreenmax);
})

addgrnx = (userId, stockgreenmax) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax += stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax
            })
        }
        data.save();
    })
}

remgrnx = (userId, stockblue) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax -= stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax: -stockgreenmax
            })
        }
        data.save();
    })
}

/* Stock Max Functions
Blue */

const stockbluemaxschema = require('./schema/stockbluemax');

getblux = (userId) => new Promise(async ful => {
    const data = await stockbluemaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockbluemax);
})

addblux = (userId, stockbluemax) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax += stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax
            })
        }
        data.save();
    })
}

remblux = (userId, stockblue) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax -= stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax: -stockbluemax
            })
        }
        data.save();
    })
}

/* Stock Functions
Yellow */

const stockyellowmaxschema = require('./schema/stockyellowmax');

getyllx = (userId) => new Promise(async ful => {
    const data = await stockyellowmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellowmax);
})

addyllx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax += stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax
            })
        }
        data.save();
    })
}

remyllx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax -= stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax: -stockyellowmax
            })
        }
        data.save();
    })
}

/* Stock Functions
Red */

const stockredmaxschema = require('./schema/stockredmax');

getredx = (userId) => new Promise(async ful => {
    const data = await stockredmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockredmax);
})

addredx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax += stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax
            })
        }
        data.save();
    })
}

remredx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax -= stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax: -stockredmax
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

console.log('\n[0xBOT] [!] COMMANDS REGISTERED')

// Login
client.login(token);