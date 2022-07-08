import { Row, Col, Table, Input, Button, Modal } from 'antd'
import { TeamOutlined, DeleteFilled, UserAddOutlined, UsergroupAddOutlined, MessageFilled, HeartFilled, EyeOutlined, EyeFilled, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import './PostManagerStyle.css'
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deletePostAction, getAllPostAction } from '../../redux/actions/PostAction';
import { allPostSelector } from '../../redux/reducers/PostReducer';
import { useNavigate } from 'react-router-dom';
import { IHomePost } from '../../redux/interface/PostType';
import moment from 'moment';

export const PostManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const postList = useSelector(allPostSelector)
    const [clonePostList, setclonePostList] = useState([...postList])
    const [searchPost, setSearchPost] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllPostAction())
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        if (postList.every((post) => post.title !== null || post.content !== null || post.username !== null)) {
            const tempList = postList.filter((post) => post.username.toLowerCase().includes(searchPost.toLowerCase()) || post.title.toLowerCase().includes(searchPost.toLowerCase()) || post.content.toLowerCase().includes(searchPost.toLowerCase()))
            setclonePostList(tempList)
        }
        else
            setclonePostList(postList)
    }, [postList, searchPost])

    const defaultUserMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={() => { navigate('/create') }}>Tạo người dùng mới</Button>;

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'Bạn chắc chắn muốn xóa bài viết này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bài viết cũng sẽ bị xóa khỏi bài viết đã lưu của mọi người dùng!',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(deletePostAction(id))
                await dispatch(getAllPostAction())
                navigate('/postMng')
            },
        });
    };

    return (
        <div className='post-manager-page'>
            <h1>Quản lý bài viết</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Tổng số bài viết' quantity={`${postList.length}`} icon={<TeamOutlined />} iconBlockColor='#29d1aa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Người dùng mới theo tháng' quantity={`+1`} icon={<UserAddOutlined />} iconBlockColor='#6584FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Người dùng mới theo năm' quantity={`+1`} icon={<UsergroupAddOutlined />} iconBlockColor='#DF6B31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Thống kê</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="Tìm người dùng"
                        allowClear
                        onChange={(e) => { setSearchPost(e.target.value) }}
                    />
                    <Button type='primary' onClick={() => { navigate('/create') }}>Tạo bài viết mới</Button>
                </div>
                <Table className="post-table"
                    dataSource={clonePostList}
                    pagination={{
                        pageSize: 8,
                    }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(post: IHomePost) => post.postid}
                    sticky={true}
                    footer={defaultUserMngFooter}
                >
                    <Table.Column title="Tiêu đề" render={(post: IHomePost) => <span>{post.title}</span>} width="20%" />
                    <Table.Column title="Nội dung" render={(post: IHomePost) => <span>{post.content.length <= 300 ? post.content : post.content.slice(0, 300).concat('...')}</span>} width="25%" />
                    <Table.Column title="Người tạo" className='icon-col' render={(post: IHomePost) => <span>{post.username}</span>} width="15%" />
                    <Table.Column title="Ngày tạo" className='icon-col' render={(post: IHomePost) => <span>{moment(post.created_at).format('DD/MM/YYYY')}</span>} width="15%" />
                    <Table.Column title={<EyeFilled style={{fontSize: '1.4em'}}/>} className='icon-col' render={(post: IHomePost) => <span>{post.viewnumber}</span>} width="5%" />
                    <Table.Column title={<HeartFilled style={{fontSize: '1.4em'}} />} className='icon-col' render={(post: IHomePost) => <span>{post.votenumber}</span>} width="5%" />
                    <Table.Column title={<MessageFilled style={{fontSize: '1.4em'}}/>} className='icon-col' render={(post: IHomePost) => <span>{post.commentnumber}</span>} width="5%" />
                    <Table.Column className="user-mng-action" title="Hành động" width="10%"
                        render={(post: IHomePost) => (
                            <>
                                <EyeOutlined className='icon-view' onClick={() => navigate(`/post/${post.postid}`)}/>
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(post.postid)} />
                            </>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
