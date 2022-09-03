// Green

const stockgreenschema = require('../schema/stocks/stockgreen');

getgrn = (userId) => new Promise(async ful => {
    const data = await stockgreenschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreen);
})

addgrn = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen += stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen
            })
        }
        data.save();
    })
}

remgrn = (userId, stockgreen) => {
    stockgreenschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreen -= stockgreen;
        } else {
            data = new stockgreenschema({
                userId,
                stockgreen: -stockgreen
            })
        }
        data.save();
    })
}

export{getgrn, addgrn, remgrn}

// Blue

const stockblueschema = require('../schema/stocks/stockblue');

getblu = (userId) => new Promise(async ful => {
    const data = await stockblueschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockblue);
})

addblu = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue += stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue
            })
        }
        data.save();
    })
}

remblu = (userId, stockblue) => {
    stockblueschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockblue -= stockblue;
        } else {
            data = new stockblueschema({
                userId,
                stockblue: -stockblue
            })
        }
        data.save();
    })
}

export{getblu, addblu, remblu}

// Yellow

const stockyellowschema = require('../schema/stocks/stockyellow');

getyll = (userId) => new Promise(async ful => {
    const data = await stockyellowschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellow);
})

addyll = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow += stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow
            })
        }
        data.save();
    })
}

remyll = (userId, stockyellow) => {
    stockyellowschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellow -= stockyellow;
        } else {
            data = new stockyellowschema({
                userId,
                stockyellow: -stockyellow
            })
        }
        data.save();
    })
}

export{getyll, addyll, remyll}

// Red

const stockredschema = require('../schema/stocks/stockred');

getred = (userId) => new Promise(async ful => {
    const data = await stockredschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockred);
})

addred = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred += stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred
            })
        }
        data.save();
    })
}

remred = (userId, stockred) => {
    stockredschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockred -= stockred;
        } else {
            data = new stockredschema({
                userId,
                stockred: -stockred
            })
        }
        data.save();
    })
}

export{getred, addred, remred}