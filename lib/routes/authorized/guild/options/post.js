"use strict";
module.exports = {
method: 'POST',
path: '/options/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ success: false, message: 'NO ID' });
if (!('option' in ctr.body) || !('value' in ctr.body))
return ctr.status(422).print({ success: false, message: 'INVALID BODY' });
let response = { success: false, message: 'NOT FOUND' };
if (ctr.body.option === 'LANGUAGE') {
if (ctr.body.value !== 'GERMAN' && ctr.body.value !== 'ENGLISH')
return ctr.print({ success: false, message: 'INVALID VALUE' });
let set = 'en';
if (ctr.body.value === 'GERMAN') {
set = 'de';
}
ctr['@'].bot.language.set(ctr.queries.get('id'), set);
response = { success: true, message: 'OPTION UPDATED' };
}
if (ctr.body.option !== 'LANGUAGE') {
if (ctr.body.value !== true && ctr.body.value !== false)
return ctr.print({ success: false, message: 'INVALID VALUE' });
ctr['@'].bot.settings.set(ctr.queries.get('id'), ctr.body.option.toLowerCase(), ctr.body.value);
response = { success: true, message: 'OPTION UPDATED' };
}
return ctr.print(response);
}
};
//# sourceMappingURL=post.js.map