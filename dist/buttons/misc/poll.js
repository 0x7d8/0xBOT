"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
data: {
name: 'poll'
},
async execute(ctx, choice) {
const cache = ctx.interaction.message.components[0];
let yes = Number((cache.components[0].data.label.split(' ['))[0]);
let no = Number((cache.components[1].data.label.split(' ['))[0]);
const dbChoice = await ctx.bot.polls.get(ctx.interaction.message.id, ctx.interaction.user.id);
if (dbChoice === '') {
if (choice === 'yes')
yes++;
if (choice === 'no')
no++;
ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'));
}
else {
if ((choice === 'yes') === dbChoice) {
if (dbChoice)
yes--;
if (!dbChoice)
no--;
ctx.bot.polls.del(ctx.interaction.message.id, ctx.interaction.user.id);
}
else {
if (dbChoice)
yes--;
if (!dbChoice)
no--;
if (choice === 'yes')
yes++;
if (choice === 'no')
no++;
ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'));
}
}
if (yes + no === 0) {
ctx.components.rows[0].components[0].setLabel(`0 [0%]`);
ctx.components.rows[0].components[1].setLabel(`0 [0%]`);
}
else {
ctx.components.rows[0].components[0].setLabel(`${yes} [${Math.round(100 * yes / (yes + no))}%]`);
ctx.components.rows[0].components[1].setLabel(`${no} [${Math.round(100 * no / (yes + no))}%]`);
}
ctx.log(false, `[BTN] POLL : ${choice.toUpperCase()}`);
return ctx.interaction.update({ components: (ctx.components.getAPI()) });
}
};
