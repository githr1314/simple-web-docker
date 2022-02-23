class ProjectModel {
    constructor(id: string, name: string, des: string, num: number) {
        this.projectId = id;
        this.projectName = des;
        this.projectDes = des;
        this.interfaceNum = num;
    }
    projectId: string;
    projectName: string;
    projectDes: string;
    interfaceNum: number;
}
export default ProjectModel;