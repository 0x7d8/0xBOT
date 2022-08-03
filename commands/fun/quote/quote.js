const { Client, Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const cooldown = new Collection();
let time = 45000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('ZITIERE ETWAS')
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('zitat')
                .setDescription('DAS ZITAT')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('autor')
                .setDescription('DER AUTOR')
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const zitat = interaction.options.getString("zitat")
        const autor = interaction.options.getUser("autor")
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Cooldown
        if (cooldown.get(interaction.user.id) - Date.now() > 0) {
            // Translate Vars
        	const timeLeft = cooldown.get(interaction.user.id) - Date.now(); 
            const cdown = timeLeft / 1000;
            
            // Create Embed
            var err = new EmbedBuilder()
            	.setTitle('» ZITAT')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
            	.setFooter({ text: '» ' + version});
            
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's');
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check if there is a author specified
        if (autor == null) {
            var amount = await getqut('<@' + interaction.user.id + '>') + 1;
        	var message = new EmbedBuilder()
            	.setTitle('» EIN WEISES ZITAT')
  				.setDescription('» "' + zitat + '" ~<@' + interaction.user.id + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ' + zitat.toUpperCase())
        } else {
            var amount = await getqut('<@' + autor + '>') + 1;
        	var message = new EmbedBuilder()
            	.setTitle('» EIN ZITAT')
  				.setDescription('» "' + zitat + '" ~<@' + autor + '>')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + amount});
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTE : ' + zitat.toUpperCase() + ' : ~' + autor)
            addqut('<@' + autor + '>', 1);
        }
        
        // Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + time);
        setTimeout(() => cooldown.delete(), time)

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};