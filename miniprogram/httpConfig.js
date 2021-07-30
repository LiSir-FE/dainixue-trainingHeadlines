const ENV = 'dev'

const baseUrl = {
    dev: 'https://school.donodd.com/',
    pro: 'https://mschool.donodd.com'
}

const picHead = {
    dev: 'https://school.donodd.com/',
    pro: 'https://mschool.donodd.com',
}


module.exports = {
    baseUrl: baseUrl[ENV],
    picHead: picHead[ENV]
}