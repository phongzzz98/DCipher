import { Avatar, List, Space, Tag, Tooltip } from 'antd';
import defaultAvatar from '../../assets/images/BlankAvatar.jpg'
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import { searchedPostsSelector } from '../../redux/reducers/PostReducer';
import './SearchStyle.css'
import { IHomePost } from '../../redux/interface/PostType';

export const Search = () => {
    const postList: IHomePost[] = useSelector(searchedPostsSelector)
    const navigate = useNavigate()
    const IconText = ({ icon, text }: any) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div className='home-container'>
            <div className='search-list'>
                <h1>Kết quả tìm kiếm</h1>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 9,
                        position: 'bottom',
                    }}
                    dataSource={postList}
                    renderItem={item => (
                        <List.Item
                            key={item.postid}
                            className='search-list-item-container'
                        >
                            <div className='search-list-item'>
                                <List.Item.Meta
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                                    description={item.content.slice(0, 500)}
                                />
                                <div className='avatar-and-tags'>
                                    <div className='home-avatar'>
                                        <Avatar src={item.avatarImage ? item.avatarImage : defaultAvatar} />
                                        <span className='post-username'>{item.username}</span>
                                    </div>
                                    <div className='home-tags'>
                                        {item.posttag.map((tag) => <Tag className='tag' color={tag.colorcode}>{tag.tagcontent}</Tag>)}
                                    </div>
                                </div>
                                <div className='actions-and-time'>
                                    <div className='home-posttime'>
                                        <Tooltip placement='right' title={moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}>
                                            <span className='home-time-text'>{moment(item.created_at).fromNow()}</span>
                                        </Tooltip>
                                    </div>
                                    <div className='home-actions'>
                                        <div className='action'>
                                            <IconText icon={MessageOutlined} text={item.commentnumber} key="list-vertical-message" />
                                        </div>
                                        <div className='action'>
                                            <IconText icon={HeartOutlined} text={item.votenumber} key="list-vertical-star" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
