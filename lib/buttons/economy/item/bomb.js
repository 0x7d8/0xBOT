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
var bomb_exports = {};
__export(bomb_exports, {
  default: () => bomb_default
});
module.exports = __toCommonJS(bomb_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var bomb_default = {
  data: {
    name: "item-bomb"
  },
  async execute(ctx, solution, choice, solbutton, button, itemid, reciever) {
    if (ctx.interaction.channel.type === import_discord2.ChannelType.GuildStageVoice)
      return;
    if (ctx.interaction.user.id !== reciever) {
      let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${reciever}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${reciever}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] ITEMUSE : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    ctx.bot.bomb.delete("TIMEOUT-" + reciever + "-" + ctx.interaction.guild.id);
    ctx.components.rows[0].components[0].setDisabled(true);
    ctx.components.rows[0].components[1].setDisabled(true);
    ctx.components.rows[0].components[2].setDisabled(true);
    ctx.components.rows[0].components[3].setDisabled(true);
    ctx.components.rows[0].components[Number(button) - 1].setStyle(4);
    ctx.components.rows[0].components[Number(solbutton) - 1].setStyle(3);
    let message;
    if (solution === choice) {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB USE ITEM").setDescription(`\xBB <@${reciever}> has diffused the Bomb! YAY`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB GEGENSTAND NUTZEN").setDescription(`\xBB <@${reciever}> hat die Bombe entsch\xE4rft! YAY`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    } else {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB USE ITEM").setDescription(`\xBB <@${reciever}> has failed to diffuse the Bomb! OHNO`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB GEGENSTAND NUTZEN").setDescription(`\xBB <@${reciever}> hat es nicht geschafft, die Bombe zu entsch\xE4rfen! OH`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    const messages = ctx.bot.bomb.get("MESSAGES-" + reciever + "-" + ctx.interaction.guild.id);
    ctx.bot.bomb.delete("MESSAGES-" + reciever + "-" + ctx.interaction.guild.id);
    if (solution !== choice) {
      if (itemid === "nbomb") {
        const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
        member.timeout(15 * 1e3, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {
        });
      }
      ;
      if (itemid === "mbomb") {
        const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
        member.timeout(30 * 1e3, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {
        });
      }
      ;
      if (itemid === "hbomb") {
        const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
        member.timeout(45 * 1e3, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {
        });
      }
      ;
      if (itemid === "cbomb") {
        const filtered = [];
        let i = 0;
        {
          (await messages).filter((m) => {
            if (m.author.id === ctx.interaction.user.id && 1 > i) {
              filtered.push(m);
              i++;
            }
          });
        }
        await ctx.interaction.channel.bulkDelete(filtered, true);
      }
    }
    ctx.log(false, `[BTN] ITEMUSE : BOMB : ${choice} : ${solution}`);
    return ctx.interaction.update({ content: "", embeds: [message], components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=bomb.js.map
