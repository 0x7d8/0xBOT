const stockyellowmaxschema = require('../../schema/stocks/stockyellowmax');

exports.getx = (userId) => new Promise(async ful => {
    const data = await stockyellowmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellowmax);
})

exports.addx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax += stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax
            })
        }
        data.save();
    })
}

exports.remx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax -= stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax: -stockyellowmax
            })
        }
        data.save();
    })
}