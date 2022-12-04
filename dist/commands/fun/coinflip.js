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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('coinflip')
        .setDMPermission(false)
        .setDescription('FLIP A COIN')
        .setDescriptionLocalizations({
        de: 'WIRF EINE MÜNZE'
    })
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        let amount = bot.getOption(interaction, 'amount');
        let heads = 0;
        let tails = 0;
        let tries = 0;
        if (!amount)
            amount = 1;
        if (amount < 1) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You need to throw atleast **1** Coin!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du musst schon mindestens **1** Münze werfen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : NOTENOUGHCOINS : ' + amount);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (amount > 1000) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant throw more than **1000** Coins!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du darfst nicht mehr als **1000** Münzen werfen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : TOOMANYCOINS : ' + amount);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let coin;
        while (amount !== tries) {
            const random = bot.random(1, 2);
            if (random === 1) {
                coin = 'HEAD';
                heads = heads + 1;
            }
            if (random === 2) {
                coin = 'TAIL';
                tails = tails + 1;
            }
            tries = tries + 1;
        }
        let message;
        if (amount === 1) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                .setDescription('» The Coin Landed on **' + coin + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                if (coin === "HEAD")
                    coin = "KOPF";
                if (coin === "TAIL")
                    coin = "ZAHL";
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                    .setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                .setDescription('» HEADS\n`' + heads + '`\n\n» TAILS\n`' + tails + '`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                    .setDescription('» KÖPFE\n`' + heads + '`\n\n» ZAHLEN\n`' + tails + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : H[' + heads + '] : T[' + tails + ']');
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=coinflip.js.map