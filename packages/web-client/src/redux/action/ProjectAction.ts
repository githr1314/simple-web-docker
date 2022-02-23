import ProjectModel from "../../model/ProjectModel";
export const GET_PROJECT = 'GET_PROJECT_LIST';
export const ADD_PROJECT = 'ADD_PROJECT_LIST';
export const UPD_PROJECT = 'UPD_PROJECT_LIST';
export const DEL_PROJECT = 'DEL_PROJECT_LIST';

export function getProject(projectList:Array<ProjectModel>) {
    return {
        type: GET_PROJECT,
        payload: {
            projectList
        }
    }
}

export function addProject(project:ProjectModel) {
    return {
        type: ADD_PROJECT,
        payload: {
            project
        }
    }
}

export function updProject(project:ProjectModel) {
    return {
        type: UPD_PROJECT,
        payload: {
            project
        }
    }
}

export function delProject(project:ProjectModel) {
    return {
        type: DEL_PROJECT,
        payload: {
            project
        }
    }
}