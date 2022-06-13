import { List, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IUserPost } from '../../../../redux/interface/UserType'

interface IPostBlockProps {
    userPosts: IUserPost[]
}

export const PostsBlock = ({ userPosts }: IPostBlockProps) => {
    const navigate = useNavigate()
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
                    <List.Item>
                        <List.Item.Meta
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                        />
                        <div>
                            {item.posttag.map((tag) => <Tag className='tag' color={tag.colorcode}>{tag.tagcontent}</Tag>)}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}
