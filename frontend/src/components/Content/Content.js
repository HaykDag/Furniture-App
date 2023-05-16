import { Card, Space, Statistic } from 'antd'
import './content.css'
import { ShoppingOutlined, StarOutlined, StrikethroughOutlined } from '@ant-design/icons'

const Content = ()=>{
    return(
        <div className='content-head'>
            <Space direction='horizontal'>
                <DashboardCard 
                    icon={<ShoppingOutlined
                        style={{
                            fontSize:"24px"
                        }}
                    />} 
                    title={"orders"} 
                    value={785} 
                />
                <DashboardCard 
                    icon={<StrikethroughOutlined
                        style={{
                            fontSize:"24px"
                        }}
                    />} 
                    title={"store"} 
                    value={240} 
                />
                <DashboardCard 
                    icon={<StarOutlined
                        style={{
                            fontSize:"24px"
                        }}
                    />} 
                    title={"Revenue"} 
                    value={148} 
                />
            </Space>
        </div>
    )
}
export default Content;

const DashboardCard = ({title,value,icon})=>{
    return(
        <Card className='content-card'>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}
