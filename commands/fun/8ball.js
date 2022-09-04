const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('ASK A MAGIC BALL')
        .setDescriptionLocalizations({
            de: 'FRAGE EINEN MAGISCHEN BALL'
        })
    	.setDMPermission(false)
    	.addStringOption(option =>
            option.setName('question')
                .setNameLocalizations({
                    de: 'frage'
                })
                .setDescription('THE QUESTION')
                .setDescriptionLocalizations({
                    de: 'DIE FRAGE'
                })
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const frage = interaction.options.getString("question")
        const random = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

        // Translate to Word
        let result
        if (random == '1') { result = 'Sicherlich.' } 
        if (random == '2') { result = 'Es ist Garantiert!' } 
        if (random == '3') { result = 'Ohne Frage!' } 
        if (random == '4') { result = 'Definitiv ja!' }
        if (random == '5') { result = 'Da kannst du drauf wetten!' }
        if (random == '6') { result = 'Wie ich das sehe, ja!' }
        if (random == '7') { result = 'Höchstwahrscheinlich.' }
        if (random == '8') { result = 'Sieht gut aus!' }
        if (random == '9') { result = 'Ja!' }
        if (random == '10') { result = 'Sieht ganz so aus.' }
        if (random == '11') { result = 'Ich bin mir nicht sicher, frag nochmal.' }
        if (random == '12') { result = 'Frag mich später nochmal.' }
        if (random == '13') { result = 'Das würde ich jetzt lieber nicht beantworten.' }
        if (random == '14') { result = 'Kann ich dir garnicht sagen.' }
        if (random == '15') { result = 'Konzentrier dich und frag nochmal!' }
        if (random == '16') { result = 'Ich würde nicht darauf zählen!' } 
        if (random == '17') { result = 'Computer sagt nein.' }
        if (random == '18') { result = 'Nach reichlicher Überlegung würde ich nein sagen.' }
        if (random == '19') { result = 'Ich glaube nicht!' }
        if (random == '20') { result = 'Ich bezweifle es.' }
        
		// Add ? if there is none
        let formatted
        if (frage.slice(-1) == '?') {
            formatted = frage
        } else {
            formatted = frage + '?'
        }
        
        // Create Embeds
        const message = new EmbedBuilder()
        	.setTitle('» MAGISCHER BALL')
  			.setDescription('» "' + formatted + '" -> ' + result)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] 8BALL : ' + formatted.toUpperCase() + ' : ' + result.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};