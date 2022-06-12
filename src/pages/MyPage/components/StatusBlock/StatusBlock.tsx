import { Pie } from '@ant-design/plots';
import { Descriptions, Tag } from 'antd'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTagAction } from '../../../../redux/actions/TagAction';
import { IUserPost } from '../../../../redux/interface/UserType';
import { allTagSelector } from '../../../../redux/reducers/TagReducer';
import { ApplicationDispatch } from '../../../../store/store';
import { dynamicSort } from '../../../../utils/util';
import './StatusBlockStyle.css'

interface IStatusBlockProps {
    userPosts: IUserPost[],
    commentNumber: number,
    score: number,
}

interface IDataList {
    type: string;
    value: number;
}

export const StatusBlock = ({ userPosts, commentNumber, score }: IStatusBlockProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const tagList = useSelector(allTagSelector);
    const cloneTagList = [...tagList]
    const cloneUserPosts = [...userPosts]
    cloneTagList.sort(dynamicSort('content'))

    useEffect(() => {
        dispatch(getAllTagAction())
    }, [dispatch])
    const data: IDataList[] = []
    const colorCodes: string[] = []
    cloneTagList.forEach((tag) => {
        const tagName = tag.content;
        const valueNumber = cloneUserPosts.filter((post) => post.posttag.some((tagPost) => tagPost.tagcontent === tag.content)).length
        data.push({
            type: tagName,
            value: valueNumber
        })
        colorCodes.push(tag.colorcode)
    })
    
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

    return (
        <div className='status-block'>
            <Descriptions size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={2} title="Trạng thái">
                <Descriptions.Item label="Số bài viết">{userPosts.length}</Descriptions.Item>
                <Descriptions.Item label="Số bình luận">{commentNumber}</Descriptions.Item>
                <Descriptions.Item label="Điểm">{score}</Descriptions.Item>
                <Descriptions.Item label="Hạng">{renderRank(score)}</Descriptions.Item>
            </Descriptions>
            <Pie className='pie-chart' {...config} />
        </div>
    )
}
