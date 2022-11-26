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
        .setName('transactionsearch')
        .setDescription('SEARCH A TRANSACTION')
        .setDescriptionLocalizations({
            de: 'SUCHE EINE TRANSAKTION'
        })
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('sender')
                .setDescription('THE SENDER')
                .setDescriptionLocalizations({
                    de: 'DER SENDER'
                })
                .setRequired(false))
        .addUserOption(option =>
            option.setName('reciever')
                .setNameLocalizations({
                    de: 'empfänger'
                })
                .setDescription('THE RECIEVER')
                .setDescriptionLocalizations({
                    de: 'DER EMPFÄNGER'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const sender = interaction.options.getUser("sender")
        const reciever = interaction.options.getUser("reciever")

        // Get Results
        let embedDesc = ''; let rawvalues
        if (sender !== null && reciever !== null) {
            rawvalues = await db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc limit 20;`, [
                sender.id,
                reciever.id
            ])
        } else if (sender !== null && reciever === null) {
            rawvalues = await db.query(`select * from usertransactions where senderid = $1 order by timestamp desc limit 20;`, [
                sender.id
            ])
        } else if (sender === null && reciever !== null) {
            rawvalues = await db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc limit 20;`, [
                reciever.id
            ])
        } else {
            rawvalues = await db.query(`select * from usertransactions order by timestamp desc limit 20;`)
        }

        for (const element of rawvalues.rows) {
            if (lang === 'de') {
                embedDesc = embedDesc + `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **${element.senderamount}€** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`
            } else {
                embedDesc = embedDesc + `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **$${element.senderamount}** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`
            }
        }; if (embedDesc === '') { embedDesc = 'Nothing Found.'; if (lang === 'de') { embedDesc = 'Nichts Gefunden.' } }
        
        // Create Embeds
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » TRANSACTION SEARCH')
  			.setDescription(embedDesc)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS SUCHE')
  			    .setDescription(embedDesc)
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONSEARCH : ' + (sender === null ? 'EMPTY' : sender.id) + ' : ' + (reciever === null ? 'EMPTY' : reciever.id))
        return interaction.reply({ embeds: [message] })
    }
}