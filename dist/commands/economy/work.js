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
const cooldown = new discord_js_1.Collection();
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('work')
        .setDMPermission(false)
        .setDescription('WORK FOR MONEY')
        .setDescriptionLocalizations({
        de: 'ARBEITE FÜR GELD'
    }),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'work')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/work`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const random = bot.random(1, 4);
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            let use, cdown;
            const timeLeft = cooldown.get(interaction.user.id) - Date.now();
            use = 's';
            cdown = timeLeft / 1000;
            if (cdown > 60) {
                cdown = timeLeft / 1000 / 60;
                use = 'm';
            }
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + use + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        else {
            let job, result;
            if (random === 1)
                job = 'PROGRAMMER';
            result = bot.random(75, 200);
            if (random === 2)
                job = 'CLEANER';
            result = bot.random(50, 100);
            if (random === 3)
                job = 'MCDONALDS WORKER';
            result = bot.random(30, 120);
            if (random === 4)
                job = 'PAINTER';
            result = bot.random(200, 500);
            if (lang === 'de') {
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
            const car = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value');
            if (car !== 0) {
                carboost = true;
                carboostam = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount');
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
                if (lang === 'de') {
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
                if (lang === 'de') {
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
                resultcar = Math.round(bot.perAdd(result, carboostam));
            const transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: 'WORK',
                    amount: resultcar,
                    type: 'negative'
                }, reciever: {
                    id: interaction.user.id,
                    amount: resultcar,
                    type: 'positive'
                }
            });
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:HAMMER:1024388163747184662> » WORK')
                .setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra + '\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
                    .setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra + '\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.money.add(interaction.guild.id, interaction.user.id, resultcar);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ' + resultcar + '€');
            cooldown.set(interaction.user.id, Date.now() + 1800000);
            setTimeout(() => cooldown.delete(interaction.user.id), 1800000);
            return interaction.reply({ embeds: [message] });
        }
    }
};
//# sourceMappingURL=work.js.map