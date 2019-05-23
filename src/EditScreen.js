import Screen from "./Screen"
import Router from "./Router"
import db from "./DataBase"

export default class extends Screen {
    constructor() {
        super("Edit")
        this.createTopText()
    }
    onLoad() {
        this.createItemsList()
        this.createSubmitButton()
    }
}