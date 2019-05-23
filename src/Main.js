import WelcomeScreen from "./WelcomeScreen"
import AddVocabScreen from "./AddItemScreen"
import ReviewScreen from "./ReviewScreen"
import EditScreen from "./EditScreen"
import router from "./Router"
export default class Main {
    constructor() {
        this.WelcomeScreen = new WelcomeScreen()
        this.AddVocabScreen = new AddVocabScreen()
        this.ReviewScreen = new ReviewScreen()
        this.EditScreen = new EditScreen()
        router.to("Welcome")
        console.log("worked")
    }
}