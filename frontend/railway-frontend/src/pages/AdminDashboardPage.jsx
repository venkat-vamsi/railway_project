import { useEffect, useState } from 'react';
import { api } from '../api/apiService.js';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';

const AddTrainForm = () => {
    const [train, setTrain] = useState({ trainNumber: '', trainName: '', source: '', destination: '', departureTime: '10:00', arrivalTime: '18:00', totalSeats: 100, fare: 500 });
    const [message, setMessage] = useState('');
    const handleChange = (e) => setTrain({ ...train, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.addTrain(train);
            setMessage('Train added successfully!');
            setTrain({ trainNumber: '', trainName: '', source: '', destination: '', departureTime: '10:00', arrivalTime: '18:00', totalSeats: 100, fare: 500 });
        } catch (err) {
            setMessage('Failed to add train: ' + err.message);
        }
    };

    return (
        <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Add New Train Route</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.entries(train).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium capitalize text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input type={key.includes('Time') ? 'time' : key.includes('Seats') || key.includes('fare') ? 'number' : 'text'} name={key} value={value} onChange={handleChange} className="mt-1 block w-full bg-white bg-opacity-10 border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                    </div>
                ))}
                <button type="submit" className="w-full font-bold py-3 rounded-lg bg-teal-400 text-indigo-900 hover:bg-teal-300 mt-4">Add Train</button>
                {message && <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
            </form>
        </div>
    );
};

const AllBookingsView = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { api.getAllBookings().then(setBookings).finally(() => setLoading(false)); }, []);
    if (loading) return <LoadingSpinner />;
    return (
        <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">All System Bookings</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-white border-opacity-20">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Booking ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Train</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Seats</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white divide-opacity-10">
                        {bookings.map(b => (
                            <tr key={b.id} className="hover:bg-white hover:bg-opacity-5">
                                <td className="px-6 py-4">{b.id}</td>
                                {/* --- THE FIX IS HERE (using '?.') --- */}
                                <td className="px-6 py-4 whitespace-nowrap">{b.user?.email || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{b.train?.trainName || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{b.journeyDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{b.numberOfSeats}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('addTrain');
    return (
        <div className="aurora-background text-white min-h-screen p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-8">Mission Control</h2>
                <div className="flex border-b border-white border-opacity-20 mb-8">
                    <button onClick={() => setActiveTab('addTrain')} className={`py-3 px-6 font-semibold transition-colors duration-300 ${activeTab === 'addTrain' ? 'border-b-2 border-teal-400 text-teal-300' : 'text-gray-400 hover:text-white'}`}>Add Train</button>
                    <button onClick={() => setActiveTab('viewBookings')} className={`py-3 px-6 font-semibold transition-colors duration-300 ${activeTab === 'viewBookings' ? 'border-b-2 border-teal-400 text-teal-300' : 'text-gray-400 hover:text-white'}`}>View Bookings</button>
                </div>
                <div>
                    {activeTab === 'addTrain' ? <AddTrainForm /> : <AllBookingsView />}
                </div>
            </div>
        </div>
    );
};
