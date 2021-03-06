import MDEditor from '@uiw/react-md-editor'
import { Button, Collapse, Form, Input, notification, Select } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeEditor } from '../../common/CodeEditor/CodeEditor'
import { getAllTagAction } from '../../redux/actions/TagAction'
import { userInfoSelector } from '../../redux/reducers/AuthReducer'
import { allTagSelector } from '../../redux/reducers/TagReducer'
import { ApplicationDispatch } from '../../store/store'
import { dynamicSort } from '../../utils/util'
import { editPostAction, getOnePostAction } from '../../redux/actions/PostAction';
import { onePostSelector } from '../../redux/reducers/PostReducer';
import { useForm } from 'antd/lib/form/Form';
import { IEditPost } from '../../redux/interface/PostType';
import { MDHelpPopUp } from '../../common/MDHelpPopUp/MDHelpPopUp';

export const EditPost = () => {
  const user = useSelector(userInfoSelector);
  const { id } = useParams<{ id: string }>()
  const tagList = useSelector(allTagSelector);
  const [helpPopup, setHelpPopup] = useState(false)
  let cloneTagList = [...tagList]
  cloneTagList.sort(dynamicSort('content'))
  const options: any[] = []
  cloneTagList.forEach((tag) => options.push({ value: tag.id, label: tag.content }))
  const [form] = useForm();
  const selectedPost = useSelector(onePostSelector)
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [userCode, setUserCode] = useState(``);
  const [userCodeLang, setUserCodeLang] = useState('python')
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>()

  useEffect(() => {
    dispatch(getAllTagAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getOnePostAction(id!))
  }, [dispatch, id])

  useEffect(() => {
    const getTags = () => {
      const tags: number[] = [];
      selectedPost[0].posttag.forEach((tag) => tags.push(tag.tagid))
      return tags
    }
    setCurrentField([
      { name: 'editPostTitle', value: selectedPost[0].post_title },
      { name: 'editPostTag', value: getTags() }
    ])
    setValue(selectedPost[0].postcontent)
    if (selectedPost[0].post_code !== null) {
      setUserCode(selectedPost[0].post_code)
    }

    if (selectedPost[0].post_language !== null)
      setUserCodeLang(selectedPost[0].post_language)
  }, [selectedPost])

  const handleEdit = async () => {
    form.validateFields().then(async values => {
      try {
        if (values.editPostTitle === "" || value === "") {
          notification.error({
            placement: 'bottomRight',
            message: "Vui l??ng nh???p c??c tr?????ng c??n thi???u!"
          })
        }
        else {
          const editedPost: IEditPost = {
            title: values.editPostTitle,
            code: userCode,
            content: value,
            id: parseInt(id!),
            language: userCodeLang,
            tagid: values.editPostTag,
            userid: user.id
          }
          await dispatch(editPostAction(editedPost))
          navigate(`/post/${id}`)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    )
  }

return (
  <div>
    <div className='create-post-container'>
      <h1>S???a b??i vi???t</h1>
      <Form form={form} fields={currentField} labelCol={{ span: 2 }} wrapperCol={{ span: 25 }} initialValues={{ remember: true }} >
        <Form.Item className='create-post-form-item' label="Ti??u ?????" name='editPostTitle' rules={[{ required: true, message: 'H??y nh???p ti??u ?????!', }]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item className='create-post-form-item' label="N???i dung" name='editPostContent'>
          <div className="container" data-color-mode="light">
            <MDEditor
              className='create-post-md'
              value={value}
              onChange={setValue}
              height={300}
            />
          </div>
          <QuestionCircleOutlined onClick={() => setHelpPopup(true)} />
        </Form.Item>
        <Form.Item className='create-post-form-item' label="G??n th???" name='editPostTag'>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Ch???n c??c th??? li??n quan ?????n b??i vi???t"
            getPopupContainer={trigger => trigger.parentNode}
            options={options}
          >
          </Select>
        </Form.Item>
        <Form.Item className='create-post-form-item' label="Code" name='editPostCode'>
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Th??m code" key="1">
              <CodeEditor userCode={userCode} setUserCode={setUserCode} userCodeLang={userCodeLang} setUserCodeLang={setUserCodeLang} />
            </Collapse.Panel>
          </Collapse>
        </Form.Item>
        <Form.Item className='create-post-form-item' id='editPostButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
          <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" onClick={handleEdit} >S???a b??i vi???t</Button>
        </Form.Item>
      </Form>
    </div>
    <MDHelpPopUp helpModalVisible={helpPopup} setHelpModalVisible={setHelpPopup} />
  </div>
)
}
