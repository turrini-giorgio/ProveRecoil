import { atom, DefaultValue, selector, selectorFamily } from "recoil"

export type ServiceDescriptor = {
    id: number,
    name: string,
    url: string,
}

export type UiSdElement = {
    old: ServiceDescriptor,
    current: ServiceDescriptor,
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
const getUiSdElements = (initialList: ServiceDescriptor[]) => {
    return initialList.map<UiSdElement>(x => ({ old: x, current: x }))
}

export const listState = atom({
    key: 'listState',
    default: getUiSdElements(initialList)
})

export const ithSdState = selectorFamily({
    key: 'ithSdState',
    get: (id: number) => ({ get }) => {
        const lista = get(listState)
        if (id >= 1 && id <= lista.length) return lista[id + 1]
    }
})

// Note: using a sparse list oblige to maintain the sparseness

export const eliminaSdState = selectorFamily({
    key: 'eliminaState',
    get: (id: number) => ({ get }) => get(listState).find(x => x.current.id === id),
    set: (id: number) => ({ set, get }) => {
        const lista = get(listState)
        const newLista = lista.slice()
        delete(newLista[id - 1])
        set(listState, newLista)
    }
})

export const newIdState = atom({
    key: 'newIdState',
    default: 100
})

// export const listaUpdateState = selectorFamily({
//     key: 'listaUpdateState',
//     get: (id: number) => ({ get }) => get(listState).find(x => x.current.id === id)?.current,
//     set: (id: number) => ({ set, get }, newValue) => {
//         if (!(newValue instanceof DefaultValue)) {
//             if (newValue) {
//                 const newSd = newValue as ServiceDescriptor
//                 const lista = get(listState)
//                 if (newSd.id === 0) {
//                     const newId = get(newIdState) + 1
//                     set(newIdState, newId)
//                     newSd.id = newId
//                     const newLista = [...lista, { old: newSd, current: newSd }]
//                     set(listState, newLista)
//                 } else {
//                     const idx = lista.findIndex(x => x.current.id === newSd.id)
//                     if (idx >= 0) {
//                         const newLista = [...lista.slice(0, idx), { old: newSd, current: newSd }, ...lista.slice(idx + 1)]
//                         set(listState, newLista)
//                     }
//                 }
//             }
//         }
//     }
// })

// export const listaUpdateCurrentState = selectorFamily({
//     key: 'listaUpdateCurrentState',
//     get: (id: number) => ({ get }) => get(listState).find(x => x.current.id === id)?.current as ServiceDescriptor,
//     set: (id: number) => ({ set, get }, newValue) => {
//         if (!(newValue instanceof DefaultValue)) {
//             if (newValue) {
//                 const newSd = newValue as ServiceDescriptor
//                 const lista = get(listState)
//                 if (newSd.id === 0) {
//                     const newId = get(newIdState) + 1
//                     set(newIdState, newId)
//                     newSd.id = newId
//                     const newLista = [...lista, { old: newSd, current: newSd }]
//                     set(listState, newLista)
//                 } else {
//                     const idx = lista.findIndex(x => x.current.id === newSd.id)
//                     if (idx >= 0) {
//                         const newLista = [...lista.slice(0, idx), { old: lista[idx].old, current: newSd }, ...lista.slice(idx + 1)]
//                         set(listState, newLista)
//                     }
//                 }
//             }
//         }
//     }
// })

export const sdCurrentState = selectorFamily<ServiceDescriptor, number>({
    key: 'sdCurrentState',
    get: (id: number) => ({ get }) => get(listState)[id - 1]?.current,
    set: (id: number) => ({ set, get }, nv) => {
        // console.log('sdCurrentState.set', nv)
        if (nv && !(nv instanceof DefaultValue)) {
            const lista = get(listState)
            const newLista = lista.slice(0)
            // console.log(`sdCurrentState.set ${nv.id} => ${nv.name}`, newLista)
            if (nv.id === 0) {
                const newId = get(newIdState) + 1
                set(newIdState, newId)
                nv.id = newId
                newLista[nv.id - 1] = ({ old: nv, current: nv })
                set(listState, newLista)
            } else {
                const temp = newLista[nv.id - 1]
                if (temp) {
                    const newSd = { ...temp.current, ...nv }
                    newLista[nv.id - 1] = ({ old: temp.old, current: newSd })
                    // console.log('...', newLista)
                    set(listState, newLista)
                }
            }
        }
    }
})
export const updateState = selector<UiSdElement[]>({
    key: 'updateState',
    get: ({ get }) => get(listState),
    set: ({get,set}) => {
        const lista = get(listState)
        const newLista = lista.slice()
        for(const x in newLista) {
            const ele = newLista[x]
            const nuovo = { old: {...ele.current}, current: {...ele.current}}
            newLista[x] = nuovo
        }
        set(listState, newLista)
    }
})