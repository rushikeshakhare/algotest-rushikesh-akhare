import { useState, useCallback } from 'react'
import { Button } from 'antd'
import { db } from '../App'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc } from 'firebase/firestore/lite'
import { LegBuilder, LegViewer } from '../components'

const COLLECTION_NAME = 'leg'

export function LegBuilderScreen() {
  const [legs, setLegs] = useState([])
  const [saving, setSaving] = useState(false)

  const onAddNewLeg = useCallback(
    leg => {
      setLegs(oldLegs => [...oldLegs, { id: uuidv4(), ...leg }])
    },
    [setLegs],
  )

  const onChangeLeg = useCallback(
    leg => {
      setLegs(oldLegs => oldLegs.map(oldLeg => (oldLeg.id === leg.id ? leg : oldLeg)))
    },
    [setLegs],
  )

  const onDeleteLeg = useCallback(id => {
    setLegs(oldLegs => oldLegs.filter(oldLeg => oldLeg.id !== id))
  }, [])

  const onCopyLeg = useCallback(id => {
    setLegs(oldLegs => {
      const legToCopy = oldLegs.find(oldLeg => oldLeg.id === id)
      return [...oldLegs, { ...legToCopy, id: uuidv4() }]
    })
  }, [])

  const onSaveLegs = useCallback(async () => {
    setSaving(true)
    const finalData = legs.map(leg => {
      return {
        PositionType: leg.positionType,
        Lots: leg.lot,
        LegTrailSL: leg.isTrailSL
          ? {
              Type: leg.trailType,
              Value: {
                InstrumentMove: leg.trailLower,
                StopLossMove: leg.trailUpper,
              },
            }
          : null,
        LegMomentum: leg.isMomentum
          ? {
              Type: leg.momentumType,
              Value: leg.momentumValue,
            }
          : null,
        ExpiryKind: leg.expiryType,
        EntryType: leg.entryType,
        StrikeParameter: leg.strikeParameter,
        InstrumentKind: 'CE',
        OptionType: leg.optionType,
      }
    })

    for (const legData of finalData) {
      try {
        await addDoc(collection(db, COLLECTION_NAME), { ...legData, createdAt: Date.now() })
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
    setSaving(false)
    setLegs([])
    alert('Legs Saved')
  }, [legs])

  return (
    <div className='leg-builder'>
      <LegBuilder onAddLeg={onAddNewLeg} />
      <LegViewer
        onCopyLeg={onCopyLeg}
        onDeleteLeg={onDeleteLeg}
        onChangeLeg={onChangeLeg}
        legs={legs}
      />
      <div className='spacer' />
      <Button type='primary' onClick={onSaveLegs} disabled={!legs.length}>
        {saving ? 'Saving...' : 'Save Legs'}
      </Button>
    </div>
  )
}
