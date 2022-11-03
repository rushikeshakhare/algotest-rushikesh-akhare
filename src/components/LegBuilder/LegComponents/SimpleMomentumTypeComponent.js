import { Select, Checkbox, InputNumber } from 'antd'
import { MomentumType } from '../LegBuilderConfig'

const { Option } = Select

export function SimpleMomentumTypeComponent({
  onChangeChecked,
  checked,
  type,
  onChangeType,
  value,
  onChangeValue,
}) {
  return (
    <div className='form-control'>
      <Checkbox checked={checked} onChange={e => onChangeChecked(e.target.checked)}>
        Simple Momentum
      </Checkbox>
      <div style={{ display: 'flex' }}>
        <Select
          style={{ width: 200 }}
          disabled={!checked}
          onChange={onChangeType}
          defaultValue={type}
        >
          <Option value={MomentumType.PointsUp}>Points Up</Option>
          <Option value={MomentumType.PointsDown}>Points Down</Option>
          <Option value={MomentumType.PercentageUp}>Percentage Up</Option>
          <Option value={MomentumType.PercentageDown}>Percentage Down</Option>
          <Option value={MomentumType.UnderlyingPercentageUp}>Underlying Percentage Up</Option>
          <Option value={MomentumType.UnderlyingPercentageDown}>Underlying Percentage Down</Option>
          <Option value={MomentumType.UnderlyingPointsUp}>Underlying Points Up</Option>
          <Option value={MomentumType.UnderlyingPointsDown}>Underlying Points Down</Option>
        </Select>
        <div className='spacer' />
        <InputNumber disabled={!checked} value={value} onChange={onChangeValue} />
      </div>
    </div>
  )
}
