import { Form, Input, InputNumber, Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createRankAction, getAllRankAction } from '../../../../redux/actions/AchievementAction';
import { ICreateRank } from '../../../../redux/interface/AchievementType';
import { ApplicationDispatch } from '../../../../store/store';
import './CreateRankModalStyle.css'

interface CreateRankModalProps {
    createModalVisible: boolean;
    setCreateModalVisible: Function;
}


export const CreateRankModal = ({ createModalVisible, setCreateModalVisible }: CreateRankModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [form] = useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleCancel = () => {
        setCreateModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.createRankName === "" || values.createRankAbout === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui lòng nhập các trường còn thiếu!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newRank: ICreateRank = {
                       about: values.createRankAbout,
                       rank: values.createRankName,
                       score: values.createRankScore,
                    }
                    await dispatch(createRankAction(newRank))
                    await dispatch(getAllRankAction())
                    setConfirmLoading(false);
                    setCreateModalVisible(false)
                }, 500);
            }
        })
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Tạo hạng mới"
            visible={createModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Tạo'
            cancelText='Hủy'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} >
                <Form.Item className='create-rank-form-item' label="Tên hạng" name='createRankName' rules={[{ required: true, message: 'Hãy nhập tên hạng!' }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='create-rank-form-item' label="Mô tả" name='createRankAbout' rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}>
                    <Input.TextArea size="middle" />
                </Form.Item>
                <Form.Item className='create-rank-form-item' label="Điểm thấp nhất" name='createRankScore' rules={[{ required: true, message: 'Hãy nhập số điểm!' }]}>
                    <InputNumber defaultValue={0} min={0} size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
            </Form>
        </Modal>
    )
}
