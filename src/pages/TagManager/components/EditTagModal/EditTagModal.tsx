import { Modal, Form, Input, Popover, Button, Tag, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationDispatch } from '../../../../store/store';
import { IconTipModal } from '../IconTipModal/IconTipModal'
import { editTagAction, getAllTagAction, getOneTagAction } from '../../../../redux/actions/TagAction';
import { oneTagSelector } from '../../../../redux/reducers/TagReducer';
import { useForm } from 'antd/lib/form/Form';
import { validateHexString } from '../../../../utils/util';
import { IEditTag } from '../../../../redux/interface/TagType';

interface EditTagModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    tagID: number;
}

const initialField = [
    { name: 'editTagContent', value: '' },
    { name: 'editTagDescription', value: '' },
    { name: 'editTagIcon', value: '' },
    { name: 'editTagColor', value: '' },
]

export const EditTagModal = ({ editModalVisible, setEditModalVisible, tagID }: EditTagModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const selectedTag = useSelector(oneTagSelector)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [tipModalVisible, setTipModalVisible] = useState(false)
    const [form] = useForm();
    const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>(initialField)
    const [iconClass, setIconClass] = useState('')
    const [colorPicker, setColorPicker] = useState('#ffffff')

    useEffect(() => {
        dispatch(getOneTagAction(tagID))
    }, [dispatch, tagID])

    useEffect(() => {
        if (selectedTag) {
            setCurrentField([
                { name: 'editTagContent', value: selectedTag.content },
                { name: 'editTagDescription', value: selectedTag.description },
            ])
            setIconClass(selectedTag.icon_class === null ? '' : selectedTag.icon_class)
            setColorPicker(selectedTag.colorcode)
        }
        else
            setCurrentField(initialField)
    }, [selectedTag])

    const pickerPopover = (
        <div>
            <ChromePicker color={colorPicker} disableAlpha={true} onChange={(value) => setColorPicker(value.hex)} />
        </div>
    );

    const handleCancel = () => {
        setEditModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.editTagContent === "" || values.editTagDescription === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui lòng nhập các trường còn thiếu!"
                })
            }
            else if (!validateHexString(colorPicker)) {
                notification.error({
                    placement: 'bottomRight',
                    message: "Mã màu sai quy định, vui nhập mã HEX!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newTag: IEditTag = {
                        id: tagID,
                        colorcode: colorPicker,
                        content: values.editTagContent,
                        description: values.editTagDescription,
                        icon_class: iconClass,
                        status: 1,
                    }
                    await dispatch(editTagAction(newTag))
                    setConfirmLoading(false);
                    dispatch(getAllTagAction())
                    setEditModalVisible(false)
                }, 500);
            }
        })
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Sửa thẻ"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Sửa'
            cancelText='Hủy'
            width={'70%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} fields={currentField} labelCol={{ span: 2 }} wrapperCol={{ span: 24 }} >
                <Form.Item className='create-tag-form-item' label="Tên thẻ" name='editTagContent' rules={[{ required: true, message: 'Hãy nhập tên thẻ!', }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-tag-form-item' label="Mô tả" name='editTagDescription' rules={[{ required: true, message: 'Hãy nhập mô tả dưới 200 ký tự!', max: 200 }]}>
                    <Input.TextArea size="middle" />
                </Form.Item>
                <Form.Item className='create-tag-form-item' label="Icon" name='editTagIcon'>
                    <Input value={iconClass} size="middle" onChange={(e) => setIconClass(e.target.value)} /><QuestionCircleOutlined onClick={() => setTipModalVisible(true)} />
                </Form.Item>
                <Form.Item className='create-tag-form-item' label="Mã màu" name='editTagColor'>
                    <Input
                        value={colorPicker || ""}
                        size='middle'
                        onChange={(e) => setColorPicker(e.target.value)}
                        suffix={
                            <Popover trigger={"click"} placement='topRight' content={pickerPopover}>
                                <Button style={{ background: colorPicker }}> </Button>
                            </Popover>
                        }
                    />
                    <span>Preview: </span>
                    <Tag style={{ paddingLeft: 5, paddingRight: 5, borderRadius: '2em', marginTop: 5 }} color={colorPicker === '#ffffff' ? '' : colorPicker}>{colorPicker}</Tag>
                </Form.Item>
            </Form>
            <IconTipModal visible={tipModalVisible} setVisible={setTipModalVisible} />
        </Modal>
    )
}
