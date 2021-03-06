import { Button, Modal, Select } from 'antd'
import React, { useContext, useState } from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { ApplicationContext } from '../../App'
import './SettingStyle.css'

interface SettingProps {
  settingModalVisible: boolean;
  setSettingModalVisible: Function;
}

const themes = [
  { color: '#fc2626', name: 'TLU' },
  { color: '#E2252B', name: 'Rose' },
  { color: '#FD5CA8', name: 'Bubblegum' },
  { color: '#FF1695', name: 'Hot Pink' },
  { color: '#EC295B', name: 'Amaranth' },
  { color: '#FC6B02', name: 'Fire' },
  { color: '#F9A602', name: 'Gold' },
  { color: '#7E481C', name: 'Wood' },
  { color: '#4267B2', name: 'Meta' },
  { color: '#2732C2', name: 'Lapis' },
  { color: '#A45EE5', name: 'Amethyst' },
  { color: '#03C04A', name: 'Emerald' },
  { color: '#AEF35A', name: 'Chartreuse' },
  { color: '#ADADC7', name: 'Silver' },
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
            menuItemSelectedIcon={<CheckCircleOutlined />}
            value={theme}
            style={{ width: 180 }}
            onChange={(v) => handleChangeTheme(v)}
            size={'middle'}
          >
            {themes.map((theme) => {
              return <Select.Option value={theme.color}>{theme.name}</Select.Option>
            })}
          </Select>
          <Button style={{ background: color, marginLeft: 10, borderRadius: '7px' }}> </Button>
        </div>
      </div>
    </Modal>
  )
}
