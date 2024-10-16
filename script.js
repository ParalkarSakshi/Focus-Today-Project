const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFilds = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressLable = document.querySelector('.progress-lable')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'well begun is half done!',
    'Just a step away, keep going!',
    'Whoo! You just completed all the goals, time for chill :)'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    // first: {
    //     name: '',
    //     completed: false
    // },
    // second: {
    //     name: '',
    //     completed: false
    // },
    // third: {
    //     name: '',
    //     completed: false
    // }
}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${completedGoalsCount / inputFilds.length * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFilds.length} completed`
progressLable.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allGoalsAdded = [...inputFilds].every(function (input) {
            return input.value
        })

        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalsCount / inputFilds.length * 100}%`;
            progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFilds.length} completed`
            progressLable.innerText = allQuotes[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            //   errorLabel.style.display = 'block'
            progressBar.classList.add('show-error')
        }
    })
})

inputFilds.forEach((input) => {

    if(allGoals[input.id]){
        input.value = allGoals[input.id].name;
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    // input.value = allGoals[input.id].name

    // if (allGoals[input.id].completed) {
    //     input.parentElement.classList.add('completed')
    // }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {

        if (allGoals[input.id] && allGoals[input.id].completed) {
            e.target.value = allGoals[input.id].name
            return
        }
        if(allGoals[input.id]) {
            allGoals[input.id].name = input.value
        } else {
            allGoals[input.id] = {
                name : input.value,
                completed : false
            }
        }

        // if (allGoals[input.id].completed) {
        //     // input.value = allGoals[input.id].name
        //     e.target.value = allGoals[input.id].name
        //     return
        // }

        // allGoals[input.id] = {
        //     name: input.value,
        //     completed: false
        // }
        // allGoals[input.id].name = input.value

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})