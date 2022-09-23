const valueSchema = require('../schema/businesses');

exports.get = (userId, type) => new Promise(async ful => {
    const data = await valueSchema.findOne({ userId });
    if(!data) return ful(0);
    if (!type) {
        ful(data.value);
    } else {
        ful(data.integer);
    }
})

exports.set = (userId, value) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.value = value;
        } else {
            data = new valueSchema({
                userId,
                value
            })
        }
        data.save();
    })
}

exports.add = (userId, integer) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.integer += parseInt(integer);
        } else {
            data = new valueSchema({
                userId,
                integer
            })
        }
        data.save();
    })
}

exports.rem = (userId, value) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.value -= value;
        } else {
            data = new valueSchema({
                userId,
                value: -value
            })
        }
        data.save();
    })
}