const stockSchema = require('../schema/stockprices')

exports.get = (stock) => new Promise(async ful => {
    const data = await stockSchema.findOne({ stock })
    if(!data) return ful(0)

    // Output
    const out = []
    out[0] = data.value
    out[1] = data.last_value
    ful(out)
})