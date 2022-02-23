import React, { Fragment, useEffect } from "react"
import Style from './style.scss';
import { FormOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Space, Empty, Button, Drawer, Form, Input, Popconfirm } from "antd";
import ProjectModel from "../../model/ProjectModel";
import { FormInstance } from "antd/lib/form";
import store from '../../redux/store/store';
import { addProject, updProject, delProject } from '../../redux/action/ProjectAction'
import guid from '../../components/common/util';

interface IProps {}
interface IState {
    projectList: Array<ProjectModel>,
    createDrawerVisible: boolean,
    updateDrawerVisible: boolean,
    formLayout: {[index:string]:any},
    buttonLayout: {[index:string]:any},
    updateProject: ProjectModel
}

class Project extends React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.state = {
            createDrawerVisible: false,                                    // 新增表单显示标志
            updateDrawerVisible: false,                                    // 修改表单显示标志
            projectList: store.getState().Project.ProjectList,             // 项目列表集合
            formLayout: {                                                  // 表单样式
                labelCol: { span: 6 },
                wrapperCol: { span: 10 },
            },
            buttonLayout: {                                 // 按钮样式
                wrapperCol: { offset: 6 },
            },
            updateProject: new ProjectModel('','','',0)     // 正在修改的项目
        };
    }
    createFormRef = React.createRef<FormInstance>();        // 新增项目表单对象
    updateFormRef = React.createRef<FormInstance>();        // 修改项目表单对象

    /**
     * @description 渲染项目内容
     */
    renderContent = () => {
        return (
        <div className={Style.projectContent}>
            <div className={Style.addBar}>
                <Space>
                    <Button type="primary" icon={<FolderAddOutlined />} 
                        onClick={() => this.setState({createDrawerVisible: true})}>新增项目</Button>
                </Space>
            </div>
            <div className={Style.projectList}>
                {this.renderList(this.state.projectList)}
            </div>
        </div>
        );
    }

    /**
     * @description 渲染项目列表块
     * @param list 渲染的项目列表数组
     */
    renderList(list: Array<ProjectModel>):Array<JSX.Element> {
        const projectListJsx:Array<JSX.Element> = [];
        let key = 0;
        for(const project of list) {
            let projectJsx = (
                <div className={Style.project} key={key++}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div className={Style.title}>
                            <span>{project.projectName}</span>
                            <Button shape="circle" type="primary" icon={<FormOutlined />} size="small" onClick={this.updateProjectPre(project)}></Button>
                        </div>
                        <div className={Style.des}>
                            <span>{project.projectDes}</span>
                        </div>
                        <div className={Style.delete}>
                            <span>接口个数：{project.interfaceNum}</span>
                            <Popconfirm title="确认删除吗？" okText="是" cancelText="否" onConfirm={this.deleteProject(project)}>
                                <Button shape="circle" danger icon={<DeleteOutlined />} size="small"></Button>
                            </Popconfirm>
                        </div>
                    </Space>
                </div>
            );
            projectListJsx.push(projectJsx);
        }
        return projectListJsx;
    }

    /**
     * @description 删除项目
     */
    deleteProject = (project:ProjectModel) => {
        return (e:any) => {
            const { projectList } = this.state;
            const index = projectList.indexOf(project);
            projectList.splice(index, 1);
            this.setState({
                projectList: projectList
            });
            // store中也同步删除
            store.dispatch(delProject(project));
        }
    }

    /**
     * @description 清楚表单输入内容
     */
    cleanForm = (form:string) => {
        return (e:any) => {
            this.setState({
                createDrawerVisible: false,
                updateDrawerVisible: false
            });
            form === 'create' ? 
            this.createFormRef.current?.resetFields() : 
            this.updateFormRef.current?.resetFields();
        }
    }

    /**
     * @description 渲染空区域
     */
    renderEmpty = () => {
        return (
        <Fragment>
            <Empty description="暂无项目，请创建项目">
                <Button type="primary" onClick={() => this.setState({createDrawerVisible: true})}>创建项目</Button>
            </Empty>
        </Fragment>
        );
    }

    /**
     * @description 打开编辑项目的Drawer组件
     * @param project 选中的项目
     */
    updateProjectPre = (project:ProjectModel) => {
        return (e:any) => {
            this.setState({
                updateDrawerVisible: true,
                updateProject: project
            });
            setTimeout(() => {
                this.updateFormRef.current?.setFieldsValue({
                    projectName: project.projectName,
                    projectDes: project.projectDes
                });
            }, 100);
        }
    }

    /**
     * @description 渲染修改项目区域
     */
    renderUpdateDrawer = () => {
        // 修改项目信息
        const onFinish = (values: any):void => {
            const { updateProject } = this.state;
            updateProject.projectName = values.projectName;
            updateProject.projectDes = values.projectDes;
            this.setState({
                updateDrawerVisible: false
            });
            // store同步更新项目
            store.dispatch(updProject(updateProject));
            this.updateFormRef.current?.resetFields();
        }
        return (
        <Drawer title="修改项目" placement="top" width={"40%"}
            closable={false} onClose={this.cleanForm('update')} 
            visible={this.state.updateDrawerVisible}>
            <Form {...this.state.formLayout} ref={this.updateFormRef} onFinish={onFinish}>
                <Form.Item label="项目名称" name="projectName" rules={[{ required: true, message: '请输入项目名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="项目描述" name="projectDes" rules={[{ required: true, message: '请输入项目描述' }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...this.state.buttonLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">修改</Button>
                        <Button onClick={this.cleanForm('update')}>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
        );
    }

    /**
     * @description 渲染增加项目区域
     */
    renderCreateDrawer = () => {
        // 新增项目
        const onFinish = (values: any):void => {
            let { projectList } = this.state;
            const newProject = new ProjectModel(guid(), values.projectName, values.projectDes, 0);
            this.setState({
                projectList: [...projectList, newProject],
                createDrawerVisible: false
            })
            // store同步增加项目
            store.dispatch(addProject(newProject));
            // 清空表单
            this.createFormRef.current?.resetFields();
        }
        return (
        <Drawer title="新增项目" placement="top" width={"40%"}
            closable={false} onClose={this.cleanForm('create')} 
            visible={this.state.createDrawerVisible}>
            <Form {...this.state.formLayout} ref={this.createFormRef} onFinish={onFinish}>
                <Form.Item label="项目名称" name="projectName" rules={[{ required: true, message: '请输入项目名称' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="项目描述" name="projectDes" rules={[{ required: true, message: '请输入项目描述' }]}>
                    <Input />
                </Form.Item>
                <Form.Item {...this.state.buttonLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">创建</Button>
                        <Button onClick={this.cleanForm('create')}>取消</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
        );
    }

    render() {
        return (
            <>  
                <this.renderCreateDrawer />
                <this.renderUpdateDrawer />
                {this.state.projectList.length > 0 ? this.renderContent() : this.renderEmpty()}
            </>
        );
    }
}


export default Project;