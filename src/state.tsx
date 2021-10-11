import { atom, selectorFamily } from "recoil"

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
    get: (id: number) => ({get}) => {
        const lista = get(listState)
        if(id >= 1 && id <= lista.length) return lista[id + 1]
    }
})