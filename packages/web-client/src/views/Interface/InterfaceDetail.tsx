import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Col, Row, Form, Input, Space, Tabs, Empty, Select, message, Descriptions, Table } from 'antd';
import { CloseOutlined, FileAddOutlined } from '@ant-design/icons';
import Style from './add.scss';
import InterfaceModel from "@/model/InterfaceModel";
import ReqParam from "@/model/ReqParam";
import ResParam from "@/model/ResParam";

const { TabPane } = Tabs;
const { Column } = Table;

function InterfaceDetail(props:any) {
    if(!props.show) {
        return null;
    }
    const interfaceModel = props.interfaceModel;
    // tab标志
    let [tabKey, setTabKey] = useState('1');
    // tab切换-点击
    const tabChange = (data:any) => {
        setTabKey(data);
    }
    // 参数类型
    const typeOptions = (type:string) => {
        if(type === '0') {
            return '常参数';
        }else {
            return '子参数'
        }
    }

    return (
        <div className={Style.content}>
            <Row justify="space-between">
                <Col>
                
                </Col>
                <Col>
                    <Button type="dashed" icon={<CloseOutlined/>} onClick={props.changeShow}></Button>
                </Col>
            </Row>
            <Tabs activeKey={tabKey} onTabClick={tabChange}>
                <TabPane tab="基本信息" key="1">
                    <Descriptions title="">
                        <Descriptions.Item label="接口名称">{interfaceModel.interfaceName}</Descriptions.Item>
                        <Descriptions.Item label="接口类型">{interfaceModel.interfaceType}</Descriptions.Item>
                        <Descriptions.Item label="接口交易码">{interfaceModel.interfaceCode}</Descriptions.Item>
                        <Descriptions.Item label="接口描述">{interfaceModel.interfaceDes}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{interfaceModel.createTime}</Descriptions.Item>
                    </Descriptions>
                </TabPane>
                <TabPane tab="请求参数" key="2">
                    <Table dataSource={interfaceModel.reqParamList}>
                        <Column title="参数名称" dataIndex="paramName" key="paramName" render={(name:string, record:ReqParam) => (
                            record.paramType == '1' ? <span style={{marginLeft: '15px'}}>{name}</span> : name
                        )}/>
                        <Column title="参数描述" dataIndex="paramDes" key="paramDes" />
                        <Column title="参数类型" dataIndex="paramType" key="paramType" render={(text:string, record) => (
                            typeOptions(text)
                        )}/>
                        <Column title="参数备注" dataIndex="mark" key="mark" />
                    </Table>
                </TabPane>
                <TabPane tab="返回参数" key="3">
                    <Table dataSource={interfaceModel.resParamList}>
                        <Column title="参数名称" dataIndex="paramName" key="paramName" render={(name:string, record:ReqParam) => (
                            record.paramType == '1' ? <span style={{marginLeft: '15px'}}>{name}</span> : name
                        )}/>
                        <Column title="参数描述" dataIndex="paramDes" key="paramDes" />
                        <Column title="参数类型" dataIndex="paramType" key="paramType" render={(text:string, record) => (
                            typeOptions(text)
                        )}/>
                        <Column title="参数备注" dataIndex="mark" key="mark" />
                    </Table>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default InterfaceDetail;