const msgschema = require('../schema/msgs');

exports.get = (userId) => new Promise(async ful => {
    const data = await msgschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.msgs);
})

exports.add = (userId, msgs) => {
    msgschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.msgs += msgs;
        } else {
            data = new msgschema({
                userId,
                msgs
            })
        }
        data.save();
    })
}

exports.rem = (userId, msgs) => {
    msgschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.msgs -= msgs;
        } else {
            data = new msgschema({
                userId,
                msgs: -msgs
            })
        }
        data.save();
    })
}