import MDEditor from '@uiw/react-md-editor';
import { Modal, Form, Input, InputNumber, Select, notification } from 'antd'
import { CheckCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationDispatch } from '../../../../store/store';
import katex from 'katex';
import { getCodeString } from 'rehype-rewrite';
import 'katex/dist/katex.css';
import { useForm } from 'antd/lib/form/Form';
import { ICreateProblem } from '../../../../redux/interface/ContestType';
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer';
import { createProblemAction, getAllProblemAdminAction } from '../../../../redux/actions/ContestAction';
import { MDHelpPopUp } from '../../../../common/MDHelpPopUp/MDHelpPopUp';

interface CreateContestModalProps {
  createModalVisible: boolean;
  setCreateModalVisible: Function;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};
// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: { span: 24, offset: 0 },
//     sm: { span: 20, offset: 4 },
//   },
// };

export const CreateContestModal = ({ createModalVisible, setCreateModalVisible }: CreateContestModalProps) => {
  const dispatch: ApplicationDispatch = useDispatch()
  const user = useSelector(userInfoSelector)
  const [form] = useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [helpPopup, setHelpPopup] = useState(false)
  const [valueTopic, setValueTopic] = useState<any>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(0)

  const handleCancel = () => {
    setCreateModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const input1 = values.createContestI1
      const input2 = values.createContestI2 ? values.createContestI2 : ''
      const input3 = values.createContestI3 ? values.createContestI3 : ''
      const input4 = values.createContestI4 ? values.createContestI4 : ''
      const output1 = values.createContestO1
      const output2 = values.createContestO2 ? values.createContestO2 : ''
      const output3 = values.createContestO3 ? values.createContestO3 : ''
      const output4 = values.createContestO4 ? values.createContestO4 : ''
      if (values.createContestTitle === "" || values.createContestQuestion === "" || valueTopic === "" || values.createContestI1 === "" || values.createContestIO1 === "") {
        notification.error({
          placement: 'bottomRight',
          message: "Vui l??ng nh???p c??c tr?????ng c??n thi???u!"
        })
      }
      else if (
        (input2 !== "" && output2 === "") ||
        (input2 === "" && output2 !== "") ||
        (input3 !== "" && output3 === "") ||
        (input3 === "" && output3 !== "") ||
        (input4 !== "" && output4 === "") ||
        (input4 === "" && output4 !== "")) {
        notification.error({
          placement: 'bottomRight',
          message: "C??c Input ph???i c?? Output ??i k??m v?? ng?????c l???i!"
        })
      }
      else {
        let inputString: string = '';
        if (input2 || input3 || input4) {
          inputString = input1.concat(',', input2).concat(',', input3).concat(',', input4)
          inputString = inputString.split(',').filter(Boolean).join(',');
        }
        else {
          inputString = values.createContestI1
        }
        let outputString: string = '';
        if (output2 || output3 || output4) {
          outputString = output1.concat(',', output2).concat(',', output3).concat(',', output4)
          outputString = outputString.split(',').filter(Boolean).join(',');
        }
        else {
          outputString = values.createContestO1
        }
        const newProblem: ICreateProblem = {
          input: inputString,
          output: outputString,
          question: values.createContestQuestion,
          rank: values.createContestDifficulty,
          score: values.createContestScore,
          title: values.createContestTitle,
          user_id: user.id,
          content: valueTopic
        }
        setConfirmLoading(true);
        setTimeout(async () => {
          await dispatch(createProblemAction(newProblem))
          await dispatch(getAllProblemAdminAction())
          setConfirmLoading(false);
          setCreateModalVisible(false)
        }, 500);
      }
    })
  };
  return (
    <Modal
      destroyOnClose={true}
      title="T???o b??i t???p m???i"
      visible={createModalVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='T???o'
      cancelText='H???y'
      width={'80%'}
      style={{ fontFamily: 'SofiaProSemiBold' }}
    >
      <Form form={form} {...formItemLayout} >
        <Form.Item className='create-contest-form-item' label="T??n b??i" name='createContestTitle' rules={[{ required: true, message: 'H??y nh???p t??n b??i!', }]}>
          <Input size="middle" />
        </Form.Item>
        <Form.Item className='create-contest-form-item' label="C??u h???i" name='createContestQuestion' rules={[{ required: true, message: 'H??y nh???p c??u h???i!', }]}>
          <Input size="middle" />
        </Form.Item>
        <Form.Item className='create-contest-form-item' label="????? b??i" name='createContestTopic' rules={[{ required: true, message: 'H??y nh???p ????? b??i!', }]}>
          <div className="create-problem-main" data-color-mode="light">
            <MDEditor
              className='create-problem-markdown-section'
              value={valueTopic}
              onChange={setValueTopic}
              previewOptions={{
                components: {
                  code: ({ inline, children = [], className, ...props }) => {
                    const txt = children[0] || '';
                    if (inline) {
                      if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                        const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                          throwOnError: false,
                        });
                        return <code dangerouslySetInnerHTML={{ __html: html }} />;
                      }
                      return <code>{txt}</code>;
                    }
                    const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                    if (
                      typeof code === 'string' &&
                      typeof className === 'string' &&
                      /^language-katex/.test(className.toLocaleLowerCase())
                    ) {
                      const html = katex.renderToString(code, {
                        throwOnError: false,
                      });
                      return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                    return <code className={String(className)}>{txt}</code>;
                  },
                },
              }}
            />
            <QuestionCircleOutlined onClick={() => setHelpPopup(true)} />
          </div>
        </Form.Item>
        <Form.Item className='create-contest-form-item' label="????? kh??" name='createContestDifficulty' rules={[{ required: true, message: 'H??y ch???n ????? kh??!', }]}>
          <Select
            id='select-difficulty'
            menuItemSelectedIcon={<CheckCircleFilled />}
            value={selectedDifficulty}
            style={{ width: 150 }}
            onChange={(v) => setSelectedDifficulty(v)}
            size={'middle'}
          >
            <Select.Option value={0}>D???</Select.Option>
            <Select.Option value={1}>Trung b??nh</Select.Option>
            <Select.Option value={2}>Kh??</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className='create-contest-form-item' label="??i???m" name='createContestScore' rules={[{ required: true, message: 'H??y ch???n ??i???m!', }]}>
          <InputNumber defaultValue={0} min={0} size="middle" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 1">
          <Form.Item
            name="createContestI1"
            rules={[{ required: true, message: 'H??y ??i???n ??t nh???t 1 Input!' }]}
            style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
          >
            <Input placeholder='Nh???p input' size="middle" />
          </Form.Item>
          <Form.Item
            name="createContestO1"
            rules={[{ required: true, message: 'H??y ??i???n ??t nh???t 1 Output!' }]}
            style={{ display: 'inline-block', width: '48%' }}
          >
            <Input placeholder='Nh???p output' size="middle" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 2">
          <Form.Item
            name="createContestI2"
            style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
          >
            <Input placeholder='Nh???p input' size="middle" />
          </Form.Item>
          <Form.Item
            name="createContestO2"
            style={{ display: 'inline-block', width: '48%' }}
          >
            <Input placeholder='Nh???p output' size="middle" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 3">
          <Form.Item
            name="createContestI3"
            style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
          >
            <Input placeholder='Nh???p input' size="middle" />
          </Form.Item>
          <Form.Item
            name="createContestO3"
            style={{ display: 'inline-block', width: '48%' }}
          >
            <Input placeholder='Nh???p output' size="middle" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 4">
          <Form.Item
            name="createContestI4"
            style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
          >
            <Input placeholder='Nh???p input' size="middle" />
          </Form.Item>
          <Form.Item
            name="createContestO4"
            style={{ display: 'inline-block', width: '48%' }}
          >
            <Input placeholder='Nh???p output' size="middle" />
          </Form.Item>
        </Form.Item>
      </Form>
      <MDHelpPopUp helpModalVisible={helpPopup} setHelpModalVisible={setHelpPopup} />
    </Modal>
  )
}
