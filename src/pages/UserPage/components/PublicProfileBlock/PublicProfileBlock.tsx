import { Descriptions } from 'antd'
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { ISocial } from '../../../../redux/interface/UserType';

interface IPublicProfileBlock {
    userDisplayname: string;
    userAbout: string;
    userLink: ISocial[]
}

export const PublicProfileBlock = ({userDisplayname, userAbout, userLink}: IPublicProfileBlock) => {
    return (
        <div className='profile-block'>
            <Descriptions className='pb-title' size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={1} title="Giới thiệu">
                <Descriptions.Item className='pb-about'>{userAbout}</Descriptions.Item>
            </Descriptions>
            <Descriptions size='middle' contentStyle={{ fontFamily: 'SofiaProRegular' }} labelStyle={{ color: '#8c8c8c', fontFamily: 'SofiaProRegular' }} column={1} title="Thông tin">
                <Descriptions.Item label="Tên hiển thị">{userDisplayname}</Descriptions.Item>
                <Descriptions.Item label="Liên kết">
                    {userLink[0].facebook_account !== "null"
                        ? <a style={{ color: '#4267B2' }} className='social-link' href={`${userLink[0].facebook_account}`}><FacebookFilled /></a>
                        : null}
                    {userLink[0].linkedin_account !== "null"
                        ? <a style={{ color: '#0077B5' }} className='social-link' href={`${userLink[0].linkedin_account}`}><LinkedinFilled /></a>
                        : null}
                    {userLink[0].twitter_account !== "null"
                        ? <a style={{ color: '#1DA1F2' }} className='social-link' href={`${userLink[0].twitter_account}`}><TwitterSquareFilled /></a>
                        : null}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
