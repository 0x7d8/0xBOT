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
    name: "business-yes"
  },
  async execute(ctx, business, userid, type) {
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let businessid;
    if (business === "market")
      businessid = "1";
    if (business === "parking garage")
      businessid = "2";
    if (business === "car dealership")
      businessid = "3";
    let cost;
    if (business === "market")
      cost = 15e4;
    if (business === "parking garage")
      cost = 39e4;
    if (business === "car dealership")
      cost = 52e4;
    let name;
    if (business === "market")
      name = "MARKET";
    if (business === "parking garage")
      name = "PARKING GARAGE";
    if (business === "car dealership")
      name = "CAR DEALERSHIP";
    if (ctx.metadata.language == "de") {
      if (business === "market")
        name = "SUPERMARKT";
      if (business === "parking garage")
        name = "PARKHAUS";
      if (business === "car dealership")
        name = "AUTOHAUS";
    }
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] BUSINESSBUY : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (type === "buy") {
      if (balance < cost) {
        const missing = cost - balance;
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] BUSINESSBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      if (await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS") !== 0) {
        const userbusiness = await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS");
        let name2;
        if (userbusiness === "market")
          name2 = "MARKET";
        if (userbusiness === "parking garage")
          name2 = "PARKING GARAGE";
        if (userbusiness === "car dealership")
          name2 = "CAR DEALERSHIP";
        if (ctx.metadata.language == "de") {
          if (userbusiness === "market")
            name2 = "SUPERMARKT";
          if (userbusiness === "parking garage")
            name2 = "PARKHAUS";
          if (userbusiness === "car dealership")
            name2 = "AUTOHAUS";
        }
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You already own a **${name2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language == "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt schon ein **${name2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] BUSINESSBUY : ALREADYBUSINESS`);
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
          id: `1x ${business.toUpperCase()}`,
          amount: cost,
          type: "positive"
        }
      });
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-" + businessid + "-OWNER", ctx.interaction.user.id);
      ctx.bot.businesses.set("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS", business);
      if (business === "market") {
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-1-PRICE-NBOMB", "500");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-1-PRICE-MBOMB", "1500");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-1-PRICE-HBOMB", "5000");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-1-PRICE-CBOMB", "15000");
      }
      if (business === "car dealership") {
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-JEEP", "10000");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-KIA", "75000");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-AUDI", "180000");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-TESLA", "250000");
        ctx.bot.businesses.set("g-" + ctx.interaction.guild.id + "-3-PRICE-PORSCHE", "520000");
      }
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY BUSINESS").setDescription(`\xBB You successfully bought a **${name}** for **$${cost}**!

ID: ${transaction.id}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language == "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GESCH\xC4FT KAUFEN").setDescription(`\xBB Du hast erfolgreich ein **${name}** f\xFCr **${cost}\u20AC** gekauft!

ID: ${transaction.id}`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] BUSINESSBUY : ${name} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
      const business2 = await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS");
      let businessid2;
      if (business2 === "market")
        businessid2 = "1";
      if (business2 === "parking garage")
        businessid2 = "2";
      if (business2 === "car dealership")
        businessid2 = "3";
      let cost2;
      if (business2 === "market")
        cost2 = 15e4;
      if (business2 === "parking garage")
        cost2 = 39e4;
      if (business2 === "car dealership")
        cost2 = 52e4;
      if (await ctx.bot.businesses.get("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS", false) === 0) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own a Business!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt kein Gesch\xE4ft!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] BUSINESSSELL : DONTOWNBUSINESS`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[1].setStyle(2);
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB SELL BUSINESS").setDescription(`\xBB You successfully sold your **${name}** for **$${cost2 / 2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language == "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB GESCH\xC4FT VERKAUFEN").setDescription(`\xBB Du hast erfolgreich dein **${name}** f\xFCr **${cost2 / 2}\u20AC** verkauft!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, cost2 / 2);
      ctx.bot.businesses.del("u-" + ctx.interaction.user.id + "-" + ctx.interaction.guild.id + "-BUSINESS");
      ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-" + businessid2 + "-OWNER");
      if (business2 === "market") {
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-1-PRICE-NBOMB");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-1-PRICE-MBOMB");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-1-PRICE-HBOMB");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-1-PRICE-CBOMB");
      }
      if (business2 === "car dealership") {
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-3-PRICE-JEEP");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-3-PRICE-KIA");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-3-PRICE-AUDI");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-3-PRICE-TESLA");
        ctx.bot.businesses.del("g-" + ctx.interaction.guild.id + "-3-PRICE-PORSCHE");
      }
      ctx.log(false, `[BTN] BUSINESSSELL : ${name} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
