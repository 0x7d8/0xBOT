const apischema = require('../schema/apis');

getapi = (userId) => new Promise(async ful => {
    const data = await apischema.findOne({ userId });
    if(!data) return ful(0);
    ful(data.apis);
})

addapi = (userId, apis) => {
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

remapi = (userId, apis) => {
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

export{getapi, addapi, remapi}