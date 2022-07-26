import { Avatar, Divider, List, Skeleton, Tabs, Tag } from 'antd'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRankAction } from '../../../../redux/actions/AchievementAction'
import { getUserDetailsAction } from '../../../../redux/actions/UserAction'
import { IUserFollow } from '../../../../redux/interface/UserType'
import { allRankSelector } from '../../../../redux/reducers/AchievementReducer'
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer'
import { userDetailSelector } from '../../../../redux/reducers/UserReducer'
import { ApplicationDispatch } from '../../../../store/store'
import { inRange } from '../../../../utils/util'
import './FollowingBlockStyle.css'

interface IFollowingBlockProps {
  userFollowing: IUserFollow[];
  userFollow: IUserFollow[];
}
export const FollowingBlock = ({ userFollowing, userFollow }: IFollowingBlockProps) => {
  const [loading, setLoading] = useState(false);
  const rankList = useSelector(allRankSelector)
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const userDetails = useSelector(userDetailSelector)

  useEffect(() => {
    dispatch(getAllRankAction())
}, [dispatch])

const renderRank = (userScore: number) => {
  const userRank = rankList.find((rank) => inRange(userScore, rank.min_score, rank.max_score))
  if (userRank)
      return <Tag style={{ borderRadius: '2em' }} color={userRank.colorcode}>{userRank.rank}</Tag>
  else
      return <Tag style={{ borderRadius: '2em' }} color="">Unrank</Tag>
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
      <Tabs defaultActiveKey="1" size={'small'} style={{ marginBottom: 32 }}>
        <Tabs.TabPane tab={`Đang theo dõi (${userFollowing.length})`} key="1">
          <div
            id="scrollableDiv"
            style={{
              height: 300,
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
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Theo dõi (${userFollow.length})`} key="2">
          <div
            id="scrollableDiv"
            style={{
              height: 300,
              overflow: 'auto',
              padding: '0 16px',
            }}
          >
            <InfiniteScroll
              dataLength={userFollow.length}
              next={loadMoreData}
              hasMore={userFollow.length < userDetails.user_follow.length}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>Hết rùi 🤐</Divider>}
              scrollableTarget="scrollableDiv"

            >
              <List
                itemLayout="horizontal"
                dataSource={userFollow}
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
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
