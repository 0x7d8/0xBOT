const apiSchema = require('../schema/userapis');

exports.get = (api) => new Promise(async ful => {
    const data = await apiSchema.findOne({ api });
    if(!data) return ful('N-EXIST')

    ful(data.content)
})

exports.set = (api, content) => {
    apiSchema.findOne({ api }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.content = content
        } else {
            data = new apiSchema({
                api,
                content
            })
        }
        data.save();
    })
}

exports.del = (api) => {
    apiSchema.findOneAndDelete({ api }, async (err, data) => {})
}