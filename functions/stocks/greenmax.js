const stockgreenmaxschema = require('../../schema/stocks/stockgreenmax');

exports.getx = (userId) => new Promise(async ful => {
    const data = await stockgreenmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreenmax);
})

exports.addx = (userId, stockgreenmax) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax += stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax
            })
        }
        data.save();
    })
}

exports.remx = (userId, stockblue) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax -= stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax: -stockgreenmax
            })
        }
        data.save();
    })
}