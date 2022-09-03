const quoteSchema = require('../schema/quotes');

getqut = (userId) => new Promise(async ful => {
    const data = await quoteSchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.quotes);
})

addqut = (userId, quotes) => {
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

remqut = (userId, quotes) => {
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

export{getqut, addqut, remqut}