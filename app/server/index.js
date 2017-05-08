const config = {
    timeout: 10000,
}

function timeout(timeout = config.timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'))
        }, timeout)
    })
}

function test() {
    return new Promise((resolve, reject) => {
        resolve({a:false})
    })
}


function http(url) {
    return Promise.race([fetch(url), timeout()])
        .then(res => {
            return res.json()
            // if (res.a) {
            //     return res
            // }else {
            //     console.log('错错')
            // }
        })
        .catch(error => {
            console.log(error)
        })
}

export default http;