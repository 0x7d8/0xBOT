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
    data: {
        name: 'rps-choice'
    },
    async execute(interaction, client, lang, vote, bet, choice) {
        const cache = interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        if (sender !== interaction.user.id && reciever !== interaction.user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You arent playing!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du spielst garnicht mit!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : NOTPLAYING');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let choiceen;
        if (choice === 'ROCK')
            choiceen = '🪨 ROCK';
        if (choice === 'PAPER')
            choiceen = '📝 PAPER';
        if (choice === 'SCISSORS')
            choiceen = '✂️ SCISSORS';
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
            .setDescription('» You selected **' + choiceen + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            let choicede;
            if (choice === 'ROCK')
                choicede = '🪨 STEIN';
            if (choice === 'PAPER')
                choicede = '📝 PAPIER';
            if (choice === 'SCISSORS')
                choicede = '✂️ SCHERE';
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                .setDescription('» Du hast **' + choicede + '** ausgewählt!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + choice);
        interaction.reply({ embeds: [message], ephemeral: true });
        bot.rps.set('CHOICE-' + interaction.user.id, choice);
        if (bot.rps.has('CHOICE-' + sender) && bot.rps.has('CHOICE-' + reciever)) {
            const psc = bot.rps.get('CHOICE-' + sender);
            const prc = bot.rps.get('CHOICE-' + reciever);
            let win = 'none';
            if (psc === 'ROCK' && prc === 'PAPER')
                win = 'pr';
            if (psc === 'ROCK' && prc === 'SCISSORS')
                win = 'ps';
            if (psc === 'SCISSORS' && prc === 'ROCK')
                win = 'pr';
            if (psc === 'SCISSORS' && prc === 'PAPER')
                win = 'ps';
            if (psc === 'PAPER' && prc === 'ROCK')
                win = 'ps';
            if (psc === 'PAPER' && prc === 'SCISSORS')
                win = 'pr';
            let winner = '**Noone**', rawWinner;
            if (lang === 'de')
                winner = '**Niemand**';
            if (win === 'ps') {
                winner = '<@' + sender + '>';
                rawWinner = sender;
            }
            if (win === 'pr') {
                winner = '<@' + reciever + '>';
                rawWinner = reciever;
            }
            const betwon = bet * 2;
            let transaction;
            if (winner !== '**Noone**' && winner !== '**Niemand**') {
                bot.money.add(interaction.guild.id, rawWinner, betwon);
                if (betwon > 0)
                    transaction = await bot.transactions.log({
                        success: true,
                        sender: {
                            id: (rawWinner === sender ? reciever : sender),
                            amount: betwon,
                            type: 'negative'
                        }, reciever: {
                            id: rawWinner,
                            amount: betwon,
                            type: 'positive'
                        }
                    });
            }
            else {
                bot.money.add(interaction.guild.id, sender, bet);
                bot.money.add(interaction.guild.id, reciever, bet);
            }
            let send, reci;
            if (psc === 'SCISSORS')
                send = '✂️ SCISSORS';
            if (psc === 'PAPER')
                send = '📝 PAPER';
            if (psc === 'ROCK')
                send = '🪨 ROCK';
            if (prc === 'ROCK')
                reci = '🪨 ROCK';
            if (prc === 'PAPER')
                reci = '📝 PAPER';
            if (prc === 'SCISSORS')
                reci = '✂️ SCISSORS';
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender + '> selected **' + bot.rps.get('CHOICE-' + sender) + '**\n» <@' + reciever + '> selected **' + bot.rps.get('CHOICE-' + reciever) + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' won **$' + betwon + '**.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                .setFooter({ text: '» ' + client.config.version });
            if (lang === 'de') {
                if (psc === 'SCISSORS')
                    send = '✂️ SCHERE';
                if (psc === 'PAPER')
                    send = '📝 PAPIER';
                if (psc === 'ROCK')
                    send = '🪨 STEIN';
                if (prc === 'ROCK')
                    reci = '🪨 STEIN';
                if (prc === 'PAPER')
                    reci = '📝 PAPIER';
                if (prc === 'SCISSORS')
                    reci = '✂️ SCHERE';
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender + '> wählte **' + send + '**\n» <@' + reciever + '> wählte **' + reci + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' hat **' + betwon + '€** gewonnen.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                    .setFooter({ text: '» ' + client.config.version });
            }
            bot.rps.delete('CHOICE-' + sender);
            bot.rps.delete('CHOICE-' + reciever);
            {
                interaction.message.components[0].components[0].data.disabled = true;
                interaction.message.components[0].components[1].data.disabled = true;
                interaction.message.components[0].components[2].data.disabled = true;
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : DONE');
            return interaction.message.edit({ embeds: [message], components: interaction.message.components, ephemeral: true });
        }
    }
};
//# sourceMappingURL=choice.js.map