const cmdschema = require('../schema/cmds');

getcmd = (userId) => new Promise(async ful => {
    const data = await cmdschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.cmds);
})

addcmd = (userId, cmds) => {
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

remcmd = (userId, cmds) => {
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

export{getcmd, addcmd, remcmd}