import { List, Tooltip } from 'antd'
import moment from 'moment'
import { IUserComment } from '../../../../redux/interface/UserType'

interface ICommentsBlockProps {
    userComments: IUserComment[]
}

export const CommentsBlock = ({ userComments }: ICommentsBlockProps) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                header='Bình luận'
                dataSource={userComments}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.content.slice(0,500)}
                            description={
                                <Tooltip placement='right' title={moment(item.created_at).format('DD/MM/YYYY --- HH:mm:ss')}>
                                    <span className='home-time-text'>{moment(item.created_at).fromNow()}</span>
                                </Tooltip>}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
