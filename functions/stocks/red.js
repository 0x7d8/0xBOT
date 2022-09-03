const stockredschema = require('../../schema/stocks/stockred');

exports.get = (userId) => new Promise(async ful => {
    const data = await stockredschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockred);
})

exports.add = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred += stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred
            })
        }
        data.save();
    })
}

exports.rem = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred -= stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred: -stockred
            })
        }
        data.save();
    })
}