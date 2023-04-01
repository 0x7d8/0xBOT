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
var yes_default = {
  data: {
    name: "item-yes"
  },
  async execute(ctx, itemid, userid, type, amount) {
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] ITEMBUY : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let cost, dopay = false;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase()) === "0" || await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase()) === 0) {
      if (itemid === "nbomb")
        cost = 500 * amount;
      if (itemid === "mbomb")
        cost = 1e3 * amount;
      if (itemid === "hbomb")
        cost = 5e3 * amount;
      if (itemid === "cbomb")
        cost = 15e3 * amount;
    } else {
      dopay = true;
      cost = Number(await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-PRICE-" + itemid.toUpperCase())) * amount;
    }
    let name;
    if (itemid === "nbomb")
      name = "<:NBOMB:1021783222520127508> NORMAL BOMB";
    if (itemid === "mbomb")
      name = "<:MBOMB:1021783295211601940> MEDIUM BOMB";
    if (itemid === "hbomb")
      name = "<:HBOMB:1022102357938536458> HYPER BOMB";
    if (itemid === "cbomb")
      name = "<:CBOMB:1021783405161091162> CRAZY BOMB";
    if (ctx.metadata.language == "de") {
      if (itemid === "nbomb")
        name = "<:NBOMB:1021783222520127508> NORMALE BOMBE";
      if (itemid === "mbomb")
        name = "<:MBOMB:1021783295211601940> MEDIUM BOMBE";
      if (itemid === "hbomb")
        name = "<:HBOMB:1022102357938536458> HYPER BOMBE";
      if (itemid === "cbomb")
        name = "<:CBOMB:1021783405161091162> CRAZY BOMBE";
    }
    if (type === "buy") {
      if (balance < cost) {
        const missing = cost - balance;
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] ITEMBUY : ${itemid.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      const oldamount = await ctx.bot.items.get(ctx.interaction.user.id + "-" + itemid.toUpperCase() + "S-" + ctx.interaction.guild.id, "amount");
      if (amount + oldamount > 15) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Slots for that!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Slots daf\xFCr!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] ITEMBUY : ${itemid.toUpperCase()} : MAXSLOTS`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[1].setStyle(2);
      const transaction = await ctx.bot.transactions.log({
        success: true,
        sender: {
          id: ctx.interaction.user.id,
          amount: cost,
          type: "negative"
        },
        reciever: {
          id: `${amount}x ${itemid.toUpperCase()}`,
          amount: cost,
          type: "positive"
        }
      });
      let message;
      if (amount === 1) {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEM").setDescription(`
						\xBB You successfully bought a **${name}** for **$${cost}**!
						
						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language == "de") {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENSTAND KAUFEN").setDescription(`
							\xBB Du hast erfolgreich eine **${name}** f\xFCr **${cost}\u20AC** gekauft!
							
							ID: ${transaction.id}
						`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
      } else {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY ITEMS").setDescription(`
						\xBB You successfully bought **${amount}x** **${name}** for **$${cost}**!
						
						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language == "de") {
          message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GEGENST\xC4NDE KAUFEN").setDescription(`
							\xBB Du hast erfolgreich **${amount}x** **${name}** f\xFCr **${cost}\u20AC** gekauft!
							
							ID: ${transaction.id}
						`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
      }
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      if (dopay) {
        const businessowner = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-1-OWNER");
        if (itemid === "nbomb") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 250);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-1-EARNING", cost - 250);
        }
        if (itemid === "mbomb") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 750);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-1-EARNING", cost - 750);
        }
        if (itemid === "hbomb") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 2500);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-1-EARNING", cost - 2500);
        }
        if (itemid === "cbomb") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 7500);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-1-EARNING", cost - 7500);
        }
      }
      ctx.bot.items.add(ctx.interaction.user.id + "-" + itemid.toUpperCase() + "S-" + ctx.interaction.guild.id, amount);
      ctx.log(false, `[BTN] ITEMBUY : ${amount}x : ${itemid.toUpperCase()} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
