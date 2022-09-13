import firebaseapp from "../index"
import { getDatabase } from "firebase/database"

const database = getDatabase(firebaseapp)

// credits https://stackoverflow.com/a/1349426
function makeid(length) {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

// credits https://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
}

const createGame = () => {
    const id = makeid(6)

}