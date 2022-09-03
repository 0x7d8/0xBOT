const business1ownerschema = require('../../../schema/business/1-owner');

exports.get = (userId) => new Promise(async ful => {
    const data = await business1ownerschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1owner);
})

exports.add = (userId, business1owner) => {
    business1ownerschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1owner += business1owner;
        } else {
            data = new business1ownerschema({
                userId,
                business1owner
            })
        }
        data.save();
    })
}

exports.rem = (userId, business1owner) => {
    business1ownerschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1owner -= business1owner;
        } else {
            data = new business1ownerschema({
                userId,
                business1owner: -business1owner
            })
        }
        data.save();
    })
}