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
var clear_exports = {};
__export(clear_exports, {
  default: () => clear_default
});
module.exports = __toCommonJS(clear_exports);
var import_discord = require("discord.js");
var import_v10 = require("discord-api-types/v10");
var import_discord2 = require("discord.js");
var clear_default = {
  data: new import_discord.SlashCommandBuilder().setName("clear").setDescription("CLEAR MESSAGES").setDescriptionLocalizations({
    de: "ENTFERNE NACHRICHTEN"
  }).setDMPermission(false).addIntegerOption((option) => option.setName("amount").setNameLocalizations({
    de: "anzahl"
  }).setDescription("THE AMOUNT OF MESSAGES").setDescriptionLocalizations({
    de: "DIE ANZAHL AN NACHRICHTEN"
  }).setRequired(true)).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE TARGET").setDescriptionLocalizations({
    de: "DAS ZIEL"
  }).setRequired(false)).setDefaultMemberPermissions(import_v10.PermissionFlagsBits.ManageMessages),
  async execute(ctx) {
    if (ctx.interaction.channel.type === import_discord2.ChannelType.GuildStageVoice) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB I dont think I can do that here!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Ich denke nicht, dass ich das hier machen kann!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CLEAR : WRONGCHANNEL`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (!ctx.interaction.appPermissions?.has("ManageMessages")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB I dont think I have the **MANAGE MESSAGES** Permission!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Ich denke nicht, dass ich die **NACHRICHTEN VERWALTEN** Berechtigung habe!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CLEAR : NOPERM`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ;
    if (!ctx.interaction.appPermissions?.has("ViewChannel")) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB I dont think I have the **VIEW CHANNEL** Permission!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Ich denke nicht, dass ich die **KAN\xC4LE ANSEHEN** Berechtigung habe!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CLEAR : NOPERM`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const amount = ctx.getOption("amount");
    const target = ctx.interaction.options.getUser("user");
    const messages = ctx.interaction.channel?.messages.fetch();
    if (amount < 1) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You have to delete atleast **1** Message!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du musst mindestens **1** Nachricht l\xF6schen!`).setFooter({ text: "\xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] CLEAR : NOTENOUGH : ${amount}`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (target !== null) {
      const filtered = [];
      let i = 0;
      {
        (await messages).filter((message) => {
          if (message.author.id === target.id && amount > i) {
            filtered.push(message);
            i++;
          }
        });
      }
      await ctx.interaction.channel?.bulkDelete(filtered, true).then((messages2) => {
        let message;
        if (messages2.size == 1) {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB DELETE MESSAGES").setDescription(`\xBB You deleted **${messages2.size}** Message from <@${target}>!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB NACHRICHTEN L\xD6SCHEN").setDescription(`\xBB Du hast **${messages2.size}** Nachricht von <@${target}> gel\xF6scht!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          }
        } else {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB DELETE MESSAGES").setDescription(`\xBB You deleted **${messages2.size}** Messages from <@${target}>!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB NACHRICHTEN L\xD6SCHEN").setDescription(`\xBB Du hast **${messages2.size}** Nachrichten von <@${target}> gel\xF6scht!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          }
        }
        ctx.log(false, "[CMD] CLEAR : " + target + " : " + amount);
        return ctx.interaction.reply({ embeds: [message], ephemeral: true });
      });
    } else {
      await ctx.interaction.channel?.bulkDelete(amount, true).then((messages2) => {
        let message;
        if (messages2.size == 1) {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB DELETE MESSAGES").setDescription(`\xBB You deleted **${messages2.size}** Message!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB NACHRICHTEN L\xD6SCHEN").setDescription(`\xBB Du hast **${messages2.size}** Nachricht gel\xF6scht!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          }
        } else {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB DELETE MESSAGES").setDescription(`\xBB You deleted **${messages2.size}** Messages!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          if (ctx.metadata.language === "de") {
            message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("\xBB NACHRICHTEN L\xD6SCHEN").setDescription(`\xBB Du hast **${messages2.size}** Nachrichten gel\xF6scht!`).setFooter({ text: "\xBB " + ctx.client.config.version });
          }
        }
        ctx.log(false, `[CMD] CLEAR : ${amount}`);
        return ctx.interaction.reply({ embeds: [message], ephemeral: true });
      });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=clear.js.map
