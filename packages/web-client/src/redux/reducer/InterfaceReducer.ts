import InterfaceModel from "../../model/InterfaceModel";

const initState = {
    InterfaceList: new Array<InterfaceModel>()
};

const InterfaceReducer = (state=initState, action:any) => {
    switch (action.type) {
        case 'GET_INTERFACE_LIST': {
            return {
                ...state,
                InterfaceList: [...state.InterfaceList, ...action.payload.interfaceList as Array<InterfaceModel>]
            };
        }
        case 'ADD_INTERFACE_LIST': {
            return {
                ...state,
                InterfaceList: [...state.InterfaceList, action.payload.interfaceObj]
            };
        }
        case 'DEL_INTERFACE_LIST': {
            return {
                ...state,
                InterfaceList: state.InterfaceList.filter(item => item.interfaceId !== action.payload.interfaceObj.interfaceId)
            };
        }
        default:
            return state;
    }
};

export default InterfaceReducer;