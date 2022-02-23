import ProjectModel from "../../model/ProjectModel";

const initState = {
    ProjectList : new Array<ProjectModel>()
};

const ProjectReducer = (state=initState, action:any) => {
    switch (action.type) {
        case 'GET_PROJECT_LIST': {
            return {
                ...state,
                ProjectList: [...state.ProjectList, ...action.payload.projectList as Array<ProjectModel>]
            };
        }
        case 'ADD_PROJECT_LIST': {
            return {
                ...state,
                ProjectList: [...state.ProjectList, action.payload.project]
            };
        }
        case 'UPD_PROJECT_LIST': {
            return {
                ...state,
                ProjectList: state.ProjectList.map(item => item.projectId === action.project.projectId ? action.payload.project : item)
            };
        }
        case 'DEL_PROJECT_LIST': {
            return {
                ...state,
                ProjectList: state.ProjectList.filter(item => item.projectId !== action.payload.project.projectId)
            };
        }
        default:
            return state;
    }
};

export default ProjectReducer;