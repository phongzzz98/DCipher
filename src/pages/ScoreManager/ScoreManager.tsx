import { Button, Input, Modal, Steps, Table } from 'antd'
import { PlusOutlined, DeleteFilled, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './ScoreManagerStyle.css'
import { useEffect, useState } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRankAction, getAllRankAction } from '../../redux/actions/AchievementAction';
import { allRankSelector } from '../../redux/reducers/AchievementReducer';
import { dynamicSort } from '../../utils/util';
import { IRank } from '../../redux/interface/AchievementType';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { CreateRankModal } from './components/CreateRankModal/CreateRankModal';
import { EditRankModal } from './components/EditRankModal/EditRankModal';

export const ScoreManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const rankList = useSelector(allRankSelector)
    const [cloneRankList, setcloneRankList] = useState([...rankList])
    cloneRankList.sort(dynamicSort('-min_score'))
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedRankID, setSelectedRankID] = useState(0)
    const [searchRank, setSearchRank] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllRankAction())
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        if (rankList.every((rank) => rank.rank !== null || rank.about !== null || rank.score !== null)) {
            const tempList = rankList.filter((rank) => rank.about.toLowerCase().includes(searchRank.toLowerCase()) || rank.rank.toLowerCase().includes(searchRank.toLowerCase()) || rank.score.toString().toLowerCase().includes(searchRank.toLowerCase()))
            setcloneRankList(tempList)
        }
        else
            setcloneRankList(rankList)
    }, [rankList, searchRank])

    const showEditModal = (id: number) => {
        setSelectedRankID(id)
        setEditModalVisible(true)
    }


    const renderScoreSteps = () => {
        const cloneList = [...rankList]
        cloneList.sort(dynamicSort('score'))
        return (
            <Steps responsive size="default" progressDot current={cloneList.length}>
                {cloneList.map((rank, index) => <Steps.Step description={rank.score.toString()} stepNumber={index} title={rank.rank} />)}
            </Steps>
        )
    }

    const defaultUserMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={() => { }}>T???o x???p h???ng m???i</Button>;

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'B???n ch???c ch???n mu???n x??a x???p h???ng n??y?',
            icon: <ExclamationCircleOutlined />,
            okText: 'X??a',
            okType: 'danger',
            cancelText: 'H???y',
            async onOk() {
                await dispatch(deleteRankAction(id))
                await dispatch(getAllRankAction())
                navigate('/scoreMng')
            },
        });
    };
    
    return (
        <div className='score-manager-page'>
            <h1>Qu???n l?? x???p h???ng</h1>
            <div className='rank-progress-bar'>
                <h5 style={{ marginBottom: 25 }}>Thang ??i???m x???p h???ng</h5>
                {renderScoreSteps()}
            </div>
            <h5 style={{ marginTop: 15 }}>Danh s??ch h???ng</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="T??m x???p h???ng"
                        allowClear
                        onChange={(e) => { setSearchRank(e.target.value) }}
                    />
                    <Button onClick={() => setCreateModalVisible(true)} type='primary'>T???o h???ng m???i</Button>
                </div>
                <Table className="post-table"
                    dataSource={cloneRankList}
                    pagination={{
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true
                    }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(rank: IRank) => rank.id}
                    sticky={true}
                    footer={defaultUserMngFooter}
                >
                    <Table.Column title="T??n h???ng" render={(rank: IRank) => <span>{rank.rank}</span>} width="15%" />
                    <Table.Column title="N???i dung" render={(rank: IRank) => <span>{rank.about}</span>} width="35%" />
                    <Table.Column title="??i???m th???p nh???t" className='icon-col' render={(rank: IRank) => <span>{rank.min_score}</span>} width="15%" />
                    <Table.Column title="??i???m cao nh???t" className='icon-col' render={(rank: IRank) => <span>{rank.max_score}</span>} width="15%" />
                    <Table.Column title="Ng??y t???o" className='icon-col' render={(rank: IRank) => <span>{moment(rank.created_at).format('DD/MM/YYYY')}</span>} width="15%" />
                    <Table.Column className="user-mng-action" title="H??nh ?????ng" width="15%"
                        render={(rank: IRank) => (
                            <>
                                <EditOutlined className='icon-view' onClick={() => { showEditModal(rank.id) }} />
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(rank.id)} />
                            </>
                        )}
                    />
                </Table>
            </div>
            <EditRankModal rankList={rankList} editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} rankID={selectedRankID} />                
            <CreateRankModal rankList={rankList} createModalVisible={createModalVisible} setCreateModalVisible={setCreateModalVisible} />
        </div>
    )
}
