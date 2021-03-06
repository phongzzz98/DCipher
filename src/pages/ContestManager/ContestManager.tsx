import { Row, Col, Input, Button, Table, Modal } from 'antd'
import { ContainerOutlined, FileProtectOutlined, BarChartOutlined, EditOutlined, DeleteFilled, EyeOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import './ContestManagerStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApplicationDispatch } from '../../store/store';
import { deleteProblemAction, getAllProblemAction, getAllProblemAdminAction } from '../../redux/actions/ContestAction';
import { allProblemsAdminSelector, allProblemsSelector } from '../../redux/reducers/ContestReducer';
import { IAdminProblemItem } from '../../redux/interface/ContestType';
import { CreateContestModal } from './components/CreateContestModal/CreateContestModal';
import { EditContestModal } from './components/EditContestModal/EditContestModal';

export const ContestManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [searchProb, setSearchProb] = useState('')
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [problemID, setProblemID] = useState(0);
    const problemList = useSelector(allProblemsSelector)
    const problemAdminList = useSelector(allProblemsAdminSelector)
    const [cloneProblemList, setCloneProblemList] = useState([...problemAdminList])
    const timeSolved = problemList.map((prob) => prob.user_solved.length).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    const easyListNumber = problemList.filter((prob) => prob.rank === 0).length
    const mediumListNumber = problemList.filter((prob) => prob.rank === 1).length
    const hardListNumber = problemList.filter((prob) => prob.rank === 2).length

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllProblemAction())
            await dispatch(getAllProblemAdminAction())
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        if (problemAdminList.every((prob) => prob.title !== null || prob.question !== null)) {
            const tempList = problemAdminList.filter((prob) => prob.title.toLowerCase().includes(searchProb.toLowerCase()) || prob.question.toLowerCase().includes(searchProb.toLowerCase()))
            setCloneProblemList(tempList)
        }
        else
            setCloneProblemList(problemAdminList)
    }, [problemAdminList, searchProb])

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'B???n ch???c ch???n mu???n x??a b??i n??y?',
            icon: <ExclamationCircleOutlined />,
            okText: 'X??a',
            okType: 'danger',
            cancelText: 'H???y',
            async onOk() {
                await dispatch(deleteProblemAction(id))
                await dispatch(getAllProblemAction())
                await dispatch(getAllProblemAdminAction())
                navigate('/contestMng')
            },
        });
    };

    const showEditModal = (id: number) => {
        setProblemID(id)
        setEditModalVisible(true)
    }

    const defaultContestMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={() => { setCreateModalVisible(true) }}>T???o b??i m???i</Button>;

    return (
        <div className='contest-manager-page'>
            <h1>Qu???n l?? Contest</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='T???ng s??? b??i t???p' quantity={`${problemList.length}`} icon={<ContainerOutlined />} iconBlockColor='#29d1aa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='T???ng s??? l?????t gi???i' quantity={`${timeSolved}`} icon={<FileProtectOutlined />} iconBlockColor='#6584FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='S??? b??i t???p D??? / TB / Kh??' quantity={`${easyListNumber}/${mediumListNumber}/${hardListNumber}`} icon={<BarChartOutlined />} iconBlockColor='#DF6B31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Danh s??ch b??i t???p</h5>
            <div className="contest-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="T??m b??i t???p"
                        allowClear
                        onChange={(e) => { setSearchProb(e.target.value) }}
                    />
                    <Button type='primary' onClick={() => { setCreateModalVisible(true) }}>T???o b??i m???i</Button>
                </div>
                <Table className="contest-table"
                    dataSource={cloneProblemList}
                    scroll={{ x: 1500 }}
                    pagination={{
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true
                    }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(prob: IAdminProblemItem) => prob.id}
                    sticky={true}
                    footer={defaultContestMngFooter}
                >
                    <Table.Column fixed='left' title="Ti??u ?????" render={(prob: IAdminProblemItem) => <span>{prob.title}</span>} width="15%" />
                    <Table.Column title="C??u h???i" render={(prob: IAdminProblemItem) => <span>{prob.question}</span>} width="20%" />
                    <Table.Column title="Input" render={(prob: IAdminProblemItem) => <span>{prob.input}</span>} width="20%" />
                    <Table.Column title="Output" render={(prob: IAdminProblemItem) => <span>{prob.output}</span>} width="20%" />
                    <Table.Column title="??i???m" className='icon-col' render={(prob: IAdminProblemItem) => <span>{prob.score}</span>} width="10%" />
                    <Table.Column title="Ng??y t???o" className='icon-col' render={(prob: IAdminProblemItem) => <span>{moment(prob.created_at).format('DD/MM/YYYY')}</span>} width="10%" />
                    <Table.Column title="????? kh??" className='icon-col' render={(prob: IAdminProblemItem) => prob.rank === 0 ? <span style={{ color: '#38c565' }}>D???</span> : prob.rank === 1 ? <span style={{ color: '#e7bd33' }}>Trung b??nh</span> : <span style={{ color: '#ff3448' }}>Kh??</span>} width="10%" />
                    <Table.Column fixed='right' className="contest-mng-action" title="H??nh ?????ng" width="10%"
                        render={(prob: IAdminProblemItem) => (
                            <>
                                <EditOutlined className="icon-edit" onClick={() => showEditModal(prob.id)} />
                                <EyeOutlined className='icon-view' onClick={() => navigate(`/problem/${prob.id}`)} />
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(prob.id)} />
                            </>
                        )}
                    />
                </Table>
            </div>
            <EditContestModal editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} problemID={problemID} />
            <CreateContestModal createModalVisible={createModalVisible} setCreateModalVisible={setCreateModalVisible} />
        </div>
    )
}
