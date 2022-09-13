class User {
    constructor () {
        this.name = window.localStorage.getItem("name")
        this.uuid = window.localStorage.getItem("uuid")
    }

    refresh () {
        this.name = window.localStorage.getItem("name")
        this.uuid = window.localStorage.getItem("uuid")
    }
}
const user = new User()
export {user}