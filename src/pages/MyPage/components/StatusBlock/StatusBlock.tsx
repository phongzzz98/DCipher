import { Pie } from '@ant-design/plots';
import { Button, Descriptions, Empty, Tag } from 'antd'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllRankAction } from '../../../../redux/actions/AchievementAction';
import { getAllTagAction } from '../../../../redux/actions/TagAction';
import { IUserPost } from '../../../../redux/interface/UserType';
import { allRankSelector } from '../../../../redux/reducers/AchievementReducer';
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer';
import { allTagSelector } from '../../../../redux/reducers/TagReducer';
import { ApplicationDispatch } from '../../../../store/store';
import { dynamicSort, inRange } from '../../../../utils/util';
import './StatusBlockStyle.css'

interface IStatusBlockProps {
    userPosts: IUserPost[],
    commentNumber: number,
    score: number,
    userID: number,
}

interface IDataList {
    type: string;
    value: number;
}

export const StatusBlock = ({ userPosts, commentNumber, score, userID }: IStatusBlockProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const user = useSelector(userInfoSelector)
    const rankList = useSelector(allRankSelector)
    const navigate = useNavigate()
    const tagList = useSelector(allTagSelector);
    const cloneTagList = [...tagList]
    const cloneUserPosts = [...userPosts]
    cloneTagList.sort(dynamicSort('content'))

    useEffect(() => {
        dispatch(getAllTagAction())
        dispatch(getAllRankAction())
    }, [dispatch])
    const data: IDataList[] = []
    const colorCodes: string[] = []
    cloneTagList.forEach((tag) => {
        const tagName = tag.content;
        const valueNumber = cloneUserPosts.filter((post) => post.posttag.some((tagPost) => tagPost.tagcontent === tag.content)).length
        if (valueNumber !== 0) {
            data.push({
                type: tagName,
                value: valueNumber
            })
            colorCodes.push(tag.colorcode)
        }
    })
    console.log(data)
    const config = {
        appendPadding: 12,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
        color: colorCodes,
    };

    const renderRank = (userScore: number) => {
        const userRank = rankList.find((rank) => inRange(userScore, rank.min_score, rank.max_score))
        if (userRank)
          return <Tag style={{ borderRadius: '2em' }} color={userRank.colorcode}>{userRank.rank}</Tag>
        else
          return <Tag style={{ borderRadius: '2em' }} color="">Unrank</Tag>
      }

    return (
        <div className='status-block'>
            <Descriptions size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={2} title="Trạng thái">
                <Descriptions.Item label="Số bài viết">{userPosts.length}</Descriptions.Item>
                <Descriptions.Item label="Số bình luận">{commentNumber}</Descriptions.Item>
                <Descriptions.Item label="Điểm">{score}</Descriptions.Item>
                <Descriptions.Item label="Hạng">{renderRank(score)}</Descriptions.Item>
            </Descriptions>
            {
                data.length !== 0 ?
                    <Pie className='pie-chart' {...config} /> :
                    <Empty
                        style={{paddingTop: 20}}
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                Chưa có bài viết chứa thẻ để thống kê!
                            </span>
                        }
                    >
                        {
                            user.id === userID ?
                            <Button onClick={() => navigate('/create')} shape='round' type="primary">Tạo bài viết</Button> :
                            null
                        }
                    </Empty>
            }
        </div>
    )
}
