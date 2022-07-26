import MDEditor from '@uiw/react-md-editor';
import { Button, Collapse, Form, Input, notification, Select } from 'antd'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { CodeEditor } from '../../common/CodeEditor/CodeEditor';
import { createPostAction } from '../../redux/actions/PostAction';
import { getAllTagAction } from '../../redux/actions/TagAction';
import { userInfoSelector } from '../../redux/reducers/AuthReducer';
import { allTagSelector } from '../../redux/reducers/TagReducer';
import { ApplicationDispatch } from '../../store/store';
import './CreatePostStyle.css'
import { dynamicSort } from '../../utils/util';
import { useNavigate } from 'react-router-dom';
// import katex from 'katex';
// import { getCodeString } from 'rehype-rewrite';
import 'katex/dist/katex.css';
import { MDHelpPopUp } from '../../common/MDHelpPopUp/MDHelpPopUp';

export const CreatePost = () => {
  const user = useSelector(userInfoSelector);
  const tagList = useSelector(allTagSelector);
  let cloneTagList = [...tagList]
  const [helpPopup, setHelpPopup] = useState(false)
  const [title, setTitle] = useState('');
  const [value, setValue] = useState<any>("**Hello world!!!**");
  const [userCode, setUserCode] = useState(``);
  const [userCodeLang, setUserCodeLang] = useState('python')
  const [tags, setTags] = useState<number[]>([])
  const dispatch: ApplicationDispatch = useDispatch()
  const navigate = useNavigate()
  cloneTagList.sort(dynamicSort('content'))
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
      if (title === "" || value === "") {
        notification.error({
          placement: 'bottomRight',
          message: "Vui lòng nhập các trường còn thiếu!"
        })
      }
      else {
        await dispatch(createPostAction({
          title: title,
          content: value,
          code: userCode,
          tagid: tags,
          userid: user.id,
          language: userCodeLang,
        }))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='create-post-container'>
        <h1>Tạo bài viết</h1>
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 25 }} initialValues={{ remember: true }} >
          <Form.Item className='create-post-form-item' label="Tiêu đề" name='createPostTitle' rules={[{ required: true, message: 'Hãy nhập tiêu đề!', }]}>
            <Input size="large" onChange={e => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Nội dung" name='createPostContent' rules={[{ required: true, message: 'Hãy nhập nội dung!', }]}>
            <div className="container" data-color-mode="light">
              <MDEditor
                className='create-post-md'
                value={value}
                onChange={setValue}
                height={300}
                // previewOptions={{
                //   components: {
                //     code: ({ inline, children = [], className, ...props }) => {
                //       const txt = children[0] || '';
                //       if (inline) {
                //         if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                //           const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                //             throwOnError: false,
                //           });
                //           return <code dangerouslySetInnerHTML={{ __html: html }} />;
                //         }
                //         return <code>{txt}</code>;
                //       }
                //       const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                //       if (
                //         typeof code === 'string' &&
                //         typeof className === 'string' &&
                //         /^language-katex/.test(className.toLocaleLowerCase())
                //       ) {
                //         const html = katex.renderToString(code, {
                //           throwOnError: false,
                //         });
                //         return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                //       }
                //       return <code className={String(className)}>{txt}</code>;
                //     },
                //   },
                // }}
              />
            </div>
            <QuestionCircleOutlined onClick={() => setHelpPopup(true)} />
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Gán thẻ" name='createPostTag'>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Chọn các thẻ liên quan đến bài viết"
              onChange={handleChange}
              getPopupContainer={trigger => trigger.parentNode}
            >
              {cloneTagList.map((tag) => <Select.Option key={tag.id}>{tag.content}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item className='create-post-form-item' label="Code" name='createPostCode'>
            <Collapse defaultActiveKey={['1']}>
              <Collapse.Panel header="Thêm code" key="1">
                <CodeEditor userCode={userCode} setUserCode={setUserCode} setUserCodeLang={setUserCodeLang} />
              </Collapse.Panel>
            </Collapse>
          </Form.Item>
          <Form.Item className='create-post-form-item' id='createPostButton' valuePropName="checked" wrapperCol={{ offset: 9, span: 20 }}>
            <Button style={{ width: '50%' }} shape='round' size='large' type="primary" htmlType="submit" onClick={handleSubmit}>Tạo bài viết</Button>
          </Form.Item>
        </Form>
      </div>
      <MDHelpPopUp helpModalVisible={helpPopup} setHelpModalVisible={setHelpPopup} />
    </div>
  )
}
