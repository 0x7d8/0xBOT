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
        .setName('action')
        .setDMPermission(false)
        .setDescription('EXECUTE ACTIONS ON USERS')
        .setDescriptionLocalizations({
        de: 'FÜHRE AKTIONEN AN NUTZERN AUS'
    })
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE PERSON')
        .setDescriptionLocalizations({
        de: 'DIE PERSON'
    })
        .setRequired(true))
        .addStringOption((option) => option.setName('action')
        .setNameLocalizations({
        de: 'aktion'
    })
        .setDescription('THE ACTION')
        .setDescriptionLocalizations({
        de: 'DIE AKTION'
    })
        .setRequired(true)
        .addChoices({ name: '👊 SCHLAGEN', value: 'box' }, { name: '💀 TÖTEN', value: 'kill' }, { name: '👀 ANSTARREN', value: 'stare' }, { name: '🧐 TWERKEN', value: 'twerk' }, { name: '🏁 FANGEN', value: 'catch' }, { name: '😠 RUFEN', value: 'call' })),
    async execute(interaction, client, lang, vote) {
        const user = interaction.options.getUser("user");
        const event = bot.getOption(interaction, 'action');
        if (interaction.user.id === user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant execute Actions on yourself?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine Aktionen auf dir selbst ausführen?')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ACTION : ' + user.id + ' : ' + event.toUpperCase() + ' : SAMEPERSON');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ACTION : ' + user.id + ' : ' + event.toUpperCase());
        if (event === 'box') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> boxed <@" + user.id + ">! AHH.")
                .setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** hat <@" + user.id + "> Geschlagen! AUA.")
                    .setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
        ;
        if (event === 'kill') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> killed <@" + user.id + ">! MH.")
                .setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** hat <@" + user.id + "> Getötet! MH.")
                    .setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
        ;
        if (event === 'stare') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> stares at <@" + user.id + ">! MENACINGLY.")
                .setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** starrt <@" + user.id + "> an! STILL.")
                    .setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
        ;
        if (event === 'twerk') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> twerks over <@" + user.id + ">! EWW!")
                .setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** twerkt über <@" + user.id + ">! EKLIG!")
                    .setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
        ;
        if (event === 'catch') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> catches <@" + user.id + ">! WHY?")
                .setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** fängt <@" + user.id + ">! WIESO?")
                    .setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
        ;
        if (event === 'call') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BURST:1024393250611671170> » ACTION!')
                .setDescription("» <@" + interaction.user.id + "> calls <@" + user.id + ">! ARE YOU THERE?")
                .setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BURST:1024393250611671170> » ACTION!')
                    .setDescription("» **<@" + interaction.user.id + ">** ruft <@" + user.id + "> an! BIST DU DRAN?")
                    .setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            return interaction.reply({ embeds: [message] });
        }
    }
};
//# sourceMappingURL=action.js.map