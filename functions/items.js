const valueSchema = require('../schema/items');

exports.get = (userId, type) => new Promise(async ful => {
    const data = await valueSchema.findOne({ userId });
    if(!data) return ful(0);
    if (type == null) {
        ful(data.value + '-' + data.amount);
    } else if (type == 'value') {
        ful(data.value);
    } else {
        ful(data.amount);
    }
})

exports.set = (userId, value, amount) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            if (value != null) {
                data.value = value;
            }
            if (amount != null) {
                data.amount = amount;
            }
        } else {
            data = new valueSchema({
                userId,
                value,
                amount
            })
        }
        data.save();
    })
}

exports.add = (userId, value, amount) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            if (value != null) {
                data.value += value;
            }
            if (amount != null) {
                data.amount += parseInt(amount);
            }
        } else {
            data = new valueSchema({
                userId,
                value,
                amount
            })
        }
        data.save();
    })
}

exports.rem = (userId, value, amount) => {
    valueSchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            if (value != null) {
                data.value -= value;
            }
            if (amount != null) {
                data.amount -= parseInt(amount);
            }
        } else {
            data = new valueSchema({
                userId,
                value: -value,
                amount: -amount
            })
        }
        data.save();
    })
}