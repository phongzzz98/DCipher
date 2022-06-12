import { Avatar, List } from 'antd'
import { IUserFollow } from '../../../../redux/interface/UserType'
import './FollowingBlockStyle.css'

interface IFollowingBlockProps {
  userFollowing: IUserFollow[]
}
export const FollowingBlock = ({ userFollowing }: IFollowingBlockProps) => {
  console.log(userFollowing)
  return (
    <div className='following-block'>
      <List
        itemLayout="horizontal"
        header='Đang theo dõi'
        dataSource={userFollowing}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarImage} />}
              title={item.displayname}
              description={item.score}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
