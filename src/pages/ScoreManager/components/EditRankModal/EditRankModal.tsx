import { Modal, Form, Input, InputNumber, notification, Button, Popover, Tag } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { editRankAction, getAllRankAction, getOneRankAction } from '../../../../redux/actions/AchievementAction';
import { IEditRank, IRank } from '../../../../redux/interface/AchievementType';
import { oneRankSelector } from '../../../../redux/reducers/AchievementReducer';
import { ApplicationDispatch } from '../../../../store/store';
import { inRange, validateHexString } from '../../../../utils/util';
import './EditRankModalStyle.css'

interface EditRankModalProps {
    editModalVisible: boolean;
    setEditModalVisible: Function;
    rankID: number;
    rankList: IRank[];
}

const initialField = [
    { name: 'editRankName', value: '' },
    { name: 'editRankAbout', value: '' },
    { name: 'editRankScore', value: 0 },
]

export const EditRankModal = ({ editModalVisible, setEditModalVisible, rankID, rankList }: EditRankModalProps) => {
    const dispatch: ApplicationDispatch = useDispatch()
    const [form] = useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [colorPicker, setColorPicker] = useState('#ffffff')
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
                { name: 'editRankLowScore', value: selectedRank.min_score },
                { name: 'editRankHighScore', value: selectedRank.max_score },
            ])
            setColorPicker(selectedRank.colorcode ? selectedRank.colorcode : '#fff')
        }
        else
            setCurrentField(initialField)
    }, [selectedRank])

    const handleCancel = () => {
        setEditModalVisible(false);
    };

    const pickerPopover = (
        <div>
            <ChromePicker color={colorPicker} disableAlpha={true} onChange={(value) => setColorPicker(value.hex)} />
        </div>
    );

    const handleOk = () => {
        form.validateFields().then(values => {
            if (values.editRankName === "" || values.editRankAbout === "") {
                notification.error({
                    placement: 'bottomRight',
                    message: "Vui l??ng nh???p c??c tr?????ng c??n thi???u!"
                })
            }
            else if (!validateHexString(colorPicker)) {
                notification.error({
                    placement: 'bottomRight',
                    message: "M?? m??u sai quy ?????nh, vui nh???p m?? HEX!"
                })
            }
            else if (rankList.filter((rank) => rank.id !== rankID).some((rank) => inRange(values.editRankLowScore, rank.min_score, rank.max_score)) || rankList.filter((rank) => rank.id !== rankID).some((rank) => inRange(values.editRankHighScore, rank.min_score, rank.max_score))) {
                notification.error({
                    placement: 'bottomRight',
                    message: "S??? ??i???m th???p nh???t ho???c cao nh???t ??ang n???m trong v??ng ??i???m c???a x???p h???ng kh??c!"
                })
            }
            else {
                setConfirmLoading(true);
                setTimeout(async () => {
                    const newRank: IEditRank = {
                        id: rankID,
                        about: values.editRankAbout,
                        rank: values.editRankName,
                        min_score: values.editRankLowScore,
                        max_score: values.editRankHighScore,
                        colorcode: colorPicker,
                        score: values.editRankLowScore
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
            title="S???a h???ng"
            visible={editModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText='S???a'
            cancelText='H???y'
            width={'80%'}
            style={{ fontFamily: 'SofiaProSemiBold' }}
        >
            <Form form={form} fields={currentField} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} >
                <Form.Item className='edit-rank-form-item' label="T??n h???ng" name='editRankName' rules={[{ required: true, message: 'H??y nh???p t??n h???ng!' }]}>
                    <Input size="middle" />
                </Form.Item>
                <Form.Item className='edit-rank-form-item' label="M?? t???" name='editRankAbout' rules={[{ required: true, message: 'H??y nh???p m?? t???!' }]}>
                    <Input.TextArea size="middle" />
                </Form.Item>
                <Form.Item className='edit-rank-form-item' label="??i???m th???p nh???t" name='editRankLowScore' rules={[{ required: true, message: 'H??y nh???p s??? ??i???m!' }]}>
                    <InputNumber defaultValue={0} min={0} size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <Form.Item className='edit-rank-form-item' label="??i???m cao nh???t" name='editRankHighScore' rules={[{ required: true, message: 'H??y nh???p s??? ??i???m!' }]}>
                    <InputNumber defaultValue={0} min={0} size="middle" /*onChange={(e) => setTagName(e.target.value)}*/ />
                </Form.Item>
                <Form.Item className='create-rank-form-item' label="M?? m??u" name='editRankColor'>
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
        </Modal>
    )
}
