import { Button, Form, Input, Modal, notification, Popover, Tag } from 'antd'
import React, { useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons';
import './CreateTagModalStyle.css'
import { ChromePicker } from 'react-color';
import { ApplicationDispatch } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import { createTagAction, getAllTagAction } from '../../../../redux/actions/TagAction';
import { ICreateTag } from '../../../../redux/interface/TagType';
import { IconTipModal } from '../IconTipModal/IconTipModal';
import { validateHexString } from '../../../../utils/util';

interface CreateTagModalProps {
  createModalVisible: boolean;
  setCreateModalVisible: Function;
}

export const CreateTagModal = ({ createModalVisible, setCreateModalVisible }: CreateTagModalProps) => {
  const dispatch: ApplicationDispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tipModalVisible, setTipModalVisible] = useState(false)
  const [tagName, setTagName] = useState('');
  const [description, setDescription] = useState('')
  const [iconClass, setIconClass] = useState('')
  const [colorPicker, setColorPicker] = useState('#ffffff')
  const handleOk = () => {
    if (tagName === "" || description === "") {
      notification.error({
        placement: 'bottomRight',
        message: "Vui lòng nhập các trường còn thiếu!"
      })
    }
    else if(!validateHexString(colorPicker)){
      notification.error({
        placement: 'bottomRight',
        message: "Mã màu sai quy định, vui nhập mã HEX!"
      })
    }
    else{
      setConfirmLoading(true);
      setTimeout(async () => {
        const newTag: ICreateTag = {
          colorcode: colorPicker,
          content: tagName,
          description: description,
          icon_class: iconClass,
          status: 1,
        }
        await dispatch(createTagAction(newTag))
        setConfirmLoading(false);
        dispatch(getAllTagAction())
        setCreateModalVisible(false)
      }, 500);
    }
  };

  const pickerPopover = (
    <div>
      <ChromePicker color={colorPicker} disableAlpha={true} onChange={(value) => setColorPicker(value.hex)} />
    </div>
  );

  const handleCancel = () => {
    setCreateModalVisible(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Tạo thẻ mới"
      visible={createModalVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='Tạo'
      cancelText='Hủy'
      width={'70%'}
      style={{ fontFamily: 'SofiaProSemiBold' }}
    >
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 24 }} >
        <Form.Item className='create-tag-form-item' label="Tên thẻ" name='createTagContent' rules={[{ required: true, message: 'Hãy nhập tên thẻ!', }]}>
          <Input size="middle" onChange={(e) => setTagName(e.target.value)} />
        </Form.Item>
        <Form.Item className='create-tag-form-item' label="Mô tả" name='createTagDescription' rules={[{ required: true, message: 'Hãy nhập mô tả dưới 200 ký tự!', max: 200 }]}>
          <Input.TextArea size="middle" onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item className='create-tag-form-item' label="Icon" name='createTagIcon'>
          <Input size="middle" onChange={(e) => setIconClass(e.target.value)} /><QuestionCircleOutlined onClick={() => setTipModalVisible(true)} />
        </Form.Item>
        <Form.Item className='create-tag-form-item' label="Mã màu" name='createTagColor'>
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
