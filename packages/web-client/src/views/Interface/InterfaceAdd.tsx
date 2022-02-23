import React, { useState } from "react";
import { Modal, Button, Col, Row, Form, Input, Space, Tabs, Empty, Select, message } from 'antd';
import { CloseOutlined, FileAddOutlined } from '@ant-design/icons';
import Style from './add.scss'
import InterfaceModel from "../../model/InterfaceModel";
import ReqParam from "../../model/ReqParam";
import ResParam from "../../model/ResParam";
import store from "../../redux/store/store";
import guid from '../../components/common/util';

const { TabPane } = Tabs;
const { Option } = Select;
const typeOptions = [{label: '常参数', value: '0'}, {label: '子参数', value: '1'}];
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 2 },
};

/**
 * @description 接口编辑组件
 * @param props 
 */
const InterfaceAdd = (props:any) => {
    if(!props.show) {
        return null;
    }
    // 添加的接口信息
    let [interfaceInfo, setInterfaceInfo] = useState(new InterfaceModel('', guid(), '', '', '', '', new Date().toLocaleString(), new Date().toLocaleString(), null, null));
    // 可选项目列表
    const projectList = store.getState().Project.ProjectList;
    // 接口基本信息表单
    const [formBase] = Form.useForm();
    // 请求参数列表
    let [reqParamList, setReqParamList] = useState(new Array<ReqParam>());
    // 返回参数列表
    let [resParamList, setResParamList] = useState(new Array<ResParam>());
    // tab标志
    let [tabKey, setTabKey] = useState('1');
    // tab切换-点击
    const tabChange = (data:any) => {
        setTabKey(data);
    }
    // 基本信息提交
    const baseInfoConfirm = (values:any) => {
        setInterfaceInfo({
            ...interfaceInfo,
            projectId: values.projectId,
            interfaceName: values.interfaceName,
            interfaceType: values.interfaceType,
            interfaceDes: values.interfaceDes,
            interfaceCode: values.interfaceCode
        })
        setTabKey('2');
    }
    // 切换tab-下一步
    const nextStep = (step:string) => {
        return (e:any) => {
            if(Number(tabKey) > Number(step)) return;
            if(step === '3' && !checkReqParam()) {
                message.error('请完善你的请求参数信息');
                return;
            }
            if(step === '4') {
                if(!checkResParam()) {
                    message.error('请完善你的返回参数信息');
                    return
                }
                interfaceInfo.reqParamList = reqParamList;
                interfaceInfo.resParamList = resParamList;
                props.submit(Object.assign({}, interfaceInfo));
                return
            }
            return setTabKey(step);
        }
    }

    // 检查请求参数
    const checkReqParam = () => {
        return reqParamList.length > 0 ? reqParamList.every((req, index) => req.paramName != '' && req.paramType != '') : true;
    }

    // 检查返回参数
    const checkResParam = () => {
        return resParamList.length > 0 ? resParamList.every((res, index) => res.paramName != '' && res.paramType != '') : true;
    }

    // 保存接口按钮
    const saveButton = <Button type="primary">保存接口</Button>

    // 新增一列请求参数
    const addReqParam = () => {
        setReqParamList([...reqParamList, new ReqParam('1', guid(), '', '', '', '')]);
    }

    // 删除一列请求参数
    const deleteReqParam = (val:any, arr:Array<ReqParam>) => {
        return (e:any) => {
            const temp = arr;
            temp.splice(temp.indexOf(val), 1);
            setReqParamList([...temp]);
        }
    }

    // 处理请求参数的input
    const handleReqInput = (index:number, key:keyof ReqParam, arr:Array<ReqParam>) => {
        return (e:any) => {
            arr[index][key] = e.currentTarget?.value || (typeof e == 'string' ? e : '');
            if(e === '1') {
                arr[index].paramName = '    ';
            }
            setReqParamList([...arr]);
        }
    }

    // 请求参数列表
    const addReqList = reqParamList.map((val, index, arr) => {
        return (
        <Row justify="space-between" key={index} style={{ margin: "10px 0" }}>
            <Col span="5"><Input placeholder="参数名称" value={val.paramName} onChange={handleReqInput(index, 'paramName', arr)} /></Col>
            <Col span="5"><Input placeholder="参数描述" value={val.paramDes} onChange={handleReqInput(index, 'paramDes', arr)}/></Col>
            <Col span="3">
                <Select style={{ width: 120 }} placeholder="参数类型" value={val.paramType} onChange={handleReqInput(index, 'paramType', arr)}>
                    {typeOptions.map((val, index) => <Option key={index} value={val.value}>{val.label}</Option>)}
                </Select>
            </Col>
            <Col span="5"><Input placeholder="参数备注" value={val.mark} onChange={handleReqInput(index, 'mark', arr)}/></Col>
            <Col span="4"><Button danger onClick={deleteReqParam(val, reqParamList)}>删除</Button></Col>
        </Row>
        );
    });

    // 新增一列返回参数
    const addResParam = () => {
        setResParamList([...resParamList, new ResParam('1', guid(), '', '', '', '')]);
    }

    // 删除一列返回参数
    const deleteResParam = (val:any, arr:Array<ResParam>) => {
        return (e:any) => {
            const temp = arr;
            temp.splice(temp.indexOf(val), 1);
            setResParamList([...temp]);
        }
    }

    // 处理返回参数的input
    const handleResInput = (index:number, key:keyof ResParam, arr:Array<ResParam>) => {
        return (e:any) => {
            arr[index][key] = e.currentTarget?.value || (typeof e == 'string' ? e : '');
            if(e === '1') {
                arr[index].paramName = '    ';
            }
            setResParamList([...arr]);
        }
    }

    // 请求返回列表
    const addResList = resParamList.map((val, index, arr) => {
        return (
        <Row justify="space-between" key={index} style={{ margin: "10px 0" }}>
            <Col span="5"><Input placeholder="参数名称" value={val.paramName} onChange={handleResInput(index, 'paramName', arr)} /></Col>
            <Col span="5"><Input placeholder="参数描述" value={val.paramDes} onChange={handleResInput(index, 'paramDes', arr)}/></Col>
            <Col span="3">
                <Select style={{ width: 120 }} placeholder="参数类型" value={val.paramType} onChange={handleResInput(index, 'paramType', arr)}>
                    {typeOptions.map((val, index) => <Option key={index} value={val.value}>{val.label}</Option>)}
                </Select>
            </Col>
            <Col span="5"><Input placeholder="参数备注" value={val.mark} onChange={handleResInput(index, 'mark', arr)}/></Col>
            <Col span="4"><Button danger onClick={deleteResParam(val, resParamList)}>删除</Button></Col>
        </Row>
        );
    });


    return (
        <div className={Style.content}>
            <Row justify="space-between">
                <Col>
                    <h1>新增接口</h1>
                </Col>
                <Col>
                    <Button type="dashed" icon={<CloseOutlined/>} onClick={props.changeShow}></Button>
                </Col>
            </Row>
            <Tabs activeKey={tabKey} onTabClick={tabChange}>
                <TabPane tab="基本信息" key="1">
                    <Form {...layout} form={formBase} onFinish={baseInfoConfirm}>
                        <Form.Item label="所属项目" name="projectId" rules={[{ required: true, message: '请选择所属项目' }]}>
                            <Select>
                                {
                                    projectList.map(item => {
                                        return <Option key={item.projectId} value={item.projectId}>{item.projectName}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="接口名称" name="interfaceName" rules={[{ required: true, message: '请输入接口名称' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="接口类型" name="interfaceType" rules={[{ required: true, message: '请选择接口类型' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="接口交易码" name="interfaceCode" rules={[{ required: true, message: '请输入接口交易码' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="接口描述" name="interfaceDes" rules={[{ required: true, message: '请输入接口描述' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Button type="primary" htmlType="submit">
                                下一步
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="请求参数" key="2">
                    <Row justify="center" style={{marginBottom: '15px'}}>
                        <Col>
                            <Button type="primary" icon={<FileAddOutlined/>} onClick={addReqParam}>增加参数</Button>
                        </Col>
                        <Col offset={2}>
                            <Button type="primary" icon={<FileAddOutlined/>} onClick={nextStep('3')}>下一步</Button>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span="5"><span>参数名称</span></Col>
                        <Col span="5"><span>参数描述</span></Col>
                        <Col span="3"><span>参数类型</span></Col>
                        <Col span="5"><span>参数备注</span></Col>
                        <Col span="4"><span>操作</span></Col>
                    </Row>
                    {   reqParamList.length > 0 ? addReqList : 
                        <Empty description="您还未创建请求参数" />
                    }
                </TabPane>
                <TabPane tab="返回参数" key="3">
                    <Row justify="center" style={{marginBottom: '15px'}}>
                        <Col>
                            <Button type="primary" icon={<FileAddOutlined/>} onClick={addResParam}>增加参数</Button>
                        </Col>
                        <Col offset={2}>
                            <Button type="primary" icon={<FileAddOutlined/>} onClick={nextStep('4')}>保存接口</Button>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span="5"><span>参数名称</span></Col>
                        <Col span="5"><span>参数描述</span></Col>
                        <Col span="3"><span>参数类型</span></Col>
                        <Col span="5"><span>参数备注</span></Col>
                        <Col span="4"><span>操作</span></Col>
                    </Row>
                    {   resParamList.length > 0 ? addResList : 
                        <Empty description="您还未创建返回参数" />
                    }
                </TabPane>
            </Tabs>
        </div>
    );
}

export default InterfaceAdd;