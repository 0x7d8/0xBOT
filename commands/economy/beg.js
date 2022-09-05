const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version, token } = require('../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('BEG FOR MONEY')
        .setDescriptionLocalizations({
            de: 'BETTEL FÜR GELD'
        })
    	.setDMPermission(false)
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT OF MONEY')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL AN GELD'
                })
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const amount = interaction.options.getInteger("amount")

        // Check if Balance is Minus
        if (amount < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst nicht nach negativem Geld fragen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] BEG : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check for Max Amount
        if (amount > 5000) {
            // Create Embed
            const err = new EmbedBuilder()
                .setTitle('» BETTELN')
                  .setDescription('» Du kannst nicht soviel erbetteln! **5000€** ist das Maximum.')
                .setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] BEG : TOOMUCHMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Get Username
        let userinfo
        userinfo = await client.users.fetch(interaction.user.id);

        // Create Button
        const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GEBE ' + userinfo.username.toUpperCase() + ' ' + amount + '€')
                    .setCustomId('BEG-' + interaction.user.id + '-' + amount)
					.setStyle(ButtonStyle.Primary),
			);
        
        // Create Embeds
      	const message = new EmbedBuilder()
            .setTitle('» BETTELN')
  			.setDescription('» <@' + interaction.user.id + '> braucht Geld!')
        	.setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] BEG : ' + amount + '€')
        return interaction.reply({ embeds: [message.toJSON()], components: [button] })
    },
};