var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transactionview_exports = {};
__export(transactionview_exports, {
  default: () => transactionview_default
});
module.exports = __toCommonJS(transactionview_exports);
var import_discord = require("discord.js");
var transactionview_default = {
  data: new import_discord.SlashCommandBuilder().setName("transactionview").setDescription("VIEW A TRANSACTION").setDescriptionLocalizations({
    de: "SCHAU EINE TRANSAKTION AN"
  }).setDMPermission(false).addStringOption((option) => option.setName("id").setDescription("THE TRANSACTION ID").setDescriptionLocalizations({
    de: "DIE TRANSAKTIONS ID"
  }).setRequired(true)),
  async execute(ctx) {
    const transactionId = ctx.getOption("id");
    const transaction = await ctx.bot.transactions.get(transactionId);
    if (transaction === "N-FOUND") {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This Transaction doesnt exist!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Transaktion existiert nicht!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] TRANSACTIONVIEW : NOTEXIST : ${transactionId}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let sender, reciever;
    if (isNaN(transaction.sender.id.slice(-1))) {
      const senderInfo = await ctx.bot.userdb.get(transaction.sender.id);
      sender = senderInfo.username + "#" + senderInfo.usertag;
    } else {
      sender = transaction.sender.id;
    }
    ;
    if (!isNaN(transaction.reciever.id.slice(-1))) {
      const recieverInfo = await ctx.bot.userdb.get(transaction.reciever.id);
      reciever = recieverInfo.username + "#" + recieverInfo.usertag;
    } else {
      reciever = transaction.reciever.id;
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB TRANSACTION INFOS").setDescription(`\xBB ID: \`${transactionId}\`
				<t:${transaction.timestamp}>

				\xBB ${sender}
				**${transaction.sender.type === "positive" ? "+" : "-"}$${transaction.sender.amount}**

				\xBB ${reciever}
				**${transaction.reciever.type === "positive" ? "+" : "-"}$${transaction.reciever.amount}**
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB TRANSAKTIONS INFOS").setDescription(`\xBB ID: \`${transactionId}\`
				<t:${transaction.timestamp}>

				\xBB ${sender}
				**${transaction.sender.type === "positive" ? "+" : "-"}${transaction.sender.amount}\u20AC**

				\xBB ${reciever}
				**${transaction.reciever.type === "positive" ? "+" : "-"}${transaction.reciever.amount}\u20AC**
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] TRANSACTIONVIEW : ${transactionId}`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=transactionview.js.map
