# Read Me
------

> this is a simple node command prompt.


## Installation
```shell
yarn add command-prompt
```

##API Examples
```javascript
const prompt = require('command-prompt')
prompt('hello guys').then(anwser=>{
    console.log('anwser',anwser)
})

const {confirm,mutil,password } = prompt

confirm('are you ok?').then(bool=>{
    console.log('bool',bool)
})

mutil(['test 1 ','test 2']).then(anwserArr=>{
    console.log('anwserArr',anwserArr)
})

password('please enter your password').then(password=>{
    console.log('password',password)
})
```

## License
**MIT**