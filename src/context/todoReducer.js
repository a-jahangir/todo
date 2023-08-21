const todoreducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        default:
            return state

    }
}

export default todoreducer