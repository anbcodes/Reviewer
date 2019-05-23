import Screen from "./Screen"
import db from "./DataBase"
import router from "./Router"
import "./WelcomeScreen.sass"
export default class extends Screen {
    constructor() {
        super("Welcome")
        this.createAddVocabText()
        this.createAddVocabButton()
        this.createReviewButton()
        this.createEditButton()
        this.createDebugContainer()
        this.createSaveButton()
        this.createLoadButton()
    }
    createAddVocabButton() {
        this.addVocabButton = document.createElement("button")
        this.addVocabButton.className = `vocabButton-${this.name}`
        this.addVocabButton.innerText = "+"
        this.addVocabButton.onclick = () => {router.to("AddVocab")}
        this.container.appendChild(this.addVocabButton)
    }
    createAddVocabText() {
        this.addVocabText = document.createElement("p")
        this.addVocabText.className = `vocabText-${this.name}`
        this.container.appendChild(this.addVocabText)
        db.getNewItems().then(vocab => {
            this.addVocabText.innerText = `Current number of new items: ${vocab.length}`
        })
    }
    createReviewButton() {
        this.addReviewButton = document.createElement("button")
        this.addReviewButton.className = `reviewButton-${this.name}`
        this.addReviewButton.innerText = "Review"
        this.addReviewButton.onclick = () => router.to("Review")
        this.container.appendChild(this.addReviewButton)
    }
    createEditButton() {
        this.editButton = document.createElement("button")
        this.editButton.className = `editButton-${this.name}`
        this.editButton.innerText = "Edit Items"
        this.editButton.onclick = () => router.to("Edit")
        this.container.appendChild(this.editButton)
    }
    createDebugContainer() {
        this.debugContainer = document.createElement("div")
        this.debugContainer.className = "debugContainer-" + this.name
        this.container.appendChild(this.debugContainer)
    }
    createSaveButton() {
        this.saveButton = document.createElement("button")
        this.saveButton.className = `saveButton-${this.name}`
        this.saveButton.innerText = "Save"
        this.saveButton.onclick = () => this.save()
        this.debugContainer.appendChild(this.saveButton)
    }
    createLoadButton() {
        this.loadButton = document.createElement("button")
        this.loadButton.className = `loadButton-${this.name}`
        this.loadButton.innerText = "load"
        this.loadButton.onclick = () => this.load()
        this.debugContainer.appendChild(this.loadButton)
    }
    onLoad() {
        db.getNewItems().then(vocab => {
            this.addVocabText.innerText = `Current number of new items: ${vocab.length}`
        })
    }
}