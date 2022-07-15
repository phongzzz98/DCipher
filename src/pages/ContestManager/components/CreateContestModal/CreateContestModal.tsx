import { Modal, Form, Input, Popover, Button, Tag } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ApplicationDispatch } from '../../../../store/store';

interface CreateContestModalProps {
  createModalVisible: boolean;
  setCreateModalVisible: Function;
}

export const CreateContestModal = ({createModalVisible, setCreateModalVisible}: CreateContestModalProps) => {
  const dispatch: ApplicationDispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setCreateModalVisible(false);
  };
  return (
    <Modal
      destroyOnClose={true}
      title="Tạo thẻ mới"
      visible={createModalVisible}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='Tạo'
      cancelText='Hủy'
      width={'70%'}
      style={{ fontFamily: 'SofiaProSemiBold' }}
    >
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 24 }} >
        <Form.Item className='create-contest-form-item' label="Tên thẻ" name='createContestTitle' rules={[{ required: true, message: 'Hãy nhập tên bài!', }]}>
          <Input size="middle"/>
        </Form.Item>
        
      </Form>
    </Modal>
  )
}
