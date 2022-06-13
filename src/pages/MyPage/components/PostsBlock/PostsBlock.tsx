import { List, Space, Tag, Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { IUserPost } from '../../../../redux/interface/UserType'
import './PostsBlockStyle.css'

interface IPostBlockProps {
    userPosts: IUserPost[]
}

export const PostsBlock = ({ userPosts }: IPostBlockProps) => {
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
                header='Bài viết'
                dataSource={userPosts}
                renderItem={item => (
                    <List.Item className='user-post-item'>
                        <div className='user-post-time-and-name'>
                            <List.Item.Meta
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                            />
                            <Tooltip placement='right' title={moment(item.created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
                                <span className='home-time-text'>{moment(item.created_at).fromNow()}</span>
                            </Tooltip>
                        </div>
                        <div className='user-post-tag-and-info'>
                            {item.posttag.map((tag) => <Tag className='user-post-tag' color={tag.colorcode}>{tag.tagcontent}</Tag>)}
                            <div className='user-post-info-container'>
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
