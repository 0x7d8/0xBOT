"use strict";
module.exports = {
method: 'GET',
path: '/fetch/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ success: false, message: 'NO ID' });
let cont = true;
const guild = await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => {
cont = false;
return ctr.print({ success: false, message: 'INVALID GUILD' });
});
if (cont)
return ctr.print({
success: true,
...guild
});
}
};
//# sourceMappingURL=fetch.js.map