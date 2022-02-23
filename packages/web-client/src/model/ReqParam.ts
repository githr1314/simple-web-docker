class ReqParam {
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
    // 请求参数id
    paramId: string;
    // 请求参数名称
    paramName: string;
    // 请求参数描述
    paramDes: string;
    // 请求参数类型
    paramType: string;
    // 请求参数备注
    mark: string;
}

export default ReqParam;