"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('work')
        .setDMPermission(false)
        .setDescription('WORK FOR MONEY')
        .setDescriptionLocalizations({
        de: 'ARBEITE FÜR GELD'
    }),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'work')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/work`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] WORK : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const random = ctx.bot.random(1, 4);
        if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')).onCooldown) {
            const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')).remaining;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + (0, ms_1.default)(timeLeft) + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + (0, ms_1.default)(timeLeft) + '**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] WORK : ONCOOLDOWN : ${(0, ms_1.default)(timeLeft)}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        else {
            let job, result;
            if (random === 1)
                job = 'PROGRAMMER';
            result = ctx.bot.random(75, 200);
            if (random === 2)
                job = 'CLEANER';
            result = ctx.bot.random(50, 100);
            if (random === 3)
                job = 'MCDONALDS WORKER';
            result = ctx.bot.random(30, 120);
            if (random === 4)
                job = 'PAINTER';
            result = ctx.bot.random(200, 500);
            if (ctx.metadata.language === 'de') {
                if (random === 1)
                    job = 'PROGRAMMIERER';
                if (random === 2)
                    job = 'HAUSMEISTER';
                if (random === 3)
                    job = 'MCDONALDS KASSIERER';
                if (random === 4)
                    job = 'KÜNSTLER';
            }
            let carboost = false;
            let carboostam;
            const car = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value');
            if (car !== 0) {
                carboost = true;
                carboostam = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount');
            }
            let extra;
            if (!carboost) {
                if (result < 40)
                    extra = 'MEH.';
                if (result >= 40)
                    extra = 'NICE.';
                if (result >= 60)
                    extra = 'GREAT.';
                if (result >= 80)
                    extra = 'WONDERFUL!';
                if (result >= 100)
                    extra = 'WOW!';
                if (ctx.metadata.language === 'de') {
                    if (result < 40)
                        extra = 'MEH.';
                    if (result >= 40)
                        extra = 'NICE.';
                    if (result >= 60)
                        extra = 'PRIMA.';
                    if (result >= 80)
                        extra = 'TOLL!';
                    if (result >= 100)
                        extra = 'WOW!';
                }
            }
            else {
                if (result < 40)
                    extra = 'MEH.\n**+' + carboostam + '%** thanks to your Car!';
                if (result >= 40)
                    extra = 'NICE.\n**+' + carboostam + '%** thanks to your Car!';
                if (result >= 60)
                    extra = 'GREAT.\n**+' + carboostam + '%** thanks to your Car!';
                if (result >= 80)
                    extra = 'WONDERFUL!\n**+' + carboostam + '%** thanks to your Car!';
                if (result >= 100)
                    extra = 'WOW!\n**+' + carboostam + '%** thanks to your Car!';
                if (ctx.metadata.language === 'de') {
                    if (result < 40)
                        extra = 'MEH.\n**+' + carboostam + '%** wegen deinem Auto!';
                    if (result >= 40)
                        extra = 'NICE.\n**+' + carboostam + '%** wegen deinem Auto!';
                    if (result >= 60)
                        extra = 'PRIMA.\n**+' + carboostam + '%** wegen deinem Auto!';
                    if (result >= 80)
                        extra = 'TOLL!\n**+' + carboostam + '%** wegen deinem Auto!';
                    if (result >= 100)
                        extra = 'WOW!\n**+' + carboostam + '%** wegen deinem Auto!';
                }
            }
            let resultcar;
            if (!carboost)
                resultcar = result;
            else
                resultcar = Math.round(ctx.bot.perAdd(result, carboostam));
            const transaction = await ctx.bot.transactions.log({
                success: true,
                sender: {
                    id: 'WORK',
                    amount: resultcar,
                    type: 'negative'
                }, reciever: {
                    id: ctx.interaction.user.id,
                    amount: resultcar,
                    type: 'positive'
                }
            });
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:HAMMER:1024388163747184662> » WORK')
                .setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra + '\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
                    .setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra + '\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultcar);
            ctx.log(false, `[CMD] WORK : ${resultcar}€`);
            ctx.bot.cooldown.set(ctx.interaction.user.id, 'work', 60 * 45 * 1000);
            return ctx.interaction.reply({ embeds: [message] });
        }
    }
};
//# sourceMappingURL=work.js.map