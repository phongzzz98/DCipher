import MDEditor from '@uiw/react-md-editor'
import { Button, Collapse, Form, Input, Select, Tag } from 'antd'
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
import { getOnePostAction } from '../../redux/actions/PostAction';
import { onePostSelector } from '../../redux/reducers/PostReducer';
import { useForm } from 'antd/lib/form/Form';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

export const EditPost = () => {
  const user = useSelector(userInfoSelector);
  const { id } = useParams<{ id: string }>()
  const tagList = useSelector(allTagSelector);
  let cloneTagList = [...tagList]
  cloneTagList.sort(dynamicSort('content'))
  const options: any[] = []
  cloneTagList.forEach((tag) => options.push({ value: tag.id, label: tag.content }))
  const [form] = useForm();
  const selectedPost = useSelector(onePostSelector)
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [userCode, setUserCode] = useState(``);
  const [userCodeLang, setUserCodeLang] = useState('python')
  const [tags, setTags] = useState<number[]>([])
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

  const handleChange = (value: number[]) => {
    console.log(`selected ${value}`);
    setTags(value)
  }

  return (
    <div>
      <div className='create-post-container'>
        <h1>Sửa bài viết</h1>
        <Form form={form} fields={currentField} labelCol={{ span: 2 }} wrapperCol={{ span: 25 }} initialValues={{ remember: true }} >
          <Form.Item className='create-post-form-item' label="Tiêu đề" name='editPostTitle' rules={[{ required: true, message: 'Hãy nhập tiêu đề!', }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Nội dung" name='editPostContent' rules={[{ required: true, message: 'Hãy nhập nội dung!', }]}>
            <div className="container" data-color-mode="light">
              <MDEditor
                className='create-post-md'
                value={value}
                onChange={setValue}
                height={300}
              />
            </div>
            <QuestionCircleOutlined />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Gán thẻ" name='editPostTag'>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Chọn các thẻ liên quan đến bài viết"
              onChange={handleChange}
              getPopupContainer={trigger => trigger.parentNode}
              options={options}
            >
            </Select>
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Code" name='editPostCode'>
            <Collapse defaultActiveKey={['1']}>
              <Collapse.Panel header="Thêm code" key="1">
                <CodeEditor userCode={userCode} setUserCode={setUserCode} userCodeLang={userCodeLang} setUserCodeLang={setUserCodeLang} />
              </Collapse.Panel>
            </Collapse>
          </Form.Item>
          <Form.Item className='create-post-form-item' id='editPostButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
            <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" >Tạo bài viết</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
