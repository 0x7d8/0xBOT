const quoteSchema = require('../schema/quotes');

exports.get = (userId) => new Promise(async ful => {
    const data = await quoteSchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.quotes);
})

exports.add = (userId, quotes) => {
    quoteSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.quotes += quotes;
        } else {
            data = new quoteSchema({
                userId,
                quotes
            })
        }
        data.save();
    })
}

exports.rem = (userId, quotes) => {
    quoteSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.quotes -= quotes;
        } else {
            data = new quoteSchema({
                userId,
                quotes: -quotes
            })
        }
        data.save();
    })
}