import { List, Space, Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { MessageOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { IUserBookmark } from '../../../../redux/interface/UserType';
import './BookmarksBlockStyle.css'

interface IBookmarksBlockProps {
    userBookmarks: IUserBookmark[]
}

export const BookmarksBlock = ({ userBookmarks }: IBookmarksBlockProps) => {
    const navigate = useNavigate()
    const IconText = ({ icon, text }: any) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    return (
        <div>
            <List
                pagination={{
                    pageSize: 10,
                    position: 'bottom',
                }}
                size='large'
                itemLayout="horizontal"
                header='Bài viết đã lưu'
                dataSource={userBookmarks}
                renderItem={item => (
                    <List.Item className='user-bookmark-item'>
                        <div className='user-bookmark-time-and-name'>
                            <List.Item.Meta
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                            />
                            <Tooltip placement='right' title={moment(item.created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
                                <span className='home-time-text'>{moment(item.created_at).fromNow()}</span>
                            </Tooltip>
                        </div>
                        <div className='user-bookmark-tag-and-info'>
                            <div className='user-bookmark-info-container'>
                                <div className='action'>
                                    <IconText icon={MessageOutlined} text={item.commentnumber} key="list-vertical-message" />
                                </div>
                                <div className='action'>
                                    <IconText icon={HeartOutlined} text={item.votenumber} key="list-vertical-star" />
                                </div>
                                <div className='action'>
                                    <IconText icon={EyeOutlined} text={item.viewnumber} key="list-vertical-eye" />
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}
