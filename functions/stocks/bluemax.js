const stockbluemaxschema = require('../../schema/stocks/stockbluemax');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockbluemaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockbluemax);
})

exports.add = (userId, stockbluemax) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax += stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockblue) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax -= stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax: -stockbluemax
            })
        }
        data.save();
    })
}