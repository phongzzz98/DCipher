import { Descriptions, Tag } from 'antd'
import './StatusBlockStyle.css'

interface IStatusBlockProps {
    postNumber: number,
    commentNumber: number,
    score: number,
}

export const StatusBlock = ({ postNumber, commentNumber, score }: IStatusBlockProps) => {
    const renderRank = (score: number) => {
        if (score >= 5 && score < 10)
            return <Tag style={{borderRadius: '2em'}} color="cyan">Beginner</Tag>
        else if (score >= 10 && score < 15)
            return <Tag style={{borderRadius: '2em'}} color="geekblue">Competent</Tag>
        else if (score >= 15)
            return <Tag style={{borderRadius: '2em'}} color="red">Expert</Tag>
        else
            return <Tag style={{borderRadius: '2em'}} color="#ae5924">Novice</Tag>
    }

    return (
        <div className='status-block'>
            <Descriptions size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={2} title="Trạng thái">
                <Descriptions.Item label="Số bài viết">{postNumber}</Descriptions.Item>
                <Descriptions.Item label="Số bình luận">{commentNumber}</Descriptions.Item>
                <Descriptions.Item label="Điểm">{score}</Descriptions.Item>
                <Descriptions.Item label="Hạng">{renderRank(score)}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
