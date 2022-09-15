const goptschema = require('../schema/gopts');

exports.get = (userId) => new Promise(async ful => {
    const data = await goptschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.gopts);
})

exports.add = (userId, gopts) => {
    goptschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.gopts += gopts;
        } else {
            data = new goptschema({
                userId,
                gopts
            })
        }
        data.save();
    })
}

exports.rem = (userId, gopts) => {
    goptschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.gopts -= gopts;
        } else {
            data = new goptschema({
                userId,
                gopts: -gopts
            })
        }
        data.save();
    })
}