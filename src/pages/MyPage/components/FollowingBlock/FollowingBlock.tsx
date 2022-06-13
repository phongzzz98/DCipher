import { Avatar, Divider, List, Skeleton, Tag } from 'antd'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsAction } from '../../../../redux/actions/UserAction'
import { IUserFollow } from '../../../../redux/interface/UserType'
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer'
import { userDetailSelector } from '../../../../redux/reducers/UserReducer'
import { ApplicationDispatch } from '../../../../store/store'
import './FollowingBlockStyle.css'

interface IFollowingBlockProps {
  userFollowing: IUserFollow[]
}
export const FollowingBlock = ({ userFollowing }: IFollowingBlockProps) => {
  console.log(userFollowing)
  const [loading, setLoading] = useState(false);
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const userDetails = useSelector(userDetailSelector)
  const renderRank = (score: number) => {
    if (score >= 5 && score < 10)
      return <Tag style={{ borderRadius: '2em' }} color="cyan">Beginner</Tag>
    else if (score >= 10 && score < 15)
      return <Tag style={{ borderRadius: '2em' }} color="geekblue">Competent</Tag>
    else if (score >= 15)
      return <Tag style={{ borderRadius: '2em' }} color="red">Expert</Tag>
    else
      return <Tag style={{ borderRadius: '2em' }} color="#ae5924">Novice</Tag>
  }

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await dispatch(getUserDetailsAction(user.id))
    setLoading(false);
  };
  return (
    <div className='following-block'>
      <div
        id="scrollableDiv"
        style={{
          height: 350,
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        <InfiniteScroll
          dataLength={userFollowing.length}
          next={loadMoreData}
          hasMore={userFollowing.length < userDetails.user_following.length}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>Hết rùi 🤐</Divider>}
          scrollableTarget="scrollableDiv"

        >
          <List
            itemLayout="horizontal"
            header='Đang theo dõi'
            dataSource={userFollowing}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatarImage} />}
                  title={<><span style={{ marginRight: '5px' }}>{item.displayname}</span><span>{renderRank(item.score)}</span></>}
                  description={`${item.score} điểm tích lũy`}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}
