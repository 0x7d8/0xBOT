const stockblackschema = require('../../schema/stocks/stockblack');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockblackschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockblack);
})

exports.add = (userId, stockblack) => {
    stockblackschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblack += stockblack;
        } else {
            data = new stockblackschema({
                userId,
                stockblack
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockblack) => {
    stockblackschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblack -= stockblack;
        } else {
            data = new stockblackschema({
                userId,
                stockblack: -stockblack
            })
        }
        data.save();
    })
}