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
var pay_exports = {};
__export(pay_exports, {
  default: () => pay_default
});
module.exports = __toCommonJS(pay_exports);
var import_discord = require("discord.js");
var pay_default = {
  data: new import_discord.SlashCommandBuilder().setName("pay").setDescription("GIVE SOMEONE MONEY").setDescriptionLocalizations({
    de: "GEBE JEMANDEN GELD"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(true)).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "amount"
  }).setDescription("THE AMOUNT OF MONEY").setDescriptionLocalizations({
    de: "DIE amount VON GELD"
  }).setRequired(true)),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    const amount = ctx.getOption("amount");
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    if (amount < 0) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant send negative Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst kein negatives Geld senden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PAY : NEGATIVEMONEY : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (user.bot) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant give a Bot Money!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst einem Bot kein Geld geben!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PAY : ${user.id} : BOT : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.user.id === user.id) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant pay yourself Money?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst dir selber kein Geld \xFCberweisen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}\u20AC : SAMEPERSON`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (balance < amount) {
      const missing = amount - balance;
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] PAY : ${user.id} : NOTENOUGHMONEY : ${amount}\u20AC`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const transaction = await ctx.bot.transactions.log({
      success: true,
      sender: {
        id: ctx.interaction.user.id,
        amount,
        type: "negative"
      },
      reciever: {
        id: user.id,
        amount,
        type: "positive"
      }
    });
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB GIVE MONEY").setDescription(`
				\xBB You gave <@${user.id}> **$${amount}**!

				ID: ${transaction.id}
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB GELD GEBEN").setDescription(`
					\xBB Du hast <@${user.id}> **${amount}\u20AC** gegeben!

					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
    ctx.bot.money.add(ctx.interaction.guild.id, user.id, amount);
    ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}\u20AC`);
    return ctx.interaction.reply({ embeds: [message] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=pay.js.map
