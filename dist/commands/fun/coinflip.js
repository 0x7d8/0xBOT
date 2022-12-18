"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
    async execute(ctx) {
        let amount = ctx.getOption('amount');
        let heads = 0;
        let tails = 0;
        let tries = 0;
        if (!amount)
            amount = 1;
        if (amount < 1) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You need to throw atleast **1** Coin!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du musst schon mindestens **1** Münze werfen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] COINFLIP : NOTENOUGHCOINS : ${amount}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (amount > 1000) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant throw more than **1000** Coins!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du darfst nicht mehr als **1000** Münzen werfen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] COINFLIP : TOOMANYCOINS : ${amount}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let coin;
        while (amount !== tries) {
            const random = ctx.bot.random(1, 2);
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
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                if (coin === "HEAD")
                    coin = "KOPF";
                if (coin === "TAIL")
                    coin = "ZAHL";
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                    .setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                .setDescription('» HEADS\n`' + heads + '`\n\n» TAILS\n`' + tails + '`')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
                    .setDescription('» KÖPFE\n`' + heads + '`\n\n» ZAHLEN\n`' + tails + '`')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
        }
        ctx.log(false, `[CMD] COINFLIP : H[${heads}] : T[${tails}]`);
        return ctx.interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=coinflip.js.map