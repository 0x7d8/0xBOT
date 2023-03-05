"use strict";
module.exports = {
method: 'GET',
path: '/stats/user',
async code(ctr) {
return ctr.print({
"success": true,
"commands": await ctr['@'].bot.stat.get(`u-${ctr["@"].user.id}`, 'cmd'),
"buttons": await ctr['@'].bot.stat.get(`u-${ctr["@"].user.id}`, 'btn'),
"modals": await ctr['@'].bot.stat.get(`u-${ctr["@"].user.id}`, 'mod')
});
}
};
//# sourceMappingURL=stats.js.map