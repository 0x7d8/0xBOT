const cmdschema = require('../schema/cmds');

exports.get = (userId) => new Promise(async ful => {
    const data = await cmdschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.cmds);
})

exports.add = (userId, cmds) => {
    cmdschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.cmds += cmds;
        } else {
            data = new cmdschema({
                userId,
                cmds
            })
        }
        data.save();
    })
}

exports.rem = (userId, cmds) => {
    cmdschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.cmds -= cmds;
        } else {
            data = new cmdschema({
                userId,
                cmds: -cmds
            })
        }
        data.save();
    })
}