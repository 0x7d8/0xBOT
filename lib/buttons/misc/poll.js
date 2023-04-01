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
var poll_exports = {};
__export(poll_exports, {
  default: () => poll_default
});
module.exports = __toCommonJS(poll_exports);
var poll_default = {
  data: {
    name: "poll"
  },
  async execute(ctx, choice) {
    const cache = ctx.interaction.message.components[0];
    let yes = Number(cache.components[0].data.label.split(" [")[0]);
    let no = Number(cache.components[1].data.label.split(" [")[0]);
    const dbChoice = await ctx.bot.polls.get(ctx.interaction.message.id, ctx.interaction.user.id);
    if (dbChoice === "") {
      if (choice === "yes")
        yes++;
      if (choice === "no")
        no++;
      ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, choice === "yes");
    } else {
      if (choice === "yes" === dbChoice) {
        if (dbChoice)
          yes--;
        if (!dbChoice)
          no--;
        ctx.bot.polls.del(ctx.interaction.message.id, ctx.interaction.user.id);
      } else {
        if (dbChoice)
          yes--;
        if (!dbChoice)
          no--;
        if (choice === "yes")
          yes++;
        if (choice === "no")
          no++;
        ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, choice === "yes");
      }
    }
    if (yes + no === 0) {
      ctx.components.rows[0].components[0].setLabel(`0 [0%]`);
      ctx.components.rows[0].components[1].setLabel(`0 [0%]`);
    } else {
      ctx.components.rows[0].components[0].setLabel(`${yes} [${Math.round(100 * yes / (yes + no))}%]`);
      ctx.components.rows[0].components[1].setLabel(`${no} [${Math.round(100 * no / (yes + no))}%]`);
    }
    ctx.log(false, `[BTN] POLL : ${choice.toUpperCase()}`);
    return ctx.interaction.update({ components: ctx.components.getAPI() });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=poll.js.map
