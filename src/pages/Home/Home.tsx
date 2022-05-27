import React, { useEffect } from 'react'
import { List, Avatar, Space, Tag, Tooltip } from 'antd';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../redux/actions/PostAction';
import { ApplicationDispatch } from '../../store/store';
import { allPostSelector } from '../../redux/reducers/PostReducer';
import './HomeStyle.css'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const Home = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch])
  const postList = useSelector(allPostSelector);
  console.log(postList)

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className='home-container'>
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
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.postid}
          >
            <List.Item.Meta
              title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.title}</a>}
              description=
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tenetur soluta ipsa praesentium delectus magni, quaerat dolores reiciendis nemo odit officiis et eveniet, ipsum harum voluptatibus modi amet obcaecati iusto explicabo laborum assumenda tempore incidunt. Rerum vero rem, vitae numquam delectus consectetur. Tempora quaerat fugiat aperiam exercitationem sed eaque, adipisci aliquam debitis, voluptatum necessitatibus accusantium explicab'
            />
            <div className='avatar-and-tags'>
              <div className='home-avatar'>
                <Avatar src={'https://joeschmoe.io/api/v1/random'} />
                <span>{item.username}</span>
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
          </List.Item>
        )}
      />
    </div>
  )
}
