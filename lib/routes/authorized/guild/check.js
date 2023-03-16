"use strict";
module.exports = {
method: 'GET',
path: '/check/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ success: false, message: 'NO ID' });
let status = true;
await ctr['@'].client.guilds.fetch(ctr.queries.get('id')).catch(() => { status = false; });
return ctr.print({
success: status
});
}
};
//# sourceMappingURL=check.js.map