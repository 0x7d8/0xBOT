const btnschema = require('../schema/btns');

exports.get = (userId) => new Promise(async ful => {
    const data = await btnschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.btns);
})

exports.add = (userId, btns) => {
    btnschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.btns += btns;
        } else {
            data = new btnschema({
                userId,
                btns
            })
        }
        data.save();
    })
}

exports.rem = (userId, btns) => {
    btnschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.btns -= btns;
        } else {
            data = new btnschema({
                userId,
                btns: -btns
            })
        }
        data.save();
    })
}