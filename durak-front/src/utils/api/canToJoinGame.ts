import axios from "axios";
import { SERVER_URL } from "./serverUrl";

export async function canToJoinGame(token:string): Promise<boolean | string> {
    let returnResult: boolean = false
    await axios.post(SERVER_URL('/jointogame'),{
        "token": token
    }).then(r => {
        returnResult = r.data.result
    })
    return returnResult
}