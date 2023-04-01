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
var beg_default = {
  data: {
    name: "beg"
  },
  async execute(ctx, reciever, amount, reasontype, reason) {
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    const args = ctx.interaction.message.embeds[0].description.split("**");
    const total = Number(args[1].match(/\d+/g)) + amount;
    if (balance < amount) {
      const missing = amount - balance;
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.user.id == reciever) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant give yourself Money?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst dir selber kein Geld geben?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}\u20AC : SAMEPERSON`);
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
        id: reciever,
        amount,
        type: "positive"
      }
    });
    ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
    ctx.bot.money.add(ctx.interaction.guild.id, reciever, amount);
    let message;
    if (reasontype !== "SET") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BEGGING").setDescription(`
					\xBB <@${reciever}> needs Money!
					Total Earnings: **$${total}**
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BETTELN").setDescription(`
						\xBB <@${reciever}> braucht Geld!
						Insgesamte Einnahmen: **${total}\u20AC**
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BEGGING").setDescription(`
					\xBB <@${reciever}> needs Money!
					Total Earnings: **$${total}**

					*"${reason}"*
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BETTELN").setDescription(`
						\xBB <@${reciever}> braucht Geld!
						Insgesamte Einnahmen: **${total}\u20AC**

						*"${reason}"*
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ;
    let rmessage = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BEGGING").setDescription(`
				\xBB <@${ctx.interaction.user.id}> gave <@${reciever}> **$${amount}**!
				
				ID: ${transaction.id}
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      rmessage = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:DONATE:1024397357988720711> \xBB BETTELN").setDescription(`
					\xBB <@${ctx.interaction.user.id}> hat <@${reciever}> **${amount}\u20AC** gegeben!
					
					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[BTN] BEG : ${reciever} : ${amount}\u20AC`);
    await ctx.interaction.reply({ embeds: [rmessage] });
    return ctx.interaction.message.edit({ embeds: [message] }).catch(() => {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=beg.js.map
