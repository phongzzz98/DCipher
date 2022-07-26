import MDEditor from '@uiw/react-md-editor';
import { Modal, Form, Input, Select, InputNumber, notification } from 'antd';
import { CheckCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import katex from 'katex';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCodeString } from 'rehype-rewrite';
import { userInfoSelector } from '../../../../redux/reducers/AuthReducer';
import { ApplicationDispatch } from '../../../../store/store';
import { editProblemAction, getAllProblemAdminAction, getOneProblemAdminAction } from '../../../../redux/actions/ContestAction';
import { oneProblemAdminSelector } from '../../../../redux/reducers/ContestReducer';
import { IEditProblem } from '../../../../redux/interface/ContestType';
import { MDHelpPopUp } from '../../../../common/MDHelpPopUp/MDHelpPopUp';

interface EditContestModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    problemID: number
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

const initialField = [
    { name: 'editContestTitle', value: '' },
    { name: 'editContestQuestion', value: 1 },
    { name: 'editContestTopic', value: '' },
    { name: 'editContestDifficulty', value: 0 },
    { name: 'editContestScore', value: 0 },
    { name: 'editContestI1', value: '' },
    { name: 'editContestO1', value: '' },
    { name: 'editContestI2', value: '' },
    { name: 'editContestO2', value: '' },
    { name: 'editContestI3', value: '' },
    { name: 'editContestO3', value: '' },
    { name: 'editContestI4', value: '' },
    { name: 'editContestO4', value: '' },
]

export const EditContestModal = ({ editModalVisible, setEditModalVisible, problemID }: EditContestModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const user = useSelector(userInfoSelector)
    const [form] = useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [helpPopup, setHelpPopup] = useState(false)
    const [valueTopic, setValueTopic] = useState<any>("");
    const [selectedDifficulty, setSelectedDifficulty] = useState(0)
    const selectedProblem = useSelector(oneProblemAdminSelector)
    const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>(initialField)

    useEffect(() => {
        dispatch(getOneProblemAdminAction(problemID))
    }, [dispatch, problemID])

    useEffect(() => {
        if (selectedProblem) {
            console.log(selectedProblem.input, selectedProblem.output);
            const inputArr = selectedProblem.input.split(',')
            const outputArr = selectedProblem.output.split(',')
            const input1 = inputArr[0]
            const input2 = inputArr[1] ? inputArr[1] : ''
            const input3 = inputArr[2] ? inputArr[2] : ''
            const input4 = inputArr[3] ? inputArr[3] : ''
            const output1 = outputArr[0]
            const output2 = outputArr[1] ? outputArr[1] : ''
            const output3 = outputArr[2] ? outputArr[2] : ''
            const output4 = outputArr[3] ? outputArr[3] : ''
            setCurrentField([
                { name: 'editContestTitle', value: selectedProblem.title },
                { name: 'editContestQuestion', value: selectedProblem.question },
                { name: 'editContestDifficulty', value: selectedProblem.rank },
                { name: 'editContestTopic', value: selectedProblem.content },
                { name: 'editContestScore', value: selectedProblem.score },
                { name: 'editContestI1', value: input1 },
                { name: 'editContestO1', value: output1 },
                { name: 'editContestI2', value: input2 },
                { name: 'editContestO2', value: output2 },
                { name: 'editContestI3', value: input3 },
                { name: 'editContestO3', value: output3 },
                { name: 'editContestI4', value: input4 },
                { name: 'editContestO4', value: output4 },
            ])
            setValueTopic(selectedProblem.content)
        }
        else
            setCurrentField(initialField)
    }, [selectedProblem])

    const handleCancel = () => {
        setEditModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const input1 = values.editContestI1
            const input2 = values.editContestI2 ? values.editContestI2 : ''
            const input3 = values.editContestI3 ? values.editContestI3 : ''
            const input4 = values.editContestI4 ? values.editContestI4 : ''
            const output1 = values.editContestO1
            const output2 = values.editContestO2 ? values.editContestO2 : ''
            const output3 = values.editContestO3 ? values.editContestO3 : ''
            const output4 = values.editContestO4 ? values.editContestO4 : ''
            if (values.editContestTitle === "" || values.editContestQuestion === "" || valueTopic === "" || values.editContestI1 === "" || values.editContestIO1 === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui lòng nhập các trường còn thiếu!"
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
                    message: "Các Input phải có Output đi kèm và ngược lại!"
                })
            }
            else {
                let inputString: string = '';
                if (input2 || input3 || input4) {
                    inputString = input1.concat(',', input2).concat(',', input3).concat(',', input4)
                    inputString = inputString.split(',').filter(Boolean).join(',');
                }
                else {
                    inputString = values.editContestI1
                }
                let outputString: string = '';
                if (output2 || output3 || output4) {
                    outputString = output1.concat(',', output2).concat(',', output3).concat(',', output4)
                    outputString = outputString.split(',').filter(Boolean).join(',');
                }
                else {
                    outputString = values.editContestO1
                }
                const newProblem: IEditProblem = {
                    problem_id: problemID,
                    input: inputString,
                    output: outputString,
                    question: values.editContestQuestion,
                    rank: values.editContestDifficulty,
                    score: values.editContestScore,
                    title: values.editContestTitle,
                    user_id: user.id,
                    content: valueTopic
                }
                setConfirmLoading(true);
                setTimeout(async () => {
                    await dispatch(editProblemAction(newProblem))
                    await dispatch(getOneProblemAdminAction(problemID))
                    await dispatch(getAllProblemAdminAction())
                    setConfirmLoading(false);
                    setEditModalVisible(false)
                }, 500);
            }
        })
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Sửa bài tập"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Sửa'
            cancelText='Hủy'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} fields={currentField} {...formItemLayout} >
                <Form.Item className='create-contest-form-item' label="Tên bài" name='editContestTitle' rules={[{ required: true, message: 'Hãy nhập tên bài!', }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-contest-form-item' label="Câu hỏi" name='editContestQuestion' rules={[{ required: true, message: 'Hãy nhập câu hỏi!', }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-contest-form-item' label="Đề bài" name='editContestTopic' rules={[{ required: true, message: 'Hãy nhập đề bài!', }]}>
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
                <Form.Item className='create-contest-form-item' label="Độ khó" name='editContestDifficulty' rules={[{ required: true, message: 'Hãy chọn độ khó!', }]}>
                    <Select
                        id='select-difficulty'
                        menuItemSelectedIcon={<CheckCircleFilled />}
                        value={selectedDifficulty}
                        style={{ width: 150 }}
                        onChange={(v) => setSelectedDifficulty(v)}
                        size={'middle'}
                    >
                        <Select.Option value={0}>Dễ</Select.Option>
                        <Select.Option value={1}>Trung bình</Select.Option>
                        <Select.Option value={2}>Khó</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item className='create-contest-form-item' label="Điểm" name='editContestScore' rules={[{ required: true, message: 'Hãy chọn điểm!', }]}>
                    <InputNumber defaultValue={0} min={0} size="middle" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 1">
                    <Form.Item
                        name="editContestI1"
                        rules={[{ required: true, message: 'Hãy điền ít nhất 1 Input!' }]}
                        style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
                    >
                        <Input placeholder='Nhập input' size="middle" />
                    </Form.Item>
                    <Form.Item
                        name="editContestO1"
                        rules={[{ required: true, message: 'Hãy điền ít nhất 1 Output!' }]}
                        style={{ display: 'inline-block', width: '48%' }}
                    >
                        <Input placeholder='Nhập output' size="middle" />
                    </Form.Item>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 2">
                    <Form.Item
                        name="editContestI2"
                        style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
                    >
                        <Input placeholder='Nhập input' size="middle" />
                    </Form.Item>
                    <Form.Item
                        name="editContestO2"
                        style={{ display: 'inline-block', width: '48%' }}
                    >
                        <Input placeholder='Nhập output' size="middle" />
                    </Form.Item>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 3">
                    <Form.Item
                        name="editContestI3"
                        style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
                    >
                        <Input placeholder='Nhập input' size="middle" />
                    </Form.Item>
                    <Form.Item
                        name="editContestO3"
                        style={{ display: 'inline-block', width: '48%' }}
                    >
                        <Input placeholder='Nhập output' size="middle" />
                    </Form.Item>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} className='create-contest-form-item' label="I/O 4">
                    <Form.Item
                        name="editContestI4"
                        style={{ display: 'inline-block', width: '48%', marginRight: '4%' }}
                    >
                        <Input placeholder='Nhập input' size="middle" />
                    </Form.Item>
                    <Form.Item
                        name="editContestO4"
                        style={{ display: 'inline-block', width: '48%' }}
                    >
                        <Input placeholder='Nhập output' size="middle" />
                    </Form.Item>
                </Form.Item>
            </Form>
            <MDHelpPopUp helpModalVisible={helpPopup} setHelpModalVisible={setHelpPopup} />
        </Modal>
    )
}
