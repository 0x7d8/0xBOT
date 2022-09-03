const business1earningschema = require('../../../schema/business/1-earning');

exports.get = (userId) => new Promise(async ful => {
    const data = await business1earningschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1earning);
})

exports.add = (userId, business1earning) => {
    business1earningschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1earning += business1earning;
        } else {
            data = new business1earningschema({
                userId,
                business1earning
            })
        }
        data.save();
    })
}

exports.rem = (userId, business1earning) => {
    business1earningschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1earning -= business1earning;
        } else {
            data = new business1earningschema({
                userId,
                business1earning: -business1earning
            })
        }
        data.save();
    })
}