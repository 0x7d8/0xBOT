const stockwhiteschema = require('../../schema/stocks/stockwhite');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockwhiteschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockwhite);
})

exports.add = (userId, stockwhite) => {
    stockwhiteschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockwhite += stockwhite;
        } else {
            data = new stockwhiteschema({
                userId,
                stockwhite
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockwhite) => {
    stockwhiteschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockwhite -= stockwhite;
        } else {
            data = new stockwhiteschema({
                userId,
                stockwhite: -stockwhite
            })
        }
        data.save();
    })
}