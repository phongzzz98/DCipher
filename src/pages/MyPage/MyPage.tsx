import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../configs/axios'
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import { ApplicationDispatch } from '../../store/store'
import bigOunce from '../../assets/images/BigOunce.png'
import './MyPageStyle.css'
import moment from 'moment'
import { LinkOutlined } from "@ant-design/icons";

export const MyPage = () => {
  const navigate = useNavigate()
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const [userDetails, setUserDetails] = useState()
  useEffect(() => {
    if (user.id !== 0) {
      const getUserDetail = () => {
        axiosInstance.get(`https://code-ide-forum.herokuapp.com/api/userdetails/${user.id}`)
          .then((res) => {
            setUserDetails(res.data)
          })
      }
      getUserDetail()
    }
    else return;
  }, [user.id])

  return (
    <div className='my-page'>
      <div className="basic-user-info">
        <Avatar size={200} className="" src={bigOunce} />
        <div>
          <h1>{user.username}</h1>
          <h6>{moment(user.created_at).format('DD/MM/YYYY')}</h6>
          <LinkOutlined /><span>{user.email}</span>
        </div>
      </div>
    </div>
  )
}
