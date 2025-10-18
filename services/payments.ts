
export type Payment = {
    id: number;
    service: string;
    amount: number;
    dueDate: string; 
    currency?: string;
    icon?: any;
    status?: 'normal' | 'postponed' | 'pastDue';
  };
  
  export const MOCK_PAYMENTS: Payment[] = [
    { id: 3, service: 'Spotify', amount: 14.99, dueDate: '2025-10-18', currency: 'USD', icon: require('../assets/spotify.png') },
    { id: 1, service: 'Netflix', amount: 29.99, dueDate: '2025-10-19', currency: 'USD', icon: require('../assets/netflix.png') },
    { id: 2, service: 'Apple One', amount: 9.99, dueDate: '2025-11-01', currency: 'USD', icon: require('../assets/apple.png') },
    { id: 2, service: 'Google One', amount: 24.99, dueDate: '2025-11-01', currency: 'USD', icon: require('../assets/google.png') }
];
  
  // helper to clone (simulate reload)
  export function loadMockPayments() {
    // return a shallow clone to simulate fresh fetch
    return Promise.resolve(MOCK_PAYMENTS.map((p) => ({ ...p })));
  }
  