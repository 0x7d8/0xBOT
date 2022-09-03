const moneySchema = require('../schema/money');

getbal = (userId) => new Promise(async ful => {
    const data = await moneySchema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.money);
})

addbal = (userId, money) => {
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

rembal = (userId, money) => {
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

export{getbal, addbal, rembal}