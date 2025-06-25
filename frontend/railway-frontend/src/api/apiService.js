export const api = {
    token: null,
    BASE_URL: 'http://localhost:8080',

    // ... your existing request, register, login methods ...
    async request(endpoint, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        try {
            const response = await fetch(url, { ...options, headers });
            const resText = await response.text();
            if (!response.ok) {
                try { throw JSON.parse(resText); } 
                catch { throw new Error(resText || `HTTP error! status: ${response.status}`); }
            }
            if (response.status === 204 || !resText) return null;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return JSON.parse(resText);
            }
            return resText;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    },
    async register(userData) { return this.request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }); },
    async login(credentials) {
        const token = await this.request('/auth/token', { method: 'POST', body: JSON.stringify(credentials) });
        this.token = token;
        return { token };
    },
    logout() { this.token = null; },
    async getUserByEmail(email) { return this.request(`/api/users/email/${email}`); },
    async searchTrains(source, destination) { return this.request(`/trains/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`); },
    
    // NOTE: This createBooking method will no longer be called directly from the frontend.
    // The new flow handles it. You can leave it here or remove it.
    async createBooking(bookingData) { return this.request('/bookings/create', { method: 'POST', body: JSON.stringify(bookingData) }); },
    
    async addTrain(trainData) { return this.request('/trains/add', { method: 'POST', body: JSON.stringify(trainData) }); },
    async getAllBookings() { return this.request('/bookings/all'); },

    // --- NEW METHODS FOR PAYMENT ---

    // This sends the initial booking data to the backend to create a pending order
    async createPaymentOrder(bookingData) {
        return this.request('/api/payment/create_order', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    // This sends the payment details back to the backend for verification
    async verifyPayment(verificationData) {
        return this.request('/api/payment/verify', {
            method: 'POST',
            body: JSON.stringify(verificationData),
        });
    }
};
