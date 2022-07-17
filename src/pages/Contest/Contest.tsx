import { Input, List, Select, Tooltip } from 'antd';
import { FileUnknownOutlined, FileDoneOutlined, CheckCircleTwoTone, MinusCircleTwoTone, CheckCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProblemAction } from '../../redux/actions/ContestAction';
import { allProblemsSelector } from '../../redux/reducers/ContestReducer';
import { ApplicationDispatch } from '../../store/store';
import './ContestStyle.css'
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';

export const Contest = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userInfoSelector)
  const problemList = useSelector(allProblemsSelector)
  const [cloneProblemList, setCloneProblemList] = useState([...problemList])
  const [loading, setLoading] = useState(false)
  const [searchProb, setSearchProb] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState(99)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(getAllProblemAction())
      setLoading(false)
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (problemList.every((prob) => prob.title !== null || prob.question !== null)) {
      let tempList = problemList.filter((prob) => prob.title.toLowerCase().includes(searchProb.toLowerCase()) || prob.question.toLowerCase().includes(searchProb.toLowerCase()))
      if (selectedDifficulty !== 99)
        tempList = tempList.filter((prob) => prob.rank === selectedDifficulty)
      setCloneProblemList(tempList)
    }
    else
      setCloneProblemList(problemList)
  }, [problemList, searchProb, selectedDifficulty])

  return (
    <div className='contest-page'>
      <h1>Contest</h1>
      <p className='contest-intro'>Nơi tập hợp các bài tập lập trình thuật toán nhằm mục đích học tập và rèn luyện kỹ năng giải thuật.</p>
      <div className='contest-lists'>
        <div className='table-header-container'>
          <Input.Search
            placeholder="Tìm bài"
            allowClear
            onChange={(e) => { setSearchProb(e.target.value) }}
          />
          <Select
            id='select-difficulty'
            menuItemSelectedIcon={<CheckCircleFilled />}
            value={selectedDifficulty}
            style={{ width: 150 }}
            onChange={(v) => setSelectedDifficulty(v)}
            size={'middle'}
          >
            <Select.Option value={0}>Dễ</Select.Option>
            <Select.Option value={1}>Trung bình</Select.Option>
            <Select.Option value={2}>Khó</Select.Option>
            <Select.Option value={99}>Mọi cấp độ</Select.Option>
          </Select>
        </div>
        <div className='contest-list-container'>
          <List
            size='default'
            loading={loading}
            bordered
            dataSource={cloneProblemList}
            renderItem={problem => (
              <List.Item>
                <List.Item.Meta
                  avatar={problem.user_solved.some((userID) => userID === user.id) ? <FileDoneOutlined style={{ fontSize: '1.5em', color: '#52c41a' }} /> : <FileUnknownOutlined style={{ fontSize: '1.5em' }} />}
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  title={<a style={{ wordBreak: 'break-all', fontSize: '1.1em' }} onClick={() => navigate(`/problem/${problem.problem_id}`)}>{problem.title}</a>}
                  description={problem.question}
                />
                {
                  problem.rank === 0 ? <span className='difficulty-text' style={{ color: '#38c565' }}>Dễ</span> :
                    problem.rank === 1 ? <span className='difficulty-text' style={{ color: '#e7bd33' }}>Trung bình</span> :
                      <span className='difficulty-text' style={{ color: '#f23b3b' }}>Khó</span>
                }

                {
                  problem.user_solved.some((userID) => userID === user.id) ?
                    <Tooltip placement='top' title='Đã hoàn thành'>
                      <CheckCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="#52c41a" />
                    </Tooltip>
                    :
                    <Tooltip placement='top' title='Chưa hoàn thành'>
                      <MinusCircleTwoTone style={{ fontSize: '2em' }} twoToneColor="#ababab" />
                    </Tooltip>
                }
              </List.Item>
            )}
          />
        </div>
      </div>
    </div >
  )
}
