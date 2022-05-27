import MDEditor from '@uiw/react-md-editor';
import { Button, Form, Input, Select } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CodeEditor } from '../../common/CodeEditor/CodeEditor';
import { createPostAction } from '../../redux/actions/PostAction';
import { getAllTagAction } from '../../redux/actions/TagAction';
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { allTagSelector } from '../../redux/reducers/TagReducer';
import { ApplicationDispatch } from '../../store/store';
import './CreatePostStyle.css'

export const CreatePost = () => {
  const user = useSelector(userInfoSelector);
  const tagList = useSelector(allTagSelector);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [userCode, setUserCode] = useState(``);
  const [tags, setTags] = useState<number[]>([])
  const dispatch: ApplicationDispatch = useDispatch()  

  useEffect(() => {
    dispatch(getAllTagAction())
  }, [dispatch])
  
  const handleChange = (value: number[]) => {
    console.log(`selected ${value}`);
    setTags(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await dispatch(createPostAction({
        title: title,
        content: value,
        code: userCode,
        tagid: tags,
        userid: user.id
      }))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='create-post-container'>
        <h1>Tạo bài viết</h1>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }} >
          <Form.Item className='create-post-form-item' label="Tiêu đề" name='createPostTitle' rules={[{ required: true, message: 'Please input your title!', }]}>
            <Input size="large" onChange={e => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Nội dung" name='createPostContent' rules={[{ required: true, message: 'Please input your content!', }]}>
            <div className="container" data-color-mode="light">
              <MDEditor
                className='create-post-md'
                value={value}
                onChange={setValue}
              />
            </div>
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Gán thẻ" name='createPostTag'>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={handleChange}
            >
              {tagList.map((tag) => <Select.Option key={tag.id}>{tag.content}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Code" name='createPostCode'>
            <CodeEditor userCode={userCode} setUserCode={setUserCode} />
          </Form.Item>
          <Form.Item className='create-post-form-item' id='createPostButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
            <Button style={{width: '50%'}} shape='round' size='large' type="primary" htmlType="submit" onClick={handleSubmit} >Tạo bài viết</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
