const stockgreenschema = require('../../schema/stocks/stockgreen');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockgreenschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreen);
})

exports.add = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen += stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen -= stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen: -stockgreen
            })
        }
        data.save();
    })
}