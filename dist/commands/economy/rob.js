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
        .setName('rob')
        .setDescription('ROB SOMEONE')
        .setDescriptionLocalizations({
        de: 'RAUBE JEMANDEN AUS'
    })
        .setDMPermission(false)
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(true))
        .addStringOption((option) => option.setName('money')
        .setNameLocalizations({
        de: 'geld'
    })
        .setDescription('THE MONEY')
        .setDescriptionLocalizations({
        de: 'DAS GELD'
    })
        .setRequired(true)
        .addChoices(
    // Setup Choices
    { name: '💸 [35%] 10€ - 20€', value: '35' }, { name: '🤑 [20%] 30€ - 50€', value: '20' }, { name: '💰 [05%] 60€ - 100€', value: '5' })),
    async execute(interaction, client, lang, vote) {
        // Check if Rob is Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'rob')) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/rob`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/rob`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const user = interaction.options.getUser("user");
        const money = bot.getOption(interaction, 'money');
        const moneysnd = await bot.money.get(interaction.user.id);
        const moneytar = await bot.money.get(user.id);
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
            const timeLeft = cooldown.get(interaction.user.id) - Date.now();
            const cdown = timeLeft / 1000;
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if User is Author
        if (interaction.user.id === user.id) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant rob yourself?!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst dich nicht selber ausrauben?!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : ' + money + '€ : SAMEPERSON');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if Target is Bot
        if (user.bot) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant rob a Bot!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst einem Bot kein Geld klauen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user + ' : BOT');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Steal to Need
        let need;
        if (money === '35')
            need = 20;
        if (money === '20')
            need = 50;
        if (money === '5')
            need = 100;
        // Check for enough Money #1
        // Create Embed
        let notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
            .setDescription('» You dont have enough Money for that, you need atleast **$' + need + '**! BRUH.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            notenoughmoney1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                .setDescription('» Du hast nicht genug Geld dafür, du brauchst mindestens **' + need + '€**! BRUH.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Check Money
        if (money === '35' && moneysnd < 20) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        ;
        if (money === '20' && moneysnd < 50) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        ;
        if (money === '5' && moneysnd < 100) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
        }
        ;
        // Check for enough Money #2
        // Create Embed
        let notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
            .setDescription('» <@' + user + '> doesnt have enough Money for that, he needs atleast **$' + need + '**! LOL.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            notenoughmoney2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                .setDescription('» <@' + user + '> hat nicht genug Geld dafür, er braucht mindestens **' + need + '€**! LOL.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Check Money
        if (money === '35' && moneytar < 20) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        ;
        if (money === '20' && moneytar < 50) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        ;
        if (money === '5' && moneytar < 100) {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
        }
        // Setup Chances
        const random35 = bot.random(1, 3);
        const random20 = bot.random(1, 5);
        const random05 = bot.random(1, 20);
        let status, amount;
        if (money === '35') {
            if (random35 == 1) {
                status = true;
                amount = bot.random(10, 20);
            }
            else {
                status = false;
                amount = bot.random(10, 20);
            }
        }
        else if (money === '20') {
            if (random20 == 1) {
                status = true;
                amount = bot.random(30, 50);
            }
            else {
                status = false;
                amount = bot.random(30, 50);
            }
        }
        else {
            if (random05 == 1) {
                status = true;
                amount = bot.random(50, 100);
            }
            else {
                status = false;
                amount = bot.random(50, 100);
            }
        }
        // Set Punishment
        let punishment;
        if (moneysnd > need * 2)
            punishment = amount * 2;
        else
            punishment = amount;
        // Set Extra Text
        let extra;
        if (amount < 20)
            extra = 'MEH.';
        if (amount >= 20)
            extra = 'NICE.';
        if (amount >= 40)
            extra = 'WONDERFUL.';
        if (amount >= 60)
            extra = 'LOL.';
        if (amount >= 80)
            extra = 'A PRO??!!';
        if (lang === 'de') {
            if (amount < 20)
                extra = 'NAJA.';
            if (amount >= 20)
                extra = 'NICE.';
            if (amount >= 40)
                extra = 'PRIMA.';
            if (amount >= 60)
                extra = 'LOL.';
            if (amount >= 80)
                extra = 'EIN PRO??!!';
        }
        // Create Embeds
        let success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
            .setDescription('» You stole <@' + user.id + '> **$' + amount + '**! ' + extra)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        let failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
            .setDescription('» You wanted to steal <@' + user.id + '> **$' + amount + '**, but the Police caught you! You had to pay **$' + punishment + '**! KEKW.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            success = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
                .setDescription('» Du hast <@' + user.id + '> **' + amount + '€** geklaut! ' + extra)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            failure = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » AUSRAUBEN')
                .setDescription('» Du wolltest <@' + user.id + '> **' + amount + '€** klauen, aber die Polizei hat dich erwischt! Du musstest **' + punishment + '€** Strafgeld bezahlen! KEKW.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Set Money
        if (status == false) {
            // Set Cooldown
            cooldown.set(interaction.user.id, Date.now() + 30000);
            setTimeout(() => cooldown.delete(interaction.user.id), 30000);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : ' + amount + '€ : FAILURE : ' + punishment + '€');
            bot.money.rem(interaction.guild.id, interaction.user.id, punishment);
            return interaction.reply({ embeds: [failure] });
        }
        // Set Cooldown
        cooldown.set(interaction.user.id, Date.now() + 30000);
        setTimeout(() => cooldown.delete(interaction.user.id), 30000);
        // Set Money
        bot.money.rem(interaction.guild.id, user.id, amount);
        bot.money.add(interaction.guild.id, interaction.user.id, amount);
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROB : ' + user.id + ' : ' + amount + '€ : SUCCESS');
        return interaction.reply({ embeds: [success] });
    }
};
//# sourceMappingURL=rob.js.map