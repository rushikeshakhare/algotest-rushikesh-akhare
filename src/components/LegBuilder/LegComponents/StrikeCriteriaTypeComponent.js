import { Typography, Select, InputNumber } from 'antd'
import { useMemo } from 'react'
import { EntryType, StrikeType } from '../LegBuilderConfig'

const { Option } = Select

export function StrikeCriteriaTypeComponent({
  strikeParameter,
  value,
  onChange,
  onChangeStrikeParameter,
}) {
  const dependentComponent = useMemo(() => {
    if (value === EntryType.StrikeType)
      return (
        <div className='form-control'>
          <Typography.Text strong>Strike Type</Typography.Text>
          <Select onChange={onChangeStrikeParameter} defaultValue={strikeParameter}>
            <Option value={StrikeType.ATM}>{StrikeType.ATM}</Option>
            <Option value={StrikeType.OTM1}>{StrikeType.OTM1}</Option>
          </Select>
        </div>
      )
    if (value === EntryType.Premium)
      return (
        <div className='form-control'>
          <Typography.Text strong>Premium</Typography.Text>
          <InputNumber onChange={onChangeStrikeParameter} value={strikeParameter} />
        </div>
      )
    if (value === EntryType.PremiumRange)
      return (
        <>
          <div className='form-control'>
            <Typography.Text strong>Lower Range</Typography.Text>
            <InputNumber
              onChange={lower => onChangeStrikeParameter({ ...strikeParameter, Lower: lower })}
              value={strikeParameter?.Lower}
            />
          </div>
          <div className='spacer' />
          <div className='form-control'>
            <Typography.Text strong>Upper Range</Typography.Text>
            <InputNumber
              onChange={upper => onChangeStrikeParameter({ ...strikeParameter, Upper: upper })}
              value={strikeParameter?.Upper}
            />
          </div>
        </>
      )
    if (value === EntryType.StraddleWidth)
      return (
        <div style={{ display: 'inline', marginTop: 15 }} className='form-control'>
          [ ATM Strike{' '}
          <Select
            style={{ width: 100 }}
            defaultValue={strikeParameter?.Adjustment}
            onChange={adj => onChangeStrikeParameter({ ...strikeParameter, Adjustment: adj })}
          >
            <Option value={`Plus`}>{`+`}</Option>
            <Option value={`Minus`}>{`-`}</Option>
          </Select>
          {` ( `}
          <InputNumber
            onChange={mul => onChangeStrikeParameter({ ...strikeParameter, Multiplier: mul })}
            value={strikeParameter?.Multiplier}
          />{' '}
          {` `}x ATM Straddle Price )]
        </div>
      )
    return <></>
  }, [value, onChangeStrikeParameter, strikeParameter])

  return (
    <>
      <div className='form-control'>
        <Typography.Text strong>Expiry Type</Typography.Text>
        <Select style={{ width: 150 }} onChange={onChange} defaultValue={value}>
          <Option value={EntryType.StrikeType}>Strike Type</Option>
          <Option value={EntryType.Premium}>Premium</Option>
          <Option value={EntryType.PremiumRange}>Premium Range</Option>
          <Option value={EntryType.StraddleWidth}>Straddle Width</Option>
        </Select>
      </div>
      <div className='spacer' />
      {dependentComponent}
    </>
  )
}
