// Centralized synthetic mock data + type definitions for ResQBridge Hospital Dashboard.
// All data is fictional. No real patient information is used.
// Future backend integration replaces this module without touching the UI.

/**
 * @typedef {Object} Hospital
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} address
 * @property {('OPERATIONAL'|'LIMITED_CAPACITY'|'HIGH_LOAD'|'CRITICAL'|'UNAVAILABLE')} status
 * @property {number} capacityUsed
 * @property {number} capacityTotal
 */

/**
 * @typedef {Object} TimelineEvent
 * @property {string} label
 * @property {string} time
 * @property {('done'|'active'|'pending')} state
 * @property {string} [actor]
 */

/**
 * @typedef {Object} Emergency
 * @property {string} id
 * @property {('critical'|'urgent'|'standard')} priority
 * @property {string} type
 * @property {string} summary
 * @property {('NOTIFIED'|'ACKNOWLEDGED'|'EN_ROUTE'|'PREPARING'|'ARRIVED'|'PATIENT_RECEIVED'|'HANDOVER'|'COMPLETED'|'CANCELLED'|'DIVERTED'|'DELAYED')} status
 * @property {string} ambulanceId
 * @property {string} driver
 * @property {string} origin
 * @property {number} distanceKm
 * @property {number} etaMin
 * @property {string} destination
 * @property {string} createdAt
 * @property {string} [patientRef]
 * @property {string} [ageSex]
 * @property {string[]} [requiredResources]
 * @property {TimelineEvent[]} [timeline]
 */

export const hospital = {
  id: 'HOSP-BV-01',
  name: 'Bayview General Hospital',
  code: 'BGH',
  address: '1200 Coastal Hwy, Bayview District',
  status: 'HIGH_LOAD',
  capacityUsed: 38,
  capacityTotal: 52,
};

export const hospitalStatusLabels = {
  OPERATIONAL: { label: 'Operational', tone: 'success' },
  LIMITED_CAPACITY: { label: 'Limited Capacity', tone: 'warning' },
  HIGH_LOAD: { label: 'High Load', tone: 'warning' },
  CRITICAL: { label: 'Critical', tone: 'critical' },
  UNAVAILABLE: { label: 'Unavailable', tone: 'critical' },
};

export const emergencyStatusLabels = {
  NOTIFIED: { label: 'Notified', tone: 'primary' },
  ACKNOWLEDGED: { label: 'Acknowledged', tone: 'primary' },
  EN_ROUTE: { label: 'En Route', tone: 'info' },
  PREPARING: { label: 'Preparing', tone: 'warning' },
  ARRIVED: { label: 'Arrived', tone: 'info' },
  PATIENT_RECEIVED: { label: 'Patient Received', tone: 'success' },
  HANDOVER: { label: 'Handover', tone: 'primary' },
  COMPLETED: { label: 'Completed', tone: 'success' },
  CANCELLED: { label: 'Cancelled', tone: 'muted' },
  DIVERTED: { label: 'Diverted', tone: 'warning' },
  DELAYED: { label: 'Delayed', tone: 'warning' },
};

export const priorityLabels = {
  critical: { label: 'Critical', tone: 'critical' },
  urgent: { label: 'Urgent', tone: 'warning' },
  standard: { label: 'Standard', tone: 'info' },
};

export const resourceLabels = {
  AVAILABLE: { label: 'Available', tone: 'success' },
  LIMITED: { label: 'Limited', tone: 'warning' },
  FULL: { label: 'Full', tone: 'critical' },
  UNAVAILABLE: { label: 'Unavailable', tone: 'muted' },
};

export const departments = [
  { id: 'ed', name: 'Emergency Department', status: 'HIGH_LOAD', beds: 18, used: 15 },
  { id: 'trauma', name: 'Trauma Unit', status: 'OPERATIONAL', beds: 8, used: 3 },
  { id: 'icu', name: 'ICU', status: 'LIMITED_CAPACITY', beds: 12, used: 10 },
  { id: 'rad', name: 'Radiology / Imaging', status: 'OPERATIONAL', beds: 6, used: 2 },
  { id: 'or', name: 'Operating Theatre', status: 'OPERATIONAL', beds: 5, used: 1 },
];

export const resources = [
  { id: 'ed-beds', name: 'Emergency Beds', status: 'LIMITED', total: 18, used: 15, icon: 'BedDouble' },
  { id: 'icu', name: 'ICU Beds', status: 'LIMITED', total: 12, used: 10, icon: 'HeartPulse' },
  { id: 'trauma', name: 'Trauma Bay', status: 'AVAILABLE', total: 4, used: 1, icon: 'ShieldPlus' },
  { id: 'imaging', name: 'Imaging (CT/MRI)', status: 'AVAILABLE', total: 3, used: 1, icon: 'ScanLine' },
  { id: 'blood', name: 'Blood Bank', status: 'AVAILABLE', total: 100, used: 34, icon: 'Droplets' },
  { id: 'bay', name: 'Ambulance Bay', status: 'FULL', total: 3, used: 3, icon: 'Ambulance' },
  { id: 'vent', name: 'Ventilators', status: 'LIMITED', total: 14, used: 11, icon: 'Wind' },
  { id: 'staff', name: 'On-Duty Staff', status: 'AVAILABLE', total: 24, used: 18, icon: 'Users' },
];

export const emergencies = [
  {
    id: 'EMG-2026-0472',
    priority: 'critical',
    type: 'Cardiac Arrest',
    summary: 'Adult male, collapsed at transit station. CPR in progress by bystander.',
    status: 'EN_ROUTE',
    ambulanceId: 'AMB-204',
    driver: 'M. Okafor',
    origin: 'Central Transit Station',
    distanceKm: 4.2,
    etaMin: 6,
    destination: 'Emergency Department',
    createdAt: '13:41',
    patientRef: 'PC-0472',
    ageSex: 'M, 58',
    requiredResources: ['Trauma Bay', 'Defibrillator', 'Cardiac Team'],
    timeline: [
      { label: 'Emergency Created', time: '13:38', state: 'done', actor: 'Citizen App' },
      { label: 'Hospital Notified', time: '13:39', state: 'done', actor: 'Dispatch' },
      { label: 'Acknowledged', time: '13:40', state: 'done', actor: 'Dr. R. Halsey' },
      { label: 'Ambulance En Route', time: '13:41', state: 'active', actor: 'AMB-204' },
      { label: 'Pre-Arrival Preparation', time: '—', state: 'pending' },
      { label: 'Ambulance Arrived', time: '—', state: 'pending' },
      { label: 'Patient Received', time: '—', state: 'pending' },
      { label: 'Handover', time: '—', state: 'pending' },
      { label: 'Completed', time: '—', state: 'pending' },
    ],
  },
  {
    id: 'EMG-2026-0473',
    priority: 'urgent',
    type: 'Road Traffic Collision',
    summary: 'Two-vehicle collision, suspected fractures, conscious and responsive.',
    status: 'EN_ROUTE',
    ambulanceId: 'AMB-211',
    driver: 'S. Pereira',
    origin: 'Harbor Roundabout',
    distanceKm: 7.8,
    etaMin: 11,
    destination: 'Trauma Unit',
    createdAt: '13:44',
    patientRef: 'PC-0473',
    ageSex: 'F, 34',
    requiredResources: ['Trauma Bay', 'Imaging', 'Orthopedics'],
    timeline: [
      { label: 'Emergency Created', time: '13:40', state: 'done', actor: 'Citizen App' },
      { label: 'Hospital Notified', time: '13:41', state: 'done', actor: 'Dispatch' },
      { label: 'Acknowledged', time: '13:42', state: 'done', actor: 'Dr. R. Halsey' },
      { label: 'Ambulance En Route', time: '13:44', state: 'active', actor: 'AMB-211' },
      { label: 'Pre-Arrival Preparation', time: '—', state: 'pending' },
      { label: 'Ambulance Arrived', time: '—', state: 'pending' },
      { label: 'Patient Received', time: '—', state: 'pending' },
      { label: 'Handover', time: '—', state: 'pending' },
      { label: 'Completed', time: '—', state: 'pending' },
    ],
  },
  {
    id: 'EMG-2026-0474',
    priority: 'standard',
    type: 'Respiratory Distress',
    summary: 'Elderly patient, shortness of breath, stable vitals.',
    status: 'NOTIFIED',
    ambulanceId: 'AMB-219',
    driver: 'L. Tanaka',
    origin: 'Maple Senior Residence',
    distanceKm: 11.3,
    etaMin: 18,
    destination: 'Emergency Department',
    createdAt: '13:47',
    patientRef: 'PC-0474',
    ageSex: 'F, 79',
    requiredResources: ['Respiratory Support', 'Ventilator (standby)'],
    timeline: [
      { label: 'Emergency Created', time: '13:46', state: 'done', actor: 'Citizen App' },
      { label: 'Hospital Notified', time: '13:47', state: 'active', actor: 'Dispatch' },
      { label: 'Acknowledged', time: '—', state: 'pending' },
      { label: 'Ambulance En Route', time: '—', state: 'pending' },
      { label: 'Pre-Arrival Preparation', time: '—', state: 'pending' },
      { label: 'Ambulance Arrived', time: '—', state: 'pending' },
      { label: 'Patient Received', time: '—', state: 'pending' },
      { label: 'Handover', time: '—', state: 'pending' },
      { label: 'Completed', time: '—', state: 'pending' },
    ],
  },
  {
    id: 'EMG-2026-0469',
    priority: 'urgent',
    type: 'Fall Injury',
    summary: 'Patient fell from staircase, suspected head trauma, GCS 14.',
    status: 'ARRIVED',
    ambulanceId: 'AMB-198',
    driver: 'P. Nadeem',
    origin: 'Westside Apartments',
    distanceKm: 0,
    etaMin: 0,
    destination: 'Trauma Unit',
    createdAt: '13:12',
    patientRef: 'PC-0469',
    ageSex: 'M, 66',
    requiredResources: ['Trauma Bay', 'Imaging', 'Neuro'],
    timeline: [
      { label: 'Emergency Created', time: '13:02', state: 'done', actor: 'Citizen App' },
      { label: 'Hospital Notified', time: '13:03', state: 'done', actor: 'Dispatch' },
      { label: 'Acknowledged', time: '13:04', state: 'done', actor: 'Dr. R. Halsey' },
      { label: 'Ambulance En Route', time: '13:06', state: 'done', actor: 'AMB-198' },
      { label: 'Pre-Arrival Preparation', time: '13:08', state: 'done', actor: 'Trauma Team' },
      { label: 'Ambulance Arrived', time: '13:18', state: 'active', actor: 'AMB-198' },
      { label: 'Patient Received', time: '—', state: 'pending' },
      { label: 'Handover', time: '—', state: 'pending' },
      { label: 'Completed', time: '—', state: 'pending' },
    ],
  },
];

export const history = [
  { id: 'EMG-2026-0461', date: '2026-09-30', priority: 'critical', type: 'Stroke', ambulance: 'AMB-201', destination: 'ICU', outcome: 'Admitted', handover: 'Accepted', durationMin: 42 },
  { id: 'EMG-2026-0458', date: '2026-09-30', priority: 'urgent', type: 'Burns', ambulance: 'AMB-188', destination: 'Emergency Dept', outcome: 'Treated & Released', handover: 'Accepted', durationMin: 38 },
  { id: 'EMG-2026-0455', date: '2026-09-29', priority: 'standard', type: 'Dehydration', ambulance: 'AMB-176', destination: 'Emergency Dept', outcome: 'Treated & Released', handover: 'Accepted', durationMin: 24 },
  { id: 'EMG-2026-0451', date: '2026-09-29', priority: 'urgent', type: 'Fracture', ambulance: 'AMB-193', destination: 'Trauma Unit', outcome: 'Admitted', handover: 'Accepted', durationMin: 47 },
  { id: 'EMG-2026-0447', date: '2026-09-28', priority: 'critical', type: 'Cardiac Arrest', ambulance: 'AMB-180', destination: 'ICU', outcome: 'Deceased', handover: 'Accepted', durationMin: 55 },
  { id: 'EMG-2026-0442', date: '2026-09-28', priority: 'standard', type: 'Allergic Reaction', ambulance: 'AMB-165', destination: 'Emergency Dept', outcome: 'Treated & Released', handover: 'Accepted', durationMin: 19 },
  { id: 'EMG-2026-0438', date: '2026-09-27', priority: 'urgent', type: 'Road Traffic Collision', ambulance: 'AMB-190', destination: 'Trauma Unit', outcome: 'Diverted', handover: 'Diverted', durationMin: 0 },
];

export const notifications = [
  { id: 'N-01', type: 'emergency', priority: 'critical', title: 'Critical emergency incoming', body: 'EMG-2026-0472 — Cardiac Arrest, ETA 6 min.', time: '13:41', read: false, ref: 'EMG-2026-0472' },
  { id: 'N-02', type: 'eta', priority: 'warning', title: 'ETA updated', body: 'AMB-211 now arriving in 11 min (was 9).', time: '13:44', read: false, ref: 'EMG-2026-0473' },
  { id: 'N-03', type: 'arrival', priority: 'info', title: 'Ambulance arrived', body: 'AMB-198 has arrived at Trauma Bay.', time: '13:18', read: true, ref: 'EMG-2026-0469' },
  { id: 'N-04', type: 'capacity', priority: 'warning', title: 'Capacity warning', body: 'ICU at 83% — Limited capacity.', time: '13:05', read: true, ref: null },
  { id: 'N-05', type: 'system', priority: 'info', title: 'Shift handover complete', body: 'Day shift operations team signed in.', time: '07:00', read: true, ref: null },
];

export const reports = {
  totals: { total: 184, completed: 161, cancelled: 9, diverted: 14 },
  averages: { responseMin: 11.4, arrivalMin: 19.7, handoverMin: 6.8 },
  critical: 27,
  trend: [
    { day: 'Mon', value: 24 }, { day: 'Tue', value: 31 }, { day: 'Wed', value: 28 },
    { day: 'Thu', value: 35 }, { day: 'Fri', value: 41 }, { day: 'Sat', value: 38 }, { day: 'Sun', value: 29 },
  ],
  byType: [
    { name: 'Cardiac', value: 42 }, { name: 'Trauma', value: 38 }, { name: 'Respiratory', value: 29 },
    { name: 'Neuro', value: 24 }, { name: 'Other', value: 51 },
  ],
};

export const staff = {
  name: 'Dr. R. Halsey',
  role: 'HOSPITAL_ADMIN',
  title: 'Emergency Physician',
  initials: 'RH',
};

export function getEmergency(id) {
  return emergencies.find((e) => e.id === id) || history.find((e) => e.id === id);
}