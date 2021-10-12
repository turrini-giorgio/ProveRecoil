import { atom, DefaultValue, selectorFamily } from "recoil"

export type ServiceDescriptor = {
    id: number,
    name: string,
    url: string,
}

const initialList: ServiceDescriptor[] = [
    {
        id: 1,
        name: 'SdOne',
        url: 'https://sd.one.net',
    },
    {
        id: 2,
        name: 'SdTwo',
        url: 'https://sd.two.net',
    },
    {
        id: 3,
        name: 'SdThree',
        url: 'https://sd.three.net',
    },
    {
        id: 4,
        name: 'SdFour',
        url: 'https://sd.four.net',
    },
    {
        id: 5,
        name: 'SdFive',
        url: 'https://sd.five.net',
    },
]

export const listState = atom({
    key: 'listState',
    default: initialList
})

export const ithSdState = selectorFamily({
    key: 'ithSdState',
    get: (id: number) => ({ get }) => {
        const lista = get(listState)
        if (id >= 1 && id <= lista.length) return lista[id + 1]
    }
})

export const eliminaSdState = selectorFamily({
    key: 'eliminaState',
    get: (id: number) => ({ get }) => get(listState).find(x => x.id === id),
    set: (id: number) => ({ set, get }) => {
        const lista = get(listState)
        const newLista = lista.filter(x => x.id !== id)
        set(listState, newLista)
    }
})

export const newIdState = atom({
    key: 'newIdState',
    default: 100
})

export const listaUpdateState = selectorFamily({
    key: 'listaUpdateState',
    get: (id: number) => ({ get }) => get(listState).find(x => x.id === id),
    set: (id: number) => ({ set, get }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            if (newValue) {
                const newSd = newValue as ServiceDescriptor
                const lista = get(listState)
                if (newSd.id === 0) {
                    const newId = get(newIdState) + 1
                    set(newIdState, newId)
                    newSd.id = newId
                    const newLista = [...lista, newSd]
                    set(listState, newLista)
                } else {
                    const ele = lista.find(x => x.id === newSd.id)
                    if (ele) {
                        const idx = lista.findIndex(x => x.id === ele.id)
                        if (idx >= 0) {
                            const newLista = [...lista.slice(0, idx), newSd, ...lista.slice(idx + 1)]
                            set(listState, newLista)
                        }
                    }
                }
            }
        }
    }
})

