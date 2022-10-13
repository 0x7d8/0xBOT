const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js')
const { version } = require('../../config.json');

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
        // Set Variables
        const user = interaction.options.getUser('user')
        let userobj; if (user === null) { userobj = interaction.user } else { userobj = user }
        
        // Set User ID
        const counts = []
        if (user == null) {
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-C', 'msg'))
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-A', 'msg'))
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + counts[0])
        } else {
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-C', 'msg'))
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-A', 'msg'))
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + user.id + ' : ' + counts[0])
        }

        // Calculate Level
        const cachelevel = Math.round(((counts[0]/2)/500/5) * 100) / 100
        const arraylevel = cachelevel.toString().split('.')

        // Generate Language Text
        let totalxp = 'TOTAL XP'
        if (lang === 'de') { totalxp = 'ALLE XP' }

        // Generate Rank Image
        const rankCard = new canvas.Rank()
            .setAvatar(userobj.displayAvatarURL({
                format: 'png'
            }))
            .setCurrentXP(parseInt(arraylevel[1])*10)
            .setRequiredXP(1000)
            .setProgressBar('#90CDF4', 'COLOR')
            .setUsername(userobj.username)
            .setDiscriminator(userobj.discriminator)
            .setOverlay('#00000000')
            .setBackground('COLOR', '#00000000')
            .setProgressBarTrack('#413E4D')
            .setLevel(parseInt(arraylevel[0]), 'LEVEL ', true)
            .setRank(parseInt(counts[0]/5), totalxp, true)
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
        	message = new EmbedBuilder()
            	.setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
                .setImage('attachment://rank.png')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
                    .setImage('attachment://rank.png')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
                .setImage('attachment://rank.png')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
                    .setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
  				    .setImage('attachment://rank.png')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message], files: [attachment] })
    },
};