import { List, Tooltip } from 'antd'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { IUserComment } from '../../../../redux/interface/UserType'
import './CommentsBlockStyle.css'

interface ICommentsBlockProps {
    userComments: IUserComment[]
}

export const CommentsBlock = ({ userComments }: ICommentsBlockProps) => {
    const navigate = useNavigate()
    return (
        <div>
            <List
                pagination={{
                    pageSize: 10,
                    position: 'bottom',
                }}
                itemLayout="horizontal"
                header='Bình luận'
                dataSource={userComments}
                renderItem={item => (
                    <List.Item className='comment-item'>
                        <List.Item.Meta
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            title={<a onClick={() => navigate(`/post/${item.postid}`)}>{item.content.slice(0,500).concat('...')}</a>}
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
