const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('CLEAR MESSAGES')
        .setDescriptionLocalizations({
            de: 'ENTFERNE NACHRICHTEN'
        })
    	.setDMPermission(false)
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT OF MESSAGES')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL AN NACHRICHTEN'
                })
                .setRequired(true))
    	.addUserOption(option =>
            option.setName('target')
                .setNameLocalizations({
                    de: 'ziel'
                })
                .setDescription('THE TARGET')
                .setDescriptionLocalizations({
                    de: 'DAS ZIEL'
                })
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const amount = interaction.options.getInteger("amount")
        const target = interaction.options.getUser("target")
        const channel = interaction.channel
        const messages = channel.messages.fetch()

        // Check if Message Amount is Negative
        if (amount < 1) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du musst mindestens **1** Nachricht löschen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : NEGATIVEAMOUNT : ' + amount)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Delete Messages and Send Message
        if (target != null) {
            const targetmessages = (await messages).filter((m) => m.author.id === target.id)
            await channel.bulkdelete(targetmessages, true)
            const message = new EmbedBuilder()
                .setTitle('» NACHRICHTEN LÖSCHEN')
                .setDescription('» Du hast **' + amount + '** Nachrichten von <@' + target + '> gelöscht!')
                .setFooter({ text: '» ' + version });
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : ' + target + ' : ' + amount)
            return interaction.reply({ embeds: [message.toJSON()] })
        } else {
            channel.bulkdelete(amount, true)
            const message = new EmbedBuilder()
                .setTitle('» NACHRICHTEN LÖSCHEN')
                .setDescription('» Du hast **' + amount + '** Nachrichten gelöscht!')
                .setFooter({ text: '» ' + version });
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : ' + amount)
            return interaction.reply({ embeds: [message.toJSON()] })
        }
    },
};