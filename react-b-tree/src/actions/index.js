export const insert = (element) => {
    return {
        type: "INSERT",
        payload: element
    }
}
export const erase = (element) => {
    return {
        type: "ERASE",
        payload: element
    }
}

export const initialize = (degree) => {
    return {
        type: "INITIALIZE",
        payload: degree
    }
}