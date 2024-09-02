import axios from "axios";

export async function canToJoinGame(token:string): Promise<boolean> {
    let returnResult: boolean = false
    await axios.post('http://localhost:5000/jointogame',{
        "token": token
    }).then(r => {
        returnResult = r.data.result
    })
    console.log(returnResult)
    return returnResult
}