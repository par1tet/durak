import { useContext } from "react";
import { rootContext } from "../App.tsx";
import { rootStore } from "../store/rootStore.ts";

export function useStore(): never | rootStore {
    const rootStoreContext: rootStore = useContext(rootContext)

    if (rootStoreContext === null){
        throw new Error('rootContext does not exit')
    }

    return rootStoreContext
}