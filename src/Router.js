class Router {
    constructor() {
        this.routes = {}
    }
    add(name, screen) {
        this.routes[name] = screen
    }
    to(name) {
        document.body.innerHTML = ""
        document.body.appendChild(this.routes[name].container)
        if (this.routes[name].onLoad) {
            this.routes[name].onLoad()
        }
    }
}
export default new Router()