const langschema = require('../schema/langs');

exports.get = (userId) => new Promise(async ful => {
    const data = await langschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.langs);
})

exports.add = (userId, langs) => {
    langschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.langs += langs;
        } else {
            data = new langschema({
                userId,
                langs
            })
        }
        data.save();
    })
}

exports.rem = (userId, langs) => {
    langschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.langs -= langs;
        } else {
            data = new langschema({
                userId,
                langs: -langs
            })
        }
        data.save();
    })
}