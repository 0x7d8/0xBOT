const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

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
        .setName('leveltop')
    	.setDMPermission(false)
        .setDescription('SEE THE TOP LEVELS')
        .setDescriptionLocalizations({
            de: 'SEHE DIE TOP LEVEL'
        }),
    async execute(interaction, client, lang, vote) {
        // Defer Reply
        await interaction.deferReply()

        // Get Top Money
        let embedDesc = ''; let count = 0
        const rawvalues = await db.query(`select * from stats where name like $1 and type = 'msg' order by value desc;`, ['%' + interaction.guild.id + '-C'])
        for (const element of rawvalues.rows) {
            count++
            let formattedcount = count

            const cache = element.name.split('-')
            const level = (Math.round(((element.value/2)/500/5) * 1000) / 1000).toString().split('.')

            if (count < 10) { formattedcount = '0' + count }
            const userinfo = await bot.userdb.get(cache[1])
            if (userinfo === 'N-FETCHABLE') {
                if (cache[1] !== interaction.user.id) {
                    embedDesc = embedDesc + `\`${formattedcount}.\` » <@${cache[1]}> (**LVL ${level[0]}**)\n`
                } else {
                    embedDesc = embedDesc + `**\`${formattedcount}.\`** » <@${cache[1]}> (**LVL ${level[0]}**)\n`
                }
            }
        }; if (embedDesc === '') { embedDesc = 'Nothing to Display.'; if (lang === 'de') { embedDesc = 'Nichts zum Anzeigen.' } }
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:GLOBE:1024403680503529583> » TOP LEVELS')
  			.setDescription(embedDesc)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:GLOBE:1024403680503529583> » TOP LEVEL')
  			    .setDescription(embedDesc)
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVELTOP');
        return interaction.editReply({ embeds: [message] }).catch((e) => {})
    }
}