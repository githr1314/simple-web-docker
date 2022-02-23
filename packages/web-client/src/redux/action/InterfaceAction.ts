import InterfaceModel from "../../model/InterfaceModel";
export const GET_INTERFACE = 'GET_INTERFACE_LIST';
export const ADD_INTERFACE = 'ADD_INTERFACE_LIST';
export const DEL_INTERFACE = 'DEL_INTERFACE_LIST';

export function getInterface(interfaceList:Array<InterfaceModel>) {
    return {
        type: GET_INTERFACE,
        payload: {
            interfaceList
        }
    }
}

export function addInterface(interfaceObj:InterfaceModel) {
    return {
        type: ADD_INTERFACE,
        payload: {
            interfaceObj
        }
    }
}

export function delInterface(interfaceObj:InterfaceModel) {
    return {
        type: DEL_INTERFACE,
        payload: {
            interfaceObj
        }
    }
}