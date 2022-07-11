import { Modal, Form, Input, InputNumber, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editRankAction, getAllRankAction, getOneRankAction } from '../../../../redux/actions/AchievementAction';
import { IEditRank } from '../../../../redux/interface/AchievementType';
import { oneRankSelector } from '../../../../redux/reducers/AchievementReducer';
import { ApplicationDispatch } from '../../../../store/store';
import './EditRankModalStyle.css'

interface EditRankModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    rankID: number;
}

const initialField = [
    { name: 'editRankName', value: '' },
    { name: 'editRankAbout', value: '' },
    { name: 'editRankScore', value: 0 },
]

export const EditRankModal = ({ editModalVisible, setEditModalVisible, rankID }: EditRankModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [form] = useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const selectedRank = useSelector(oneRankSelector)
    const [currentField, setCurrentField] = useState<{ name: string, value: any }[]>(initialField)

    useEffect(() => {
        dispatch(getOneRankAction(rankID))
    }, [dispatch, rankID])

    useEffect(() => {
        if (selectedRank) {
            setCurrentField([
                { name: 'editRankName', value: selectedRank.rank },
                { name: 'editRankAbout', value: selectedRank.about },
                { name: 'editRankScore', value: selectedRank.score },
            ])
        }
        else
            setCurrentField(initialField)
    }, [selectedRank])

    const handleCancel = () => {
        setEditModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.editRankName === "" || values.editRankAbout === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui lòng nhập các trường còn thiếu!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newRank: IEditRank = {
                        id: rankID,
                        about: values.editRankAbout,
                        rank: values.editRankName,
                        score: values.editRankScore,
                    }
                    await dispatch(editRankAction(newRank))
                    await dispatch(getOneRankAction(rankID))
                    await dispatch(getAllRankAction())
                    setConfirmLoading(false);
                    setEditModalVisible(false)
                }, 500);
            }
        })
    };

    return (
        <Modal
            destroyOnClose={true}
            title="Sửa hạng"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='Sửa'
            cancelText='Hủy'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} fields={currentField} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} >
                <Form.Item className='edit-rank-form-item' label="Tên hạng" name='editRankName' rules={[{ required: true, message: 'Hãy nhập tên hạng!' }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='edit-rank-form-item' label="Mô tả" name='editRankAbout' rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}>
                    <Input.TextArea size="middle" />
                </Form.Item>
                <Form.Item className='edit-rank-form-item' label="Điểm thấp nhất" name='editRankScore' rules={[{ required: true, message: 'Hãy nhập số điểm!' }]}>
                    <InputNumber defaultValue={0} min={0} size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
            </Form>
        </Modal>
    )
}
