import firebaseapp from "../index"
import { getDatabase, set, ref, runTransaction } from "firebase/database"
import { user } from "../../components/AskName/user"
import SnackbarUtils from "../../components/SnackbarUtils"

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

const createGame = async () => {
    return new Promise((resolve, reject) => {
        const id = makeid(6)                                // random room code
        const cards = shuffle(['A', 'B', 'C', 'D', 'E'])    // 5 cards
        const myName = window.localStorage.getItem("name")
        const myUuid = window.localStorage.getItem("uuid")
    
        if (!myName || !myUuid) reject({status: "error", message: "Player name not found !"})
    
        set(ref(database, 'game/' + id), {
            cards,
            players: {
                joined: 1,
                player1 : {
                    name: myName,
                    uuid: myUuid,
                    selected: null, // Number (index of card selected)
                },
                player2 : null,
                player3 : null,
                player4 : null,
                player5 : null,
            },
            status: "created",
            answer: null,           // A || B || C ... from backend at random
            winner: null            // winner uuid
        }).then(stats => resolve(id)).catch(err => reject(err))
    })
}

const chooseCard = (id, index, mePLayer) => {
    return new Promise((resolve, reject) => {
        runTransaction(ref(database, "game/" + id), post => {
            let flag = true
            for (const player in post.players) {
                if (post.players[player].selected == index.toString()) flag = false
            }
            if (flag) {
                post.players[mePLayer].selected = index
                return post
            } else {
                Promise.reject("Weird error !")
            }
        })
            .then(s => resolve(s))
            .catch(err => reject(err))
    })
}

const register = (id) => {
    return new Promise((resolve, reject) => {

        runTransaction(ref(database, 'game/' + id), post => {
            let flag = true
            if (post.players.joined < 5) {
                if (!post.players.player1) post.players.player1 = {name: user.name, uuid: user.uuid}
                else if (!post.players.player2) post.players.player2 = {name: user.name, uuid: user.uuid}
                else if (!post.players.player3) post.players.player3 = {name: user.name, uuid: user.uuid}
                else if (!post.players.player4) post.players.player4 = {name: user.name, uuid: user.uuid}
                else if (!post.players.player5) post.players.player5 = {name: user.name, uuid: user.uuid}
                else {
                    SnackbarUtils.error("Party is Full !")
                    flag = false
                    reject("Party is Full !")
                    Promise.reject("No Slots empty .")
                }
                if (flag) post.players.joined++
                return post
            }
            else {
                Promise.reject("Party is Full !")
                reject("Party is Full !")
            }
            
        }).then(r => resolve(r)).catch(err => reject(err))
    })
}

export {createGame, database, chooseCard, register}