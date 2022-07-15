import MDEditor from '@uiw/react-md-editor'
import { EyeOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneProblemAction, getProblemStatisticAction, submitProblemAction } from '../../redux/actions/ContestAction'
import { oneProblemsSelector, statisticSelector } from '../../redux/reducers/ContestReducer'
import { ApplicationDispatch } from '../../store/store'
import './ProblemStyle.css'
import katex from 'katex';
import { getCodeString } from 'rehype-rewrite';
import 'katex/dist/katex.css';
import { CodeEditor } from '../../common/CodeEditor/CodeEditor'
import { Button, Divider, notification, Table, Tabs, Tooltip } from 'antd'
import { accessTokenSelector, userInfoSelector } from '../../redux/reducers/AuthReducer'
import { IStatistic, IStatisticIDs, ISubmitProblem } from '../../redux/interface/ContestType'
import moment from 'moment';

export const Problem = () => {
    const { id } = useParams<{ id: string }>()
    const accessToken = useSelector(accessTokenSelector)
    const user = useSelector(userInfoSelector)
    const statistic = useSelector(statisticSelector)
    const navigate = useNavigate()
    const [userCode, setUserCode] = useState(``);
    const [userCodeLang, setUserCodeLang] = useState('python')
    const [apiLang, setApiLang] = useState('python')
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const dispatch: ApplicationDispatch = useDispatch()
    const selectedProblem = useSelector(oneProblemsSelector)

    useEffect(() => {
        const dataIDs: IStatisticIDs = {
            uid: user.id,
            pid: parseInt(id!)
        }
        dispatch(getOneProblemAction(parseInt(id!)))
        if (accessToken)
            dispatch(getProblemStatisticAction(dataIDs))
    }, [accessToken, dispatch, id, user.id])

    const handleClick = async () => {
        if (userCode === "") {
            notification.error({
                placement: 'bottomRight',
                message: "Không thể nộp bài trống!"
            })
        }
        else {
            const dataIDs: IStatisticIDs = {
                uid: user.id,
                pid: parseInt(id!)
            }
            setLoadingSubmit(true)
            const submition: ISubmitProblem = {
                code: userCode,
                language: apiLang,
                problem_id: selectedProblem.problem_id,
                user_id: user.id
            }
            await dispatch(submitProblemAction(submition))
            await dispatch(getProblemStatisticAction(dataIDs))
            setLoadingSubmit(false)
        }
    }

    const renderTable = (i: number) => {
        return (
            <tr>
                <td>{selectedProblem.input[i]}</td>
                <td>{selectedProblem.output[i]}</td>
            </tr>
        )

    }

    return (
        <div className='problem-page'>
            <h1>{selectedProblem.title}</h1>
            <p className='problem-question'>{selectedProblem.question}</p>
            <Tabs defaultActiveKey="1" size={'small'} style={{ marginBottom: 32 }}>
                <Tabs.TabPane tab={`Bài tập`} key="1">
                    <div className="problem-main" data-color-mode="dark">
                        <MDEditor
                            className='problem-markdown-section'
                            value={selectedProblem.content}
                            preview='preview'
                            hideToolbar={true}
                            previewOptions={{
                                components: {
                                    code: ({ inline, children = [], className, ...props }) => {
                                        const txt = children[0] || '';
                                        if (inline) {
                                            if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                                const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                                    throwOnError: false,
                                                });
                                                return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                            }
                                            return <code>{txt}</code>;
                                        }
                                        const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                                        if (
                                            typeof code === 'string' &&
                                            typeof className === 'string' &&
                                            /^language-katex/.test(className.toLocaleLowerCase())
                                        ) {
                                            const html = katex.renderToString(code, {
                                                throwOnError: false,
                                            });
                                            return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                                        }
                                        return <code className={String(className)}>{txt}</code>;
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='input-output-table'>
                        <table id="IO">
                            <tr>
                                <th>Input</th>
                                <th>Output</th>
                            </tr>
                            {selectedProblem.input.map((value, index) => renderTable(index))}
                        </table>
                    </div>
                    <Divider children='Giải' />
                    {
                        accessToken ?
                            <>
                                <div>
                                    <CodeEditor setUserCode={setUserCode} setUserCodeLang={setUserCodeLang} userCode={userCode} userCodeLang={userCodeLang} setOuterAPILang={setApiLang} />
                                </div>
                                <div className='submit-btn-container'>
                                    <Button loading={loadingSubmit} style={{ width: '30%' }} shape='round' type='primary' onClick={handleClick} size='large' >Nộp bài</Button>
                                </div>
                            </> :
                            <div className='submit-btn-container'>
                                <Button shape='round' size='large' type="primary" onClick={() => navigate('/login')} >Đăng ký tài khoản để làm bài</Button>
                            </div>
                    }
                </Tabs.TabPane>
                {
                    accessToken ?
                        <Tabs.TabPane tab={`Kết quả`} key="2">
                            <Table className="stat-table"
                                dataSource={statistic}
                                pagination={{
                                    pageSize: 20,
                                }}
                                // loading={loading}
                                size='large'
                                bordered={true}
                                rowKey={(stat: IStatistic) => stat.id}
                                sticky={true}
                            >
                                <Table.Column className='stat-align' title="STT" render={(value, item, index) => index + 1} width="10%" />
                                <Table.Column className='stat-align' title="Thời gian" render={(stat: IStatistic) => <span>{moment(stat.created_at).format('DD/MM/YYYY --- HH:mm:ss')}</span>} width="35%" />
                                <Table.Column className='stat-align' title="Ngôn ngữ" render={(stat: IStatistic) => <span>{stat.language}</span>} width="25%" />
                                <Table.Column className='stat-align' title="Kết quả" render={(stat: IStatistic) => stat.status ?
                                    <Tooltip placement='top' title='Đúng'>
                                        <CheckCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="#52c41a" />
                                    </Tooltip>
                                    :
                                    <Tooltip placement='top' title='Sai'>
                                        <CloseCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="red" />
                                    </Tooltip>
                                } width="15%" />

                                <Table.Column className="stat-align" title="Hành động" width="15%"
                                    render={(stat: IStatistic) => (
                                        <>
                                            <EyeOutlined className='icon-view' onClick={() => navigate(`/statDetail/${user.id}/${stat.id}`)} />
                                        </>
                                    )}
                                />
                            </Table>
                        </Tabs.TabPane> : null
                }
            </Tabs>
        </div>
    )
}
