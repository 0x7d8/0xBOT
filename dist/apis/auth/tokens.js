"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
type: rjweb_server_1.default.types.get,
path: '/auth/tokens',
async code(ctr) {
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr.api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
return ctr.print({
"success": true,
"tokens": {
"access": userInfos.tokens.access,
"refresh": userInfos.tokens.refresh
}
});
}
};
//# sourceMappingURL=tokens.js.map