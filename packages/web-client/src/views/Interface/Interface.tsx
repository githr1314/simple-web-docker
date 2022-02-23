import React, { Fragment, useState, useEffect } from "react"
import Style from "./style.scss";
import { FormOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Select, Row, Col, Table, Space, Modal, Popconfirm } from "antd";
import InterfaceModel from "../../model/InterfaceModel";
import InterfaceAdd from "./InterfaceAdd";
import InterfaceDetail from "./interfaceDetail";
import store from '../../redux/store/store';
import { addInterface, delInterface } from '../../redux/action/InterfaceAction'

const { Option } = Select;

/**
 * @description 接口管理组件
 * @param props 
 */
const Interface = (props:any) => {
    
    // 控制是否显示新增接口面板
    let [showAdd, setShowAdd] = useState(false);
    let [showDetail, setShowDetail] = useState(false);
    const [dataSource, setDataSource] = useState(store.getState().Interface.InterfaceList);
    const projectList = store.getState().Project.ProjectList;
    let [currentProject, setCurrentProject] = useState('all');
    let [currentInterface, setCurrentInterface] = useState<null|InterfaceModel>(null);
    const columns = [
        {
            title: '接口名称',
            dataIndex: 'interfaceName',
            key: 'interfaceName',
        },
        {
            title: '交易码',
            dataIndex: 'interfaceCode',
            key: 'interfaceCode',
        },
        {
            title: '接口类型',
            dataIndex: 'interfaceType',
            key: 'interfaceType',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text:any, record:InterfaceModel) => (
              <Space>
                <Popconfirm title="确认删除吗？" okText="是" cancelText="否" onConfirm={deleteRecord(record)}>
                    <a>删除</a>
                </Popconfirm>
                <a onClick={interfaceDetailHandle(record)}>详情</a>
              </Space>
            ),
        }
    ];

    const filterInterface = () => {
        if(currentProject === 'all') {
            return dataSource;
        }else {
            return dataSource.filter((val)  => val.projectId === currentProject );
        }
    }
    
    // 增加接口pre
    const addInterfacePre = () => {
        return setShowAdd(showAdd = !showAdd);
    }

    // 接口详情
    const interfaceDetailShow = () => {
        return setShowDetail(showDetail = !showDetail);
    }

    const interfaceDetailHandle = (detail:InterfaceModel) => {
        return (e:any) => {
            setCurrentInterface(currentInterface = detail);
            setShowDetail(showDetail = !showDetail)
        }
    }

    // 删除接口记录
    const deleteRecord = (record:InterfaceModel) => {
        return (e:any) => {
            const list = dataSource;
            list.splice(list.indexOf(record), 1);
            setDataSource([...list]);
            // store同步删除
            store.dispatch(delInterface(record));
        }
    }

    // 接受提交的接口信息
    const submitInterface = (interfaceEntry:InterfaceModel) => {
        setDataSource([
            ...dataSource,
            interfaceEntry
        ]);
        setShowAdd(showAdd = !showAdd);
        store.dispatch(addInterface(interfaceEntry));
    }

    // 选择当前项目
    const changeProject = (e:any) => {
        setCurrentProject(e);
    }

    return (
    <div className={Style.interfaceContent}>
        <Row justify="space-between" style={{padding: '15px'}}>
            <Col span={4}>
                <Select style={{ width: 200 }} placeholder="选择项目" defaultValue='all' onChange={changeProject}>
                    <Option value="all">所有项目</Option>
                    {
                        projectList.map(item => {
                            return <Option key={item.projectId} value={item.projectId}>{item.projectName}</Option>
                        })
                    }
                </Select>
            </Col>
            <Col span={6}>
                <Button type="primary" icon={<FolderAddOutlined />} onClick={addInterfacePre}>添加接口</Button>
            </Col>
        </Row>
        <Table style={{padding: '15px'}} columns={columns} dataSource={filterInterface()} rowKey={record => record.interfaceId} />
        <InterfaceAdd show={showAdd} changeShow={addInterfacePre} submit={submitInterface} />
        <InterfaceDetail show={showDetail} changeShow={interfaceDetailShow} interfaceModel={currentInterface}></InterfaceDetail>
    </div>
    );
}
export default Interface;