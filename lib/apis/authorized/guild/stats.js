"use strict";
module.exports = {
method: 'GET',
path: '/stats/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ "success": false, "message": 'NO ID' });
return ctr.print({
"success": true,
"commands": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'cmd'),
"buttons": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'btn'),
"modals": await ctr['@'].bot.stat.get(`g-${ctr.queries.get('id')}`, 'mod')
});
}
};
//# sourceMappingURL=stats.js.map