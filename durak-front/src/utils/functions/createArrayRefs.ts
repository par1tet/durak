import { useRef } from "react"

export function createArrayRefs(count:number): any[]{
    const arrayRefs = []
    for (let i = 0;i !== count;i++){
        arrayRefs.push(useRef(null))
    }
    return arrayRefs
}