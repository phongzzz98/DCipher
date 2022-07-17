import { Row, Col, Table, Input, Button, Modal, Tooltip } from 'antd'
import { FileTextOutlined, CheckCircleOutlined, DeleteFilled, CloseCircleOutlined, FileMarkdownOutlined, ProjectOutlined, MessageFilled, HeartFilled, EyeOutlined, EyeFilled, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import './PostManagerStyle.css'
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { approvePostAction, deletePostAction, getAllPostAction, unapprovePostAction } from '../../redux/actions/PostAction';
import { allPostSelector } from '../../redux/reducers/PostReducer';
import { useNavigate } from 'react-router-dom';
import { IApprovePost, IHomePost } from '../../redux/interface/PostType';
import moment from 'moment';

export const PostManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const postList = useSelector(allPostSelector)
    const clonePostList2 = [...postList]
    const postByMonth = clonePostList2.filter((post) => moment(post.created_at).month() === moment().month()).length
    const postByYear = clonePostList2.filter((post) => moment(post.created_at).year() === moment().year()).length
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

    const defaultUserMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={() => { navigate('/create') }}>Tạo bài viết mới</Button>;

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

    const showApproveConfirm = (id: number) => {
        const approvedPost: IApprovePost = {
            id: id,
            status: 1
        }
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'Xác nhận duyệt bài viết này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(approvePostAction(approvedPost))
                await dispatch(getAllPostAction())
                navigate('/postMng')
            },
        });
    };

    const showUnapproveConfirm = (id: number) => {
        const unapprovedPost: IApprovePost = {
            id: id,
            status: 0
        }
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'Bạn chắc chắn muốn bỏ duyệt bài viết này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bài viết sẽ không hiển thị với người dùng cho đến khi được duyệt lại!',
            okText: 'Bỏ duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(unapprovePostAction(unapprovedPost))
                await dispatch(getAllPostAction())
                navigate('/postMng')
            },
        });
    };

    return (
        <div className='post-manager-page'>
            <h1>Quản lý bài viết</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Tổng số bài viết' quantity={`${postList.length}`} icon={<FileTextOutlined />} iconBlockColor='#29d1aa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Bài viết trong tháng' quantity={`+${postByMonth}`} icon={<FileMarkdownOutlined />} iconBlockColor='#6584FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Bài viết trong năm' quantity={`+${postByYear}`} icon={<ProjectOutlined rotate={180} />} iconBlockColor='#DF6B31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Danh sách bài viết</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="Tìm bài viết"
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
                    scroll={{ x: 1500 }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(post: IHomePost) => post.postid}
                    sticky={true}
                    footer={defaultUserMngFooter}
                >
                    <Table.Column fixed='left' title="Tiêu đề" render={(post: IHomePost) => <span>{post.title}</span>} width="19%" />
                    <Table.Column title="Người tạo" className='icon-col' render={(post: IHomePost) => <span>{post.username}</span>} width="13%" />
                    <Table.Column title="Ngày tạo" className='icon-col' render={(post: IHomePost) => <span>{moment(post.created_at).format('DD/MM/YYYY')}</span>} width="15%" />
                    <Table.Column title="Trạng thái" className='icon-col' render={(post: IHomePost) => post.poststatus === 1 ? <span style={{ color: '#38c565' }}>Đã duyệt</span> : <span style={{ color: '#ff3448' }}>Chưa duyệt</span>} width="15%" />
                    <Table.Column title={<Tooltip placement='bottom' title='Lượt xem'><EyeFilled style={{ fontSize: '1.4em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.viewnumber}</span>} width="7%" />
                    <Table.Column title={<Tooltip placement='bottom' title='Lượt thích'><HeartFilled style={{ fontSize: '1.4em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.votenumber}</span>} width="7%" />
                    <Table.Column title={<Tooltip placement='bottom' title='Số bình luận'><MessageFilled style={{ fontSize: '1.3em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.commentnumber}</span>} width="7%" />
                    <Table.Column fixed='right' className="user-mng-action" title="Hành động" width="10%"
                        render={(post: IHomePost) => (
                            <>
                                {
                                    post.poststatus === 0 ?
                                        <Tooltip placement='bottom' title='Duyệt bài viết'>
                                            <CheckCircleOutlined onClick={() => showApproveConfirm(post.postid)} style={{ color: '#38c565' }} className='icon-view' />
                                        </Tooltip> :
                                        <Tooltip placement='bottom' title='Bỏ duyệt bài viết'>
                                            <CloseCircleOutlined onClick={() => showUnapproveConfirm(post.postid)} style={{ color: '#ff3448' }} className='icon-view' />
                                        </Tooltip>
                                }
                                <EyeOutlined className='icon-view' onClick={() => navigate(`/post/${post.postid}`)} />
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(post.postid)} />
                            </>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
