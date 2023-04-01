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
  if (button < 21) {
    row = 3;
    btn = button - 15;
  }
  if (button < 16) {
    row = 2;
    btn = button - 10;
  }
  if (button < 11) {
    row = 1;
    btn = button - 5;
  }
  if (button < 6) {
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
    name: "memory-choice"
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
      ctx.log(false, `[BTN] MEMORY : NOTPLAYING`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.user.id !== ctx.bot.memory.get("TURN-" + sender)) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Its not your turn!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Es ist nicht dein Zug!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : NOTTURN`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    await ctx.interaction.deferUpdate();
    let turnemoji;
    if (ctx.bot.memory.get("TURN-" + sender) === sender)
      turnemoji = "\u{1F535}";
    if (ctx.bot.memory.get("TURN-" + sender) === reciever)
      turnemoji = "\u{1F534}";
    let doflush = false;
    ctx.bot.memory.set("D_EMOJI-" + sel + "-" + sender, { id: ctx.bot.memory.get("I_EMOJI-" + sel + "-" + sender), name: "MEMORY" });
    ctx.bot.memory.set("DISABLED-" + sel + "-" + sender, true);
    const comp = rowGet(sel);
    ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
    ctx.components.rows[comp[1]].components[comp[0]].setEmoji(ctx.bot.memory.get("D_EMOJI-" + sel + "-" + sender));
    ctx.bot.memory.get("C_PLAYERSELECT-" + ctx.interaction.user.id).push(ctx.bot.memory.get("I_EMOJI-" + sel + "-" + sender));
    ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id).push(sel);
    ctx.bot.memory.set("A_PLAYERSELECT-" + ctx.interaction.user.id, Number(ctx.bot.memory.get("A_PLAYERSELECT-" + ctx.interaction.user.id)) + 1);
    if (ctx.bot.memory.get("A_PLAYERSELECT-" + ctx.interaction.user.id) === 2) {
      if (ctx.bot.memory.get("C_PLAYERSELECT-" + ctx.interaction.user.id)[0] === ctx.bot.memory.get("C_PLAYERSELECT-" + ctx.interaction.user.id)[1]) {
        ctx.bot.memory.set("POINTS-" + ctx.interaction.user.id, Number(ctx.bot.memory.get("POINTS-" + ctx.interaction.user.id)) + 1);
        const comp1 = rowGet(ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0]);
        const comp2 = rowGet(ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1]);
        if (ctx.interaction.user.id === sender) {
          ctx.bot.memory.set("STYLE-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0] + "-" + sender, 1);
          ctx.components.rows[comp[1]].components[comp[0]].setStyle(1);
          ctx.bot.memory.set("STYLE-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1] + "-" + sender, 1);
          ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(1);
        }
        ;
        if (ctx.interaction.user.id === reciever) {
          ctx.bot.memory.set("STYLE-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0] + "-" + sender, 4);
          ctx.components.rows[comp1[1]].components[comp1[0]].setStyle(4);
          ctx.bot.memory.set("STYLE-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1] + "-" + sender, 4);
          ctx.components.rows[comp2[1]].components[comp2[0]].setStyle(4);
        }
        ctx.bot.memory.set("A_PLAYERSELECT-" + ctx.interaction.user.id, 0);
        ctx.bot.memory.set("B_PLAYERSELECT-" + ctx.interaction.user.id, []);
        ctx.bot.memory.set("C_PLAYERSELECT-" + ctx.interaction.user.id, []);
      } else {
        const comp1 = rowGet(ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0]);
        const comp2 = rowGet(ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1]);
        ctx.components.rows[comp1[1]].components[comp1[0]].setDisabled(false);
        ctx.components.rows[comp1[1]].components[comp1[0]].setEmoji("1020411843644243998");
        ctx.components.rows[comp2[1]].components[comp2[0]].setDisabled(false);
        ctx.components.rows[comp2[1]].components[comp2[0]].setEmoji("1020411843644243998");
        ctx.bot.memory.set("DISABLED-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0] + "-" + sender, false);
        ctx.bot.memory.set("DISABLED-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1] + "-" + sender, false);
        if (ctx.bot.memory.get("TURN-" + sender) === sender) {
          ctx.bot.memory.set("TURN-" + sender, reciever);
          turnemoji = "\u{1F534}";
        } else {
          ctx.bot.memory.set("TURN-" + sender, sender);
          turnemoji = "\u{1F535}";
        }
      }
      doflush = true;
    }
    if (doflush) {
      for (let i = 0; i < 20; i++) {
        const row = Math.floor(i / 5);
        ctx.components.rows[row].components[i % 5].setDisabled(true);
        ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get("D_EMOJI-" + (i + 1) + "-" + sender));
        ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get("STYLE-" + (i + 1) + "-" + sender));
      }
    }
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
				\xBB <@${sender}> is playing Memory with <@${reciever}>!
				The Bet is **$${bet}**
				
				\u{1F535} \xBB Points of <@${sender}> are **${ctx.bot.memory.get("POINTS-" + sender)}**
				\u{1F534} \xBB Points of <@${reciever}> are **${ctx.bot.memory.get("POINTS-" + reciever)}**
			`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB CURRENT TURN: " + turnemoji });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
					\xBB <@${sender}> spielt mit <@${reciever}> Memory!
					Die Wette ist **${bet}\u20AC**
					
					\u{1F535} \xBB Punkte von <@${sender}> sind **${ctx.bot.memory.get("POINTS-" + sender)}**
					\u{1F534} \xBB Punkte von <@${reciever}> sind **${ctx.bot.memory.get("POINTS-" + reciever)}**
				`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB AM ZUG: " + turnemoji });
    }
    ctx.log(false, `[BTN] MEMORY : ${sel} : ${ctx.bot.memory.get("I_EMOJI-" + sel + "-" + sender)}`);
    ctx.interaction.editReply({ embeds: [message], components: ctx.components.getAPI(), ephemeral: true });
    if (!doflush)
      return;
    await (0, import_promises.setTimeout)(2e3);
    ctx.bot.memory.set("D_EMOJI-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0] + "-" + sender, { id: "1020411843644243998", name: "MEMORY" });
    ctx.bot.memory.set("D_EMOJI-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1] + "-" + sender, { id: "1020411843644243998", name: "MEMORY" });
    ctx.bot.memory.set("DISABLED-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[0] + "-" + sender, false);
    ctx.bot.memory.set("DISABLED-" + ctx.bot.memory.get("B_PLAYERSELECT-" + ctx.interaction.user.id)[1] + "-" + sender, false);
    ctx.bot.memory.set("A_PLAYERSELECT-" + ctx.interaction.user.id, 0);
    ctx.bot.memory.set("B_PLAYERSELECT-" + ctx.interaction.user.id, []);
    ctx.bot.memory.set("C_PLAYERSELECT-" + ctx.interaction.user.id, []);
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(i / 5);
      ctx.components.rows[row].components[i % 5].setDisabled(ctx.bot.memory.get("DISABLED-" + (i + 1) + "-" + sender));
      ctx.components.rows[row].components[i % 5].setEmoji(ctx.bot.memory.get("D_EMOJI-" + (i + 1) + "-" + sender));
      ctx.components.rows[row].components[i % 5].setStyle(ctx.bot.memory.get("STYLE-" + (i + 1) + "-" + sender));
    }
    if (ctx.bot.memory.get("POINTS-" + sender) + ctx.bot.memory.get("POINTS-" + reciever) === 10) {
      const senderpoints = ctx.bot.memory.get("POINTS-" + sender);
      const recieverpoints = ctx.bot.memory.get("POINTS-" + reciever);
      let winner = "**Noone**", rawWinner;
      if (ctx.metadata.language === "de")
        winner = "**Niemand**";
      if (senderpoints > recieverpoints) {
        winner = "<@" + sender + ">";
        rawWinner = sender;
      } else if (senderpoints < recieverpoints) {
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
      ctx.components.rows[4].components[0].setDisabled(true);
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
					\xBB <@${sender}> is playing Memory with <@${reciever}>!
					The Bet is **$${bet}**
					
					\u{1F535} \xBB Points of <@${sender}> are **${ctx.bot.memory.get("POINTS-" + sender)}**
					\u{1F534} \xBB Points of <@${reciever}> are **${ctx.bot.memory.get("POINTS-" + reciever)}**
					
					<:AWARD:1024385473524793445> ${winner} has won **$${betwon}**.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
				`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
						\xBB <@${sender}> spielt mit <@${reciever}> Memory!
						Die Wette ist **${bet}\u20AC**
						
						\u{1F535} \xBB Punkte von <@${sender}> sind **${ctx.bot.memory.get("POINTS-" + sender)}**
						\u{1F534} \xBB Punkte von <@${reciever}> sind **${ctx.bot.memory.get("POINTS-" + reciever)}**
						
						<:AWARD:1024385473524793445> ${winner} hat **${betwon}\u20AC** gewonnen.${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
					`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.bot.game.delete("PLAYING-" + sender);
      ctx.bot.game.delete("PLAYING-" + reciever);
      ctx.bot.memory.delete("TURN-" + sender);
      ctx.bot.memory.delete("A_PLAYERSELECT-" + sender);
      ctx.bot.memory.delete("A_PLAYERSELECT-" + reciever);
      ctx.bot.memory.delete("POINTS-" + sender);
      ctx.bot.memory.delete("POINTS-" + reciever);
      ctx.bot.memory.delete("E_PLAYERSELECT-" + sender);
      ctx.bot.memory.delete("E_PLAYERSELECT-" + reciever);
      ctx.bot.memory.delete("B_PLAYERSELECT-" + reciever);
      ctx.bot.memory.delete("B_PLAYERSELECT-" + sender);
      ctx.bot.memory.delete("C_PLAYERSELECT-" + reciever);
      ctx.bot.memory.delete("C_PLAYERSELECT-" + sender);
      return ctx.interaction.message.edit({ embeds: [message2], components: ctx.components.getAPI(), ephemeral: true });
    }
    return ctx.interaction.message.edit({ embeds: [message], components: ctx.components.getAPI(), ephemeral: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=choice.js.map
