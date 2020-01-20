import _ from 'lodash'
import './css/index.css'
import './css/test.css'
require('./js/test')

// 我是一个注释

const env = process.env.NODE_ENV

function component() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['我的环境变量', env], ' ')
    element.classList.add('hello')
    return element
}

console.log(process.env.NODE_ENV,"process.env.NODE_ENV")

document.querySelector("#app").appendChild(component())