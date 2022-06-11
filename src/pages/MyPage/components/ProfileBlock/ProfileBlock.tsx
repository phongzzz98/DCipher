import { Descriptions } from 'antd';
import { IUserDetails } from '../../../../redux/interface/UserType';
import './ProfileBlockStyle.css'

interface IProfileBlockProps {
    userDetail: IUserDetails;
}

export const ProfileBlock = ({ userDetail }: IProfileBlockProps) => {
    return (
        <div className='profile-block'>
            <Descriptions className='pb-title' size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={1} title="Giới thiệu">
                <Descriptions.Item className='pb-about'>{userDetail.about}</Descriptions.Item>
            </Descriptions>
            <Descriptions size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={1} title="Thông tin">
                <Descriptions.Item label="Tên hiển thị">{userDetail.displayname}</Descriptions.Item>
                <Descriptions.Item label="Họ tên">{userDetail.fullName}</Descriptions.Item>
                <Descriptions.Item label="Sinh nhật">{userDetail.birth}</Descriptions.Item>
                <Descriptions.Item label="Liên kết">{userDetail.linkSNS}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
