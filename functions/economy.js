const moneySchema = require('../schema/money');

exports.get = (userId) => new Promise(async ful => {
    const data = await moneySchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.money);
})

exports.add = (userId, money) => {
    moneySchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.money += money;
        } else {
            data = new moneySchema({
                userId,
                money
            })
        }
        data.save();
    })
}

exports.rem = (userId, money) => {
    moneySchema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.money -= money;
        } else {
            data = new moneySchema({
                userId,
                money: -money
            })
        }
        data.save();
    })
}