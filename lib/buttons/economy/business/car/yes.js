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
    name: "car-yes"
  },
  async execute(ctx, car, userid, type) {
    const balance = await ctx.bot.money.get(ctx.interaction.user.id);
    let carvalue;
    if (car === "jeep")
      carvalue = 25;
    if (car === "kia")
      carvalue = 50;
    if (car === "audi")
      carvalue = 75;
    if (car === "tesla")
      carvalue = 100;
    if (car === "porsche")
      carvalue = 200;
    let cost, dopay = false;
    if (await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase()) === "0" || await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase()) === 0) {
      if (car === "jeep")
        cost = 15e3;
      if (car === "kia")
        cost = 75e3;
      if (car === "audi")
        cost = 15e4;
      if (car === "tesla")
        cost = 24e4;
      if (car === "porsche")
        cost = 49e4;
    } else {
      if (type === "buy") {
        cost = Number(await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-PRICE-" + car.toUpperCase()));
        dopay = true;
      } else {
        if (car === "jeep")
          cost = 15e3;
        if (car === "kia")
          cost = 75e3;
        if (car === "audi")
          cost = 15e4;
        if (car === "tesla")
          cost = 24e4;
        if (car === "porsche")
          cost = 49e4;
      }
    }
    let name;
    if (car === "jeep")
      name = "2016 JEEP PATRIOT SPORT";
    if (car === "kia")
      name = "2022 KIA SORENTO";
    if (car === "audi")
      name = "AUDI R8 COUPE V10";
    if (car === "tesla")
      name = "TESLA MODEL Y";
    if (car === "porsche")
      name = "2019 PORSCHE 911 GT2RS";
    if (ctx.interaction.user.id !== userid) {
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB This choice is up to <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Diese Frage ist f\xFCr <@${userid}>!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.log(false, `[BTN] CAR : NOTSENDER`);
      return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
    if (type === "buy") {
      if (balance < cost) {
        const missing = cost - balance;
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont have enough Money for that, you are missing **$${missing}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du hast nicht genug Geld daf\xFCr, dir fehlen **${missing}\u20AC**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] CARBUY : ${name.toUpperCase()} : NOTENOUGHMONEY : ${cost}\u20AC`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      if (await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "amount") !== 0) {
        const dbcar = await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "value");
        if (dbcar == "jeep")
          name = "2016 JEEP PATRIOT SPORT";
        if (dbcar == "kia")
          name = "2022 KIA SORENTO";
        if (dbcar == "audi")
          name = "AUDI R8 COUPE V10";
        if (dbcar == "tesla")
          name = "TESLA MODEL Y";
        if (dbcar == "porsche")
          name = "2019 PORSCHE 911 GT2RS";
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You already own a **${name}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt schon einen **${name}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] CARBUY : ALREADYOWNCAR : ${name}`);
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
          id: `1x ${car.toUpperCase()}`,
          amount: cost,
          type: "positive"
        }
      });
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB BUY CAR").setDescription(`
					\xBB You successfully bought a **${name}** for **$${cost}**!
					
					ID: ${transaction.id}
				`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language == "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXCHECK:1024401101589590156> \xBB AUTO KAUFEN").setDescription(`
						\xBB Du hast erfolgreich einen **${name}** f\xFCr **${cost}\u20AC** gekauft!
						
						ID: ${transaction.id}
					`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
      if (dopay) {
        const businessowner = await ctx.bot.businesses.get("g-" + ctx.interaction.guild.id + "-3-OWNER");
        if (car === "jeep") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 5e3);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-3-EARNING", cost - 5e3);
        }
        if (car === "kia") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 5e4);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-3-EARNING", cost - 5e4);
        }
        if (car === "audi") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 15e4);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-3-EARNING", cost - 15e4);
        }
        if (car === "tesla") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 22e4);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-3-EARNING", cost - 26e4);
        }
        if (car === "porsche") {
          ctx.bot.money.add(ctx.interaction.guild.id, businessowner, cost - 4e5);
          ctx.bot.businesses.add("g-" + ctx.interaction.guild.id + "-3-EARNING", cost - 5e5);
        }
      }
      ctx.bot.items.set(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, car, carvalue);
      ctx.log(false, `[BTN] CARBUY : ${name} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    } else if (type === "sell") {
      if (await ctx.bot.items.get(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id, "amount") === 0) {
        let message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB ERROR").setDescription(`\xBB You dont own a Car!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        if (ctx.metadata.language === "de") {
          message2 = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:EXCLAMATION:1024407166460891166> \xBB FEHLER").setDescription(`\xBB Du besitzt kein Auto!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] CARSELL : DONTOWNCAR`);
        return ctx.interaction.reply({ embeds: [message2], ephemeral: true });
      }
      ctx.components.rows[0].components[0].setDisabled(true);
      ctx.components.rows[0].components[1].setDisabled(true);
      ctx.components.rows[0].components[1].setStyle(2);
      let message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB SELL CAR").setDescription(`\xBB You successfully sold your **${name}** for **$${cost / 2}**!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      if (ctx.metadata.language === "de") {
        message = new import_discord.EmbedBuilder().setColor(3604635).setTitle("<:BOXDOLLAR:1024402261784403999> \xBB AUTO VERKAUFEN").setDescription(`\xBB Du hast erfolgreich deinen **${name}** f\xFCr **${cost / 2}\u20AC** verkauft!`).setFooter({ text: "\xBB " + ctx.metadata.vote.text + " \xBB " + ctx.client.config.version });
      }
      ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, cost / 2);
      ctx.bot.items.del(ctx.interaction.user.id + "-CAR-" + ctx.interaction.guild.id);
      ctx.log(false, `[BTN] CARSELL : ${name} : CONFIRM`);
      return ctx.interaction.update({ embeds: [message], components: ctx.components.getAPI() });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=yes.js.map
