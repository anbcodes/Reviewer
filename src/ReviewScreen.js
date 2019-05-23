import router from "./Router"
import db from "./DataBase"
import Screen from "./Screen"
import "./ReviewScreen.sass"
export default class extends Screen {
    constructor () {
        super("Review")
        
    }
    checkIfCount() {
        let last = new Date(localStorage.getItem("lastTimeReviewed"))
        let current = new Date()
        if (this.dateEqual(last, current)) {
            return false
        }
        return true
    }
    dateEqual(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate())
    }
    getReviewing(vocab) {
        let currentDate = new Date()
        vocab.filter(item => {
            if (this.dateEqual(currentDate, new Date(item.lastShow))) {
                return true
            } else if (this.dateEqual(currentDate, new Date(item.nextShow))) {
                return true
            }
        });
        return vocab
    }
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
    key(e) {
        if (this.loaded && !this.rightButton.disabled) {
            if (e.key === "1" || e.key === "r") {
                this.right()
            } else if (e.key === "2" || e.key === "w") {
                this.wrong()
            }
        }
    }
    createCard() {
        this.card = document.createElement("button")
        this.card.className = "card-" + this.name
        this.card.onclick = () => this.showAnswer()
        this.container.appendChild(this.card)
    }
    showAnswer() {
        this.rightButton.disabled = false
        this.wrongButton.disabled = false
        if (this.showing === "question") {
            this.card.innerText = this.currentVocab.answer
            this.showing = "answer"
        } else if (this.showing === "answer") {
            this.card.innerText = this.currentVocab.question
            this.showing = "question"
        }
    }
    createButtonContainer() {
        this.buttonContainer = document.createElement("div")
        this.buttonContainer.className = "buttonContainer-" + this.name
        this.container.appendChild(this.buttonContainer)
    }
    createRightButton() {
        this.rightButton = document.createElement("button")
        this.rightButton.className = "rightButton-" + this.name
        this.rightButton.innerText = "Right!"
        this.rightButton.onclick = () => this.right()
        this.buttonContainer.appendChild(this.rightButton)
    }
    createWrongButton() {
        this.wrongButton = document.createElement("button")
        this.wrongButton.className = "wrongButton-" + this.name
        this.rightButton.innerText = "Wrong!"
        this.wrongButton.onclick = () => this.wrong()
        this.buttonContainer.appendChild(this.wrongButton)
    }
    right() {
        if (this.doesCount) {
            this.currentVocab.rightRow += 1
            if (this.currentVocab.rightRow > 20) {
                if (this.currentVocab.level === "new") {
                    db.moveItemToReview(this.currentVocab)
                } else if (this.currentVocab.level === "review") {
                    db.moveItemToMaster(this.currentVocab)
                }
            }
        }
    }
    wrong() {
        if (this.doesCount) {
            this.currentVocab.rightRow = 0
        }
        this.next()
    }
    next() {
        this.rightButton.disabled = true
        this.wrongButton.disabled = true
        this.currentVocabNumber += 1
        this.currentVocab = this.vocab[this.currentVocabNumber]
        this.showing = "question"
        if (this.vocab.length < currentVocabNumber-1) {
            localStorage.setItem("lastTime", new Date().toISOString())
            router.to("Welcome")

        }
        this.card.innerText = this.currentVocab.question
    }
    onLoad() {
        this.loaded = true
        this.doesCount = this.checkIfCount()
        this.currentVocab = {}
        this.showing = ""
        this.loaded = false
        this.currentVocabNumber = -1
        db.getAllItems().then(vocab => {
            this.vocab = this.getReviewing(vocab)
            this.vocab = shuffle(this.vocab)
            document.body.onkeypress = e => this.key(e)
            this.createCard()
            this.createButtonContainer()
            this.createRightButton()
            this.createWrongButton()
        })
        this.next()
    }
}