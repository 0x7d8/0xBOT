const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transactionview')
        .setDescription('VIEW A TRANSACTION')
        .setDescriptionLocalizations({
            de: 'SCHAU EINE TRANSAKTION AN'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('id')
                .setDescription('THE TRANSACTION ID')
                .setDescriptionLocalizations({
                    de: 'DIE TRANSAKTIONS ID'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const transactionId = interaction.options.getString("id")

        const transaction = await bot.transactions.get(transactionId)

        // Check if Transaction exists
        if (transaction === 'N-FOUND') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This Transaction doesnt exist!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Diese Transaktion existiert nicht!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONVIEW : NOTEXIST : ' + transactionId)
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Fetch User Infos
        let sender, reciever
        if (isNaN(transaction.sender.id.slice(-1))) {
            const senderInfo = await bot.userdb.get(transaction.sender.id)
            sender = senderInfo.username + '#' + senderInfo.usertag
        } else {
            sender = transaction.sender.id
        }; if (!isNaN(transaction.reciever.id.slice(-1))) {
            const recieverInfo = await bot.userdb.get(transaction.reciever.id)
            reciever = recieverInfo.username + '#' + recieverInfo.usertag
        } else {
            reciever = transaction.reciever.id
        }
        
        // Create Embeds
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » TRANSACTION INFOS')
  			.setDescription(`» ID: \`${transactionId}\`
                <t:${transaction.timestamp}>

                » ${sender}
                **${transaction.sender.type === 'positive' ? '+' : '-'}$${transaction.sender.amount}**

                » ${reciever}
                **${transaction.reciever.type === 'positive' ? '+' : '-'}$${transaction.reciever.amount}**
            `)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS INFOS')
  			.setDescription(`» ID: \`${transactionId}\`
                <t:${transaction.timestamp}>

                » ${sender}
                **${transaction.sender.type === 'positive' ? '+' : '-'}${transaction.sender.amount}€**

                » ${reciever}
                **${transaction.reciever.type === 'positive' ? '+' : '-'}${transaction.reciever.amount}€**
            `)
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TRANSACTIONVIEW : ' + transactionId)
        return interaction.reply({ embeds: [message] })
    },
};