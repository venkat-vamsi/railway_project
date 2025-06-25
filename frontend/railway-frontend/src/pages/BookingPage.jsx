import { useState } from 'react';
import { api } from '../api/apiService.js';
import { ArrowRightIcon, MinusIcon, PlusIcon } from '../components/Icons.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Your Razorpay Test Key ID
const RAZORPAY_KEY_ID = 'rzp_test_P20DWyr9G0C9Yj';

export const BookingPage = ({ train, journeyDate, onBookingSuccess, onGoBack }) => {
    const { user } = useAuth();
    const [passengers, setPassengers] = useState([{ name: user ? user.name : '', age: '30', gender: 'Male' }]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addPassenger = () => setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
    const removePassenger = (index) => setPassengers(passengers.filter((_, i) => i !== index));
    const handlePassengerChange = (index, field, value) => {
        const newP = [...passengers];
        newP[index][field] = value;
        setPassengers(newP);
    };

    const initiatePayment = async () => {
        if (!user) {
            setError("You must be logged in to book.");
            return;
        }
        setLoading(true);
        setError(null);

        const initialBookingData = {
            user: { id: user.id },
            train: { id: train.id },
            journeyDate,
            numberOfSeats: passengers.length,
            passengers,
        };

        try {
            // Step 1: Create a PENDING booking and get a Razorpay order from our backend
            const orderResponse = await api.createPaymentOrder(initialBookingData);
            const order = JSON.parse(orderResponse);

            // Step 2: Configure Razorpay Checkout
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Rail-X Booking",
                description: `Ticket for ${train.trainName}`,
                order_id: order.id,
                handler: async function (response) {
                    // This function is called after a successful payment
                    const bookingId = order.receipt.replace("booking_rcpt_", "");
                    const verificationData = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        booking_id: bookingId
                    };
                    try {
                        // Step 3: Verify the payment on our backend
                        const verificationResult = await api.verifyPayment(verificationData);
                        if (verificationResult.status === 'success') {
                            alert("Booking and Payment Successful!");
                            onBookingSuccess(); // This will navigate the user back home
                        } else {
                            throw new Error("Payment verification failed on server.");
                        }
                    } catch (verificationError) {
                        alert("Payment successful but verification failed. Please contact support.");
                        setError("Failed to verify your payment.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#0d9488", // Teal color for the payment modal
                },
            };

            // Step 4: Open the Razorpay payment modal
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
                // In a real app, you would call a backend endpoint here to revert the seat count.
                setError("Payment Failed. Please try again.");
            });
            rzp.open();

        } catch (err) {
            setError("Failed to create payment order. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="aurora-background text-white min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <button onClick={onGoBack} className="mb-8 font-semibold flex items-center hover:text-teal-300 transition-colors">
                    <ArrowRightIcon className="transform rotate-180 mr-2"/>Back to Results
                </button>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-8">
                        <h2 className="text-3xl font-bold mb-8">Passenger Information</h2>
                        {/* The passenger form JSX is unchanged */}
                        {passengers.map((p, index) => (<div key={index} className="grid sm:grid-cols-10 gap-4 mb-4 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10"><div className="sm:col-span-4"><label className="text-sm text-gray-300">Name</label><input type="text" value={p.name} onChange={e => handlePassengerChange(index, 'name', e.target.value)} className="mt-1 block w-full bg-white bg-opacity-10 border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400" required/></div><div className="sm:col-span-2"><label className="text-sm text-gray-300">Age</label><input type="number" value={p.age} onChange={e => handlePassengerChange(index, 'age', e.target.value)} className="mt-1 block w-full bg-white bg-opacity-10 border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400" required/></div><div className="sm:col-span-4"><label className="text-sm text-gray-300">Gender</label><select value={p.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} className="mt-1 block w-full bg-gray-900 border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"><option>Male</option><option>Female</option><option>Other</option></select></div>{passengers.length > 1 && <div className="sm:col-span-10 flex justify-end"><button type="button" onClick={() => removePassenger(index)} className="text-red-400 hover:text-red-300 font-semibold flex items-center text-sm"><MinusIcon className="w-4 h-4 mr-1"/>Remove</button></div>}</div>))}
                        <button type="button" onClick={addPassenger} className="flex items-center text-teal-300 font-semibold hover:text-teal-200 my-6"><PlusIcon className="mr-2"/>Add Passenger</button>
                        {error && <p className="text-red-400 mb-4">{error}</p>}
                        <button onClick={initiatePayment} disabled={loading} className="w-full font-bold py-3 rounded-lg bg-teal-400 text-indigo-900 hover:bg-teal-300 transition-all transform hover:scale-105 disabled:bg-gray-500">
                           {loading ? 'Processing...' : `Proceed to Pay ₹${train.fare * passengers.length}`}
                        </button>
                    </div>
                    {/* The summary card JSX is unchanged */}
                    <div className="lg:col-span-1"><div className="glass-card p-6 sticky top-8"><h3 className="text-xl font-bold border-b border-white border-opacity-20 pb-4 mb-4">Journey Summary</h3><div className="space-y-4 text-gray-300"><div className="flex justify-between"><span>Train:</span><span className="font-semibold text-white">{train.trainName}</span></div><div className="flex justify-between"><span>From:</span><span className="font-semibold text-white">{train.source}</span></div><div className="flex justify-between"><span>To:</span><span className="font-semibold text-white">{train.destination}</span></div><div className="flex justify-between"><span>Date:</span><span className="font-semibold text-white">{new Date(journeyDate).toDateString()}</span></div><div className="border-t border-white border-opacity-20 my-4"></div><div className="flex justify-between"><span>Passengers:</span><span className="font-semibold text-white">{passengers.length}</span></div><div className="flex justify-between text-2xl font-bold text-white"><span>Total:</span><span>₹{train.fare * passengers.length}</span></div></div></div></div>
                </div>
            </div>
        </div>
    );
};
