import React, { useEffect } from 'react'
import { List, Avatar, Space, Tag, Tooltip } from 'antd';
import { MessageOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction, getMostVotedPostAction } from '../../redux/actions/PostAction';
import { ApplicationDispatch } from '../../store/store';
import { allPostSelector, mostVotedPostsSelector } from '../../redux/reducers/PostReducer';
import './HomeStyle.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IHomePost } from '../../redux/interface/PostType';

export const Home = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllPostAction());
    dispatch(getMostVotedPostAction());
  }, [dispatch])
  const postList: IHomePost[] = useSelector(allPostSelector);
  const mostVotePostList: IHomePost[] = useSelector(mostVotedPostsSelector);

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className='home-container'>
      <div className='ramdom-list'>
        <h1>Trang chủ</h1>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 9,
            position: 'bottom',
          }}
          dataSource={postList}
          renderItem={item => (
            <List.Item
              key={item.postid}
            >
              <List.Item.Meta
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
                description={item.content.slice(0, 500)}
              />
              <div className='avatar-and-tags'>
                <div className='home-avatar'>
                  <Avatar src={'https://joeschmoe.io/api/v1/random'} />
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
                  <div className='action'>
                    <IconText icon={EyeOutlined} text={item.viewnumber} key="list-vertical-eye" />
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <div className='most-voted-list'>
        <h1>Bài viết nhiều lượt thích</h1>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={mostVotePostList.slice(0, 10)}
          renderItem={item => (
            <List.Item
              key={item.postid}
              className='most-voted-list-item'
              onClick={() => navigate(`/post/${item.postid}`)}
            >
              <List.Item.Meta
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
              />
              <div className='avatar-and-tags'>
                <div className='home-avatar'>
                  <Avatar src={'https://joeschmoe.io/api/v1/random'} />
                  <span className='post-username'>{item.username}</span>
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
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
