var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var daily_exports = {};
__export(daily_exports, {
  default: () => daily_default
});
module.exports = __toCommonJS(daily_exports);
var import_discord = require("discord.js");
var daily_default = {
  data: new import_discord.SlashCommandBuilder().setName("daily").setDMPermission(false).setDescription("GET YOUR DAILY BONUS").setDescriptionLocalizations({
    de: "HOLE DEINEN T\xC4GLICHEN BONUS"
  }),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "daily")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription("\xBB The **`/daily`** Command is disabled on this Server!").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription("\xBB Der **`/daily`** Befehl ist auf diesem Server deaktiviert!").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] DAILY : DISABLED`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, "daily")).onCooldown) {
      const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, "daily")).remaining;
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You still have a Cooldown of **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast leider noch einen Cooldown von **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] DAILY : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    } else {
      const result = ctx.bot.random(750, 1500);
      let extra;
      if (result < 800)
        extra = "MEH.";
      if (result >= 800)
        extra = "NICE.";
      if (result >= 1e3)
        extra = "GREAT.";
      if (result >= 1200)
        extra = "WONDERFUL!";
      if (result >= 1400)
        extra = "WOW!";
      if (ctx.metadata.language === "de") {
        if (result < 800)
          extra = "MEH.";
        if (result >= 800)
          extra = "NICE.";
        if (result >= 1e3)
          extra = "PRIMA.";
        if (result >= 1200)
          extra = "TOLL!";
        if (result >= 1400)
          extra = "WOW!";
      }
      const transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: "DAILY",
          amount: result,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id,
          amount: result,
          type: "positive"
        }
      });
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:HAMMER:1024388163747184662> \xBB DAILY").setDescription(`
					\xBB You get **$${result}** from me Today! ${extra}

					ID: ${transaction.id}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:HAMMER:1024388163747184662> \xBB DAILY").setDescription(`
						\xBB Du kriegst heute **${result}\u20AC** von mir! ${extra}

						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, result);
      ctx.log(false, `[CMD] DAILY : ${result}\u20AC`);
      ctx.bot.cooldown.set(ctx.interaction.user.id, "daily", 24 * 60 * 60 * 1e3);
      return ctx.interaction.reply({ embeds: [message] });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=daily.js.map
