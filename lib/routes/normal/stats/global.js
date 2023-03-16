"use strict";
module.exports = {
method: 'GET',
path: '/stats/global',
async code(ctr) {
return ctr.print({
success: true,
commands: Number(await ctr['@'].bot.stat.get(`t-all`, 'cmd')),
buttons: Number(await ctr['@'].bot.stat.get(`t-all`, 'btn')),
modals: Number(await ctr['@'].bot.stat.get(`t-all`, 'mod'))
});
}
};
//# sourceMappingURL=global.js.map