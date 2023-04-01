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
var action_exports = {};
__export(action_exports, {
  default: () => action_default
});
module.exports = __toCommonJS(action_exports);
var import_discord = require("discord.js");
var action_default = {
  data: new import_discord.SlashCommandBuilder().setName("action").setDMPermission(false).setDescription("EXECUTE ACTIONS ON USERS").setDescriptionLocalizations({
    de: "F\xDCHRE AKTIONEN AN NUTZERN AUS"
  }).addUserOption((option) => option.setName("user").setNameLocalizations({
    de: "nutzer"
  }).setDescription("THE PERSON").setDescriptionLocalizations({
    de: "DIE PERSON"
  }).setRequired(true)).addStringOption((option) => option.setName("action").setNameLocalizations({
    de: "aktion"
  }).setDescription("THE ACTION").setDescriptionLocalizations({
    de: "DIE AKTION"
  }).setRequired(true).addChoices(
    // Setup Choices
    { name: "\u{1F44A} SCHLAGEN", value: "box" },
    { name: "\u{1F480} T\xD6TEN", value: "kill" },
    { name: "\u{1F440} ANSTARREN", value: "stare" },
    { name: "\u{1F9D0} TWERKEN", value: "twerk" },
    { name: "\u{1F3C1} FANGEN", value: "catch" },
    { name: "\u{1F620} RUFEN", value: "call" }
  )),
  async execute(ctx) {
    const user = ctx.interaction.options.getUser("user");
    const event = ctx.getOption("action");
    if (ctx.interaction.user.id === user.id) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You cant execute Actions on yourself?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du kannst keine Aktionen auf dir selbst ausf\xFChren?`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[CMD] ACTION : ${user.id} : ${event.toUpperCase()} : SAMEPERSON`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    ctx.log(false, `[CMD] ACTION : ${user.id} : ${event.toUpperCase()}`);
    if (event === "box") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> boxed <@${user.id}>! AHH.`).setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB **<@${ctx.interaction.user.id}>** hat <@${user.id}> Geschlagen! AUA.`).setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
    ;
    if (event === "kill") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> killed <@${user.id}>! MH.`).setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB **<@${ctx.interaction.user.id}>** hat <@${user.id}> Get\xF6tet! MH.`).setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
    ;
    if (event === "stare") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> stares at <@${user.id}>! MENACINGLY.`).setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription("\xBB **<@" + ctx.interaction.user.id + ">** starrt <@" + user.id + "> an! STILL.").setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
    ;
    if (event === "twerk") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> twerks over <@${user.id}>! EWW!`).setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription("\xBB **<@" + ctx.interaction.user.id + ">** twerkt \xFCber <@" + user.id + ">! EKLIG!").setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
    ;
    if (event === "catch") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> catches <@${user.id}>! WHY?`).setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription("\xBB **<@" + ctx.interaction.user.id + ">** f\xE4ngt <@" + user.id + ">! WIESO?").setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
    ;
    if (event === "call") {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription(`\xBB <@${ctx.interaction.user.id}> calls <@${user.id}>! ARE YOU THERE?`).setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BURST:1024393250611671170> \xBB ACTION!").setDescription("\xBB **<@" + ctx.interaction.user.id + ">** ruft <@" + user.id + "> an! BIST DU DRAN?").setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g").setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      return ctx.interaction.reply({ embeds: [message] });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=action.js.map
