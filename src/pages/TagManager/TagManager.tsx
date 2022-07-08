import { Row, Col, Tag, Table, Input, Button, Modal } from 'antd'
import { Column, ColumnConfig } from '@ant-design/plots';
import { AdminInfoBlock } from '../../common/Admin/AdminInfoBlock/AdminInfoBlock'
import { TagsFilled, EditOutlined, DeleteFilled, ProfileFilled, ProjectOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './TagManagerStyle.css'
import { useEffect, useState } from 'react';
import { ApplicationDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTagAction, getAllTagAction } from '../../redux/actions/TagAction';
import { allTagSelector } from '../../redux/reducers/TagReducer';
import { getAllPostAction } from '../../redux/actions/PostAction';
import { allPostSelector } from '../../redux/reducers/PostReducer';
import { dynamicSort } from '../../utils/util';
import { ITag } from '../../redux/interface/TagType';
import { CreateTagModal } from './components/CreateTagModal/CreateTagModal';
import { useNavigate } from 'react-router-dom';
import { EditTagModal } from './components/EditTagModal/EditTagModal';
import moment from 'moment';

export const TagManager = () => {
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tagID, setTagID] = useState(0);
  const tagList = useSelector(allTagSelector)
  const postList = useSelector(allPostSelector)
  const [searchTag, setSearchTag] = useState('')
  const [cloneTagList2, setCloneTagList2] = useState([...tagList])
  let cloneTagList = [...tagList]
  let clonePostList = [...postList]
  const postUseTag = clonePostList.filter((post) => post.posttag.length !== 0).length || 0
  const popularTag = cloneTagList.sort(dynamicSort('-postusetag')).slice(0, 3)
  const [data, setData] = useState<ITag[]>([]);
  const colorCodes: string[] = []
  tagList.forEach((tag) => colorCodes.push(tag.colorcode))

  useEffect(() => {
    setData(tagList)
  }, [tagList]);

  const config: ColumnConfig = {
    data,
    xField: 'content',
    yField: 'postusetag',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    label: {
      fields: ['content']
    },
    scrollbar: {
      type: 'horizontal',
    },
    seriesField: 'content',
    color: colorCodes,
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => {
        return { name: `Số bài viết chứa thẻ ${datum.content}`, value: datum.postusetag };
      },
    },
  };

  const renderPopularTags = () => {
    if (popularTag.length > 0) {
      if (popularTag[0].postusetag !== 0)
        return popularTag.map((tag) => <Tag style={{ borderRadius: '2em', fontSize: '0.9rem' }} color={tag.colorcode}>{`${tag.content}: ${tag.postusetag}`}</Tag>)
      else
        return <Tag style={{ borderRadius: '2em', fontSize: '0.9rem' }} color={''}>_____</Tag>
    }
    else
      return
  }

  useEffect(() => {
    dispatch(getAllTagAction())
    dispatch(getAllPostAction())
  }, [dispatch])

  useEffect(() => {
    if (tagList.every((tag) => tag.content !== null || tag.description !== null)) {
      const tempList = tagList.filter((tag) => tag.content.toLowerCase().includes(searchTag.toLowerCase()) || tag.description.toLowerCase().includes(searchTag.toLowerCase()))
      setCloneTagList2(tempList)
    }
    else
      setCloneTagList2(tagList)
  }, [searchTag, tagList])

  const defaultTagMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={showModal}>Tạo thẻ mới</Button>;

  const showModal = () => {
    setCreateModalVisible(true);
  };

  const showEditModal = (id: number) => {
    setTagID(id)
    setEditModalVisible(true)
  }

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      centered: true,
      closable: true,
      title: 'Bạn chắc chắn muốn xóa thẻ này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Thẻ cũng sẽ bị xóa khỏi các bài viết có chứa nó!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        await dispatch(deleteTagAction(id))
        await dispatch(getAllTagAction())
        navigate('/tagMng')
      },
    });
  };

  return (
    <div className='tag-manager-page'>
      <h1>Quản lý thẻ</h1>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={8} ><AdminInfoBlock description='Tổng số thẻ' quantity={`${tagList.length}`} icon={<TagsFilled />} iconBlockColor='#29d1aa' /></Col>
        <Col xs={24} xl={8} ><AdminInfoBlock description='Số bài viết dùng thẻ' quantity={`${postUseTag}/${postList.length}`} icon={<ProfileFilled />} iconBlockColor='#6584FE' /></Col>
        <Col xs={24} xl={8} ><AdminInfoBlock description='Thẻ nổi bật' componentInfo={<div className='popular-tags'>{renderPopularTags()}</div>} icon={<ProjectOutlined />} iconBlockColor='#DF6B31' /></Col>
      </Row>
      <h5 style={{ marginTop: 15 }}>Thống kê</h5>
      <div className='tag-mng-chart'>
        <Column {...config} />
      </div>
      <h5 style={{ marginTop: 15 }}>Danh sách thẻ</h5>
      <div className="tag-table-container">
        <div className='table-header-container'>
          <Input.Search
            placeholder="Tìm thẻ"
            allowClear
            onChange={(e) => { setSearchTag(e.target.value) }}
          />
          <Button type='primary' onClick={showModal}>Tạo thẻ mới</Button>
        </div>
        <Table className="tag-table"
          dataSource={cloneTagList2}
          pagination={{
            pageSize: 8,
          }}
          size='large'
          bordered={true}
          rowKey={(tag: ITag) => tag.id}
          sticky={true}
          footer={defaultTagMngFooter}
        >
          <Table.Column title="Tên thẻ" render={(tag: ITag) => <span>{tag.content}</span>} width="13%" />
          <Table.Column title="Mô tả" render={(tag: ITag) => <span>{tag.description}</span>} width="60%" />
          <Table.Column title="Icon" className='icon-col' render={(tag: ITag) => <i style={{ fontSize: '2em' }} className={tag.icon_class}></i>} width="7%" />
          <Table.Column title="Mã màu" className='icon-col' render={(tag: ITag) => <Tag color={tag.colorcode} style={{ padding: 3, borderRadius: '2em' }}>{tag.colorcode}</Tag>} width="10%" />
          <Table.Column title="Ngày tạo" render={(tag: ITag) => <span>{moment(tag.created_at).format('DD/MM/YYYY')}</span>} width="13%" />
          <Table.Column className="tag-mng-action" title="Hành động" width="10%"
            render={(tag: ITag) => (
              <>
                <EditOutlined className="icon-edit" onClick={() => showEditModal(tag.id)} />
                <DeleteFilled twoToneColor="#eb2f3f" className="icon-remove" onClick={() => showDeleteConfirm(tag.id)} />
              </>
            )}
          />
        </Table>
      </div>
      <EditTagModal editModalVisible={editModalVisible} setEditModalVisible={setEditModalVisible} tagID={tagID} />
      <CreateTagModal createModalVisible={createModalVisible} setCreateModalVisible={setCreateModalVisible} />
    </div>
  )
}
