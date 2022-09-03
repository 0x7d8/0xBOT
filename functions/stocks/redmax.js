const stockredmaxschema = require('../../schema/stocks/stockredmax');

exports.getx = (userId) => new Promise(async ful => {
    const data = await stockredmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockredmax);
})

exports.addx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax += stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax
            })
        }
        data.save();
    })
}

exports.remx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax -= stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax: -stockredmax
            })
        }
        data.save();
    })
}