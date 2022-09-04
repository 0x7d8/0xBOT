const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version, token } = require('../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

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
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE TARGET')
                .setDescriptionLocalizations({
                    de: 'DAS ZIEL'
                })
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const amount = interaction.options.getInteger("amount")
        const target = interaction.options.getUser("user")
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString() + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : NEGATIVEAMOUNT : ' + amount)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Delete Messages and Send Message
        if (target != null) {
            let i = 0;
            const filtered = [];

            (await messages).filter((m) => {
                if(m.author.id === target.id && amount > i) {
                    filtered.push(m)
                    i++
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                // Create Embed
                let message
                if (messages.size == 1) {
                    message = new EmbedBuilder()
                        .setTitle('» NACHRICHTEN LÖSCHEN')
                        .setDescription('» Du hast **' + messages.size + '** Nachricht von <@' + target + '> gelöscht!')
                        .setFooter({ text: '» ' + version });
                } else {
                    message = new EmbedBuilder()
                        .setTitle('» NACHRICHTEN LÖSCHEN')
                        .setDescription('» Du hast **' + messages.size + '** Nachrichten von <@' + target + '> gelöscht!')
                        .setFooter({ text: '» ' + version });
                }

                // Send Message
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString() + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : ' + target + ' : ' + amount)
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                // Create Embed
                let message
                if (messages.size == 1) {
                    message = new EmbedBuilder()
                        .setTitle('» NACHRICHTEN LÖSCHEN')
                        .setDescription('» Du hast **' + messages.size + '** Nachricht gelöscht!')
                        .setFooter({ text: '» ' + version });
                } else {
                    message = new EmbedBuilder()
                        .setTitle('» NACHRICHTEN LÖSCHEN')
                        .setDescription('» Du hast **' + messages.size + '** Nachrichten gelöscht!')
                        .setFooter({ text: '» ' + version });
                }

                // Send Message
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString() + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] CLEAR : ' + amount)
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            })
        }
    },
};