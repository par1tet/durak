import { Trump } from "../enums/trump"

export abstract class Cart{
    suit: Trump = Trump['diamonds']
    level: number = 6
}