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

    const defaultUserMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={() => { navigate('/create') }}>T???o b??i vi???t m???i</Button>;

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'B???n ch???c ch???n mu???n x??a b??i vi???t n??y?',
            icon: <ExclamationCircleOutlined />,
            content: 'B??i vi???t c??ng s??? b??? x??a kh???i b??i vi???t ???? l??u c???a m???i ng?????i d??ng!',
            okText: 'X??a',
            okType: 'danger',
            cancelText: 'H???y',
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
            title: 'X??c nh???n duy???t b??i vi???t n??y?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Duy???t',
            okType: 'danger',
            cancelText: 'H???y',
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
            title: 'B???n ch???c ch???n mu???n b??? duy???t b??i vi???t n??y?',
            icon: <ExclamationCircleOutlined />,
            content: 'B??i vi???t s??? kh??ng hi???n th??? v???i ng?????i d??ng cho ?????n khi ???????c duy???t l???i!',
            okText: 'B??? duy???t',
            okType: 'danger',
            cancelText: 'H???y',
            async onOk() {
                await dispatch(unapprovePostAction(unapprovedPost))
                await dispatch(getAllPostAction())
                navigate('/postMng')
            },
        });
    };

    return (
        <div className='post-manager-page'>
            <h1>Qu???n l?? b??i vi???t</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='T???ng s??? b??i vi???t' quantity={`${postList.length}`} icon={<FileTextOutlined />} iconBlockColor='#79d1fa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='B??i vi???t trong th??ng' quantity={`+${postByMonth}`} icon={<FileMarkdownOutlined />} iconBlockColor='#9584FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='B??i vi???t trong n??m' quantity={`+${postByYear}`} icon={<ProjectOutlined rotate={180} />} iconBlockColor='#9FfB31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Danh s??ch b??i vi???t</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="T??m b??i vi???t"
                        allowClear
                        onChange={(e) => { setSearchPost(e.target.value) }}
                    />
                    <Button type='primary' onClick={() => { navigate('/create') }}>T???o b??i vi???t m???i</Button>
                </div>
                <Table className="post-table"
                    dataSource={clonePostList}
                    pagination={{
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true
                    }}
                    scroll={{ x: 1500 }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(post: IHomePost) => post.postid}
                    sticky={true}
                    footer={defaultUserMngFooter}
                >
                    <Table.Column fixed='left' title="Ti??u ?????" render={(post: IHomePost) => <span>{post.title}</span>} width="19%" />
                    <Table.Column title="Ng?????i t???o" className='icon-col' render={(post: IHomePost) => <span>{post.username}</span>} width="13%" />
                    <Table.Column title="Ng??y t???o" className='icon-col' render={(post: IHomePost) => <span>{moment(post.created_at).format('DD/MM/YYYY')}</span>} width="15%" />
                    <Table.Column title="Tr???ng th??i" className='icon-col' render={(post: IHomePost) => post.poststatus === 1 ? <span style={{ color: '#38c565' }}>???? duy???t</span> : <span style={{ color: '#ff3448' }}>Ch??a duy???t</span>} width="15%" />
                    <Table.Column title={<Tooltip placement='bottom' title='L?????t xem'><EyeFilled style={{ fontSize: '1.4em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.viewnumber}</span>} width="7%" />
                    <Table.Column title={<Tooltip placement='bottom' title='L?????t th??ch'><HeartFilled style={{ fontSize: '1.4em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.votenumber}</span>} width="7%" />
                    <Table.Column title={<Tooltip placement='bottom' title='S??? b??nh lu???n'><MessageFilled style={{ fontSize: '1.3em' }} /></Tooltip>} className='icon-col' render={(post: IHomePost) => <span>{post.commentnumber}</span>} width="7%" />
                    <Table.Column fixed='right' className="user-mng-action" title="H??nh ?????ng" width="10%"
                        render={(post: IHomePost) => (
                            <>
                                {
                                    post.poststatus === 0 ?
                                        <Tooltip placement='bottom' title='Duy???t b??i vi???t'>
                                            <CheckCircleOutlined onClick={() => showApproveConfirm(post.postid)} style={{ color: '#38c565' }} className='icon-view' />
                                        </Tooltip> :
                                        <Tooltip placement='bottom' title='B??? duy???t b??i vi???t'>
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
