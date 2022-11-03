import { LegBuilder } from '../LegBuilder'

export function LegViewer({ legs = [], onChangeLeg, onCopyLeg, onDeleteLeg }) {
  return legs.map(leg => (
    <LegBuilder
      editMode
      onCopyLeg={onCopyLeg}
      onDeleteLeg={onDeleteLeg}
      onChangeLeg={onChangeLeg}
      key={leg.id}
      {...leg}
    />
  ))
}
