// Mock Firestore-like data structure for blood bank platform

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  location: {
    city: string;
    area: string;
  };
  isAvailable: boolean;
  lastDonation: string;
  donationCount: number;
  phone: string; // Masked in display
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  receiverId: string;
  receiverName: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'normal' | 'urgent' | 'emergency';
  hospital: string;
  location: {
    city: string;
    area: string;
  };
  status: 'pending' | 'matched' | 'fulfilled' | 'cancelled';
  matchedDonors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DonationHistory {
  id: string;
  donorId: string;
  requestId: string;
  date: string;
  hospital: string;
  bloodGroup: string;
  units: number;
}

// Mock Donors
export const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    bloodGroup: 'O+',
    location: { city: 'Mumbai', area: 'Andheri West' },
    isAvailable: true,
    lastDonation: '2024-09-15',
    donationCount: 12,
    phone: '+91 98XXX XXXXX',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    bloodGroup: 'A+',
    location: { city: 'Mumbai', area: 'Bandra' },
    isAvailable: true,
    lastDonation: '2024-10-01',
    donationCount: 5,
    phone: '+91 97XXX XXXXX',
    createdAt: '2023-03-20',
  },
  {
    id: '3',
    name: 'Amit Patel',
    bloodGroup: 'B+',
    location: { city: 'Mumbai', area: 'Powai' },
    isAvailable: false,
    lastDonation: '2024-11-20',
    donationCount: 8,
    phone: '+91 96XXX XXXXX',
    createdAt: '2022-08-10',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    bloodGroup: 'O-',
    location: { city: 'Mumbai', area: 'Juhu' },
    isAvailable: true,
    lastDonation: '2024-08-05',
    donationCount: 15,
    phone: '+91 95XXX XXXXX',
    createdAt: '2021-12-01',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    bloodGroup: 'AB+',
    location: { city: 'Mumbai', area: 'Goregaon' },
    isAvailable: true,
    lastDonation: '2024-07-22',
    donationCount: 3,
    phone: '+91 94XXX XXXXX',
    createdAt: '2024-01-10',
  },
  {
    id: '6',
    name: 'Meera Joshi',
    bloodGroup: 'A-',
    location: { city: 'Mumbai', area: 'Malad' },
    isAvailable: true,
    lastDonation: '2024-06-18',
    donationCount: 7,
    phone: '+91 93XXX XXXXX',
    createdAt: '2023-06-15',
  },
];

// Mock Blood Requests
export const mockRequests: BloodRequest[] = [
  {
    id: 'req1',
    receiverId: '101',
    receiverName: 'City Hospital',
    bloodGroup: 'O+',
    unitsNeeded: 2,
    urgency: 'emergency',
    hospital: 'City General Hospital',
    location: { city: 'Mumbai', area: 'Andheri' },
    status: 'pending',
    matchedDonors: [],
    createdAt: '2024-12-30T10:00:00Z',
    updatedAt: '2024-12-30T10:00:00Z',
  },
  {
    id: 'req2',
    receiverId: '102',
    receiverName: 'Apollo Hospital',
    bloodGroup: 'A+',
    unitsNeeded: 1,
    urgency: 'urgent',
    hospital: 'Apollo Hospital',
    location: { city: 'Mumbai', area: 'Bandra' },
    status: 'matched',
    matchedDonors: ['2'],
    createdAt: '2024-12-29T14:30:00Z',
    updatedAt: '2024-12-30T08:00:00Z',
  },
  {
    id: 'req3',
    receiverId: '103',
    receiverName: 'Lilavati Hospital',
    bloodGroup: 'B+',
    unitsNeeded: 3,
    urgency: 'normal',
    hospital: 'Lilavati Hospital',
    location: { city: 'Mumbai', area: 'Bandra' },
    status: 'pending',
    matchedDonors: [],
    createdAt: '2024-12-28T09:15:00Z',
    updatedAt: '2024-12-28T09:15:00Z',
  },
];

// Mock Donation History
export const mockDonationHistory: DonationHistory[] = [
  {
    id: 'don1',
    donorId: '1',
    requestId: 'old_req1',
    date: '2024-09-15',
    hospital: 'City General Hospital',
    bloodGroup: 'O+',
    units: 1,
  },
  {
    id: 'don2',
    donorId: '1',
    requestId: 'old_req2',
    date: '2024-06-10',
    hospital: 'Apollo Hospital',
    bloodGroup: 'O+',
    units: 1,
  },
  {
    id: 'don3',
    donorId: '1',
    requestId: 'old_req3',
    date: '2024-03-05',
    hospital: 'Lilavati Hospital',
    bloodGroup: 'O+',
    units: 1,
  },
];

// Blood Group Compatibility Chart
export const bloodCompatibility = {
  'O-': { canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'] },
  'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'] },
  'A-': { canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'A-'] },
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+'] },
  'B-': { canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'B-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'B-', 'B+'] },
  'AB-': { canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'] },
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
};

// Platform Statistics
export const platformStats = {
  totalDonors: 12547,
  requestsFulfilled: 8923,
  livesImpacted: 26769,
  citiesCovered: 45,
};

// Blood Group Info
export const bloodGroupInfo = [
  { group: 'O-', name: 'Universal Donor', percentage: '7%', trait: 'Can donate to all blood types' },
  { group: 'O+', name: 'Most Common', percentage: '37%', trait: 'Can donate to all positive types' },
  { group: 'A-', name: 'Rare Donor', percentage: '6%', trait: 'Can donate to A and AB types' },
  { group: 'A+', name: 'Second Most Common', percentage: '34%', trait: 'Can donate to A+ and AB+' },
  { group: 'B-', name: 'Rare Type', percentage: '2%', trait: 'Can donate to B and AB types' },
  { group: 'B+', name: 'Common Type', percentage: '9%', trait: 'Can donate to B+ and AB+' },
  { group: 'AB-', name: 'Rarest Donor', percentage: '1%', trait: 'Can donate to AB types only' },
  { group: 'AB+', name: 'Universal Receiver', percentage: '4%', trait: 'Can receive from all types' },
];
