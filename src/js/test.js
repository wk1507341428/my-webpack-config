import $ from 'jquery'
import _ from 'lodash'


console.log($,"我是test文件夹")

let es7 = [1,2,3].includes(3)

console.log(es7,"es7")

async function async1() {
    console.log("async1 start");
    await async2()
    console.log("async1 end");
};

async function async2() {
    console.log("async2 start");
    console.log("async2 end");
};

async1();

[1,2,3,4].forEach(element => {
    console.log(element,"<<<<")
})

console.log('123'.split(''))