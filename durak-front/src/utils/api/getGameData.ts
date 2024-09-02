import axios from "axios";

export async function getGameData(token: string){
    let result = {}

    await axios.post('http://localhost:5000/getgame', {
        token: token
    }).then(r => {
        result = r.data
    })

    console.log(result)

    return result
}