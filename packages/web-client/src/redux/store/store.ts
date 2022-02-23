import {createStore, combineReducers} from 'redux'
import ProjectReducer from '../reducer/ProjectReducer';
import InterfaceReducer from '../reducer/InterfaceReducer';


const rootReducer = combineReducers({
    Project: ProjectReducer,
    Interface: InterfaceReducer
});

const store = createStore(rootReducer);

export default store;