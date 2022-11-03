export const PositionType = {
  Buy: 'Buy',
  Sell: 'Sell',
}

export const OptionType = {
  Call: 'Call',
  Put: 'Put',
}

export const LegTargetStopLossType = {
  Points: 'Points',
  UnderlyingPoints: 'UnderlyingPoints',
  Percentage: 'Percentage',
  UnderlyingPercentage: 'UnderlyingPercentage',
}

export const TrailStopLossType = {
  Points: 'Points',
  Percentage: 'Percentage',
}

export const MomentumType = {
  PointsUp: 'PointsUp',
  PointsDown: 'PointsDown',
  PercentageUp: 'PercentageUp',
  PercentageDown: 'PercentageDown',
  UnderlyingPointsUp: 'UnderlyingPointsUp',
  UnderlyingPointsDown: 'UnderlyingPointsDown',
  UnderlyingPercentageUp: 'UnderlyingPercentageUp',
  UnderlyingPercentageDown: 'UnderlyingPercentageDown',
}

export const ExpiryType = {
  Weekly: 'Weekly',
  Monthly: 'Monthly',
}

export const EntryType = {
  StrikeType: 'EntryByStrikeType',
  Premium: 'EntryByPremium',
  PremiumRange: 'EntryByPremiumRange',
  StraddleWidth: 'EntryByStraddleWidth',
}

export const ReEntryType = {
  ASAP: 'ASAP',
  ASAPReverse: 'ASAPReverse',
}

export const StrikeType = {
  ATM: 'ATM',
  OTM1: 'OTM1',
}
