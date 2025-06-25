
export const TrainCard = ({ train, onBook }) => (
    <div className="glass-card text-white p-6 transition-all duration-300 hover:border-teal-400 hover:border-opacity-50 hover:-translate-y-2 group">
        <div className="flex justify-between items-start">
            <div><h3 className="text-xl font-bold">{train.trainName}</h3><p className="text-sm text-gray-400">#{train.trainNumber}</p></div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30">{train.totalSeats} Seats Left</div>
        </div>
        <div className="my-6 flex items-center justify-between text-center">
            <div><p className="text-2xl font-light tracking-wider">{train.departureTime.substring(0,5)}</p><p className="text-sm text-gray-400">{train.source}</p></div>
            <div className="flex-grow flex items-center mx-2 text-gray-500"><div className="w-full h-px bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent"></div></div>
            <div className="text-2xl font-light tracking-wider">{train.arrivalTime.substring(0,5)}</div>
            <div className="flex-grow flex items-center mx-2 text-gray-500"><div className="w-full h-px bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent"></div></div>
            <div><p className="text-sm text-gray-400">{train.destination}</p></div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-violet-400">₹{train.fare}</p>
            <button onClick={() => onBook(train)} className="font-bold py-2 px-6 rounded-lg bg-teal-400 text-indigo-900 hover:bg-teal-300 transition-colors transform group-hover:scale-105">Book</button>
        </div>
    </div>
);
