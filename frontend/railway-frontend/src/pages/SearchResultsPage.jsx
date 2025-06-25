import { useEffect, useState } from 'react';
import { api } from '../api/apiService.js';
import { ArrowRightIcon, TrainIcon } from '../components/Icons.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { TrainCard } from '../components/TrainCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const SearchResultsPage = ({ searchParams, onBook, onGoBack }) => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (searchParams.from && searchParams.to) {
            setLoading(true);
            api.searchTrains(searchParams.from, searchParams.to)
               .then(setTrains)
               .catch(err => setError(err.message))
               .finally(() => setLoading(false));
        }
    }, [searchParams]);

    const handleBookClick = (train) => {
        if (!isAuthenticated) {
            alert("Please log in to book a ticket.");
            return;
        }
        onBook(train);
    };

    return (
        <div className="aurora-background text-white min-h-screen p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="glass-card p-4 mb-8 flex flex-col sm:flex-row justify-between items-center animate-fade-in-down">
                    <button onClick={onGoBack} className="font-semibold flex items-center mb-4 sm:mb-0 hover:text-teal-300 transition-colors">
                        <ArrowRightIcon className="transform rotate-180 mr-2" />New Search
                    </button>
                    <div className="text-center sm:text-right">
                        <h2 className="text-2xl font-bold">{searchParams.from} <ArrowRightIcon className="inline-block mx-2 text-gray-500" /> {searchParams.to}</h2>
                        <p className="text-gray-400">{new Date(searchParams.date).toDateString()}</p>
                    </div>
                </div>
                {loading ? <LoadingSpinner /> : error ? <div className="text-center text-red-400 glass-card p-4">{error}</div> : trains.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                        {trains.map(train => (<TrainCard key={train.id} train={train} onBook={handleBookClick} />))}
                    </div>
                ) : (
                    <div className="text-center py-16 animate-fade-in-up">
                        <TrainIcon className="mx-auto h-20 w-20 text-gray-600" />
                        <h3 className="mt-4 text-3xl font-semibold">No Journeys Found</h3>
                        <p className="mt-2 text-gray-400">There are no scheduled trains for this route on the selected date.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
