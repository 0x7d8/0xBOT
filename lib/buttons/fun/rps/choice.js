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
var choice_exports = {};
__export(choice_exports, {
  default: () => choice_default
});
module.exports = __toCommonJS(choice_exports);
var import_discord = require("discord.js");
var choice_default = {
  data: {
    name: "rps-choice"
  },
  async execute(ctx, bet, choice) {
    const cache = ctx.interaction.message.embeds;
    const description = cache[0].description.toString().replace(/[^\d@!]/g, "").split("!")[0].substring(1).split("@");
    const [sender, reciever] = description;
    if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You arent playing!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du spielst garnicht mit!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] RPS : NOTPLAYING`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    let choiceen;
    if (choice === "ROCK")
      choiceen = "\u{1FAA8} ROCK";
    if (choice === "PAPER")
      choiceen = "\u{1F4DD} PAPER";
    if (choice === "SCISSORS")
      choiceen = "\u2702\uFE0F SCISSORS";
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB ROCK PAPER SCISSORS").setDescription(`\xBB You selected **${choiceen}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      let choicede;
      if (choice === "ROCK")
        choicede = "\u{1FAA8} STEIN";
      if (choice === "PAPER")
        choicede = "\u{1F4DD} PAPIER";
      if (choice === "SCISSORS")
        choicede = "\u2702\uFE0F SCHERE";
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB SCHERE STEIN PAPIER").setDescription(`\xBB Du hast **${choicede}** ausgew\xE4hlt!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[BTN] RPS : ${choice}`);
    ctx.interaction.reply({ embeds: [message], ephemeral: true });
    ctx.bot.rps.set("CHOICE-" + ctx.interaction.user.id, choice);
    if (ctx.bot.rps.has("CHOICE-" + sender) && ctx.bot.rps.has("CHOICE-" + reciever)) {
      const psc = ctx.bot.rps.get("CHOICE-" + sender);
      const prc = ctx.bot.rps.get("CHOICE-" + reciever);
      let win = "none";
      if (psc === "ROCK" && prc === "PAPER")
        win = "pr";
      if (psc === "ROCK" && prc === "SCISSORS")
        win = "ps";
      if (psc === "SCISSORS" && prc === "ROCK")
        win = "pr";
      if (psc === "SCISSORS" && prc === "PAPER")
        win = "ps";
      if (psc === "PAPER" && prc === "ROCK")
        win = "ps";
      if (psc === "PAPER" && prc === "SCISSORS")
        win = "pr";
      let winner = "**Noone**", rawWinner;
      if (ctx.metadata.language === "de")
        winner = "**Niemand**";
      if (win === "ps") {
        winner = "<@" + sender + ">";
        rawWinner = sender;
      }
      if (win === "pr") {
        winner = "<@" + reciever + ">";
        rawWinner = reciever;
      }
      const betwon = bet * 2;
      let transaction;
      if (winner !== "**Noone**" && winner !== "**Niemand**") {
        ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon);
        if (betwon > 0)
          transaction = await ctx.bot.transactions.log({
            success: true,
            sender: {
              id: rawWinner === sender ? reciever : sender,
              amount: betwon,
              type: "negative"
            },
            reciever: {
              id: rawWinner,
              amount: betwon,
              type: "positive"
            }
          });
      } else {
        ctx.bot.money.add(ctx.interaction.guild.id, sender, bet);
        ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet);
      }
      for (let i = 0; i < 4; i++) {
        const row = Math.floor(i / 3);
        ctx.components.rows[row].components[i % 3].setDisabled(true);
      }
      let send, reci;
      if (psc === "SCISSORS")
        send = "\u2702\uFE0F SCISSORS";
      if (psc === "PAPER")
        send = "\u{1F4DD} PAPER";
      if (psc === "ROCK")
        send = "\u{1FAA8} ROCK";
      if (prc === "ROCK")
        reci = "\u{1FAA8} ROCK";
      if (prc === "PAPER")
        reci = "\u{1F4DD} PAPER";
      if (prc === "SCISSORS")
        reci = "\u2702\uFE0F SCISSORS";
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB ROCK PAPER SCISSORS").setDescription(`
					\xBB <@${sender}> selected **${ctx.bot.rps.get("CHOICE-" + sender)}**
					\xBB <@${reciever}> selected **${ctx.bot.rps.get("CHOICE-" + reciever)}**
					
					<:AWARD:1024385473524793445> ${winner} won **$${betwon}**.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
				`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        if (psc === "SCISSORS")
          send = "\u2702\uFE0F SCHERE";
        if (psc === "PAPER")
          send = "\u{1F4DD} PAPIER";
        if (psc === "ROCK")
          send = "\u{1FAA8} STEIN";
        if (prc === "ROCK")
          reci = "\u{1FAA8} STEIN";
        if (prc === "PAPER")
          reci = "\u{1F4DD} PAPIER";
        if (prc === "SCISSORS")
          reci = "\u2702\uFE0F SCHERE";
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB SCHERE STEIN PAPIER").setDescription(`
						\xBB <@${sender}> w\xE4hlte **${send}**
						\xBB <@${reciever}> w\xE4hlte **${reci}**
						
						<:AWARD:1024385473524793445> ${winner} hat **${betwon}\u20AC** gewonnen.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
					`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.bot.rps.delete("CHOICE-" + sender);
      ctx.bot.rps.delete("CHOICE-" + reciever);
      ctx.log(false, `[BTN] RPS : DONE`);
      return ctx.interaction.message.edit({ embeds: [message2], components: ctx.components.getAPI(), ephemeral: true });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=choice.js.map
