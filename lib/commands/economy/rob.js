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
var rob_exports = {};
__export(rob_exports, {
  default: () => rob_default
});
module.exports = __toCommonJS(rob_exports);
var import_discord = require("discord.js");
var rob_default = {
  data: new import_discord.SlashCommandBuilder().setName("rob").setDescription("ROB SOMEONE").setDescriptionLocalizations({
    de: "RAUBE JEMANDEN AUS"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(true)).addStringOption((option) => option.setName("money").setNameLocalizations({
    de: "geld"
  }).setDescription("THE MONEY").setDescriptionLocalizations({
    de: "DAS GELD"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4B8} [35%] 10\u20AC - 20\u20AC", value: "35" },
    { name: "\u{1F911} [20%] 30\u20AC - 50\u20AC", value: "20" },
    { name: "\u{1F4B0} [05%] 60\u20AC - 100\u20AC", value: "5" }
  )),
  async execute(ctx) {
    const ms = (await import("pretty-ms")).default;
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "rob")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB The **\`/rob\`** Command is disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Der **\`/rob\`** Befehl ist auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROB : DISABLED`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const user = ctx.interaction.options.getUser("user");
    const money = ctx.getOption("money");
    const moneysnd = await ctx.bot.money.get(ctx.interaction.user.id);
    const moneytar = await ctx.bot.money.get(user.id);
    if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, "rob")).onCooldown) {
      const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, "rob")).remaining;
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You still have a Cooldown of **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast leider noch einen Cooldown von **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROB : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (ctx.interaction.user.id === user.id) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant rob yourself?!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst dich nicht selber ausrauben?!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROB : ${user.id} : ${money}\u20AC : SAMEPERSON`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (user.bot) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant rob a Bot!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst einem Bot kein Geld klauen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ROB : ${user} : BOT`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    let need;
    if (money === "35")
      need = 20;
    if (money === "20")
      need = 50;
    if (money === "5")
      need = 100;
    let notenoughmoney1 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you need atleast **$${need}**! BRUH.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      notenoughmoney1 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, du brauchst mindestens **${need}\u20AC**! BRUH.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    if (money === "35" && moneysnd < 20) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
    }
    ;
    if (money === "20" && moneysnd < 50) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
    }
    ;
    if (money === "5" && moneysnd < 100) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney1.toJSON()], ephemeral: true });
    }
    let notenoughmoney2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${user}> doesnt have enough Money for that, he needs atleast **$${need}**! LOL.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      notenoughmoney2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${user}> hat nicht genug Geld daf\xFCr, er braucht mindestens **${need}\u20AC**! LOL.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    if (money === "35" && moneytar < 20) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
    }
    ;
    if (money === "20" && moneytar < 50) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
    }
    ;
    if (money === "5" && moneytar < 100) {
      ctx.log(false, `[CMD] ROB : ${user.id} : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [notenoughmoney2.toJSON()], ephemeral: true });
    }
    const random35 = ctx.bot.random(1, 3);
    const random20 = ctx.bot.random(1, 5);
    const random05 = ctx.bot.random(1, 20);
    let status, amount;
    if (money === "35") {
      if (random35 == 1) {
        status = true;
        amount = ctx.bot.random(10, 20);
      } else {
        status = false;
        amount = ctx.bot.random(10, 20);
      }
    } else if (money === "20") {
      if (random20 == 1) {
        status = true;
        amount = ctx.bot.random(30, 50);
      } else {
        status = false;
        amount = ctx.bot.random(30, 50);
      }
    } else {
      if (random05 == 1) {
        status = true;
        amount = ctx.bot.random(50, 100);
      } else {
        status = false;
        amount = ctx.bot.random(50, 100);
      }
    }
    let punishment;
    if (moneysnd > need * 2)
      punishment = amount * 2;
    else
      punishment = amount;
    let extra;
    if (amount < 20)
      extra = "MEH.";
    if (amount >= 20)
      extra = "NICE.";
    if (amount >= 40)
      extra = "WONDERFUL.";
    if (amount >= 60)
      extra = "LOL.";
    if (amount >= 80)
      extra = "A PRO??!!";
    if (ctx.metadata.language === "de") {
      if (amount < 20)
        extra = "NAJA.";
      if (amount >= 20)
        extra = "NICE.";
      if (amount >= 40)
        extra = "PRIMA.";
      if (amount >= 60)
        extra = "LOL.";
      if (amount >= 80)
        extra = "EIN PRO??!!";
    }
    let success = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB AUSRAUBEN").setDescription(`\xBB You stole <@${user.id}> **$${amount}**! ${extra}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    let failure = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB AUSRAUBEN").setDescription(`\xBB You wanted to steal <@${user.id}> **$${amount}**, but the Police caught you! You had to pay **$${punishment}**! KEKW.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      success = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB AUSRAUBEN").setDescription(`\xBB Du hast <@${user.id}> **${amount}\u20AC** geklaut! ${extra}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      failure = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BAG:1024389219558367292> \xBB AUSRAUBEN").setDescription(`\xBB Du wolltest <@${user.id}> **${amount}\u20AC** klauen, aber die Polizei hat dich erwischt! Du musstest **${punishment}\u20AC** Strafgeld bezahlen! KEKW.`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    if (!status) {
      ctx.bot.cooldown.set(ctx.interaction.user.id, "rob", 1 * 60 * 1e3);
      ctx.log(false, `[CMD] ROB : ${user.id} : ${amount}\u20AC : FAILURE : ${punishment}\u20AC`);
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, punishment);
      return ctx.interaction.reply({ embeds: [failure] });
    }
    ctx.bot.cooldown.set(ctx.interaction.user.id, "rob", 1 * 60 * 1e3);
    ctx.bot.money.rem(ctx.interaction.guild.id, user.id, amount);
    ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, amount);
    ctx.log(false, `[CMD] ROB : ${user.id} : ${amount}\u20AC : SUCCESS`);
    return ctx.interaction.reply({ embeds: [success] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=rob.js.map
