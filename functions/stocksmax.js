// Green

const stockgreenmaxschema = require('../schema/stocks/stockgreenmax');

getgrnx = (userId) => new Promise(async ful => {
    const data = await stockgreenmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockgreenmax);
})

addgrnx = (userId, stockgreenmax) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax += stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax
            })
        }
        data.save();
    })
}

remgrnx = (userId, stockblue) => {
    stockgreenmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockgreenmax -= stockgreenmax;
        } else {
            data = new stockgreenmaxschema({
                userId,
                stockgreenmax: -stockgreenmax
            })
        }
        data.save();
    })
}

export{getgrnx, addgrnx, remgrnx}

// Blue

const stockbluemaxschema = require('../schema/stocks/stockbluemax');

getblux = (userId) => new Promise(async ful => {
    const data = await stockbluemaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockbluemax);
})

addblux = (userId, stockbluemax) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax += stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax
            })
        }
        data.save();
    })
}

remblux = (userId, stockblue) => {
    stockbluemaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockbluemax -= stockbluemax;
        } else {
            data = new stockbluemaxschema({
                userId,
                stockbluemax: -stockbluemax
            })
        }
        data.save();
    })
}

export{getblux, addblux, remblux}

// Yellow

const stockyellowmaxschema = require('../schema/stocks/stockyellowmax');

getyllx = (userId) => new Promise(async ful => {
    const data = await stockyellowmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockyellowmax);
})

addyllx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax += stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax
            })
        }
        data.save();
    })
}

remyllx = (userId, stockyellowmax) => {
    stockyellowmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockyellowmax -= stockyellowmax;
        } else {
            data = new stockyellowmaxschema({
                userId,
                stockyellowmax: -stockyellowmax
            })
        }
        data.save();
    })
}

export{getyllx, addyllx, remyllx}

// Red

const stockredmaxschema = require('../schema/stocks/stockredmax');

getredx = (userId) => new Promise(async ful => {
    const data = await stockredmaxschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.stockredmax);
})

addredx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax += stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax
            })
        }
        data.save();
    })
}

remredx = (userId, stockredmax) => {
    stockredmaxschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.stockredmax -= stockredmax;
        } else {
            data = new stockredmaxschema({
                userId,
                stockredmax: -stockredmax
            })
        }
        data.save();
    })
}

export{getredx, addredx, remredx}