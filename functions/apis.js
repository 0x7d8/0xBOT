const apischema = require('../schema/apis');

exports.get = (userId) => new Promise(async ful => {
    const data = await apischema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.apis);
})

exports.add = (userId, apis) => {
    apischema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.apis += apis;
        } else {
            data = new apischema({
                userId,
                apis
            })
        }
        data.save();
    })
}

exports.rem = (userId, apis) => {
    apischema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.apis -= apis;
        } else {
            data = new apischema({
                userId,
                apis: -apis
            })
        }
        data.save();
    })
}