import { Button, Modal, Select } from 'antd'
import React, { useContext, useState } from 'react'
import { ApplicationContext } from '../../App'
import './SettingStyle.css'

interface SettingProps {
  settingModalVisible: boolean;
  setSettingModalVisible: Function;
}

const themes = [
  { color: '#fc2626', name: 'TLU' },
  { color: '#C7A951', name: 'Fawn' },
  { color: '#fc2626', name: 'TLU' },
  { color: '#fc2626', name: 'TLU' },
  { color: '#fc2626', name: 'TLU' },
]

export const Setting = ({ setSettingModalVisible, settingModalVisible }: SettingProps) => {
  const { theme, setTheme } = useContext(ApplicationContext)
  const [color, setColor] = useState(theme)

  const handleCancel = () => {
    setSettingModalVisible(false)
  }

  const handleChangeTheme = (value: string) => {
    setColor(value)
    setTheme(value)
  }
  return (
    <Modal
      className='md-help-modal'
      destroyOnClose={true}
      title="Cài đặt"
      visible={settingModalVisible}
      onCancel={handleCancel}
      width={'30%'}
      style={{ fontFamily: 'SofiaProSemiBold' }}
      footer={false}
    >
      <div className='setting-item'>
        <label htmlFor="select-theme" className='setting-label' >Màu chủ đề: </label>
        <div className='setting-item-content'>
          <Select
            id='select-theme'
            // menuItemSelectedIcon={<CodeOutlined />}
            value={theme}
            style={{ width: 180 }}
            onChange={(v) => handleChangeTheme(v)}
            size={'middle'}
          >
            {themes.map((theme) => {
              return <Select.Option value={theme.color}>{theme.name}</Select.Option>
            })}
          </Select>
          <Button style={{ background: color, marginLeft: 10, borderRadius: '5px' }}> </Button>
        </div>
      </div>
    </Modal>
  )
}
