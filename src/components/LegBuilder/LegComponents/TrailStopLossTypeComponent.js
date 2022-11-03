import { Select, Checkbox, InputNumber } from 'antd'
import { TrailStopLossType } from '../LegBuilderConfig'

const { Option } = Select

export function TrailStopLossTypeComponent({
  onChangeChecked,
  checked,
  type,
  onChangeType,
  lowerValue,
  onChangeLowerValue,
  upperValue,
  onChangeUpperValue,
}) {
  return (
    <div className='form-control'>
      <Checkbox checked={checked} onChange={e => onChangeChecked(e.target.checked)}>
        Trail SL
      </Checkbox>
      <div style={{ display: 'flex' }}>
        <Select
          style={{ width: 200 }}
          disabled={!checked}
          onChange={onChangeType}
          defaultValue={type}
        >
          <Option value={TrailStopLossType.Points}>{TrailStopLossType.Points}</Option>
          <Option value={TrailStopLossType.Percentage}>{TrailStopLossType.Percentage}</Option>
        </Select>
        <div className='spacer' />
        <InputNumber disabled={!checked} value={lowerValue} onChange={onChangeLowerValue} />
        <div className='spacer' />
        <InputNumber disabled={!checked} value={upperValue} onChange={onChangeUpperValue} />
      </div>
    </div>
  )
}
