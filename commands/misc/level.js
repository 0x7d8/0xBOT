const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { AttachmentBuilder } = require('discord.js')
const canvas = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
    	.setDMPermission(false)
        .setDescription('VIEW THE LEVELS')
        .setDescriptionLocalizations({
            de: 'SEHE DIE LEVEL'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Check if Levels are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'levels')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The Level System is disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Das Level System ist auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const user = interaction.options.getUser('user')
        let userobj; if (user === null) { userobj = interaction.user } else { userobj = user }

        // Defer Reply
        await interaction.deferReply()
        
        // Set User ID
        const counts = []
        if (user === null) {
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-C', 'msg'))
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-A', 'msg'))
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + counts[0])
        } else {
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-C', 'msg'))
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-A', 'msg'))
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + user.id + ' : ' + counts[0])
        }

        // Calculate Level
        const cachelevel = Math.round(((counts[0]/2)/250/3/2) * 1000) / 1000
        const arraylevel = cachelevel.toString().split('.')

        // Generate Language Text
        let totalxp = 'TOTAL XP'
        if (lang === 'de') totalxp = 'ALLE XP'

        // Generate Rank Image
        const rankCard = new canvas.Rank()
            .setAvatar(userobj.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(parseInt(Math.round(counts[0]/3/2).toString().slice(-3)))
            .setRequiredXP(500)
            .setProgressBar('#90CDF4', 'COLOR')
            .setUsername(userobj.username)
            .setDiscriminator(userobj.discriminator)
            .setOverlay('#00000000')
            .setBackground('COLOR', '#00000000')
            .setProgressBarTrack('#413E4D')
            .setLevel(parseInt(arraylevel[0]), 'LEVEL ', true)
            .setRank(Math.round(counts[0]/3/2), totalxp, true)
        let attachment
        const buildCard = async() => {
            await rankCard.build()
                .then(data => {
                    attachment = new AttachmentBuilder(data, { name: 'rank.png', description: 'Rank Card Image' })
                }); return
        }; await buildCard()
        
        // Create Embed
        let message
        if (user === null) {
        	message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
                .setImage('attachment://rank.png')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
                    .setImage('attachment://rank.png')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
                .setImage('attachment://rank.png')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
  				    .setImage('attachment://rank.png')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        }

        // Send Message
        return interaction.editReply({ embeds: [message], files: [attachment] })
    }
}