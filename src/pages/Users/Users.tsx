import { Avatar, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsersAction, getOneUsersAction } from '../../redux/actions/UserAction';
import { allUsersSelector } from '../../redux/reducers/UserReducer';
import { ApplicationDispatch } from '../../store/store';
import { dynamicSort } from '../../utils/util';
import './UsersStyle.css'

export const Users = () => {
    const dispatch: ApplicationDispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(allUsersSelector);
    const cloneUserList = [...userList]
    cloneUserList.sort(dynamicSort('-score'))

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const renderColor = (score: number) => {
        if (score >= 5 && score < 10)
          return '#87e8de'
        else if (score >= 10 && score < 15)
          return '#597ef7'
        else if (score >= 15)
          return '#f5222d'
        else
          return "#ae5924"
      }
    
    const onClickUser = async (id: number) => {
        await dispatch(getOneUsersAction(id))
        navigate(`/user/${id}`)
    }

    return (
        <div className='users-page'>
            <h1>Người dùng</h1>
            <Card className='user-card-container'>
                {cloneUserList.map((user) =>
                    <Card.Grid onClick={() => onClickUser(user.userid)} className='user-grid-style' style={{ background: `linear-gradient(315deg, ${renderColor(user.score)} 15%, #fafafa 0%)`}}>
                        <div className='users-card-item'>
                            <div>
                                <Avatar className='users-page-avatar' size={30} src={user.avatarImage} />
                                <span style={{ fontSize: 18 }}>{user.displayname}</span>
                            </div>
                            <span>{`${user.number_of_followers} người theo dõi`}</span>
                            <span>{`${user.score} điểm tích lũy`}</span>
                            <span>{`${user.number_of_post} bài viết`}</span>
                        </div>
                    </Card.Grid>)}
            </Card>
        </div>
    )
}
