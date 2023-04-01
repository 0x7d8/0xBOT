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
var import_promises = require("timers/promises");
const rowGet = (button) => {
  let row, btn;
  if (button < 10) {
    row = 2;
    btn = button - 6;
  }
  if (button < 7) {
    row = 1;
    btn = button - 3;
  }
  if (button < 4) {
    row = 0;
    btn = button;
  }
  const output = [];
  if (btn > 0)
    output[0] = btn - 1;
  else
    output[0] = btn;
  output[1] = row;
  return output;
};
var choice_default = {
  data: {
    name: "ttt-choice"
  },
  async execute(ctx, bet, sel) {
    const cache = ctx.interaction.message.embeds;
    const description = cache[0].description.toString().replace(/[^\d@!]/g, "").split("!")[0].substring(1).split("@");
    const [sender, reciever] = description;
    if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You arent playing!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du spielst garnicht mit!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : NOTPLAYING`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const turn = ctx.bot.ttt.get("TURN-" + sender);
    if (ctx.interaction.user.id !== turn) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Its not your turn!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Es ist nicht dein Zug!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] TICTACTOE : NOTTURN`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    await ctx.interaction.deferUpdate();
    let turnemoji;
    if (turn === sender)
      turnemoji = "\u{1F535}";
    if (turn === reciever)
      turnemoji = "\u{1F534}";
    if (turn === sender) {
      ctx.bot.ttt.set("TURN-" + sender, reciever);
      turnemoji = "\u{1F534}";
    }
    ;
    if (turn === reciever) {
      ctx.bot.ttt.set("TURN-" + sender, sender);
      turnemoji = "\u{1F535}";
    }
    const comp = rowGet(sel);
    if (ctx.interaction.user.id === sender) {
      ctx.bot.ttt.set("FIELD-" + sel + "-" + sender, sender);
      ctx.bot.ttt.get("FIELDS-" + sender).push(sel);
      ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
      ctx.components.rows[comp[1]].components[comp[0]].setEmoji("1020411088245903451");
      ctx.components.rows[comp[1]].components[comp[0]].setStyle(1);
    }
    ;
    if (ctx.interaction.user.id === reciever) {
      ctx.bot.ttt.set("FIELD-" + sel + "-" + sender, reciever);
      ctx.bot.ttt.get("FIELDS-" + reciever).push(sel);
      ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
      ctx.components.rows[comp[1]].components[comp[0]].setEmoji("1020411023414542447");
      ctx.components.rows[comp[1]].components[comp[0]].setStyle(4);
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
				\xBB <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
				The Bet is **$${bet}**
				
				\u{1F535} \xBB <@${sender}>
\u{1F534} \xBB <@${reciever}>
			`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB CURRENT TURN: " + turnemoji });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
					\xBB <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
					Die Wette ist **${bet}\u20AC**
					
					\u{1F535} \xBB <@${sender}>
\u{1F534} \xBB <@${reciever}>
				`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB AM ZUG: " + turnemoji });
    }
    ctx.log(false, `[BTN] TICTACTOE : ${sel}`);
    ctx.interaction.editReply({ embeds: [message], components: ctx.components.getAPI(), ephemeral: true });
    await (0, import_promises.setTimeout)(500);
    const fields = [];
    let won = false;
    if (ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-2-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-3-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) !== null && ctx.bot.ttt.get("FIELD-2-" + sender) !== null && ctx.bot.ttt.get("FIELD-3-" + sender) !== null) {
      won = true;
      fields.push(1, 2, 3);
    }
    if (ctx.bot.ttt.get("FIELD-4-" + sender) === ctx.bot.ttt.get("FIELD-5-" + sender) && ctx.bot.ttt.get("FIELD-4-" + sender) === ctx.bot.ttt.get("FIELD-6-" + sender) && ctx.bot.ttt.get("FIELD-3-" + sender) !== null && ctx.bot.ttt.get("FIELD-4-" + sender) !== null && ctx.bot.ttt.get("FIELD-5-" + sender) !== null) {
      won = true;
      fields.push(3, 4, 5);
    }
    if (ctx.bot.ttt.get("FIELD-7-" + sender) === ctx.bot.ttt.get("FIELD-8-" + sender) && ctx.bot.ttt.get("FIELD-7-" + sender) === ctx.bot.ttt.get("FIELD-9-" + sender) && ctx.bot.ttt.get("FIELD-7-" + sender) !== null && ctx.bot.ttt.get("FIELD-8-" + sender) !== null && ctx.bot.ttt.get("FIELD-9-" + sender) !== null) {
      won = true;
      fields.push(7, 8, 9);
    }
    if (ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-4-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-7-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) !== null && ctx.bot.ttt.get("FIELD-4-" + sender) !== null && ctx.bot.ttt.get("FIELD-7-" + sender) !== null) {
      won = true;
      fields.push(1, 4, 7);
    }
    if (ctx.bot.ttt.get("FIELD-2-" + sender) === ctx.bot.ttt.get("FIELD-5-" + sender) && ctx.bot.ttt.get("FIELD-2-" + sender) === ctx.bot.ttt.get("FIELD-8-" + sender) && ctx.bot.ttt.get("FIELD-2-" + sender) !== null && ctx.bot.ttt.get("FIELD-5-" + sender) !== null && ctx.bot.ttt.get("FIELD-8-" + sender) !== null) {
      won = true;
      fields.push(2, 5, 8);
    }
    if (ctx.bot.ttt.get("FIELD-3-" + sender) === ctx.bot.ttt.get("FIELD-6-" + sender) && ctx.bot.ttt.get("FIELD-3-" + sender) === ctx.bot.ttt.get("FIELD-9-" + sender) && ctx.bot.ttt.get("FIELD-3-" + sender) !== null && ctx.bot.ttt.get("FIELD-6-" + sender) !== null && ctx.bot.ttt.get("FIELD-9-" + sender) !== null) {
      won = true;
      fields.push(3, 6, 9);
    }
    if (ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-5-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) === ctx.bot.ttt.get("FIELD-9-" + sender) && ctx.bot.ttt.get("FIELD-1-" + sender) !== null && ctx.bot.ttt.get("FIELD-5-" + sender) !== null && ctx.bot.ttt.get("FIELD-9-" + sender) !== null) {
      won = true;
      fields.push(1, 5, 9);
    }
    if (ctx.bot.ttt.get("FIELD-3-" + sender) === ctx.bot.ttt.get("FIELD-5-" + sender) && ctx.bot.ttt.get("FIELD-3-" + sender) === ctx.bot.ttt.get("FIELD-7-" + sender) && ctx.bot.ttt.get("FIELD-3-" + sender) !== null && ctx.bot.ttt.get("FIELD-5-" + sender) !== null && ctx.bot.ttt.get("FIELD-7-" + sender) !== null) {
      won = true;
      fields.push(3, 5, 7);
    }
    if (won || ctx.bot.ttt.get("FIELDS-" + sender).length + ctx.bot.ttt.get("FIELDS-" + reciever).length === 9) {
      let winner = "**Noone**", rawWinner;
      if (ctx.metadata.language === "de")
        winner = "**Niemand**";
      if (won) {
        rawWinner = ctx.bot.ttt.get("FIELD-" + fields[0] + "-" + sender);
        winner = "<@" + ctx.bot.ttt.get("FIELD-" + fields[0] + "-" + sender) + ">";
      }
      fields.forEach((field) => {
        const comp2 = rowGet(field);
        ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(3);
      });
      const betwon = bet * 2;
      let transaction;
      if (rawWinner) {
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
      for (let i = 0; i < 10; i++) {
        const row = Math.floor(i / 3);
        ctx.components.rows[row].components[i % 3].setDisabled(true);
      }
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
					\xBB <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
					The Bet is **$${bet}**
					
					\u{1F535} \xBB <@${sender}>
					\u{1F534} \xBB <@${reciever}>
					
					<:AWARD:1024385473524793445> ${winner} has won **$${betwon}**.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB TICTACTOE").setDescription(`
						\xBB <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
						Die Wette ist **${bet}\u20AC**
						
						\u{1F535} \xBB <@${sender}>
						\u{1F534} \xBB <@${reciever}>
						
						<:AWARD:1024385473524793445> ${winner} hat **${betwon}\u20AC** gewonnen.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.game.delete("PLAYING-" + sender);
      ctx.bot.game.delete("PLAYING-" + reciever);
      ctx.bot.ttt.delete("TURN-" + sender);
      ctx.bot.ttt.delete("TURN-" + reciever);
      ctx.bot.ttt.delete("FIELDS-" + sender);
      ctx.bot.ttt.delete("FIELDS-" + reciever);
      ctx.bot.ttt.delete("FIELD-1-" + sender);
      ctx.bot.ttt.delete("FIELD-2-" + sender);
      ctx.bot.ttt.delete("FIELD-3-" + sender);
      ctx.bot.ttt.delete("FIELD-4-" + sender);
      ctx.bot.ttt.delete("FIELD-5-" + sender);
      ctx.bot.ttt.delete("FIELD-6-" + sender);
      ctx.bot.ttt.delete("FIELD-7-" + sender);
      ctx.bot.ttt.delete("FIELD-8-" + sender);
      ctx.bot.ttt.delete("FIELD-9-" + sender);
      return ctx.interaction.message.edit({ embeds: [message2], components: ctx.components.getAPI(), ephemeral: true });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=choice.js.map
