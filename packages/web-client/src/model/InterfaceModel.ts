import ReqParam from "./ReqParam";
import ResParam from "./ResParam";

class InterfaceModel {
    constructor(pId:string, id:string, name:string, type:string, code:string, des:string, createTime:string, updateTime:string, req:Array<ReqParam>|null, res:Array<ResParam>|null) {
        this.projectId = pId || '';
        this.interfaceId = id || '';
        this.interfaceName = name || '';
        this.interfaceType = type || '';
        this.interfaceCode = code || '';
        this.interfaceDes = des || '';
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.reqParamList = req || null;
        this.resParamList = res || null;
    }
    // 项目id
    projectId: string;
    // 接口id
    interfaceId: string;
    // 接口名称
    interfaceName: string;
    // 接口类型
    interfaceType: string;
    // 接口交易码
    interfaceCode: string;
    // 接口描述
    interfaceDes: string;
    // 创建时间
    createTime: string;
    // 更新时间
    updateTime: string;
    // 请求参数列表
    reqParamList: Array<ReqParam> | null;
    // 返回参数列表
    resParamList: Array<ResParam> | null;
}

export default InterfaceModel;