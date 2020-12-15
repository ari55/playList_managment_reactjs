const Discogs = require('disconnect').Client

const userToken = 'ONWOJvxzlRwscFCGGFGJRwtwxDtUebKwhmaKxBWl'

const discogs = new Discogs({ userToken: userToken })

discogs.database.search(params.query, { type: 'master', per_page: 2000 }, function (error, data) {
    resultCallback(data)
})

discogs.database.getMaster(id, function (err, master) {
    resultCallback(master)
})
