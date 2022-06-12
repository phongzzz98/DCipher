import { Descriptions } from 'antd';
import { IUserDetails } from '../../../../redux/interface/UserType';
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
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
                <Descriptions.Item label="Liên kết">
                    {userDetail.linkSNS[0].facebook_account !== "null"
                        ? <a style={{color: '#4267B2'}} className='social-link' href={`https://${userDetail.linkSNS[0].facebook_account}`}><FacebookFilled /></a>
                        : null}
                    {userDetail.linkSNS[0].linkedin_account !== "null"
                        ? <a style={{color: '#0077B5'}} className='social-link' href={`https://${userDetail.linkSNS[0].linkedin_account}`}><LinkedinFilled /></a>
                        : null}
                    {userDetail.linkSNS[0].twitter_account !== "null"
                        ? <a style={{color: '#1DA1F2'}} className='social-link' href={`https://${userDetail.linkSNS[0].twitter_account}`}><TwitterSquareFilled /></a>
                        : null}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
