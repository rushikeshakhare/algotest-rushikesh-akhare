import { Typography, Select } from 'antd'
import { OptionType } from '../LegBuilderConfig'

const { Option } = Select

export function OptionTypeComponent({ value, onChange }) {
  return (
    <div className='form-control'>
      <Typography.Text strong>Option Type</Typography.Text>
      <Select onChange={onChange} defaultValue={value}>
        <Option value={OptionType.Call}>{OptionType.Call}</Option>
        <Option value={OptionType.Put}>{OptionType.Put}</Option>
      </Select>
    </div>
  )
}
