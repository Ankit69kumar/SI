export const SERVICE_CATEGORIES = [
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles', color: 'primary' },
  { id: 'plumbing', name: 'Plumbing', icon: 'Wrench', color: 'warning' },
  { id: 'electrical', name: 'Electrical', icon: 'Zap', color: 'accent' },
  { id: 'painting', name: 'Painting', icon: 'PaintRoller', color: 'success' },
  { id: 'carpentry', name: 'Carpentry', icon: 'Hammer', color: 'warning' },
  { id: 'gardening', name: 'Gardening', icon: 'Trees', color: 'success' },
  { id: 'appliance', name: 'Appliance Repair', icon: 'Refrigerator', color: 'primary' },
  { id: 'cooking', name: 'Cooking', icon: 'ChefHat', color: 'accent' },
  { id: 'elderly', name: 'Elderly Assistance', icon: 'HeartHandshake', color: 'error' },
  { id: 'delivery', name: 'Delivery', icon: 'PackageCheck', color: 'primary' },
  { id: 'community', name: 'Community Help', icon: 'Users', color: 'success' },
  { id: 'other', name: 'Other Services', icon: 'MoreHorizontal', color: 'ink' },
]

export const PROVIDERS = [
  {
    id: 'p1', name: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=12',
    category: 'plumbing', skills: ['Pipe Repair', 'Leakage Fix', 'Bathroom Fittings', 'Water Tank'],
    experience: 8, rating: 4.8, reviewsCount: 124, jobsDone: 312,
    hourlyRate: 250, serviceRate: 199, verified: true, available: true,
    area: 'Andheri West, Mumbai', distance: 1.2, activeJobs: 2,
    bio: 'Experienced plumber serving Andheri & nearby areas. Quick response and fair pricing.',
    responseTime: 'Usually responds in 15 mins', completedThisMonth: 28,
  },
  {
    id: 'p2', name: 'Sunita Devi', avatar: 'https://i.pravatar.cc/150?img=45',
    category: 'cleaning', skills: ['Home Cleaning', 'Deep Clean', 'Kitchen', 'Sofa Shampoo'],
    experience: 5, rating: 4.9, reviewsCount: 210, jobsDone: 480,
    hourlyRate: 180, serviceRate: 149, verified: true, available: true,
    area: 'Bandra, Mumbai', distance: 2.4, activeJobs: 1,
    bio: 'Professional home cleaning specialist. Eco-friendly products. 100% satisfaction.',
    responseTime: 'Usually responds in 10 mins', completedThisMonth: 42,
  },
  {
    id: 'p3', name: 'Mohammed Irfan', avatar: 'https://i.pravatar.cc/150?img=33',
    category: 'electrical', skills: ['Wiring', 'Switchboard', 'Inverter', 'Fan Installation'],
    experience: 11, rating: 4.7, reviewsCount: 89, jobsDone: 230,
    hourlyRate: 300, serviceRate: 249, verified: true, available: false,
    area: 'Powai, Mumbai', distance: 5.1, activeJobs: 3,
    bio: 'Licensed electrician with 11 years experience. Safety-first approach.',
    responseTime: 'Usually responds in 30 mins', completedThisMonth: 19,
  },
  {
    id: 'p4', name: 'Anita Sharma', avatar: 'https://i.pravatar.cc/150?img=47',
    category: 'cooking', skills: ['North Indian', 'South Indian', 'Tiffin Service', 'Party Cooking'],
    experience: 7, rating: 4.9, reviewsCount: 156, jobsDone: 390,
    hourlyRate: 200, serviceRate: 179, verified: true, available: true,
    area: 'Juhu, Mumbai', distance: 3.0, activeJobs: 2,
    bio: 'Home-style cooking with fresh ingredients. Tiffin service available.',
    responseTime: 'Usually responds in 20 mins', completedThisMonth: 35,
  },
  {
    id: 'p5', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=15',
    category: 'carpentry', skills: ['Furniture Repair', 'Door Installation', 'Modular Kitchen', 'Wood Polishing'],
    experience: 14, rating: 4.6, reviewsCount: 67, jobsDone: 198,
    hourlyRate: 350, serviceRate: 299, verified: true, available: true,
    area: 'Dadar, Mumbai', distance: 4.2, activeJobs: 0,
    bio: 'Master carpenter crafting and repairing furniture with precision.',
    responseTime: 'Usually responds in 25 mins', completedThisMonth: 12,
  },
  {
    id: 'p6', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=49',
    category: 'elderly', skills: ['Elderly Care', 'Medicine Reminder', 'Companionship', 'Hospital Visit'],
    experience: 6, rating: 5.0, reviewsCount: 98, jobsDone: 175,
    hourlyRate: 220, serviceRate: 199, verified: true, available: true,
    area: 'Goregaon, Mumbai', distance: 3.8, activeJobs: 1,
    bio: 'Compassionate elderly care worker. Certified in basic nursing assistance.',
    responseTime: 'Usually responds in 8 mins', completedThisMonth: 22,
  },
  {
    id: 'p7', name: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/150?img=53',
    category: 'painting', skills: ['Interior Painting', 'Exterior', 'Waterproofing', 'Texture'],
    experience: 9, rating: 4.5, reviewsCount: 73, jobsDone: 160,
    hourlyRate: 280, serviceRate: 230, verified: false, available: true,
    area: 'Thane, Mumbai', distance: 7.5, activeJobs: 2,
    bio: 'Professional painter transforming homes with quality finishes.',
    responseTime: 'Usually responds in 40 mins', completedThisMonth: 8,
  },
  {
    id: 'p8', name: 'Lakshmi Rao', avatar: 'https://i.pravatar.cc/150?img=44',
    category: 'gardening', skills: ['Garden Maintenance', 'Plants', 'Lawn Care', 'Terrace Garden'],
    experience: 4, rating: 4.8, reviewsCount: 54, jobsDone: 120,
    hourlyRate: 190, serviceRate: 159, verified: true, available: true,
    area: 'Malad, Mumbai', distance: 2.9, activeJobs: 0,
    bio: 'Green-thumb gardener bringing life to your outdoor and indoor spaces.',
    responseTime: 'Usually responds in 15 mins', completedThisMonth: 16,
  },
  {
    id: 'p9', name: 'Suresh Patil', avatar: 'https://i.pravatar.cc/150?img=13',
    category: 'appliance', skills: ['AC Repair', 'Washing Machine', 'Refrigerator', 'Microwave'],
    experience: 10, rating: 4.7, reviewsCount: 112, jobsDone: 267,
    hourlyRate: 320, serviceRate: 269, verified: true, available: true,
    area: 'Kandivali, Mumbai', distance: 4.5, activeJobs: 2,
    bio: 'Appliance repair expert. All brands serviced with warranty.',
    responseTime: 'Usually responds in 20 mins', completedThisMonth: 24,
  },
  {
    id: 'p10', name: 'Deepak Yadav', avatar: 'https://i.pravatar.cc/150?img=11',
    category: 'delivery', skills: ['Parcel Delivery', 'Grocery Run', 'Document Pickup', 'Medicine Delivery'],
    experience: 3, rating: 4.6, reviewsCount: 41, jobsDone: 320,
    hourlyRate: 120, serviceRate: 99, verified: true, available: true,
    area: 'Versova, Mumbai', distance: 1.8, activeJobs: 1,
    bio: 'Fast and reliable delivery across western suburbs.',
    responseTime: 'Usually responds in 5 mins', completedThisMonth: 48,
  },
  {
    id: 'p11', name: 'Farhan Qureshi', avatar: 'https://i.pravatar.cc/150?img=60',
    category: 'plumbing', skills: ['Pipe Repair', 'Drainage', 'Motor Repair', 'Geyser Installation'],
    experience: 6, rating: 4.4, reviewsCount: 38, jobsDone: 95,
    hourlyRate: 230, serviceRate: 189, verified: false, available: true,
    area: 'Vile Parle, Mumbai', distance: 3.3, activeJobs: 1,
    bio: 'Plumbing solutions for homes and small offices.',
    responseTime: 'Usually responds in 35 mins', completedThisMonth: 10,
  },
  {
    id: 'p12', name: 'Meena Iyer', avatar: 'https://i.pravatar.cc/150?img=32',
    category: 'community', skills: ['Event Help', 'Moving Assistance', 'Queue Help', 'Form Filling'],
    experience: 5, rating: 4.9, reviewsCount: 76, jobsDone: 140,
    hourlyRate: 150, serviceRate: 129, verified: true, available: true,
    area: 'Santacruz, Mumbai', distance: 2.1, activeJobs: 0,
    bio: 'Community helper for everyday tasks. Friendly and dependable.',
    responseTime: 'Usually responds in 12 mins', completedThisMonth: 20,
  },
]

export const REVIEWS = [
  { id: 'r1', providerId: 'p1', customerName: 'Aditya Verma', rating: 5, date: '2026-08-20', comment: 'Rajesh fixed my bathroom leakage quickly. Very professional and clean work.' },
  { id: 'r2', providerId: 'p1', customerName: 'Neha Gupta', rating: 4, date: '2026-08-15', comment: 'Good service, arrived on time. Slightly expensive but worth it.' },
  { id: 'r3', providerId: 'p2', customerName: 'Rohit Sinha', rating: 5, date: '2026-08-22', comment: 'Sunita did a deep clean of my 2BHK. Spotless! Highly recommend.' },
  { id: 'r4', providerId: 'p2', customerName: 'Kavya Reddy', rating: 5, date: '2026-08-18', comment: 'Punctual, thorough, and polite. Will book again.' },
  { id: 'r5', providerId: 'p4', customerName: 'Sanjay Pillai', rating: 5, date: '2026-08-21', comment: 'Best home-cooked tiffin in the area. Tastes like mom\'s food.' },
  { id: 'r6', providerId: 'p6', customerName: 'Pooja Bhatt', rating: 5, date: '2026-08-19', comment: 'Priya took wonderful care of my father. So caring and patient.' },
  { id: 'r7', providerId: 'p9', customerName: 'Imran Khan', rating: 4, date: '2026-08-17', comment: 'AC repaired same day. Working perfectly now.' },
  { id: 'r8', providerId: 'p10', customerName: 'Ritu Agarwal', rating: 5, date: '2026-08-23', comment: 'Super fast grocery delivery. Lifesaver!' },
]

export const BOOKINGS = [
  {
    id: 'b1001', customerId: 'c1', providerId: 'p2', category: 'cleaning',
    serviceName: 'Deep Home Cleaning', description: '2BHK deep cleaning including kitchen and bathrooms',
    date: '2026-08-30', time: '10:00 AM', location: 'Flat 402, Sunrise Apartments, Andheri West',
    price: 149, status: 'accepted', createdAt: '2026-08-27', image: null,
  },
  {
    id: 'b1002', customerId: 'c1', providerId: 'p9', category: 'appliance',
    serviceName: 'AC Servicing', description: 'Split AC 1.5 ton servicing and gas top-up',
    date: '2026-09-02', time: '4:00 PM', location: 'Flat 402, Sunrise Apartments, Andheri West',
    price: 269, status: 'pending', createdAt: '2026-08-28', image: null,
  },
  {
    id: 'b1003', customerId: 'c1', providerId: 'p1', category: 'plumbing',
    serviceName: 'Bathroom Leakage Fix', description: 'Wall seepage in master bathroom',
    date: '2026-08-15', time: '11:00 AM', location: 'Flat 402, Sunrise Apartments, Andheri West',
    price: 199, status: 'completed', createdAt: '2026-08-12', image: null, rating: 5,
  },
  {
    id: 'b1004', customerId: 'c1', providerId: 'p4', category: 'cooking',
    serviceName: 'Weekly Tiffin Service', description: 'Lunch and dinner tiffin for 5 days',
    date: '2026-08-10', time: '12:00 PM', location: 'Flat 402, Sunrise Apartments, Andheri West',
    price: 179, status: 'completed', createdAt: '2026-08-08', image: null, rating: 4,
  },
  {
    id: 'b1005', customerId: 'c1', providerId: 'p10', category: 'delivery',
    serviceName: 'Grocery Delivery', description: 'Monthly grocery from local market',
    date: '2026-08-05', time: '6:00 PM', location: 'Flat 402, Sunrise Apartments, Andheri West',
    price: 99, status: 'cancelled', createdAt: '2026-08-04', image: null,
  },
]

export const PROVIDER_JOBS = [
  {
    id: 'j2001', customerName: 'Aisha Khan', customerAvatar: 'https://i.pravatar.cc/150?img=25',
    category: 'cleaning', serviceName: 'Full Home Cleaning',
    description: '3BHK full cleaning before housewarming', date: '2026-08-29', time: '9:00 AM',
    location: 'Palm Heights, Bandra West', price: 149, status: 'in_progress', earnings: 149,
  },
  {
    id: 'j2002', customerName: 'Manish Joshi', customerAvatar: 'https://i.pravatar.cc/150?img=20',
    category: 'cleaning', serviceName: 'Kitchen Deep Clean',
    description: 'Grease removal and chimney cleaning', date: '2026-08-30', time: '2:00 PM',
    location: 'Hill Road, Bandra', price: 149, status: 'accepted', earnings: 149,
  },
  {
    id: 'j2003', customerName: 'Riya Malhotra', customerAvatar: 'https://i.pravatar.cc/150?img=23',
    category: 'cleaning', serviceName: 'Sofa Shampoo',
    description: '3-seater sofa dry wash', date: '2026-08-20', time: '5:00 PM',
    location: 'Carter Road, Bandra', price: 149, status: 'completed', earnings: 149, rating: 5,
  },
  {
    id: 'j2004', customerName: 'Karan Arora', customerAvatar: 'https://i.pravatar.cc/150?img=18',
    category: 'cleaning', serviceName: 'Move-out Cleaning',
    description: 'Full cleaning after vacating', date: '2026-08-12', time: '10:00 AM',
    location: 'Linking Road, Bandra', price: 149, status: 'completed', earnings: 149, rating: 4,
  },
]

export const NOTIFICATIONS = [
  { id: 'n1', type: 'request_accepted', title: 'Request Accepted', message: 'Sunita Devi accepted your Deep Home Cleaning request.', time: '2 hours ago', read: false },
  { id: 'n2', type: 'new_request', title: 'New Service Request', message: 'Aisha Khan requested Full Home Cleaning for Aug 29.', time: '5 hours ago', read: false },
  { id: 'n3', type: 'review', title: 'New Review', message: 'Riya Malhotra left you a 5-star review.', time: '1 day ago', read: true },
  { id: 'n4', type: 'completed', title: 'Job Completed', message: 'Bathroom Leakage Fix has been marked completed.', time: '2 days ago', read: true },
  { id: 'n5', type: 'upcoming', title: 'Upcoming Service', message: 'AC Servicing is scheduled for Sep 2 at 4:00 PM.', time: '3 days ago', read: true },
]

export const ADMIN_USERS = [
  { id: 'u1', name: 'Aditya Verma', email: 'aditya@example.com', role: 'customer', joined: '2026-07-12', status: 'active', bookings: 5 },
  { id: 'u2', name: 'Aisha Khan', email: 'aisha@example.com', role: 'customer', joined: '2026-07-20', status: 'active', bookings: 3 },
  { id: 'u3', name: 'Rohit Sinha', email: 'rohit@example.com', role: 'customer', joined: '2026-06-15', status: 'active', bookings: 8 },
  { id: 'u4', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'provider', joined: '2026-05-01', status: 'active', verified: true, jobs: 312 },
  { id: 'u5', name: 'Sunita Devi', email: 'sunita@example.com', role: 'provider', joined: '2026-05-10', status: 'active', verified: true, jobs: 480 },
  { id: 'u6', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'provider', joined: '2026-08-01', status: 'pending', verified: false, jobs: 8 },
  { id: 'u7', name: 'Farhan Qureshi', email: 'farhan@example.com', role: 'provider', joined: '2026-08-15', status: 'pending', verified: false, jobs: 2 },
  { id: 'u8', name: 'Karan Arora', email: 'karan@example.com', role: 'customer', joined: '2026-07-28', status: 'suspended', bookings: 1 },
]

export const ADMIN_REQUESTS = [
  { id: 'RQ-3041', customer: 'Aditya Verma', provider: 'Sunita Devi', service: 'Deep Home Cleaning', date: '2026-08-30', status: 'accepted', amount: 149 },
  { id: 'RQ-3042', customer: 'Aditya Verma', provider: 'Suresh Patil', service: 'AC Servicing', date: '2026-09-02', status: 'pending', amount: 269 },
  { id: 'RQ-3043', customer: 'Aisha Khan', provider: 'Sunita Devi', service: 'Full Home Cleaning', date: '2026-08-29', status: 'in_progress', amount: 149 },
  { id: 'RQ-3044', customer: 'Rohit Sinha', provider: 'Lakshmi Rao', service: 'Terrace Garden Setup', date: '2026-08-25', status: 'completed', amount: 159 },
  { id: 'RQ-3045', customer: 'Karan Arora', provider: 'Vikram Singh', service: 'Door Repair', date: '2026-08-22', status: 'cancelled', amount: 299 },
  { id: 'RQ-3046', customer: 'Manish Joshi', provider: 'Sunita Devi', service: 'Kitchen Deep Clean', date: '2026-08-30', status: 'accepted', amount: 149 },
]

export const COMPLAINTS = [
  { id: 'C-101', user: 'Karan Arora', against: 'Vikram Singh', reason: 'No-show at scheduled time', date: '2026-08-22', status: 'open' },
  { id: 'C-102', user: 'Rohit Sinha', against: 'Arjun Mehta', reason: 'Incomplete painting work', date: '2026-08-18', status: 'resolved' },
  { id: 'C-103', user: 'Aisha Khan', against: 'Sunita Devi', reason: 'Pricing dispute', date: '2026-08-24', status: 'open' },
]

export const PLATFORM_STATS = {
  totalUsers: 4827,
  totalProviders: 1284,
  activeRequests: 156,
  completedServices: 18420,
  revenue: 2840000,
  avgRating: 4.7,
}

export const EARNINGS_DATA = [
  { month: 'Mar', amount: 28400 }, { month: 'Apr', amount: 32100 },
  { month: 'May', amount: 38900 }, { month: 'Jun', amount: 41200 },
  { month: 'Jul', amount: 47600 }, { month: 'Aug', amount: 52300 },
]

export const ANALYTICS_DATA = {
  monthlyRevenue: [
    { month: 'Mar', amount: 210000 }, { month: 'Apr', amount: 245000 },
    { month: 'May', amount: 298000 }, { month: 'Jun', amount: 312000 },
    { month: 'Jul', amount: 358000 }, { month: 'Aug', amount: 421000 },
  ],
  categoryDistribution: [
    { name: 'Cleaning', value: 28, color: '#3b82f6' },
    { name: 'Plumbing', value: 18, color: '#f59e0b' },
    { name: 'Electrical', value: 15, color: '#6366f1' },
    { name: 'Cooking', value: 12, color: '#fbbf24' },
    { name: 'Appliance', value: 10, color: '#10b981' },
    { name: 'Others', value: 17, color: '#94a3b8' },
  ],
  userGrowth: [
    { month: 'Mar', users: 2100 }, { month: 'Apr', users: 2650 },
    { month: 'May', users: 3120 }, { month: 'Jun', users: 3580 },
    { month: 'Jul', users: 4210 }, { month: 'Aug', users: 4827 },
  ],
}

export const TESTIMONIALS = [
  { id: 't1', name: 'Ananya Desai', role: 'Customer, Andheri', avatar: 'https://i.pravatar.cc/150?img=24', rating: 5, text: 'Co-Serve helped me find a reliable plumber within minutes. The whole process was transparent and the worker was professional.' },
  { id: 't2', name: 'Ramesh Patel', role: 'Gig Worker, Dadar', avatar: 'https://i.pravatar.cc/150?img=17', rating: 5, text: 'As a carpenter, Co-Serve gave me a steady stream of customers near my area. My earnings have doubled in 3 months.' },
  { id: 't3', name: 'Fatima Sheikh', role: 'Customer, Bandra', avatar: 'https://i.pravatar.cc/150?img=29', rating: 5, text: 'I booked elderly assistance for my mother. The caregiver was kind and trained. Peace of mind for our family.' },
]

export const CURRENT_USER = {
  id: 'c1', name: 'Aditya Verma', email: 'aditya@example.com',
  avatar: 'https://i.pravatar.cc/150?img=18', role: 'customer',
  phone: '+91 98765 43210', location: 'Andheri West, Mumbai',
  joined: '2026-07-12',
}

export const CURRENT_PROVIDER = {
  ...PROVIDERS.find(p => p.id === 'p2'),
  email: 'sunita@example.com', phone: '+91 98123 45678',
}

export const CURRENT_ADMIN = {
  id: 'a1', name: 'Admin User', email: 'admin@coserve.in',
  avatar: 'https://i.pravatar.cc/150?img=68', role: 'admin',
}

export function matchProviders({ category, location, maxDistance = 10 }) {
  return PROVIDERS
    .filter(p => p.category === category && p.distance <= maxDistance)
    .map(p => {
      const distanceScore = Math.max(0, 100 - p.distance * 8)
      const ratingScore = (p.rating / 5) * 100
      const availabilityScore = p.available ? 100 : 40
      const experienceScore = Math.min(100, p.experience * 7)
      const workloadScore = Math.max(0, 100 - p.activeJobs * 20)
      const match = Math.round(
        distanceScore * 0.3 + ratingScore * 0.25 + availabilityScore * 0.2 +
        experienceScore * 0.15 + workloadScore * 0.1
      )
      return { ...p, match, scores: { distanceScore, ratingScore, availabilityScore, experienceScore, workloadScore } }
    })
    .sort((a, b) => b.match - a.match)
}

export function getProvider(id) { return PROVIDERS.find(p => p.id === id) }
export function getReviewsFor(id) { return REVIEWS.filter(r => r.providerId === id) }
export function getCategory(id) { return SERVICE_CATEGORIES.find(c => c.id === id) }
export function getBooking(id) { return BOOKINGS.find(b => b.id === id) }
