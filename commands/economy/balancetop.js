const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('@discordjs/builders')

// Connect to Database
const config = require('../../config.json')
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    port: 5432
})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balancetop')
    	.setDMPermission(false)
        .setDescription('SEE THE TOP BALANCE')
        .setDescriptionLocalizations({
            de: 'SEHE DEN KONTOSTAND'
        })
        .addStringOption(option =>
            option.setName('list')
                .setNameLocalizations({
                    de: 'liste'
                })
                .setDescription('THE LIST')
                .setDescriptionLocalizations({
                    de: 'DIE LISTE'
                })
                .setRequired(true)
                .addChoices(
                    // Setup Choices
            		{ name: '🌍 GLOBAL', value: 'global' },
                    //{ name: '🏘️ LOKAL', value: 'local' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const listtype = interaction.options.getString("list")

        // Defer Reply
        await interaction.deferReply()

        // Get Top Money
        let embedDesc = ''; let count = 0
        if (listtype === 'global') {
            const rawvalues = await db.query(`select * from usermoney order by money DESC`)
            for (const element of rawvalues.rows) {
                if (count >= 10) break

                let skip = false
                const userinfo = await client.users.fetch(element.userid).catch((e) => skip = true)
                if (!skip) {
                    count++
                    let formattedcount = count
                    if (count < 10) { formattedcount = '0' + count }
                    embedDesc = embedDesc + `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.discriminator} (**${element.money}€**)\n`
                }
            }
        } else {
            const rawvalues = await db.query(`select * from usermoney order by money DESC`)
            for (const element of rawvalues.rows) {
                if (count >= 10) break

                let skip = false
                const userinfo = await interaction.guild.members.get(element.userid).catch((e) => skip = true)
                if (!skip) {
                    count++
                    let formattedcount = count
                    if (count < 10) { formattedcount = '0' + count }
                    embedDesc = embedDesc + `\`${formattedcount}.\` » ${userinfo.user.username}#${userinfo.user.discriminator} (**${element.money}€**)\n`
                }
            }
        }
        
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES')
  			.setDescription(embedDesc)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder()
        	    .setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE')
  			    .setDescription(embedDesc)
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOP : ' + listtype.toString().toUpperCase());
        return interaction.editReply({ embeds: [message] }).catch((e) => {})
    },
};