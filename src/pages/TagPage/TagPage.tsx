import { Card } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchPostByTagAction } from '../../redux/actions/PostAction'
import { getAllTagAction } from '../../redux/actions/TagAction'
import { allTagSelector } from '../../redux/reducers/TagReducer'
import { ApplicationDispatch } from '../../store/store'
import { dynamicSort } from '../../utils/util'
import './TagPageStyle.css'

export const TagPage = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const tagList = useSelector(allTagSelector);
  const cloneTagList = [...tagList]
  const navigate = useNavigate();
  cloneTagList.sort(dynamicSort('content'))

  useEffect(() => {
    dispatch(getAllTagAction())
  }, [dispatch])

  const onClickTag = (value: string) => {
    dispatch(searchPostByTagAction(value)).then(() => {
      navigate('/search')
    })
  }

  return (
    <div className='tag-page'>
      <div className='tag-list'>
        <h1>Thẻ</h1>
        <Card className='card-container'>
          {cloneTagList.map((tag) => 
            <Card.Grid onClick={() => onClickTag(tag.content)} className='grid-style' style={{ background: `linear-gradient(135deg, ${tag.colorcode} 12%, #fafafa 0%)`}}>
            <div>
                <i style={{fontSize: 24, marginRight: 10}} className={tag.icon_class}></i>
                <span style={{fontSize: 24}}>{tag.content}</span>
                <p>{tag.description}</p>
                <span>{tag.postusetag}</span>
            </div>
          </Card.Grid>)}
        </Card>
      </div>          
    </div>
  )
}
