import { Button, Col, Input, Modal, Row, Table } from 'antd'
import { TeamOutlined, EditOutlined, DeleteFilled, UserAddOutlined, UsergroupAddOutlined, EyeOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { deleteUsersAction, getAllUsersAdminAction } from '../../redux/actions/UserAction';
import './UserManagerStyle.css'
import { allUsersAdminSelector } from '../../redux/reducers/UserReducer';
import moment from 'moment';
import { IUserAdmin } from '../../redux/interface/UserType';
import { useNavigate } from 'react-router-dom';
import { Line, LineConfig } from '@ant-design/plots';
import { CreateUserModal } from './components/CreateUserModal/CreateUserModal';
import { EditUserModal } from './components/EditUserModal/EditUserModal';

interface ILineChartData {
    date: string;
    amount: number;
}

export const UserManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(allUsersAdminSelector)
    const [loading, setLoading] = useState(false)
    const [cloneUserList2, setcloneUserList2] = useState([...userList])
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState(0)
    let cloneUserList = [...userList]
    const userThisMonth = cloneUserList.filter((user) => moment(user.created_at).month() === moment().month()).length
    const userThisYear = cloneUserList.filter((user) => moment(user.created_at).year() === moment().year()).length
    const [searchUser, setSearchUser] = useState('')
    const [data, setData] = useState<ILineChartData[]>([]);
    const colorTest = getComputedStyle(document.documentElement).getPropertyValue('--ant-primary-color');
    const populateDataOfYear = useCallback(
        (startDate: string) => {
            let startMonth = parseInt(startDate.split('-')[1], 10),
                endMonth = parseInt(moment().format('M'), 10)
            const dataGrid: ILineChartData[] = []
            const filterdYearUsers = userList.filter((user) => moment(user.created_at).year() === moment().year())
            if (startMonth < 1) return [];
            for (let i = startMonth; i !== endMonth; i++) {
                if (i > 12) i = 1;
                const usersInMonth = filterdYearUsers.filter((user) => moment(user.created_at).month() === i - 1).length
                const months = moment(i, "M").format("MM") + '/' + startDate.split('-')[2];
                dataGrid.push({ date: months, amount: usersInMonth })
            }
            dataGrid.push(
                {
                    date: moment().format('MM') + '/' + startDate.split('-')[2],
                    amount: filterdYearUsers.filter((user) => moment(user.created_at).month() === moment().month()).length
                }
            );
            setData(dataGrid)
        }
        ,
        [userList],
    )

    useEffect(() => {
        populateDataOfYear(moment().startOf('year').format('DD-MM-YYYY'))
    }, [populateDataOfYear]);


    const config: LineConfig = {
        data,
        padding: 25,
        xField: 'date',
        yField: 'amount',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        tooltip: {
            formatter: (datum: any) => {
                return { name: `Số người dùng`, value: datum.amount };
            },
        },
        label: {
            offsetY: -5
        },
        point: {
            size: 2,
            shape: 'dot',
            style: {
                fill: 'white',
                stroke: colorTest,
                lineWidth: 2,
            },
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        color: colorTest
    };

    const showModal = () => {
        setCreateModalVisible(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllUsersAdminAction())
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        if (userList.every((user) => user.username !== null || user.email !== null)) {
            const tempList = userList.filter((user) => user.username.toLowerCase().includes(searchUser.toLowerCase()) || user.email.toLowerCase().includes(searchUser.toLowerCase()))
            setcloneUserList2(tempList)
        }
        else
            setcloneUserList2(userList)
    }, [searchUser, userList])

    const defaultUserMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={showModal}>Tạo người dùng mới</Button>;

    const showEditModal = (id: number) => {
        setSelectedUserID(id)
        setEditModalVisible(true)
    }

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'Bạn chắc chắn muốn xóa người dùng này?',
            icon: <ExclamationCircleOutlined />,
            content: <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'crimson' }}>Các bài viết của người dùng này cũng bị xóa theo!!</span>
                <span style={{ color: 'crimson' }}>Sau khi xóa sẽ không thể lấy lại!!</span>
            </div>,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(deleteUsersAction(id))
                await dispatch(getAllUsersAdminAction())
                navigate('/userMng')
            },
        });
    };
    return (
        <div className='user-manager-page'>
            <h1>Quản lý người dùng</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Tổng số người dùng' quantity={`${userList.length}`} icon={<TeamOutlined />} iconBlockColor='#2af1aa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Người dùng mới theo tháng' quantity={`+${userThisMonth}`} icon={<UserAddOutlined />} iconBlockColor='#65c4FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Người dùng mới theo năm' quantity={`+${userThisYear}`} icon={<UsergroupAddOutlined />} iconBlockColor='#DFFB31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Thống kê</h5>
            <div className='user-mng-chart'>
                <Line {...config} />
            </div>
            <h5 style={{ marginTop: 15 }}>Danh sách người dùng</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="Tìm người dùng"
                        allowClear
                        onChange={(e) => { setSearchUser(e.target.value) }}
                    />
                    <Button type='primary' onClick={showModal}>Tạo người dùng mới</Button>
                </div>
                <Table className="user-table"
                    dataSource={cloneUserList2}
                    pagination={{
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true
                    }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(user: IUserAdmin) => user.id}
                    sticky={true}
                    footer={defaultUserMngFooter}
                >
                    <Table.Column title="Tên hiển thị" render={(user: IUserAdmin) => <span>{user.username}</span>} width="20%" />
                    <Table.Column title="Email" render={(user: IUserAdmin) => <span>{user.email}</span>} width="30%" />
                    <Table.Column title="Phân quyền" className='icon-col' render={(user: IUserAdmin) => <span>{user.role === 0 ? 'Admin' : 'Thành viên'}</span>} width="15%" />
                    <Table.Column title="Ngày tạo" className='icon-col' render={(user: IUserAdmin) => <span>{moment(user.created_at).format('DD/MM/YYYY')}</span>} width="20%" />
                    <Table.Column className="user-mng-action" title="Hành động" width="15%"
                        render={(user: IUserAdmin) => (
                            <>
                                <EyeOutlined className='icon-view' onClick={() => navigate(`/user/${user.id}`)} />
                                <EditOutlined className="icon-edit" onClick={() => showEditModal(user.id)} />
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(user.id)} />
                            </>
                        )}
                    />
                </Table>
            </div>
            <CreateUserModal createModalVisible={createModalVisible} setCreateModalVisible={setCreateModalVisible} />
            <EditUserModal editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} userID={selectedUserID} />
        </div>
    )
}
