const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('FRAGE EINEN BALL')
    	.setDMPermission(false)
    	.addStringOption(option =>
            option.setName('frage')
                .setDescription('DIE FRAGE')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const frage = interaction.options.getString("frage")
        const random = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        
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
        
        // Translate to Word
        if (random == '1') { var result = 'Sicherlich.' } 
        if (random == '2') { var result = 'Es ist Garantiert!' } 
        if (random == '3') { var result = 'Ohne Frage!' } 
        if (random == '4') { var result = 'Definitiv ja!' }
        if (random == '5') { var result = 'Da kannst du drauf wetten!' }
        if (random == '6') { var result = 'Wie ich das sehe, ja!' }
        if (random == '7') { var result = 'Höchstwahrscheinlich.' }
        if (random == '8') { var result = 'Sieht gut aus!' }
        if (random == '9') { var result = 'Ja!' }
        if (random == '10') { var result = 'Sieht ganz so aus.' }
        if (random == '11') { var result = 'Ich bin mir nicht sicher, frag nochmal.' }
        if (random == '12') { var result = 'Frag mich später nochmal.' }
        if (random == '13') { var result = 'Das würde ich jetzt lieber nicht beantworten.' }
        if (random == '14') { var result = 'Kann ich dir garnicht sagen.' }
        if (random == '15') { var result = 'Konzentrier dich und frag nochmal!' }
        if (random == '16') { var result = 'Ich würde nicht darauf zählen!' } 
        if (random == '17') { var result = 'Computer sagt nein.' }
        if (random == '18') { var result = 'Nach reichlicher Überlegung würde ich nein sagen.' }
        if (random == '19') { var result = 'Ich glaube nicht!' }
        if (random == '20') { var result = 'Ich bezweifle es.' }
        
		// Add ? if there is none
        if (frage.slice(-1) == '?') {
            var formatted = frage
        } else {
            var formatted = frage + '?'
        }
        
        // Create Embeds
        const message = new EmbedBuilder()
        	.setTitle('» MAGISCHER BALL')
  			.setDescription('» "' + formatted + '" - ' + result)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] 8BALL : ' + formatted.toUpperCase() + ' : ' + result.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};