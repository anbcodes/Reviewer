import router from "./Router"
import db from "./DataBase"
import Screen from "./Screen"
import "./AddItemScreen.sass"
export default class extends Screen {
    constructor() {
        super("AddVocab")
        this.createInputContainer()
        this.createQuestionContainer()
        this.createAnswerContainer()
        this.createQuestionText()
        this.createQuestionEntry()
        this.createAnswerText()
        this.createAnswerEntry()
        this.createSubmitButton()
    }
    createInputContainer() {
        this.inputContainer = document.createElement("div")
        this.inputContainer.className = "inputContainer-" + this.name
        this.container.appendChild(this.inputContainer)
    }
    createQuestionContainer() {
        this.questionContainer = document.createElement("div")
        this.questionContainer.className = "questionContainer-" + this.name
        this.inputContainer.appendChild(this.questionContainer)
    }

    createAnswerContainer() {
        this.answerContainer = document.createElement("div")
        this.answerContainer.className = "answerContainer-" + this.name
        this.inputContainer.appendChild(this.answerContainer)
    }

    createQuestionText() {
        this.questionText = document.createElement("p")
        this.questionText.className = "questionText-" + this.name
        this.questionText.innerText = "Question"
        this.questionContainer.appendChild(this.questionText)
    }

    createQuestionEntry() {
        this.questionEntry = document.createElement("textarea")
        this.questionEntry.className = "questionEntry-" + this.name
        this.questionEntry.cols = 50
        this.questionEntry.rows = 6
        this.questionContainer.appendChild(this.questionEntry)
    }

    createAnswerText() {
        this.answerText = document.createElement("p")
        this.answerText.className = "answerText-" + this.name
        this.answerText.innerText = "Answer"
        this.answerContainer.appendChild(this.answerText)
    }

    createAnswerEntry() {
        this.answerEntry = document.createElement("textarea")
        this.answerEntry.cols = 50
        this.answerEntry.rows = 6
        this.answerEntry.className = "answerEntry-" + this.name
        this.answerContainer.appendChild(this.answerEntry)
    }

    createSubmitButton() {
        this.submitButton = document.createElement("button")
        this.submitButton.innerText = "Add"
        this.submitButton.className = "submitButton-" + this.name
        this.submitButton.onclick = () => this.submit()
        this.container.appendChild(this.submitButton)
    }

    submit() {
        db.addNewItem(this.questionEntry.value, this.answerEntry.value)
        router.to("Welcome")
    }
}