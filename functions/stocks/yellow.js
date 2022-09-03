const stockyellowschema = require('../../schema/stocks/stockyellow');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockyellowschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellow);
})

exports.add = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow += stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow -= stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow: -stockyellow
            })
        }
        data.save();
    })
}