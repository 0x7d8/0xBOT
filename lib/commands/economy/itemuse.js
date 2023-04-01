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
var itemuse_exports = {};
__export(itemuse_exports, {
  default: () => itemuse_default
});
module.exports = __toCommonJS(itemuse_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var import_discord3 = require("discord.js");
var itemuse_default = {
  data: new import_discord2.SlashCommandBuilder().setName("itemuse").setDescription("USE AN ITEM").setDescriptionLocalizations({
    de: "NUTZE EINEN GEGENSTAND"
  }).setDMPermission(false).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE USER").setDescriptionLocalizations({
    de: "DER NUTZER"
  }).setRequired(true)).addStringOption((option) => option.setName("item").setNameLocalizations({
    de: "gegenstand"
  }).setDescription("THE itemid").setDescriptionLocalizations({
    de: "DER GEGENSTAND"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F4A3} NORMALE BOMBE", value: "nbomb-bomb" },
    { name: "\u{1F4A3} MEDIUM BOMBE", value: "mbomb-bomb" },
    { name: "\u{1F4A3} HYPER BOMBE", value: "hbomb-bomb" },
    { name: "\u{1F4A3} CRAZY BOMBE", value: "cbomb-bomb" }
  )),
  async execute(ctx) {
    const mathjs = await import("mathjs");
    if (!await ctx.bot.settings.get(ctx.interaction.guild.id, "items")) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB Items are disabled on this Server!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Items sind auf diesem Server deaktiviert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEM : DISABLED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.channel.type === import_discord3.ChannelType.GuildStageVoice) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB I dont think I can do that here!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Ich denke nicht, dass ich das hier machen kann!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMUSE : WRONGCHANNEL`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const user = ctx.interaction.options.getUser("user");
    const itemstr = ctx.getOption("item");
    const cache = itemstr.split("-");
    const [itemid, itemcat] = cache;
    let name;
    if (itemid === "nbomb")
      name = "<:NBOMB:1021783222520127508> NORMAL BOMB";
    if (itemid === "mbomb")
      name = "<:MBOMB:1021783295211601940> MEDIUM BOMB";
    if (itemid === "hbomb")
      name = "<:HBOMB:1022102357938536458> HYPER BOMB";
    if (itemid === "cbomb")
      name = "<:CBOMB:1021783405161091162> CRAZY BOMB";
    if (ctx.metadata.language === "de") {
      if (itemid === "nbomb")
        name = "<:NBOMB:1021783222520127508> NORMALE BOMBE";
      if (itemid === "mbomb")
        name = "<:MBOMB:1021783295211601940> MEDIUM BOMBE";
      if (itemid === "hbomb")
        name = "<:HBOMB:1022102357938536458> HYPER BOMBE";
      if (itemid === "cbomb")
        name = "<:CBOMB:1021783405161091162> CRAZY BOMBE";
    }
    if (user.bot) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant use Items on Bots!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst keine Gegenst\xE4nde auf einem Bot nutzen!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMUSE : ${user.id} : BOT : ${itemid.toUpperCase()}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (await ctx.bot.items.get(ctx.interaction.user.id + "-" + itemid.toUpperCase() + "S-" + ctx.interaction.guild.id, "amount") < 1) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough of that Item!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug von dem Gegenstand!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMUSE : ${user.id} : NOTENOUGHITEMS : ${itemid.toUpperCase()}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.interaction.user.id === user.id && itemcat === "bomb") {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant use Bombs on yourself?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst Bomben nicht auf dir selber nutzen?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.bomb.has("TIMEOUT-" + user.id + "-" + ctx.interaction.guild.id)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${user.id}> is already being bombed!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${user.id}> wird schon bombadiert!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    const channel = ctx.interaction.channel;
    const messages = channel.messages.fetch();
    ctx.bot.bomb.set("MESSAGES-" + user.id + "-" + ctx.interaction.guild.id, messages);
    ctx.bot.bomb.set("TIMEOUT-" + user.id + "-" + ctx.interaction.guild.id, true);
    let math;
    if (itemid === "nbomb")
      math = ctx.bot.random(80, 1e3) + " + " + ctx.bot.random(10, 20) + " - " + ctx.bot.random(150, 200);
    if (itemid === "mbomb")
      math = ctx.bot.random(10, 20) + " * " + ctx.bot.random(10, 30) + " - " + ctx.bot.random(60, 100);
    if (itemid === "hbomb")
      math = ctx.bot.random(10, 20) + " * " + ctx.bot.random(10, 40) + " * " + ctx.bot.random(60, 100);
    if (itemid === "cbomb")
      math = ctx.bot.random(10, 40) + " * (" + ctx.bot.random(100, 4e3) + " + " + ctx.bot.random(600, 2e3) + ")";
    const mathres = await mathjs.evaluate(math);
    let b1 = mathres - ctx.bot.random(10, 50);
    let b2 = mathres + ctx.bot.random(10, 50) + ctx.bot.random(10, 50);
    let b3 = mathres + ctx.bot.random(50, 100) + 50;
    let b4 = mathres - ctx.bot.random(100, 150) + ctx.bot.random(5, 25);
    const sb = ctx.bot.random(1, 4);
    const row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel(b1.toString()).setCustomId("BOMB-" + mathres + "-" + b1 + "-" + sb + "-1-" + itemid + "-" + user.id).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setLabel(b2.toString()).setCustomId("BOMB-" + mathres + "-" + b2 + "-" + sb + "-2-" + itemid + "-" + user.id).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setLabel(b3.toString()).setCustomId("BOMB-" + mathres + "-" + b3 + "-" + sb + "-3-" + itemid + "-" + user.id).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setLabel(b4.toString()).setCustomId("BOMB-" + mathres + "-" + b4 + "-" + sb + "-4-" + itemid + "-" + user.id).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let message;
    if (itemcat === "bomb") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB USE ITEM").setDescription(`
					\xBB Oh <@${user.id}>, <@${ctx.interaction.user.id}> used a **${name}** on you!
					If you solve this Math Equation, it wont do anything.

					**\`\`\`${math}\`\`\`**
					The Bomb explodes <t:${Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 10}:R>
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB GEGENSTAND NUTZEN").setDescription(`
						\xBB Oh <@${user.id}>, <@${ctx.interaction.user.id}> hat eine **${name}** an dir benutzt!
						Falls du dieses Mathe R\xE4tsel l\xF6st, passiert nichts.

						**\`\`\`${math}\`\`\`**
						Die Bombe explodiert <t:${Math.floor(+/* @__PURE__ */ new Date() / 1e3) + 10}:R>
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
    }
    ctx.bot.items.rem(ctx.interaction.user.id + "-" + itemid.toUpperCase() + "S-" + ctx.interaction.guild.id, 1);
    ctx.log(false, `[CMD] ITEMUSE : ${user.id} : ${itemid.toUpperCase()}`);
    if (itemcat === "bomb") {
      let msg = await ctx.interaction.reply({ content: "<@" + user.id + ">", embeds: [message], components: [row], fetchReply: true });
      const expiration = async () => {
        if (!ctx.bot.bomb.has("TIMEOUT-" + user.id + "-" + ctx.interaction.guild.id))
          return;
        ctx.bot.bomb.delete("TIMEOUT-" + user.id + "-" + ctx.interaction.guild.id);
        ctx.bot.bomb.delete("MESSAGES-" + user.id + "-" + ctx.interaction.guild.id);
        {
          msg.components[0].components[0].data.disabled = true;
          msg.components[0].components[1].data.disabled = true;
          msg.components[0].components[2].data.disabled = true;
          msg.components[0].components[3].data.disabled = true;
        }
        ;
        msg.components[0].components[Number(sb) - 1].data.style = import_discord.ButtonStyle.Success;
        if (itemid === "nbomb") {
          const member = await ctx.interaction.guild.members.fetch(user.id);
          member.timeout(15 * 1e3, "BOMB TIMEOUT FROM " + ctx.interaction.user.id).catch(() => {
          });
        }
        ;
        if (itemid === "mbomb") {
          const member = await ctx.interaction.guild.members.fetch(user.id);
          member.timeout(30 * 1e3, "BOMB TIMEOUT FROM " + ctx.interaction.user.id).catch(() => {
          });
        }
        ;
        if (itemid === "hbomb") {
          const member = await ctx.interaction.guild.members.fetch(user.id);
          member.timeout(45 * 1e3, "BOMB TIMEOUT FROM " + ctx.interaction.user.id).catch(() => {
          });
        }
        ;
        if (itemid === "cbomb") {
          const filtered = [];
          let i = 0;
          {
            (await messages).filter((m) => {
              if (m.author.id === user.id && 1 > i) {
                filtered.push(m);
                i++;
              }
            });
          }
          await channel.bulkDelete(filtered, true);
        }
        message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB USE ITEM").setDescription(`\xBB <@${user.id}> has failed to diffuse the Bomb! OHNO`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:BOXOPEN:1024395281460101213> \xBB GEGENSTAND NUTZEN").setDescription(`\xBB <@${user.id}> hat es nicht geschafft, die Bombe zu entsch\xE4rfen! OH`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] ITEMUSE : ${user.id} : EXPIRED`);
        ctx.interaction.editReply({ content: "", embeds: [message], components: msg.components }).catch(() => {
        });
      };
      setTimeout(() => expiration(), 1e4);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=itemuse.js.map
