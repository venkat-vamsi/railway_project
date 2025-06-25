import { useState } from 'react';
import { AuthForm } from './components/AuthForm.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Modal } from './components/Modal.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx';
import { BookingPage } from './pages/BookingPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { SearchResultsPage } from './pages/SearchResultsPage.jsx';

function AppContent() {
    const [page, setPage] = useState('home');
    const [searchParams, setSearchParams] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const { login, register, isAdmin } = useAuth();

    const handleSearch = (params) => { setSearchParams(params); setPage('searchResults'); };
    const handleBook = (train) => { setSelectedTrain(train); setPage('booking'); };
    const handleAdminClick = () => { if (isAdmin) setPage('admin'); };
    const handleHomeClick = () => setPage('home');
    
    // NEW function to handle successful booking navigation
    const handleBookingSuccess = () => {
        setPage('home'); // Or navigate to a 'My Bookings' page
    };

    const handleAuthSubmit = async (authAction, ...args) => {
        setAuthLoading(true);
        setAuthError(null);
        try {
            await authAction(...args);
            setShowLogin(false);
            setShowRegister(false);
        } catch (error) {
            setAuthError(error.message || 'An error occurred.');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLoginSubmit = (email, password) => handleAuthSubmit(login, email, password);
    const handleRegisterSubmit = (name, email, password) => handleAuthSubmit(register, name, email, password);

    const renderPage = () => {
        switch (page) {
            case 'searchResults': 
                return <SearchResultsPage searchParams={searchParams} onBook={handleBook} onGoBack={() => setPage('home')} />;
            case 'booking': 
                return <BookingPage 
                            train={selectedTrain} 
                            journeyDate={searchParams.date} 
                            onBookingSuccess={handleBookingSuccess} 
                            onGoBack={() => setPage('searchResults')} 
                        />;
            case 'admin': 
                return isAdmin ? <AdminDashboardPage /> : <HomePage onSearch={handleSearch}/>;
            default: 
                return <HomePage onSearch={handleSearch} />;
        }
    };

    return (
        <div className="relative min-h-screen">
            <Header
                onLoginClick={() => {setShowLogin(true); setAuthError(null);}}
                onRegisterClick={() => {setShowRegister(true); setAuthError(null);}}
                onAdminClick={handleAdminClick}
                onHomeClick={handleHomeClick}
            />
            <main className="flex-grow">{renderPage()}</main>
            <Footer />
            {showLogin && <Modal onClose={() => setShowLogin(false)}><AuthForm isLogin={true} onSubmit={handleLoginSubmit} onSwitchMode={() => { setShowLogin(false); setShowRegister(true); setAuthError(null);}} error={authError} loading={authLoading} /></Modal>}
            {showRegister && <Modal onClose={() => setShowRegister(false)}><AuthForm isLogin={false} onSubmit={handleRegisterSubmit} onSwitchMode={() => { setShowRegister(false); setShowLogin(true); setAuthError(null);}} error={authError} loading={authLoading} /></Modal>}
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
