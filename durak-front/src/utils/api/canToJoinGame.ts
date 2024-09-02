import axios from "axios";

export async function canToJoinGame(token:string) {
    let returnResult: string = ''
    await axios.post('http://localhost:5000/jointogame',{
        "token": token
    }).then(r => {
        returnResult = r.data.result
    })
    return returnResult
}