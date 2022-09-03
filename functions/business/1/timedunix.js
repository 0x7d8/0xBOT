const business1timedunixschema = require('../../../schema/business/1-timedunix');

exports.get = (userId) => new Promise(async ful => {
    const data = await business1timedunixschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1timedunix);
})

exports.add = (userId, business1timedunix) => {
    business1timedunixschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1timedunix += business1timedunix;
        } else {
            data = new business1timedunixschema({
                userId,
                business1timedunix
            })
        }
        data.save();
    })
}

exports.rem = (userId, business1timedunix) => {
    business1timedunixschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1timedunix -= business1timedunix;
        } else {
            data = new business1timedunixschema({
                userId,
                business1timedunix: -business1timedunix
            })
        }
        data.save();
    })
}