const marketSchema = require('../../schema/business/market');

exports.get = (userId) => new Promise(async ful => {
    const data = await marketSchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.market);
})

exports.set = (userId, market) => {
    marketSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.market = market;
        } else {
            data = new marketSchema({
                userId,
                market
            })
        }
        data.save();
    })
}

exports.add = (userId, market) => {
    marketSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.market += market;
        } else {
            data = new marketSchema({
                userId,
                market
            })
        }
        data.save();
    })
}

exports.rem = (userId, market) => {
    marketSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.market -= market;
        } else {
            data = new marketSchema({
                userId,
                market: -market
            })
        }
        data.save();
    })
}