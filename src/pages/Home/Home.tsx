import React, { useEffect, useState } from 'react'
import defaultAvatar from '../../assets/images/BlankAvatar.jpg'
import { List, Avatar, Space, Tag, Tooltip, Col, Row, Badge } from 'antd';
import { MessageOutlined, HeartOutlined, EyeOutlined, TrophyFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction, getMostVotedPostAction, searchPostByTagAction } from '../../redux/actions/PostAction';
import { ApplicationDispatch } from '../../store/store';
import { allPostSelector, mostVotedPostsSelector } from '../../redux/reducers/PostReducer';
import './HomeStyle.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IHomePost } from '../../redux/interface/PostType';
import 'moment/locale/vi'
import { getAllRankAction } from '../../redux/actions/AchievementAction';
import { allRankSelector } from '../../redux/reducers/AchievementReducer';
import { inRange } from '../../utils/util';
import { getOneUsersAction } from '../../redux/actions/UserAction';

export const Home = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  moment.locale('vi')
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(getAllPostAction());
      await dispatch(getMostVotedPostAction());
      await dispatch(getAllRankAction())
      setLoading(false)
    }
    fetchData()
  }, [dispatch])

  const postList: IHomePost[] = useSelector(allPostSelector);
  const rankList = useSelector(allRankSelector)
  const clonePostList = [...postList]
  const tempList = clonePostList.filter((post) => post.poststatus === 1)
  const mostVotePostList: IHomePost[] = useSelector(mostVotedPostsSelector);

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

  return (
    <div className='home-container'>
      <div className='ramdom-list'>
        <h1>Trang chủ</h1>
        <List
          loading={loading}
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
              className='home-list-item-container'
            >
              <div className='home-list-item'>
                <List.Item.Meta
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  title={<a style={{ wordBreak: 'break-all' }} onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                  description={item.content.slice(0, 500).concat('...')}
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
                    <Tooltip placement='right' title={moment(item.created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
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
      <div className='most-voted-list'>
        <h1>Bài viết nổi bật</h1>
        <List
          loading={loading}
          itemLayout="vertical"
          size="large"
          dataSource={mostVotePostList.slice(0, 5)}
          renderItem={item => (
            <List.Item
              key={item.postid}
              className='most-voted-list-item'
              onClick={() => navigate(`/post/${item.postid}`)}
            >
              <List.Item.Meta
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                title={<a style={{ wordBreak: 'break-all', fontSize: '0.9rem' }} onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
              />
              <div className='avatar-and-tags-most-vote'>
                <div className='home-avatar-most-vote'>
                  <Avatar src={item.avatarImage === 'NULL' || item.avatarImage === '' ? defaultAvatar : item.avatarImage} />
                  <span className='post-username'>{item.username}</span>
                </div>
                <div className='home-actions-most-vote'>
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
    </div>
  )
}
