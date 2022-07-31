import { Avatar, Badge, Col, List, Row, Space, Tag, Tooltip } from 'antd';
import defaultAvatar from '../../assets/images/BlankAvatar.jpg'
import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined, HeartOutlined, TrophyFilled, EyeOutlined } from '@ant-design/icons';
import { searchedPostsSelector } from '../../redux/reducers/PostReducer';
import './SearchStyle.css'
import { IHomePost } from '../../redux/interface/PostType';
import { searchPostByTagAction } from '../../redux/actions/PostAction';
import { getOneUsersAction } from '../../redux/actions/UserAction';
import { ApplicationDispatch } from '../../store/store';
import { allRankSelector } from '../../redux/reducers/AchievementReducer';
import { inRange } from '../../utils/util';

export const Search = () => {
    const rankList = useSelector(allRankSelector)
    const dispatch: ApplicationDispatch = useDispatch()
    const postList: IHomePost[] = useSelector(searchedPostsSelector)
    const clonePostList = [...postList]
    const tempList = clonePostList.filter((post) => post.poststatus === 1)
    const navigate = useNavigate()
    const IconText = ({ icon, text }: any) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const onClickTag = async (value: string) => {
        await dispatch(searchPostByTagAction(value))
        navigate('/search')
    }

    const onClickUser = async (id: number) => {
        await dispatch(getOneUsersAction(id))
        navigate(`/user/${id}`)
    }
    const renderRank = (userScore: number) => {
        const userRank = rankList.find((rank) => inRange(userScore, rank.min_score, rank.max_score))
        if (userRank)
            return {
                color: userRank.colorcode,
                rankName: userRank.rank
            }
        else
            return {
                color: '#ffffff',
                rankName: 'Unrank'
            }
    }
    return (
        <div className='home-container'>
            <div className='search-list'>
                <h1>Kết quả tìm kiếm</h1>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        position: 'both',
                        pageSizeOptions: [10, 25, 50, 100],
                        showSizeChanger: true,
                        responsive: true,
                    }}
                    dataSource={tempList}
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
                                    <Row gutter={[0, 15]} style={{ width: '100%' }}>
                                        <Badge.Ribbon text={
                                            <Tooltip title={renderRank(item.score).rankName}>
                                                <TrophyFilled />
                                            </Tooltip>
                                        } color={renderRank(item.score).color}>
                                            <div onClick={() => onClickUser(item.userid)} className='home-avatar'>
                                                <Avatar size={40} src={item.avatarImage === 'NULL' || item.avatarImage === '' ? defaultAvatar : item.avatarImage} />
                                                <span className='post-username'>{item.username}</span>
                                            </div>
                                        </Badge.Ribbon>
                                        <Col className='home-tags' xs={24} md={24} lg={24} xl={24} >
                                            <div style={{ width: '100%' }} >
                                                {item.posttag.map((tag) => <Tag onClick={() => onClickTag(tag.tagcontent)} className='tag' color={tag.colorcode}>{tag.tagcontent}</Tag>)}
                                            </div>
                                        </Col>
                                    </Row>
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
                                        <div className='action'>
                                            <IconText icon={EyeOutlined} text={item.viewnumber} key="list-vertical-eye" />
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
