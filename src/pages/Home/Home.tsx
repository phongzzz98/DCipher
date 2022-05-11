import React, { useEffect } from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../redux/actions/PostAction';
import { ApplicationDispatch } from '../../store/store';
import { allPostSelector } from '../../redux/reducers/PostReducer';

export const Home = () => {
const dispatch: ApplicationDispatch = useDispatch()
useEffect(() => {
  dispatch(getAllPostAction())
}, [dispatch])
const postList = useSelector(allPostSelector);

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }:any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
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
        key={item.postinfo[0].postid}
        actions={[
          <IconText icon={MessageOutlined} text={item.numberofcomment} key="list-vertical-message" />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
          title={<a href={'#'}>{item.postinfo[0].title}</a>}
          description={item.postinfo[0].username}
        />
      </List.Item>
    )}
  />
  )
}
