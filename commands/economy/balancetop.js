const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

// Connect to Database
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
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
                    { name: '🏘️ SERVER', value: 'server' },
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
                const userinfo = await bot.userdb.get(element.userid)
                if (!skip) {
                    count++
                    let formattedcount = count
                    if (count < 10) { formattedcount = '0' + count }
                    if (element.userid !== interaction.user.id) {
                        embedDesc = embedDesc + `\`${formattedcount}.\` » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
                    } else {
                        embedDesc = embedDesc + `**\`${formattedcount}.\`** » ${userinfo.username}#${userinfo.usertag} (**${element.money}€**)\n`
                    }
                }
            }
        } else {
            const rawvalues = await db.query(`select * from usermoney where $1 = any(guilds) order by money DESC limit 10`, [interaction.guild.id])
            for (const element of rawvalues.rows) {
                count++
                let formattedcount = count
                if (count < 10) { formattedcount = '0' + count }
                if (element.userid !== interaction.user.id) {
                    embedDesc = embedDesc + `\`${formattedcount}.\` » <@${element.userid}> (**${element.money}€**)\n`
                } else {
                    embedDesc = embedDesc + `**\`${formattedcount}.\`** » <@${element.userid}> (**${element.money}€**)\n`
                }
            }
        }; if (embedDesc === '') { embedDesc = 'Nothing to Display.'; if (lang === 'de') { embedDesc = 'Nichts zum Anzeigen.' } }
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:WALLET:1024387370793050273> » TOP BALANCES [' + listtype.toUpperCase() + ']')
  			.setDescription(embedDesc)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:WALLET:1024387370793050273> » TOP KONTOSTÄNDE [' + listtype.toUpperCase() + ']')
  			    .setDescription(embedDesc)
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCETOP : ' + listtype.toString().toUpperCase());
        return interaction.editReply({ embeds: [message] }).catch((e) => {})
    },
};