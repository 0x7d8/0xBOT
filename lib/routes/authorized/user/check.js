"use strict";
module.exports = {
method: 'GET',
path: '/auth/check',
async code(ctr) {
return ctr.print({
success: true
});
}
};
//# sourceMappingURL=check.js.map