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
var yes_exports = {};
__export(yes_exports, {
  default: () => yes_default
});
module.exports = __toCommonJS(yes_exports);
var import_discord = require("discord.js");
var import_discord2 = require("discord.js");
var import_promises = require("timers/promises");
var yes_default = {
  data: {
    name: "memory-yes"
  },
  async execute(ctx, bet) {
    const cache = ctx.interaction.message.embeds;
    const description = cache[0].description.toString().replace(/[^\d@!]/g, "").split("!")[0].substring(1).split("@");
    const [sender, reciever] = description;
    const balance = await ctx.bot.money.get(reciever);
    const otherbalance = await ctx.bot.money.get(sender);
    if (ctx.interaction.user.id !== reciever) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${reciever}> has to decide this!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${reciever}> muss das entscheiden!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : YES : NOTALLOWED`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + reciever)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You are already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du bist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : ${reciever} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (ctx.bot.game.has("PLAYING-" + sender)) {
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${sender}> is already in a Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${sender}> ist schon in einer Lobby!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : ${sender} : ALREADYLOBBY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (balance < bet) {
      const missing = bet - balance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : ${reciever} : ${bet}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    if (otherbalance < bet) {
      const missing = bet - otherbalance;
      let message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB <@${sender}> doesnt have enough Money, he is Missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message2 = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB <@${sender}> hat nicht genug Geld, im fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] MEMORY : ${reciever} : ${bet}\u20AC : NOTENOUGHMONEY`);
      return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
    }
    await ctx.interaction.deferUpdate();
    ctx.bot.memory.delete("TIMEOUT-" + sender + "-" + ctx.interaction.message.id);
    let row1 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-1-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-2-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-3-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-4-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-5-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row2 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-6-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-7-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-8-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-9-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-10-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row3 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-11-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-12-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-13-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-14-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-15-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row4 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-16-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-17-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-18-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-19-${bet}`).setStyle(import_discord.ButtonStyle.Secondary),
      new import_discord.ButtonBuilder().setEmoji("1020411843644243998").setCustomId(`MEMORY-20-${bet}`).setStyle(import_discord.ButtonStyle.Secondary)
    );
    let row5 = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setEmoji("1024382939020152982").setLabel("CANCEL").setCustomId(`MEMORY-CANCEL-${bet}`).setStyle(import_discord.ButtonStyle.Danger)
    );
    if (ctx.metadata.language === "de") {
      row5 = new import_discord.ActionRowBuilder().addComponents(
        new import_discord.ButtonBuilder().setEmoji("1024382939020152982").setLabel("ABBRECHEN").setCustomId(`MEMORY-CANCEL-${bet}`).setStyle(import_discord.ButtonStyle.Danger)
      );
    }
    ctx.bot.game.set("PLAYING-" + sender, "MEMORY");
    ctx.bot.game.set("PLAYING-" + reciever, "MEMORY");
    ctx.bot.memory.set("A_PLAYERSELECT-" + sender, 0);
    ctx.bot.memory.set("A_PLAYERSELECT-" + reciever, 0);
    ctx.bot.memory.set("POINTS-" + sender, 0);
    ctx.bot.memory.set("POINTS-" + reciever, 0);
    ctx.bot.memory.set("E_PLAYERSELECT-" + sender, []);
    ctx.bot.memory.set("E_PLAYERSELECT-" + reciever, []);
    ctx.bot.memory.set("B_PLAYERSELECT-" + reciever, []);
    ctx.bot.memory.set("B_PLAYERSELECT-" + sender, []);
    ctx.bot.memory.set("C_PLAYERSELECT-" + reciever, []);
    ctx.bot.memory.set("C_PLAYERSELECT-" + sender, []);
    const emojis = [];
    const emojis2 = [];
    const emojilistraw = [
      "1017444934904729611",
      // :DOGE:
      "1017445104685961236",
      // :FINE:
      "1017444736610619453",
      // :HSPY:
      "1017445667347636294",
      // :HUH:
      "1017445007910772766",
      // :KAPPA:
      "1017445430310752336",
      // :KEKDANCE:
      "1017445761291669604",
      // :OK:
      "1017444837257134100",
      // :RICK:
      "1017444467353063474",
      // :SPONGE:
      "1017445246516334653",
      // :SQUIDWARD:
      "1017445352078590093",
      // :WHAT:
      "1017847213067604009",
      // :KID:
      "1018083730688057394",
      // :NAH:
      "1018079045461741569",
      // :DUCK:
      "1018079408185163796",
      // :THX:
      "1018927449368703098",
      // :SUS:
      "1014209756103184455",
      // :CATBRUHZ:
      "1014209757214679121",
      // :KEKW:
      "1018928177353072700",
      // :CAT:
      "1018930597856559144",
      // :OMEGAKEKW:
      "1019235162569068615",
      // :MALDE:
      "1014209765431324733",
      // :CATPOP:
      "1019238968346284084",
      // :VENT:
      "1019239168573968385",
      // :HUNGRY:
      "1019247388587728936",
      // :YODA:
      "1019247603843596368",
      // :SAUL:
      "1019247987970560010",
      // :KIM:
      "1019248618709983283",
      // :MOTOMOTO:
      "1019248854694109276",
      // :BURGIR:
      "1019249349890429101",
      // :AMERICA:
      "1019250108681949315",
      // :WALTER:
      "1019250327440068671",
      // :MAN:
      "1019251675644559500",
      // :SUGIMORI:
      "1019253539471642694",
      // :CRAZYHAMBURGER
      "1019254370124173352",
      // :SIMEX:
      "1019254562214903869",
      // :ZOMBIE:
      "1023932900749627483",
      // :CRITICAL:
      "1023933347078094891",
      // :SMASH:
      "790990037982248971"
      // :PEPEOK:
    ];
    const copied = [...emojilistraw];
    const emojilist = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(
        Math.random() * copied.length
      );
      emojilist.push(
        copied[randomIndex]
      );
      copied.splice(randomIndex, 1);
    }
    let emojistate = false, emojinumber = 1, skipother = false;
    const rdo = async () => {
      while (emojistate == false) {
        const emojirandom = ctx.bot.random(1, 10);
        const emoji = await emojilist[emojirandom - 1];
        skipother = false;
        if (typeof emoji !== "undefined" && typeof emojinumber !== "undefined") {
          if (!emojis.includes(emoji)) {
            emojis[emojinumber - 1] = await emoji;
            await (0, import_promises.setTimeout)(25);
            ctx.bot.memory.set("I_EMOJI-" + emojinumber + "-" + sender, emoji.toString());
            emojinumber = emojinumber + 1;
            if (emojinumber > 20) {
              emojistate = true;
              return;
            }
            skipother = true;
          }
          if (!emojis2.includes(emoji) && skipother != true) {
            emojis2[emojinumber - 1] = await emoji;
            await (0, import_promises.setTimeout)(25);
            ctx.bot.memory.set("I_EMOJI-" + emojinumber + "-" + sender, emoji.toString());
            emojinumber = emojinumber + 1;
            if (emojinumber > 20) {
              emojistate = true;
              return;
            }
          }
        }
      }
    };
    await rdo();
    ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
    ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
    let message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
				\xBB <@${sender}> is playing Memory with <@${reciever}>!
				The Bet is **$${bet}**
				
				\u{1F535} \xBB Points of <@${sender}> are **0**
				\u{1F534} \xBB Points of <@${reciever}> are **0**
			`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB CURRENT TURN: \u{1F535}" });
    if (ctx.metadata.language === "de") {
      message = new import_discord2.EmbedBuilder().setColor(3604635).setTitle("<:GAMEPAD:1024395990679167066> \xBB MEMORY").setDescription(`
					\xBB <@${sender}> spielt mit <@${reciever}> Memory!
					Die Wette ist **${bet}\u20AC**
					
					\u{1F535} \xBB Punkte von <@${sender}> sind **0**
					\u{1F534} \xBB Punkte von <@${reciever}> sind **0**
				`).setFooter({ text: "\xBB " + ctx.client.config.version + " \xBB AM ZUG: \u{1F535}" });
    }
    ctx.bot.memory.set("TURN-" + sender, sender);
    for (let i = 0; i < 20; i++) {
      ctx.bot.memory.set("STYLE-" + (i + 1) + "-" + sender, import_discord.ButtonStyle.Secondary);
      ctx.bot.memory.set("DISABLED-" + (i + 1) + "-" + sender, false);
      ctx.bot.memory.set("D_EMOJI-" + (i + 1) + "-" + sender, { id: "1020411843644243998", name: "MEMORY" });
    }
    ctx.log(false, `[BTN] MEMORY : ${sender} : ACCEPT`);
    return ctx.interaction.editReply({ content: "", embeds: [message], components: [row1, row2, row3, row4, row5] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
