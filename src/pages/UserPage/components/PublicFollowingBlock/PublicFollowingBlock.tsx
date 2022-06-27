import { Skeleton, Divider, List, Avatar, Tag } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from 'react-redux';
import { getOneUsersAction } from '../../../../redux/actions/UserAction';
import { IOneUserInfo, IUserFollow } from '../../../../redux/interface/UserType';
import { ApplicationDispatch } from '../../../../store/store';

interface IPublicFollowingBlockProps {
    userFollow: IUserFollow[];
    id: string;
    selectedUser: IOneUserInfo
}

export const PublicFollowingBlock = ({ userFollow, id, selectedUser }: IPublicFollowingBlockProps) => {
    const [loading, setLoading] = useState(false);
    const dispatch: ApplicationDispatch = useDispatch()

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
        await dispatch(getOneUsersAction(parseInt(id!)))
        setLoading(false);
    };

    return (
        <div className='following-block'>
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
                    hasMore={userFollow.length < selectedUser.user_follow.length}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>Hết rùi 🤐</Divider>}
                    scrollableTarget="scrollableDiv"

                >
                    <List
                    header={`Người theo dõi (${userFollow.length})`}
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
        </div>
    )
}
