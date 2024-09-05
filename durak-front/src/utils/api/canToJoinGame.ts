import axios from "axios";
import { SERVER_URL } from "./serverUrl";

export async function canToJoinGame(token:string): Promise<boolean> {
    let returnResult: boolean = false
    await axios.post(SERVER_URL('/jointogame'),{
        "token": token
    }).then(r => {
        returnResult = r.data.result
    })
    console.log(returnResult)
    return returnResult
}