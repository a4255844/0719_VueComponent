import logo from './assets/imgs/logo.png'
import test from './assets/imgs/test.png'
import './assets/css/my.css'

const image = new Image()
const image2 = new Image()
image.src = logo
image2.src = test
document.body.appendChild(image)
document.body.appendChild(image2)
document.getElementById('root').innerHTML = '<h1>Hello222</h1>'