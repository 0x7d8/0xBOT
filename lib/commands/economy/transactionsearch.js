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
var transactionsearch_exports = {};
__export(transactionsearch_exports, {
  default: () => transactionsearch_default
});
module.exports = __toCommonJS(transactionsearch_exports);
var import_discord = require("discord.js");
var transactionsearch_default = {
  data: new import_discord.SlashCommandBuilder().setName("transactionsearch").setDescription("SEARCH A TRANSACTION").setDescriptionLocalizations({
    de: "SUCHE EINE TRANSAKTION"
  }).setDMPermission(false).addUserOption((option) => option.setName("sender").setDescription("THE SENDER").setDescriptionLocalizations({
    de: "DER SENDER"
  }).setRequired(false)).addUserOption((option) => option.setName("reciever").setNameLocalizations({
    de: "empf\xE4nger"
  }).setDescription("THE RECIEVER").setDescriptionLocalizations({
    de: "DER EMPF\xC4NGER"
  }).setRequired(false)),
  async execute(ctx) {
    const sender = ctx.interaction.options.getUser("sender");
    const reciever = ctx.interaction.options.getUser("reciever");
    let embedDesc = "";
    let rawvalues;
    if (sender && reciever) {
      rawvalues = await ctx.db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc limit 20;`, [
        sender.id,
        reciever.id
      ]);
    } else if (sender && !reciever) {
      rawvalues = await ctx.db.query(`select * from usertransactions where senderid = $1 order by timestamp desc limit 20;`, [
        sender.id
      ]);
    } else if (!sender && reciever) {
      rawvalues = await ctx.db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc limit 20;`, [
        reciever.id
      ]);
    } else {
      rawvalues = await ctx.db.query(`select * from usertransactions order by timestamp desc limit 20;`);
    }
    for (const element of rawvalues.rows) {
      if (ctx.metadata.language === "de")
        embedDesc += `\xBB ${/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid} | **${element.senderamount}\u20AC** -> ${/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid}
ID: \`${element.id}\`
`;
      else
        embedDesc += `\xBB ${/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid} | **$${element.senderamount}** -> ${/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid}
ID: \`${element.id}\`
`;
    }
    ;
    if (embedDesc === "") {
      embedDesc = "Nothing Found.";
      if (ctx.metadata.language === "de") {
        embedDesc = "Nichts Gefunden.";
      }
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB TRANSACTION SEARCH").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB TRANSAKTIONS SUCHE").setDescription(embedDesc).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[CMD] TRANSACTIONSEARCH : ${sender ? "EMPTY" : sender.id} : ${reciever ? "EMPTY" : reciever.id}`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=transactionsearch.js.map
