import MDEditor from '@uiw/react-md-editor';
import { Button, Form, Input, Select } from 'antd'
import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CodeEditor } from '../../common/CodeEditor/CodeEditor';
import { createPostAction } from '../../redux/actions/PostAction';
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { ApplicationDispatch } from '../../store/store';
import './CreatePostStyle.css'

export const CreatePost = () => {
  const user = useSelector(userInfoSelector);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [userCode, setUserCode] = useState(``);
  const [tags, setTags] = useState<string[]>([])
  const dispatch: ApplicationDispatch = useDispatch()

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    setTags(value)
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await dispatch(createPostAction({
        title: title,
        content: value,
        code: "a=4\nb=3\nprint(a+b)\nc=34",
        tagid: [1, 2, 3],
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
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} >
          <Form.Item className='create-post-form-item' label="Tiêu đề" name='createPostTitle' rules={[{ required: true, message: 'Please input your title!', }]}>
            <Input size="large" onChange={e => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Nội dung" name='createPostContent' rules={[{ required: true, message: 'Please input your content!', }]}>
            <div className="container" data-color-mode="light">
              <MDEditor
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
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Code" name='createPostCode'>
            <CodeEditor userCode={userCode} setUserCode={setUserCode} />
          </Form.Item>
          <Form.Item className='create-post-form-item' id='createPostButton' valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Button shape='round' size='large' type="primary" htmlType="submit" onClick={handleSubmit} >Tạo bài viết</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
