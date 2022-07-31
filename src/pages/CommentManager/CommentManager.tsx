import { Col, Input, Modal, Row, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import { NotificationOutlined, DeleteFilled, MessageOutlined, CommentOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { allCommentSelector } from '../../redux/reducers/PostReducer';
import { ApplicationDispatch } from '../../store/store';
import { deleteCommentAction, getAllCommentAction } from '../../redux/actions/PostAction';
import { IAdminComment } from '../../redux/interface/PostType';
import { useNavigate } from 'react-router-dom';

export const CommentManager = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const [searchComment, setSearchComment] = useState('')
    const [loading, setLoading] = useState(false)
    const commentList = useSelector(allCommentSelector)
    const [cloneCommentList, setCloneCommentList] = useState([...commentList])
    const commentToday = commentList.filter((comment) => moment(comment.created_at).day() === moment().day()).length
    const commentThisMonth = commentList.filter((comment) => moment(comment.created_at).month() === moment().month()).length

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllCommentAction())
            setLoading(false)
        }
        fetchData()
    }, [dispatch])

    useEffect(() => {
        if (commentList.every((comment) => comment.content !== null || comment.username !== null || comment.posttitle !== null)) {
            const tempList = commentList.filter((comment) => comment.content.toLowerCase().includes(searchComment.toLowerCase()) || comment.username.toLowerCase().includes(searchComment.toLowerCase()) || comment.posttitle.toString().toLowerCase().includes(searchComment.toLowerCase()))
            setCloneCommentList(tempList)
        }
        else
            setCloneCommentList(commentList)
    }, [commentList, searchComment])
    console.log(commentList);
    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            centered: true,
            closable: true,
            title: 'Bạn chắc chắn muốn xóa bình luận này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(deleteCommentAction(id))
                await dispatch(getAllCommentAction())
                navigate('/commentMng')
            },
        });
    };

    return (
        <div className='user-manager-page'>
            <h1>Quản lý bình luận</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Tổng số bình luận' quantity={`${commentList.length}`} icon={<CommentOutlined />} iconBlockColor='#29d1aa' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Bình luận mới theo ngày' quantity={`+${commentToday}`} icon={<MessageOutlined />} iconBlockColor='#6584FE' /></Col>
                <Col xs={24} xl={8} ><AdminInfoBlock description='Bình luận mới theo tháng' quantity={`+${commentThisMonth}`} icon={<NotificationOutlined />} iconBlockColor='#DF6B31' /></Col>
            </Row>
            <h5 style={{ marginTop: 15 }}>Danh sách bình luận</h5>
            <div className="user-table-container">
                <div className='table-header-container'>
                    <Input.Search
                        placeholder="Tìm bình luận"
                        allowClear
                        onChange={(e) => { setSearchComment(e.target.value) }}
                    />
                </div>
                <Table className="user-table"
                    dataSource={cloneCommentList}
                    scroll={{ x: 1500 }}
                    pagination={{
                        pageSizeOptions: [5, 10, 20, 50, 100],
                        showSizeChanger: true
                    }}
                    loading={loading}
                    size='large'
                    bordered={true}
                    rowKey={(comment: IAdminComment) => comment.id}
                    sticky={true}
                >
                    <Table.Column title="Nội dung" render={(comment: IAdminComment) => <span>{comment.content.length > 200 ? comment.content.slice(0,200).concat('...') : comment.content}</span>} width="40%" />
                    <Table.Column title="Người tạo" render={(comment: IAdminComment) => <span>{comment.username}</span>} width="20%" />
                    <Table.Column title="Số Vote" className='icon-col' render={(comment: IAdminComment) => <span>{comment.votenumber}</span>} width="10%" />
                    <Table.Column title="Thời gian tạo" className='icon-col' render={(comment: IAdminComment) => <span>{moment(comment.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</span>} width="20%" />
                    <Table.Column title="Thời gian sửa" className='icon-col' render={(comment: IAdminComment) => <span>{moment(comment.updated_at).format('DD/MM/YYYY --- HH:mm:ss')}</span>} width="20%" />
                    <Table.Column fixed='right' className="user-mng-action" title="Hành động" width="15%"
                        render={(comment: IAdminComment) => (
                            <>
                                <EyeOutlined className='icon-view' onClick={() => navigate(`/post/${comment.postid}`)} />
                                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(comment.id)} />
                            </>
                        )}
                    />
                </Table>
            </div>
        </div>
    )
}
