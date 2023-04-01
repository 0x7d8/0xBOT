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
var iteminfo_exports = {};
__export(iteminfo_exports, {
  default: () => iteminfo_default
});
module.exports = __toCommonJS(iteminfo_exports);
var import_discord = require("discord.js");
var iteminfo_default = {
  data: new import_discord.SlashCommandBuilder().setName("iteminfo").setDMPermission(false).setDescription("SHOW INFO ABOUT ITEMS").setDescriptionLocalizations({
    de: "ZEIGE INFOS \xDCBER ITEMS"
  }).addStringOption((option) => option.setName("item").setNameLocalizations({
    de: "gegenstand"
  }).setDescription("THE ITEM").setDescriptionLocalizations({
    de: "DER GEGENSTAND"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4A3} NORMALE BOMBE", value: "nbomb" },
    { name: "\u{1F4A3} MEDIUM BOMBE", value: "mbomb" },
    { name: "\u{1F4A3} HYPER BOMBE", value: "hbomb" },
    { name: "\u{1F4A3} CRAZY BOMBE", value: "cbomb" }
  )),
  async execute(ctx) {
    const item = ctx.getOption("item");
    let message;
    ctx.log(false, `[CMD] ITEMINFO : ${item.toUpperCase()}`);
    if (item === "nbomb") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
					\xBB The **<:NBOMB:1021783222520127508> NORMAL BOMB** is used to temporarily mute people, yes, mute people.
					To not get muted the reciever has to solve a small problem.
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
						\xBB Die **<:NBOMB:1021783222520127508> NORMALE BOMBE** ist genutzt um Leute tempor\xE4r zu muten, ja, muten.
						Um nicht gemuted zu werden, muss der empf\xE4nger eine kleines Problem l\xF6sen.
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ;
    if (item === "mbomb") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
					\xBB The **<:MBOMB:1021783295211601940> MEDIUM BOMB** is used to temporarily mute people, yes, mute people.
					Its slightly harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB**.
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
						\xBB Die **<:MBOMB:1021783295211601940> MEDIUM BOMBE** ist genutzt um Leute tempor\xE4r zu muten, ja, muten.
						Sie ist bisschen schwieriger und hat eine l\xE4ngere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE**.
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ;
    if (item === "hbomb") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
					\xBB The **<:HBOMB:1022102357938536458> HYPER BOMB** is used to temporarily mute people, yes, mute people.
					Its alot harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB** and the **<:MBOMB:1021783295211601940> MEDIUM BOMB**.
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
						\xBB Die **<:HBOMB:1022102357938536458> HYPER BOMBE** ist genutzt um Leute tempor\xE4r zu muten, ja, muten.
						Sie ist deutlich schwieriger und hat eine l\xE4ngere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE** und die **<:MBOMB:1021783295211601940> MEDIUM BOMBE**.
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ;
    if (item === "cbomb") {
      message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
					\xBB The **<:CBOMB:1021783405161091162> CRAZY BOMB** is used to delete the last Message from someone in the Channel.
					To not get the last message deleted, the reciever has to solve a small problem.
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:QUESTION:1024402860210921503> \xBB ITEM INFO").setDescription(`
						\xBB Die **<:CBOMB:1021783405161091162> CRAZY BOMBE** ist genutzt um die Letzte Nachricht von jemanden im Kanal zu l\xF6schen.
						Um nicht die letzte Nachricht gel\xF6scht bekommen zu m\xFCssen, muss der Empf\xE4nger ein kleines Problem l\xF6sen.
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=iteminfo.js.map
