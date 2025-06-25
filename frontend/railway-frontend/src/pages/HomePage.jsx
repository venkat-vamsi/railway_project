import { useState } from 'react';
import { CalendarIcon, LocationPinIcon, SwapIcon } from '../components/Icons.jsx';

export const HomePage = ({ onSearch }) => {
    const [from, setFrom] = useState('Mumbai');
    const [to, setTo] = useState('Delhi');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const handleSearch = (e) => { e.preventDefault(); onSearch({ from, to, date }); };
    const swapLocations = () => { setFrom(to); setTo(from); };

    return (
        <div className="aurora-background text-white min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-4 animate-fade-in-down">
                    The Future of Rail Travel
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-12 animate-fade-in-down" style={{animationDelay: '0.3s'}}>
                    Find your next journey with unparalleled ease and speed.
                </p>
                <div className="glass-card p-6 md:p-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-2 relative">
                            <label className="block text-sm font-medium text-gray-300 text-left mb-2">Origin</label>
                            <LocationPinIcon className="absolute left-3 top-11 h-5 w-5 text-gray-400"/>
                            <input type="text" value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                        </div>
                        <div className="flex items-center justify-center pb-3">
                            <button type="button" onClick={swapLocations} className="p-3 rounded-full border border-white border-opacity-20 text-white hover:bg-white hover:bg-opacity-10 transition-transform duration-300 hover:rotate-180">
                                <SwapIcon />
                            </button>
                        </div>
                        <div className="md:col-span-2 relative">
                            <label className="block text-sm font-medium text-gray-300 text-left mb-2">Destination</label>
                            <LocationPinIcon className="absolute left-3 top-11 h-5 w-5 text-gray-400"/>
                            <input type="text" value={to} onChange={e => setTo(e.target.value)} className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                        </div>
                        <div className="md:col-span-3 relative">
                            <label className="block text-sm font-medium text-gray-300 text-left mb-2">Date</label>
                            <CalendarIcon className="absolute left-3 top-11 h-5 w-5 text-gray-400"/>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-400" required />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="w-full font-bold py-3 px-4 rounded-lg bg-teal-400 text-indigo-900 hover:bg-teal-300 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50">
                                Find Trains
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
