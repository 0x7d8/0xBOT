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
const discord_js_2 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('itemuse')
        .setDescription('USE AN ITEM')
        .setDescriptionLocalizations({
        de: 'NUTZE EINEN GEGENSTAND'
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
        .addStringOption((option) => option.setName('item')
        .setNameLocalizations({
        de: 'gegenstand'
    })
        .setDescription('THE itemid')
        .setDescriptionLocalizations({
        de: 'DER GEGENSTAND'
    })
        .setRequired(true)
        .addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb-bomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb-bomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb-bomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb-bomb' })),
    async execute(interaction, client, lang, vote) {
        const mathjs = await import('mathjs');
        if (!await bot.settings.get(interaction.guild.id, 'items')) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Items are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Items sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEM : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const user = interaction.options.getUser("user");
        const itemstr = bot.getOption(interaction, 'item');
        const cache = itemstr.split('-');
        const [itemid, itemcat] = cache;
        let name;
        if (itemid === 'nbomb')
            name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
        if (itemid === 'mbomb')
            name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
        if (itemid === 'hbomb')
            name = '<:HBOMB:1022102357938536458> HYPER BOMB';
        if (itemid === 'cbomb')
            name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
        if (lang === 'de') {
            if (itemid === 'nbomb')
                name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
            if (itemid === 'mbomb')
                name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
            if (itemid === 'hbomb')
                name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
            if (itemid === 'cbomb')
                name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
        }
        if (user.bot) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant use Items on Bots!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine Gegenstände auf einem Bot nutzen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : BOT : ' + itemid.toUpperCase());
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (await bot.items.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount') < 1) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough of that Item!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast nicht genug von dem Gegenstand!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : NOTENOUGHITEMS : ' + itemid.toUpperCase());
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (interaction.user.id === user.id && itemcat === 'bomb') {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant use Bombs on yourself?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst Bomben nicht auf dir selber nutzen?')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : ' + itemid.toUpperCase());
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (bot.bomb.has('TIMEOUT-' + user.id + '-' + interaction.guild.id)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + user.id + '> is already being bombed!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + user.id + '> wird schon bombadiert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : ' + itemid.toUpperCase());
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const channel = interaction.channel;
        const messages = channel.messages.fetch();
        bot.bomb.set('MESSAGES-' + user.id + '-' + interaction.guild.id, messages);
        bot.bomb.set('TIMEOUT-' + user.id + '-' + interaction.guild.id, true);
        let math;
        if (itemid === 'nbomb')
            math = bot.random(80, 1000) + ' + ' + bot.random(10, 20) + ' - ' + bot.random(150, 200);
        if (itemid === 'mbomb')
            math = bot.random(10, 20) + ' * ' + bot.random(10, 30) + ' - ' + bot.random(60, 100);
        if (itemid === 'hbomb')
            math = bot.random(10, 20) + ' * ' + bot.random(10, 40) + ' * ' + bot.random(60, 100);
        if (itemid === 'cbomb')
            math = bot.random(10, 40) + ' * (' + bot.random(100, 4000) + ' + ' + bot.random(600, 2000) + ')';
        const mathres = await mathjs.evaluate(math);
        let b1 = (mathres - bot.random(10, 50));
        let b2 = (mathres + bot.random(10, 50) + bot.random(10, 50));
        let b3 = (mathres + bot.random(50, 100) + 50);
        let b4 = (mathres - bot.random(100, 150) + bot.random(5, 25));
        const sb = bot.random(1, 4);
        await eval('b' + sb + ' = ' + mathres);
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel(b1.toString())
            .setCustomId('BOMB-' + mathres + '-' + b1 + '-' + sb + '-1-' + itemid + '-' + user.id)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setLabel(b2.toString())
            .setCustomId('BOMB-' + mathres + '-' + b2 + '-' + sb + '-2-' + itemid + '-' + user.id)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setLabel(b3.toString())
            .setCustomId('BOMB-' + mathres + '-' + b3 + '-' + sb + '-3-' + itemid + '-' + user.id)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setLabel(b4.toString())
            .setCustomId('BOMB-' + mathres + '-' + b4 + '-' + sb + '-4-' + itemid + '-' + user.id)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let message;
        if (itemcat === 'bomb') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
                .setDescription('» Oh <@' + user.id + '>, <@' + interaction.user.id + '> used a **' + name + '** on you!\nIf you solve this Math Equation, it wont do anything.\n\n**```' + math + '```**\nThe Bomb explodes <t:' + (Math.floor(+new Date() / 1000) + 10) + ':R>')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
                    .setDescription('» Oh <@' + user.id + '>, <@' + interaction.user.id + '> hat eine **' + name + '** an dir benutzt!\nFalls du dieses Mathe Rätsel löst, passiert nichts.\n\n**```' + math + '```**\nDie Bombe explodiert <t:' + (Math.floor(+new Date() / 1000) + 10) + ':R>')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        bot.items.rem(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 1);
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : ' + itemid.toUpperCase());
        if (itemcat === 'bomb') {
            let msg = await interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true });
            const expiration = async () => {
                if (!bot.bomb.has('TIMEOUT-' + user.id + '-' + interaction.guild.id))
                    return;
                bot.bomb.delete('TIMEOUT-' + user.id + '-' + interaction.guild.id);
                bot.bomb.delete('MESSAGES-' + user.id + '-' + interaction.guild.id);
                {
                    msg.components[0].components[0].data.disabled = true;
                    msg.components[0].components[1].data.disabled = true;
                    msg.components[0].components[2].data.disabled = true;
                    msg.components[0].components[3].data.disabled = true;
                }
                ;
                msg.components[0].components[Number(sb) - 1].data.style = discord_js_1.ButtonStyle.Success;
                if (itemid === 'nbomb') {
                    const member = await interaction.guild.members.fetch(user.id);
                    member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
                }
                ;
                if (itemid === 'mbomb') {
                    const member = await interaction.guild.members.fetch(user.id);
                    member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
                }
                ;
                if (itemid === 'hbomb') {
                    const member = await interaction.guild.members.fetch(user.id);
                    member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
                }
                ;
                if (itemid === 'cbomb') {
                    const filtered = [];
                    let i = 0;
                    {
                        (await messages).filter((m) => {
                            if (m.author.id === user.id && 1 > i) {
                                filtered.push(m);
                                i++;
                            }
                        });
                    }
                    await channel.bulkDelete(filtered, true);
                }
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
                    .setDescription('» <@' + user.id + '> has failed to diffuse the Bomb! OHNO')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
                        .setDescription('» <@' + user.id + '> hat es nicht geschafft, die Bombe zu entschärfen! OH')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMUSE : ' + user.id + ' : EXPIRED');
                interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(() => { });
            };
            setTimeout(() => expiration(), 10000);
        }
    }
};
//# sourceMappingURL=itemuse.js.map