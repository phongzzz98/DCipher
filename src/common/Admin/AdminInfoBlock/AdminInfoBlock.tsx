import './AdminInfoBlockStyle.css'

interface AdminInfoBlockProps {
    description: string;
    quantity?: string;
    icon: React.ReactNode;
    iconBlockColor: string;
    componentInfo?: React.ReactNode;
}

export const AdminInfoBlock = ({ icon, quantity, description, componentInfo, iconBlockColor }: AdminInfoBlockProps) => {
    const renderInfo = () => {
        if (quantity) {
            return <span className='quantity-info'>{quantity}</span>
        }
        else if (componentInfo) {
            return componentInfo
        }
        else
            return;
    }
    return (
        <div className='admin-info-block'>
            <div className='admin-info-detail'>
                <span className='description-info'>{description}</span>
                {renderInfo()}
            </div>
            <div style={{backgroundColor: `${iconBlockColor}`}} className='admin-info-icon'>
                {icon}
            </div>
        </div>
    )
}
