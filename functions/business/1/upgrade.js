const business1upgradeschema = require('../../../schema/business/1-upgrade');

exports.get = (userId) => new Promise(async ful => {
    const data = await business1upgradeschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1upgrade);
})

exports.add = (userId, business1upgrade) => {
    business1upgradeschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1upgrade += business1upgrade;
        } else {
            data = new business1upgradeschema({
                userId,
                business1upgrade
            })
        }
        data.save();
    })
}

exports.rem = (userId, business1upgrade) => {
    business1upgradeschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1upgrade -= business1upgrade;
        } else {
            data = new business1upgradeschema({
                userId,
                business1upgrade: -business1upgrade
            })
        }
        data.save();
    })
}