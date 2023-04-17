const linksTheme = document.querySelectorAll('.content__theme__link')
const body = document.getElementById('body')

const calculatorScreen = document.querySelector('.calculator__screen')
const buttonsNumbers = document.querySelectorAll('.button__number')
const buttonsOperators = document.querySelectorAll('.button__operator')

const buttonEqual = document.querySelector('.button__equal')
const buttonReset = document.getElementById('reset')
const buttonDelete = document.getElementById('delete')

// CHANGE THEME

linksTheme.forEach((link, index)=>{
    link.addEventListener('click', ()=>{
        changeTheme(index)
    })
})

function changeTheme(index){
   switch(index){
        case 0:
            body.classList.remove('theme-two', 'theme-three')
        break
        case 1:
            body.classList.add('theme-two')
            body.classList.remove('theme-three')
        break
        case 2:
            body.classList.add('theme-three') 
        break
   }
}

// VARIABLES

let currentOper = ""
let previousOper = ""
let operation = undefined

// CLICK EVENTS

buttonsNumbers.forEach((buttonNumber)=>{
    buttonNumber.addEventListener('click', ()=> addNumber(buttonNumber.innerHTML))
})

buttonsOperators.forEach((buttonOperator)=>{
    buttonOperator.addEventListener('click', ()=> selectOperator(buttonOperator.innerHTML))
})

buttonEqual.addEventListener('click', ()=> {
    calculate()
    updateDisplay()
})

buttonReset.addEventListener('click', ()=> {
    reset()
    updateDisplay()
})

buttonDelete.addEventListener('click', ()=> {
    deleteNum()
    updateDisplay()
})
    

// FUNCTIONS

function updateDisplay(){ calculatorScreen.innerHTML = currentOper.toString().slice(0, 10) }

function addNumber(number){
    if(number === "." && calculatorScreen.innerHTML.includes('.')) return
    currentOper === "0" ? currentOper = number : currentOper = currentOper.toString() + number.toString()
    updateDisplay()
}

function selectOperator(operator){
    if(currentOper === "") return
    if(previousOper != ""){
        calculate()
    }
    operation = operator.toString()
    previousOper = currentOper
    currentOper = ""
}

function calculate(){
    let calculation
    const previous = parseFloat(previousOper)
    const current = parseFloat(currentOper)
    if(isNaN(previous) || isNaN(current)) return
    switch(operation){
        case "+":
            calculation = previous + current
        break
        case "-":
            calculation = previous - current
        break
        case "x":
            calculation = previous * current
        break
        case "/":
            calculation = previous / current
        break
        default:
            return
    }
    calculation === Infinity ? currentOper = 'Error' : currentOper = calculation
    operation = undefined
    previousOper = ""
}

function deleteNum(){
    currentOper === 'Error' ? currentOper = "" : currentOper = currentOper.toString().slice(0, -1) 
}

function reset(){
    currentOper = ""
    previousOper = ""
    operation = undefined
}



