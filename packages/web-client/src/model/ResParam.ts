class ResParam {
    constructor(iId:string, id:string, name:string, des:string, type:string, mark:string) {
        this.interfaceId = iId || '';
        this.paramId = id || '';
        this.paramName = name || '';
        this.paramDes = des || '';
        this.paramType = type || '';
        this.mark = mark || '';
    }
    // 接口id
    interfaceId: string;
    // 返回参数id
    paramId: string;
    // 返回参数名称
    paramName: string;
    // 返回参数描述
    paramDes: string;
    // 返回参数类型
    paramType: string;
    // 返回参数备注
    mark: string;
}

export default ResParam;