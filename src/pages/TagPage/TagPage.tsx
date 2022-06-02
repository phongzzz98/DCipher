import { Card } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTagAction } from '../../redux/actions/TagAction'
import { allTagSelector } from '../../redux/reducers/TagReducer'
import { ApplicationDispatch } from '../../store/store'
import './TagPageStyle.css'

export const TagPage = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const tagList = useSelector(allTagSelector);

  useEffect(() => {
    dispatch(getAllTagAction())
  }, [dispatch])

  // const gridStyle: React.CSSProperties = {
  //   width: '40%',
  //   textAlign: 'center',
  //   margin: '5px',
  // };

  return (
    <div className='tag-page'>
      <div className='tag-list'>
        <h1>Thẻ</h1>
        <Card className='card-container'>
          {tagList.map((tag) => 
            <Card.Grid className='grid-style' style={{ background: `linear-gradient(135deg, ${tag.colorcode} 12%, hsl(210,8%,95%) 0%)`}}>
            <div>
                <h3>{tag.content}</h3>
                <p>{tag.description}</p>
            </div>
          </Card.Grid>)}
        </Card>
      </div>
    </div>
  )
}
