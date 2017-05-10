import axios from './config.js'

function getHistoryDate () {
    return axios(`/day/history`)
}

function getDayData (date) {
    if(typeof date == 'string'){
        return axios(`/day/${dateReplace(date)}`)
    }else {
        return Promise.All(date.map(date => axios(`/day${dateReplace(date)}`)))
    }

    function dateReplace (date) {
        return date.replace(/-/g,'/')
    }
}

export default axios

export {
    getHistoryDate,
    getDayData
}