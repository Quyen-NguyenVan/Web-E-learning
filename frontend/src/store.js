// src/store.js
import { createStore, combineReducers } from 'redux';

// Dummy reducer (thay thế bằng reducer thực sự của bạn)
const titleReducer = (state = 'Default Title', action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    title: titleReducer, // Đảm bảo rằng reducer của bạn được thêm vào combineReducers
});

const store = createStore(rootReducer);

export default store;
// src/store.js
// import { createStore, combineReducers } from 'redux';
// import exampleReducer from './reducers/exampleReducer';

// const rootReducer = combineReducers({
//     example: exampleReducer,
// });

// const store = createStore(rootReducer);

// export default store;
