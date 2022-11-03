import { Typography, Select } from 'antd'
import { PositionType } from '../LegBuilderConfig'

const { Option } = Select

export function PositionTypeComponent({ value, onChange }) {
  return (
    <div className='form-control'>
      <Typography.Text strong>Position</Typography.Text>
      <Select onChange={onChange} defaultValue={value}>
        <Option value={PositionType.Buy}>{PositionType.Buy}</Option>
        <Option value={PositionType.Sell}>{PositionType.Sell}</Option>
      </Select>
    </div>
  )
}
