import { Badge, Descriptions, Table, Tooltip } from 'antd'
import moment from 'moment'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneProblemAction, getProblemStatisticDetailAction } from '../../redux/actions/ContestAction'
import { ICompile, IStatisticDetailIDs } from '../../redux/interface/ContestType'
import { oneProblemsSelector, statisticDetailSelector } from '../../redux/reducers/ContestReducer'
import { ApplicationDispatch } from '../../store/store'
import './ProblemDetailStyle.css'
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { CodeReader } from '../../common/CodeReader/CodeReader';

export const ProblemDetail = () => {
    const { uid, cid } = useParams<{ uid: string, cid: string }>()
    const dispatch: ApplicationDispatch = useDispatch()
    const user = useSelector(userInfoSelector)
    const statDetails = useSelector(statisticDetailSelector)
    const problem = useSelector(oneProblemsSelector)
    useEffect(() => {
        const probStatisticDetailIDs: IStatisticDetailIDs = {
            uid: parseInt(uid!),
            cid: parseInt(cid!)
        }
        if (uid && cid)
            dispatch(getProblemStatisticDetailAction(probStatisticDetailIDs))
    }, [cid, dispatch, uid])

    useEffect(() => {
        if (statDetails.problem_id !== 0)
            dispatch(getOneProblemAction(statDetails.problem_id))
    }, [dispatch, statDetails])


    return (
        <div className='problem-detail-page'>
            <h1 style={{ marginBottom: 15 }}>{`Thông tin chi tiết`}</h1>
            <div className='result-status'>
                <Descriptions contentStyle={{ backgroundColor: '#fff' }} labelStyle={{ width: '20%' }} size='middle' title="Tổng kết" bordered column={1}>
                    <Descriptions.Item label="Tên bài">{problem.title}</Descriptions.Item>
                    <Descriptions.Item label="Người làm">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Độ khó">
                        {
                            problem.rank === 0 ? <span className='difficulty-text' style={{ color: '#38c565' }}>Dễ</span> :
                                problem.rank === 1 ? <span className='difficulty-text' style={{ color: '#e7bf58' }}>Trung bình</span> :
                                    <span className='difficulty-text' style={{ color: '#d23b3b' }}>Khó</span>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian">{moment(statDetails.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {
                            statDetails.status ?
                                <Badge color={'green'} style={{ color: '#38c565' }} text="Hoàn thành" /> :
                                <Badge color={'#f12f42'} style={{ color: 'red' }} text="Chưa hoàn thành" />
                        }
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className='result-status'>
                <h6 style={{ marginBottom: 15 }}>Test Case</h6>
                <Table className="stat-table"
                    dataSource={statDetails.compile_details}
                    // loading={loading}
                    pagination={false}
                    size='middle'
                    bordered={true}
                    rowKey={(stat: ICompile) => stat.testcase}
                    sticky={true}
                >
                    <Table.Column className='stat-align' title="Test Case" render={(stat: ICompile) => <span>{stat.testcase}</span>} width="10%" />
                    <Table.Column className='stat-align' title="Thời gian" render={(stat: ICompile) => <span>{moment(stat.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</span>} width="35%" />
                    <Table.Column className='stat-align' title="CPU Time" render={(stat: ICompile) => <span>{stat.cpuTime}</span>} width="25%" />
                    <Table.Column className='stat-align' title="Bộ nhớ" render={(stat: ICompile) => <span>{stat.memory}</span>} width="25%" />
                    <Table.Column className='stat-align' title="Kết quả" render={(stat: ICompile) => stat.status ?
                        <Tooltip placement='top' title='Đúng'>
                            <CheckCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="#52c41a" />
                        </Tooltip>
                        :
                        <Tooltip placement='top' title='Sai'>
                            <CloseCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="red" />
                        </Tooltip>
                    } width="15%" />
                </Table>
            </div>
            <div className='result-status'>
                <h6 style={{ marginBottom: 15 }}>Code</h6>
                <CodeReader userCode={statDetails.code} userCodeLang={statDetails.language} />
            </div>
        </div>
    )
}
