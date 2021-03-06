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
        return { name: `S??? b??i vi???t ch???a th??? ${datum.content}`, value: datum.postusetag };
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

  const defaultTagMngFooter = () => <Button style={{ width: '100%' }} icon={<PlusOutlined />} type='dashed' onClick={showModal}>T???o th??? m???i</Button>;

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
      title: 'B???n ch???c ch???n mu???n x??a th??? n??y?',
      icon: <ExclamationCircleOutlined />,
      content: 'Th??? c??ng s??? b??? x??a kh???i c??c b??i vi???t c?? ch???a n??!',
      okText: 'X??a',
      okType: 'danger',
      cancelText: 'H???y',
      async onOk() {
        await dispatch(deleteTagAction(id))
        await dispatch(getAllTagAction())
        navigate('/tagMng')
      },
    });
  };

  return (
    <div className='tag-manager-page'>
      <h1>Qu???n l?? th???</h1>
      <Row gutter={[20, 20]}>
        <Col xs={24} xl={8} ><AdminInfoBlock description='T???ng s??? th???' quantity={`${tagList.length}`} icon={<TagsFilled />} iconBlockColor='#89f13a' /></Col>
        <Col xs={24} xl={8} ><AdminInfoBlock description='S??? b??i vi???t d??ng th???' quantity={`${postUseTag}/${postList.length}`} icon={<ProfileFilled />} iconBlockColor='#15f4FE' /></Col>
        <Col xs={24} xl={8} ><AdminInfoBlock description='Th??? n???i b???t' componentInfo={<div className='popular-tags'>{renderPopularTags()}</div>} icon={<ProjectOutlined />} iconBlockColor='#fFeB81' /></Col>
      </Row>
      <h5 style={{ marginTop: 15 }}>Th???ng k??</h5>
      <div className='tag-mng-chart'>
        <Column {...config} />
      </div>
      <h5 style={{ marginTop: 15 }}>Danh s??ch th???</h5>
      <div className="tag-table-container">
        <div className='table-header-container'>
          <Input.Search
            placeholder="T??m th???"
            allowClear
            onChange={(e) => { setSearchTag(e.target.value) }}
          />
          <Button type='primary' onClick={showModal}>T???o th??? m???i</Button>
        </div>
        <Table className="tag-table"
          dataSource={cloneTagList2}
          pagination={{
            pageSizeOptions: [5, 10, 20, 50],
            showSizeChanger: true
        }}
          size='large'
          bordered={true}
          rowKey={(tag: ITag) => tag.id}
          sticky={true}
          footer={defaultTagMngFooter}
        >
          <Table.Column title="T??n th???" render={(tag: ITag) => <span>{tag.content}</span>} width="13%" />
          <Table.Column title="M?? t???" render={(tag: ITag) => <span>{tag.description}</span>} width="60%" />
          <Table.Column title="Icon" className='icon-col' render={(tag: ITag) => <i style={{ fontSize: '2em' }} className={tag.icon_class}></i>} width="7%" />
          <Table.Column title="M?? m??u" className='icon-col' render={(tag: ITag) => <Tag color={tag.colorcode} style={{ padding: 3, borderRadius: '2em' }}>{tag.colorcode}</Tag>} width="10%" />
          <Table.Column title="Ng??y t???o" render={(tag: ITag) => <span>{moment(tag.created_at).format('DD/MM/YYYY')}</span>} width="13%" />
          <Table.Column className="tag-mng-action" title="H??nh ?????ng" width="10%"
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
