export type BloodGroup = 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+'

export const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']

export type Urgency = 'critical' | 'high' | 'moderate'

export interface Donor {
  id: string
  name: string
  phone: string // stored raw, always displayed masked
  bloodGroup: BloodGroup
  lat: number
  lng: number
  lastDonationDaysAgo: number
  totalDonations: number
  verified: boolean
  nightWilling: boolean
  ngos: string[] // ngo ids
}

export interface Hospital {
  id: string
  name: string
  lat: number
  lng: number
  zone: string
  deviceTrusted: boolean
}

export interface BloodBank {
  id: string
  name: string
  lat: number
  lng: number
  zone: string
  stock: Record<BloodGroup, number> // units
  usageHistory: Record<BloodGroup, number[]> // last 14 days daily issue
}

export interface Ngo {
  id: string
  name: string
  lat: number
  lng: number
}

export interface DonationCamp {
  id: string
  name: string
  lat: number
  lng: number
  dateLabel: string
  expectedDonors: number
  organizer: string
}

export type RequestStatus = 'open' | 'fulfilled' | 'expired'

export interface BloodRequest {
  id: string
  hospitalId: string
  bloodGroup: BloodGroup
  units: number
  urgency: Urgency
  reason: string
  createdAt: number // sim epoch ms
  deadline: number // sim epoch ms
  status: RequestStatus
  fulfilledUnits: number
  deviceId: string
  requesterPhone: string
}

export interface MatchedDonor {
  donor: Donor
  distanceKm: number
  compatible: boolean
  exactGroup: boolean
  eligible: boolean
  score: number
  tier: 'gold' | 'silver' | 'standard'
}

export interface EscalationTierDef {
  tier: number
  name: string
  channel: 'PUSH' | 'SMS' | 'PUSH+SMS' | 'NETWORK'
  triggerMin: number // fires when remaining <= this many minutes
  audience: string
}

export interface TierLogEntry {
  at: number
  requestId: string
  tier: number
  message: string
  notified: number
}

export interface FraudFlag {
  id: string
  severity: 'high' | 'medium' | 'low'
  kind: 'duplicate_request' | 'identity_anomaly' | 'velocity' | 'untrusted_device' | 'eligibility'
  title: string
  detail: string
  at: number
  entityId: string
}

export interface AuditEntry {
  at: number
  actor: string
  action: string
  subject: string
  piiAccessed: boolean
}

export interface FeedEntry {
  at: number
  kind: 'request' | 'donor' | 'escalation' | 'fulfillment' | 'system' | 'fraud'
  message: string
}
