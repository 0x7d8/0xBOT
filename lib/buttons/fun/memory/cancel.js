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
var cancel_exports = {};
__export(cancel_exports, {
  default: () => cancel_default
});
module.exports = __toCommonJS(cancel_exports);
var import_discord = require("discord.js");
var cancel_default = {
  data: {
    name: "memory-cancel"
  },
  async execute(ctx, bet) {
    const cache = ctx.interaction.message.embeds;
    const description = cache[0].description.toString().replace(/[^\d@!]/g, "").split("!")[0].substring(1).split("@");
    const [sender, reciever] = description;
    if (ctx.interaction.user.id !== reciever && ctx.interaction.user.id !== sender) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${reciever}> or <@${sender}> has to decide this!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${reciever}> oder <@${sender}> muss das entscheiden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : CANCEL : NOTALLOWED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    for (let i = 0; i < 21; i++) {
      const row = Math.floor(i / 5);
      ctx.components.rows[row].components[i % 5].setDisabled(true);
    }
    const betwon = bet * 2;
    let transaction;
    ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id === sender ? reciever : sender, betwon);
    if (betwon > 0)
      transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: ctx.interaction.user.id === sender ? sender : reciever,
          amount: betwon,
          type: "negative"
        },
        reciever: {
          id: ctx.interaction.user.id === sender ? reciever : sender,
          amount: betwon,
          type: "positive"
        }
      });
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
    let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
				\xBB <@${ctx.interaction.user.id}> cancelled the Game.
				<@${ctx.interaction.user.id === sender ? reciever : sender}> gets **$${betwon}**
				${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
			`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    if (ctx.metadata.language === "de") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
					\xBB <@${ctx.interaction.user.id}> hat das Spiel abgebrochen.
					<@${ctx.interaction.user.id === sender ? reciever : sender}> kriegt **${betwon}\u20AC**
					${typeof transaction === "object" ? `
ID: ${transaction.id}` : ""}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
    }
    ctx.log(false, `[BTN] MEMORY : ${sender} : CANCEL`);
    return ctx.interaction.update({ content: "", embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=cancel.js.map
