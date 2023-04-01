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
var work_exports = {};
__export(work_exports, {
  default: () => work_default
});
module.exports = __toCommonJS(work_exports);
var import_discord = require("discord.js");
var work_default = {
  data: new import_discord.SlashCommandBuilder().setName("work").setDMPermission(false).setDescription("WORK FOR MONEY").setDescriptionLocalizations({
    de: "ARBEITE F\xDCR GELD"
  }),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "work")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The **\`/work\`** Command is disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Der **\`/work\`** Befehl ist auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] WORK : DISABLED`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const random = ctx.bot.random(1, 4);
    if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, "work")).onCooldown) {
      const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, "work")).remaining;
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You still have a Cooldown of **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast leider noch einen Cooldown von **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] WORK : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    } else {
      let job, result;
      if (random === 1)
        job = "PROGRAMMER";
      result = ctx.bot.random(75, 200);
      if (random === 2)
        job = "CLEANER";
      result = ctx.bot.random(50, 100);
      if (random === 3)
        job = "MCDONALDS WORKER";
      result = ctx.bot.random(30, 120);
      if (random === 4)
        job = "PAINTER";
      result = ctx.bot.random(200, 500);
      if (ctx.metadata.language === "de") {
        if (random === 1)
          job = "PROGRAMMIERER";
        if (random === 2)
          job = "HAUSMEISTER";
        if (random === 3)
          job = "MCDONALDS KASSIERER";
        if (random === 4)
          job = "K\xDCNSTLER";
      }
      let carboost = false;
      let carboostam;
      const car = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "value");
      if (car !== 0) {
        carboost = true;
        carboostam = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "amount");
      }
      let extra;
      if (!carboost) {
        if (result < 40)
          extra = "MEH.";
        if (result >= 40)
          extra = "NICE.";
        if (result >= 60)
          extra = "GREAT.";
        if (result >= 80)
          extra = "WONDERFUL!";
        if (result >= 100)
          extra = "WOW!";
        if (ctx.metadata.language === "de") {
          if (result < 40)
            extra = "MEH.";
          if (result >= 40)
            extra = "NICE.";
          if (result >= 60)
            extra = "PRIMA.";
          if (result >= 80)
            extra = "TOLL!";
          if (result >= 100)
            extra = "WOW!";
        }
      } else {
        if (result < 40)
          extra = "MEH.\n**+" + carboostam + "%** thanks to your Car!";
        if (result >= 40)
          extra = "NICE.\n**+" + carboostam + "%** thanks to your Car!";
        if (result >= 60)
          extra = "GREAT.\n**+" + carboostam + "%** thanks to your Car!";
        if (result >= 80)
          extra = "WONDERFUL!\n**+" + carboostam + "%** thanks to your Car!";
        if (result >= 100)
          extra = "WOW!\n**+" + carboostam + "%** thanks to your Car!";
        if (ctx.metadata.language === "de") {
          if (result < 40)
            extra = "MEH.\n**+" + carboostam + "%** wegen deinem Auto!";
          if (result >= 40)
            extra = "NICE.\n**+" + carboostam + "%** wegen deinem Auto!";
          if (result >= 60)
            extra = "PRIMA.\n**+" + carboostam + "%** wegen deinem Auto!";
          if (result >= 80)
            extra = "TOLL!\n**+" + carboostam + "%** wegen deinem Auto!";
          if (result >= 100)
            extra = "WOW!\n**+" + carboostam + "%** wegen deinem Auto!";
        }
      }
      let resultcar;
      if (!carboost)
        resultcar = result;
      else
        resultcar = Math.round(ctx.bot.perAdd(result, carboostam));
      const transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: "WORK",
          amount: resultcar,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id,
          amount: resultcar,
          type: "positive"
        }
      });
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:HAMMER:1024388163747184662> \xBB WORK").setDescription(`
					\xBB You work as **${job}** and earn **$${resultcar}**! ${extra}

					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:HAMMER:1024388163747184662> \xBB ARBEIT").setDescription(`
						\xBB Du arbeitest als **${job}** und verdienst **${resultcar}\u20AC**! ${extra}

						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultcar);
      ctx.log(false, `[CMD] WORK : ${resultcar}\u20AC`);
      ctx.bot.cooldown.set(ctx.interaction.user.id, "work", 60 * 45 * 1e3);
      return ctx.interaction.reply({ embeds: [message] });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=work.js.map
