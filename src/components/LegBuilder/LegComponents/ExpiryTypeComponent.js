import { Typography, Select } from 'antd'
import { ExpiryType } from '../LegBuilderConfig'

const { Option } = Select

export function ExpiryTypeComponent({ value, onChange }) {
  return (
    <div className='form-control'>
      <Typography.Text strong>Expiry Type</Typography.Text>
      <Select onChange={onChange} defaultValue={value}>
        <Option value={ExpiryType.Weekly}>{ExpiryType.Weekly}</Option>
        <Option value={ExpiryType.Monthly}>{ExpiryType.Monthly}</Option>
      </Select>
    </div>
  )
}
