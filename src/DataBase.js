import Dexie from "dexie"
class DataBase {
    constructor() {
        this.db = this.getOrCreateDB()
    }
    getOrCreateDB() {
        let db = new Dexie("ReviewGame")
        db.version(1).stores({
            items: `key++, question, answer, level, rightRow, lastShow, nextShow`,
        });
        return db
    }
    async getNewItems() {
        let vocab = await this.db.items.where({level: "new"})
        return await vocab.toArray()
    }
    async addNewItem(question, answer) {
        let date = new Date()
        let tomorowDate = new Date()
        tomorowDate.setDate(tomorowDate.getDate()+1)
        this.db.items.add({
            question: question,
            answer: answer,
            level: "new",
            lastShow: date.toISOString(),
            nextShow: tomorowDate.toISOString(),
            rightRow: 0
        })
    }
    async moveItemToReview(item) {
        let toAdd = {
            question: item.question,
            answer: item.answer,
            level: "Review",
            lastShow: item.lastShow,
            nextShow: item.nextShow,
            rightRow: 0
        }
        this.db.items.put(toAdd, item.key)
    }
    async moveItemToMaster(item) {
        let toAdd = {
            question: item.question,
            answer: item.answer,
            level: "Master",
            lastShow: item.lastShow,
            nextShow: item.nextShow,
            rightRow: 0
        }
        this.db.items.put(toAdd, item.key)
    }
    async getAllItems() {
        return await this.db.items.toArray()
    }
}
export default new DataBase()