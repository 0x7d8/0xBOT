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
var beg_exports = {};
__export(beg_exports, {
  default: () => beg_default
});
module.exports = __toCommonJS(beg_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var beg_default = {
  data: new import_discord2.SlashCommandBuilder().setName("beg").setDescription("BEG FOR MONEY").setDescriptionLocalizations({
    de: "BETTEL F\xDCR GELD"
  }).setDMPermission(false).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT OF MONEY").setDescriptionLocalizations({
    de: "DIE ANZAHL AN GELD"
  }).setRequired(true)).addStringOption((option) => option.setName("reason").setNameLocalizations({
    de: "grund"
  }).setDescription("THE REASON").setDescriptionLocalizations({
    de: "DER GRUND"
  }).setRequired(false)),
  async execute(ctx) {
    const amount = ctx.getOption("amount");
    const reason = ctx.getOption("reason");
    if (amount < 0) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant ask for negative Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst nicht nach negativem Geld fragen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BEG : NEGATIVEMONEY : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (amount > 15e3) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("\xBB BEGGING").setDescription(`\xBB You cant beg that much! **$15000** is the Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("\xBB BETTELN").setDescription(`\xBB Du kannst nicht so viel erbetteln! **15000\u20AC** ist das Maximum.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] BEG : TOOMUCHMONEY : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let reasontype;
    if (!reason)
      reasontype = "NONE";
    else {
      reasontype = "SET";
    }
    let reasonres = reason;
    if (!reason)
      reasonres = "NULL";
    let row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel(`GIVE ${ctx.interaction.user.username.toUpperCase()} $${amount}`).setEmoji("1024382935618572299").setCustomId(`BEG-${ctx.interaction.user.id}-${amount}-${reasontype}-${reasonres.toString()}`).setStyle(import_discord.ButtonStyle.Primary)
    );
    if (ctx.metadata.language === "de") {
      row = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setLabel(`GEBE ${ctx.interaction.user.username.toUpperCase()} ${amount}\u20AC`).setEmoji("1024382935618572299").setCustomId(`BEG-${ctx.interaction.user.id}-${amount}-${reasontype}-${reasonres.toString()}`).setStyle(import_discord.ButtonStyle.Primary)
      );
    }
    let message;
    if (!reason) {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BEGGING").setDescription(`
					\xBB <@${ctx.interaction.user.id}> needs Money!
					Total Earnings: **$0**
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BETTELN").setDescription(`
						\xBB <@${ctx.interaction.user.id}> braucht Geld!
						Insgesamte Einnahmen: **0\u20AC**
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BEGGING").setDescription(`
					\xBB <@${ctx.interaction.user.id}> needs Money!
					Total Earnings: **$0**

					*"${reason}"*
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BETTELN").setDescription(`
						\xBB <@${ctx.interaction.user.id}> braucht Geld!
						Insgesamte Einnahmen: **0\u20AC**

						*"${reason}"*
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.log(false, `[CMD] BEG : ${amount}\u20AC`);
    return ctx.interaction.reply({ embeds: [message], components: [row] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=beg.js.map
