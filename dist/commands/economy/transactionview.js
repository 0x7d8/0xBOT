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
        .setName('transactionview')
        .setDescription('VIEW A TRANSACTION')
        .setDescriptionLocalizations({
        de: 'SCHAU EINE TRANSAKTION AN'
    })
        .setDMPermission(false)
        .addStringOption((option) => option.setName('id')
        .setDescription('THE TRANSACTION ID')
        .setDescriptionLocalizations({
        de: 'DIE TRANSAKTIONS ID'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const transactionId = bot.getOption(interaction, 'id');
        const transaction = await bot.transactions.get(transactionId);
        // Check if Transaction exists
        if (transaction === 'N-FOUND') {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This Transaction doesnt exist!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Transaktion existiert nicht!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONVIEW : NOTEXIST : ' + transactionId);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Fetch User Infos
        let sender, reciever;
        if (isNaN(transaction.sender.id.slice(-1))) {
            const senderInfo = await bot.userdb.get(transaction.sender.id);
            sender = senderInfo.username + '#' + senderInfo.usertag;
        }
        else {
            sender = transaction.sender.id;
        }
        ;
        if (!isNaN(transaction.reciever.id.slice(-1))) {
            const recieverInfo = await bot.userdb.get(transaction.reciever.id);
            reciever = recieverInfo.username + '#' + recieverInfo.usertag;
        }
        else {
            reciever = transaction.reciever.id;
        }
        // Create Embeds
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » TRANSACTION INFOS')
            .setDescription(`» ID: \`${transactionId}\`
                <t:${transaction.timestamp}>

                » ${sender}
                **${transaction.sender.type === 'positive' ? '+' : '-'}$${transaction.sender.amount}**

                » ${reciever}
                **${transaction.reciever.type === 'positive' ? '+' : '-'}$${transaction.reciever.amount}**
            `)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS INFOS')
                .setDescription(`» ID: \`${transactionId}\`
                <t:${transaction.timestamp}>

                » ${sender}
                **${transaction.sender.type === 'positive' ? '+' : '-'}${transaction.sender.amount}€**

                » ${reciever}
                **${transaction.reciever.type === 'positive' ? '+' : '-'}${transaction.reciever.amount}€**
            `)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONVIEW : ' + transactionId);
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=transactionview.js.map