module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'tasksTest'
        },
        binary: {
            version: '4.0.2',
            skipMD5: true
        },
        autoStart: false
    }
}