
const DateTime = luxon.DateTime
var elementCache = {}

function getElement(id){
    if (!elementCache[id]) {
        elementCache[id] = document.getElementById(id)
    }

    return elementCache[id]
}

function isPrime(num){
    const ref = Math.sqrt(num)
    var i = 3

    if (num % 2 === 0) { return false }

    while (i < ref) {
        if (num % i === 0) { return false }

        i += 2
    }
    return true
}

// TODO: Days until next birthday
// TODO: Days since birth
// TODO: Export function
const nextFunction = {
    'next_bd': nextBirthday,
    'prime_day_bd': nextPrime,
    'timestamp_day': timestampDay
}


function launchSearch(){
    var d = getElement('date').value
    const list = getElement('history')

    // todo: this works now but maybe it could use a link or button to help with clickability
    var e = document.createElement('li')
    e.innerHTML = d
    e.onclick = () => callHistory(e)
    list.prepend(e)

    callHistory(e)
}

function callHistory(element){
    const d = DateTime.fromISO(element.outerText)

    applyResult(d)
}

function applyResult(date){
    var now = DateTime.now()

    for (const id in nextFunction) {
        e = getElement(id)

        e.innerHTML = nextFunction[id](now, date).toLocaleString({
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}

function nextBirthday(now, base){
    var age = now.year - base.year + 1

    return base.plus({years: age})
}

function nextPrime(now, base) {
    var age = now.year - base.year + 1

    while (!isPrime(age)) {
        age++
    }
    return base.plus({years: age})
}

function timestampDay(now, base) {
    return base.plus({second: 1234567890})
}
