// Business Owner Functions

const business1ownerschema = require('../schema/business/1-owner');

getLb1o = (userId) => new Promise(async ful => {
    const data = await business1ownerschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1owner);
})

addLb1o = (userId, business1owner) => {
    business1ownerschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1owner += business1owner;
        } else {
            data = new business1ownerschema({
                userId,
                business1owner
            })
        }
        data.save();
    })
}

remLb1o = (userId, business1owner) => {
    business1ownerschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1owner -= business1owner;
        } else {
            data = new business1ownerschema({
                userId,
                business1owner: -business1owner
            })
        }
        data.save();
    })
}

export{getLb1o, addLb1o, remLb1o}

// Business Earning Functions

const business1earningschema = require('../schema/business/1-earning');

getLb1e = (userId) => new Promise(async ful => {
    const data = await business1earningschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1earning);
})

addLb1e = (userId, business1earning) => {
    business1earningschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1earning += business1earning;
        } else {
            data = new business1earningschema({
                userId,
                business1earning
            })
        }
        data.save();
    })
}

remLb1e = (userId, business1earning) => {
    business1earningschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1earning -= business1earning;
        } else {
            data = new business1earningschema({
                userId,
                business1earning: -business1earning
            })
        }
        data.save();
    })
}

export{getLb1e, addLb1e, remLb1e}

// Business Upgrade Functions

const business1upgradeschema = require('../schema/business/1-upgrade');

getLb1u = (userId) => new Promise(async ful => {
    const data = await business1upgradeschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1upgrade);
})

addLb1u = (userId, business1upgrade) => {
    business1upgradeschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1upgrade += business1upgrade;
        } else {
            data = new business1upgradeschema({
                userId,
                business1upgrade
            })
        }
        data.save();
    })
}

remLb1u = (userId, business1upgrade) => {
    business1upgradeschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.business1upgrade -= business1upgrade;
        } else {
            data = new business1upgradeschema({
                userId,
                business1upgrade: -business1upgrade
            })
        }
        data.save();
    })
}

export{getLb1u, addLb1u, remLb1u}

// Business Timed Unix Functions

const business1timedunixschema = require('../schema/business/1-timedunix');

getLb1t = (userId) => new Promise(async ful => {
    const data = await business1timedunixschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.business1timedunix);
})

addLb1t = (userId, business1timedunix) => {
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

remLb1t = (userId, business1timedunix) => {
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

export{getLb1t, addLb1t, remLb1t}