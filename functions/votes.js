const voteschema = require('../schema/votes');

exports.get = (userId) => new Promise(async ful => {
    const data = await voteschema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.votes);
})

exports.set = (userId, votes) => {
    voteschema.findOne({ userId }, async (err, data) => {
        if(err) throw err;
        if(data) {
            data.votes = votes;
        } else {
            data = new voteschema({
                userId,
                votes
            })
        }
        data.save();
    })
}