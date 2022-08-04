const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('BANNE USER')
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(true))
    	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        const guild = interaction.guild.id
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if User is Banning himself
        if (interaction.user.id == user) {
            // Create Embed
            var err = new EmbedBuilder()
                .setTitle('» FEHLER')
                .setDescription('» Du kannst dich nicht selber Bannen?!')
                .setFooter({ text: '» ' + version });
                    
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BAN : SAMEPERSON : ' + user)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Embed
      	const message = new EmbedBuilder()
            .setTitle('» BAN')
  			.setDescription('» Du hast <@' + user + '> den Bannhammer gezeigt!')
        	.setFooter({ text: '» ' + version });
        
        // Ban User
        guild.members.ban(user);

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] BAN : ' + user)
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};