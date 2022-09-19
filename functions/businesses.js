const valueSchema = require('../schema/businesses');

exports.get = (userId) => new Promise(async ful => {
    const data = await valueSchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.value);
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

exports.add = (userId, value) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.value += value;
        } else {
            data = new valueSchema({
                userId,
                value
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