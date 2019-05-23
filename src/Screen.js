import router from "./Router"
export default class {
    constructor(name) {
        this.name = name
        this.container = this.createContainer()
        router.add(name, this)
    }
    createContainer() {
        let container = document.createElement("div")
        container.className = this.name + "Screen"
        container.display = "none"
        return container
    }
    hide() {
        container.display = "none"
    }
    show() {
        container.display = ""
    }
}