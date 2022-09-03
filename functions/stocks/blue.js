const stockblueschema = require('../../schema/stocks/stockblue');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockblueschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockblue);
})

exports.add = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue += stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue -= stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue: -stockblue
            })
        }
        data.save();
    })
}