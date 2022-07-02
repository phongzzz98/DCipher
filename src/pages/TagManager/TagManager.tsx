import { Row, Col, Tag, Table, Input, Button } from 'antd'
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import { TagsFilled, EditOutlined, DeleteFilled, ProfileFilled } from '@ant-design/icons';
import './TagManagerStyle.css'
import { useEffect } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTagAction } from '../../redux/actions/TagAction';
import { allTagSelector } from '../../redux/reducers/TagReducer';
import { getAllPostAction } from '../../redux/actions/PostAction';
import { allPostSelector } from '../../redux/reducers/PostReducer';
import { dynamicSort } from '../../utils/util';
import { ITag } from '../../redux/interface/TagType';

export const TagManager = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const tagList = useSelector(allTagSelector)
  const postList = useSelector(allPostSelector)
  const cloneTagList = [...tagList]
  const clonePostList = [...postList]
  const postUseTag = clonePostList.filter((post) => post.posttag.length !== 0).length || 0
  const popularTag = cloneTagList.sort(dynamicSort('-postusetag')).slice(0, 3)

  useEffect(() => {
    dispatch(getAllTagAction())
    dispatch(getAllPostAction())
  }, [dispatch])

  return (
    <div className='tag-manager-page'>
      <h1>Quản lý thẻ</h1>
      <Row gutter={[20, 20]}>
        <Col span={8} ><AdminInfoBlock description='Tổng số thẻ' quantity={`${cloneTagList.length}`} icon={<TagsFilled />} /></Col>
        <Col span={8} ><AdminInfoBlock description='Số bài viết dùng thẻ' quantity={`${postUseTag}/${clonePostList.length}`} icon={<ProfileFilled />} /></Col>
        <Col span={8} ><AdminInfoBlock description='Thẻ nổi bật' componentInfo={<div className='popular-tags'>{popularTag.map((tag) => <Tag style={{ borderRadius: '2em', fontSize: '0.9rem' }} color={tag.colorcode}>{`${tag.content}: ${tag.postusetag}`}</Tag>)}</div>} icon={<TagsFilled />} /></Col>
      </Row>
      <h5 style={{marginTop: 15}}>Danh sách thẻ</h5>
      <div className="tag-table-container">
        <div className='table-header-container'>
          <Input.Search/>
          <Button type='primary'>Tạo thẻ</Button>
        </div>
        <Table className="tag-table"
          dataSource={cloneTagList}
          pagination={{
            pageSize: 8,
          }}
          size='large'
          bordered={true}>
          <Table.Column title="Tên thẻ" render={(tag: ITag) => <span>{tag.content}</span>} width="15%" />
          <Table.Column title="Mô tả" render={(tag: ITag) => <span>{tag.description}</span>} width="55%" />
          <Table.Column title="Icon" render={(tag: ITag) => <i style={{fontSize: '2em'}} className={tag.icon_class}></i>} width="5%" />
          <Table.Column title="Mã màu" render={(tag: ITag) => <Tag color={tag.colorcode} style={{padding: 3, borderRadius: '2em'}}>{tag.colorcode}</Tag>} width="15%" />
          <Table.Column className="tag-mng-action" title="Hành động" width="10%"
            render={() => (
              <>
                <EditOutlined className="icon-edit" />
                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" />
              </>
            )}
          />
        </Table>
      </div>
    </div>
  )
}
