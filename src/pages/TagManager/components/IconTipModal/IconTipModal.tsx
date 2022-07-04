import { Avatar, Modal } from 'antd'
import { InfoCircleTwoTone } from '@ant-design/icons';
import tipImg from '../../../../assets/images/tipTagIcon.jpg'
import './IconTipModalStyle.css'

interface IconTipModalProps {
    visible: boolean;
    setVisible: Function;
}

export const IconTipModal = ({ visible, setVisible }: IconTipModalProps) => {
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            visible={visible}
            onOk={handleCancel}
            onCancel={handleCancel}
            okText='OK'
            closable={true}
            style={{ fontFamily: 'SofiaProSemiBold' }}
            footer={false}
        >
            <div className='tip-modal-content'>
                <InfoCircleTwoTone className='tip-modal-icon' />
                <div className='tip-modal-info'>
                    <span>Hiện tại hệ thống đang sử dụng class của Devicon cho biểu tượng của thẻ!</span>
                    <b>Vui lòng truy cập Devicon, tìm icon mong muốn và copy class như hình dưới rồi điền vào trường nhập</b>
                    <img src={tipImg} alt='Copy class của icon cần tìm' />
                    <a target="_blank" rel="noopener noreferrer" href="https://devicon.dev/" >Truy cập Devicon</a>
                </div>
            </div>
        </Modal>
    )
}
