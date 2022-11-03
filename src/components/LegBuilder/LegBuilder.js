import { InputNumber, Typography, Button } from 'antd'
import {
  PositionType,
  OptionType,
  ExpiryType,
  EntryType,
  StrikeType,
  MomentumType,
} from './LegBuilderConfig'
import { useState, useCallback, useEffect } from 'react'
import {
  ExpiryTypeComponent,
  OptionTypeComponent,
  PositionTypeComponent,
  SimpleMomentumTypeComponent,
  StrikeCriteriaTypeComponent,
} from './LegComponents'
import './LegBuilder.css'
import { TrailStopLossTypeComponent } from './LegComponents/TrailStopLossTypeComponent'

export function LegBuilder({
  positionType: defaultPositionType,
  optionType: defaultOptionType,
  expiryType: defaultExpiryType,
  entryType: defaultEntryType,
  strikeParameter: defaultStrikeParameter,
  lot: defaultLot,
  isMomentum: defaultIsMomentum,
  momentumType: defaultMomentumType,
  momentumValue: defaultMomentumValue,
  isTrailSL: defaultIsTrailSL,
  trailType: defaultTrailType,
  trailLower: defaultTrailLower,
  trailUpper: defaultTrailUpper,
  onAddLeg,
  editMode = false,
  id,
  onChangeLeg,
  onDeleteLeg,
  onCopyLeg,
}) {
  const [lot, setLot] = useState(defaultLot ?? 1)
  const [positionType, setPositionType] = useState(defaultPositionType ?? PositionType.Buy)
  const [optionType, setOptionType] = useState(defaultOptionType ?? OptionType.Call)
  const [expiryType, setExpiryType] = useState(defaultExpiryType ?? ExpiryType.Weekly)
  const [entryType, setEntryType] = useState(defaultEntryType ?? EntryType.StrikeType)
  const [strikeParameter, setStrikeParameter] = useState(defaultStrikeParameter ?? StrikeType.ATM)
  const [isMomentum, setIsMomentum] = useState(defaultIsMomentum ?? false)
  const [momentumType, setMomentumType] = useState(defaultMomentumType ?? MomentumType.PointsUp)
  const [momentumValue, setMomentumValue] = useState(defaultMomentumValue ?? 0)
  const [isTrailSL, setIsTrailSL] = useState(defaultIsTrailSL ?? false)
  const [trailType, setTrailType] = useState(defaultTrailType ?? MomentumType.PointsUp)
  const [trailLower, setTrailLower] = useState(defaultTrailLower ?? 0)
  const [trailUpper, setTrailUpper] = useState(defaultTrailUpper ?? 0)

  const onClickAddLeg = useCallback(() => {
    onAddLeg({ lot, positionType, optionType, expiryType, entryType, strikeParameter })
  }, [lot, positionType, optionType, expiryType, entryType, strikeParameter, onAddLeg])

  const onChangeEntryType = useCallback(entryType => {
    setEntryType(entryType)
    if (entryType === EntryType.StrikeType) {
      setStrikeParameter(StrikeType.ATM)
    }
    if (entryType === EntryType.Premium) {
      setStrikeParameter(0)
    }
    if (entryType === EntryType.PremiumRange) {
      setStrikeParameter({
        Lower: 0,
        Upper: 0,
      })
    }
    if (entryType === EntryType.StraddleWidth) {
      setStrikeParameter({
        Adjustment: 'Plus',
        Multiplier: 0.5,
      })
    }
  }, [])

  useEffect(() => {
    if (editMode && id !== undefined) {
      onChangeLeg({
        id,
        lot,
        positionType,
        optionType,
        expiryType,
        entryType,
        strikeParameter,
        isMomentum,
        momentumType,
        momentumValue,
        isTrailSL,
        trailType,
        trailLower,
        trailUpper,
      })
    }
  }, [
    lot,
    positionType,
    optionType,
    expiryType,
    entryType,
    strikeParameter,
    editMode,
    id,
    onChangeLeg,
    isMomentum,
    momentumType,
    momentumValue,
    isTrailSL,
    trailType,
    trailLower,
    trailUpper,
  ])

  return (
    <div>
      {editMode && (
        <div>
          <div className='spacer' />
          <div style={{ display: 'flex' }}>
            <Button onClick={() => onDeleteLeg(id)} type='primary' danger>
              Delete
            </Button>
            <div className='spacer' />
            <Button onClick={() => onCopyLeg(id)}>Copy</Button>
          </div>
        </div>
      )}
      <div className='spacer' />
      <div className='inline-form'>
        <div className='form-control'>
          <Typography.Text strong>Total Lot</Typography.Text>
          <InputNumber value={lot} onChange={setLot} />
        </div>
        <div className='spacer' />
        <PositionTypeComponent value={positionType} onChange={setPositionType} />
        <div className='spacer' />
        <OptionTypeComponent value={optionType} onChange={setOptionType} />
        <div className='spacer' />
        <ExpiryTypeComponent value={expiryType} onChange={setExpiryType} />
        <div className='spacer' />
        <StrikeCriteriaTypeComponent
          strikeParameter={strikeParameter}
          onChangeStrikeParameter={setStrikeParameter}
          value={entryType}
          onChange={onChangeEntryType}
        />
      </div>

      {editMode && (
        <>
          <div className='spacer' />
          <div className='inline-form'>
            <SimpleMomentumTypeComponent
              checked={isMomentum}
              onChangeChecked={setIsMomentum}
              type={momentumType}
              onChangeType={setMomentumType}
              value={momentumValue}
              onChangeValue={setMomentumValue}
            />
            <div className='spacer' />
            <TrailStopLossTypeComponent
              checked={isTrailSL}
              onChangeChecked={setIsTrailSL}
              type={trailType}
              onChangeType={setTrailType}
              lowerValue={trailLower}
              onChangeLowerValue={setTrailLower}
              upperValue={trailUpper}
              onChangeUpperValue={setTrailUpper}
            />
          </div>
        </>
      )}

      {!editMode && (
        <>
          <div className='spacer' />
          <Button type='primary' onClick={onClickAddLeg}>
            Add leg
          </Button>
        </>
      )}
    </div>
  )
}
