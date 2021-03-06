import { Badge, Descriptions, Table, Tooltip } from 'antd'
import moment from 'moment'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneProblemAction, getProblemStatisticDetailAction } from '../../redux/actions/ContestAction'
import { ICompile, IStatisticDetailIDs } from '../../redux/interface/ContestType'
import { oneProblemsSelector, statisticDetailSelector } from '../../redux/reducers/ContestReducer'
import { ApplicationDispatch } from '../../store/store'
import './ProblemDetailStyle.css'
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { CodeReader } from '../../common/CodeReader/CodeReader';

const languages = [
    { value: "c|c", label: "C" },
    { value: "c_cpp|cpp", label: "C++" },
    { value: "csharp|csharp", label: "C#" },
    { value: "python|python", label: "Python" },
    { value: "java|java", label: "Java" },
    { value: "javascript|nodejs", label: "Javascript" },
    { value: "php|php", label: "PHP" },
];

export const ProblemDetail = () => {
    const { uid, cid } = useParams<{ uid: string, cid: string }>()
    const dispatch: ApplicationDispatch = useDispatch()
    const user = useSelector(userInfoSelector)
    const statDetails = useSelector(statisticDetailSelector)
    const problem = useSelector(oneProblemsSelector)
    const [lang, setLang] = useState('python')
    useEffect(() => {
        const probStatisticDetailIDs: IStatisticDetailIDs = {
            uid: parseInt(uid!),
            cid: parseInt(cid!)
        }
        if (uid && cid)
            dispatch(getProblemStatisticDetailAction(probStatisticDetailIDs))
    }, [cid, dispatch, uid])

    useEffect(() => {
        if (statDetails.problem_id !== 0) {
            dispatch(getOneProblemAction(statDetails.problem_id))
        }
    }, [dispatch, statDetails])

    useEffect(() => {
        const userLang = languages.find((lang) => lang.value.split('|')[1] === statDetails.language)
        console.log(userLang);
        if (userLang !== undefined)
            setLang(userLang.value.split('|')[0])
    }, [statDetails.language])
    


    return (
        <div className='problem-detail-page'>
            <h1 style={{ marginBottom: 15 }}>{`Th??ng tin chi ti???t`}</h1>
            <div className='result-status'>
                <Descriptions contentStyle={{ backgroundColor: '#fff' }} labelStyle={{ width: '20%' }} size='middle' title="T???ng k???t" bordered column={1}>
                    <Descriptions.Item label="T??n b??i">{problem.title}</Descriptions.Item>
                    <Descriptions.Item label="Ng?????i l??m">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="????? kh??">
                        {
                            problem.rank === 0 ? <span className='difficulty-text' style={{ color: '#38c565' }}>D???</span> :
                                problem.rank === 1 ? <span className='difficulty-text' style={{ color: '#e7bf58' }}>Trung b??nh</span> :
                                    <span className='difficulty-text' style={{ color: '#d23b3b' }}>Kh??</span>
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Th???i gian">{moment(statDetails.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="Tr???ng th??i">
                        {
                            statDetails.status ?
                                <Badge color={'green'} style={{ color: '#38c565' }} text="Ho??n th??nh" /> :
                                <Badge color={'#f12f42'} style={{ color: 'red' }} text="Ch??a ho??n th??nh" />
                        }
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className='result-status'>
                <h6 style={{ marginBottom: 15 }}>Test Case</h6>
                <Table className="stat-table"
                    dataSource={statDetails.compile_details}
                    // loading={loading}
                    scroll={{ x: 1500 }}
                    pagination={false}
                    size='middle'
                    bordered={true}
                    rowKey={(stat: ICompile) => stat.testcase}
                    sticky={true}
                >
                    <Table.Column fixed='left' className='stat-align' title="Test Case" render={(stat: ICompile) => <span>{stat.testcase}</span>} width="10%" />
                    <Table.Column className='stat-align' title="Input" render={(stat: ICompile) => <span>{stat.input}</span>} width="25%" />
                    <Table.Column className='stat-align' title="Output" render={(stat: ICompile) => <span>{stat.output}</span>} width="25%" />
                    <Table.Column className='stat-align' title="K???t qu??? c???a b???n" render={(stat: ICompile) => <span>{stat.user_output}</span>} width="25%" />
                    <Table.Column className='stat-align' title="Th???i gian" render={(stat: ICompile) => <span>{moment(stat.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</span>} width="35%" />
                    <Table.Column className='stat-align' title="CPU Time" render={(stat: ICompile) => <span>{stat.cpuTime}</span>} width="25%" />
                    <Table.Column className='stat-align' title="B??? nh???" render={(stat: ICompile) => <span>{stat.memory}</span>} width="25%" />
                    <Table.Column fixed='right' className='stat-align' title="K???t qu???" render={(stat: ICompile) => stat.status === 1 ?
                        <Tooltip placement='top' title='????ng'>
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
                <CodeReader userCode={statDetails.code} userCodeLang={lang} />
            </div>
        </div>
    )
}
