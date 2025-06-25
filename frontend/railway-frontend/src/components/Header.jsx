import { useAuth } from '../context/AuthContext.jsx';
import { ShieldIcon, TrainIcon } from './Icons.jsx';

export const Header = ({ onLoginClick, onRegisterClick, onAdminClick, onHomeClick }) => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    return (
        <header className="absolute top-0 left-0 right-0 z-40 bg-transparent text-white">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#" onClick={onHomeClick} className="flex-shrink-0 flex items-center font-bold text-3xl tracking-wider">
                           <TrainIcon /> <span className="ml-3">Rail-X</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {isAuthenticated ? (
                            <>
                                {isAdmin && <button onClick={onAdminClick} className="font-semibold flex items-center px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"><ShieldIcon className="mr-2 h-5 w-5"/>Dashboard</button> }
                                <span className="hidden sm:block">|</span>
                                <span className="font-medium hidden sm:block">Welcome, {user.name}!</span>
                                <button onClick={logout} className="font-semibold py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={onLoginClick} className="font-semibold py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">Log In</button>
                                <button onClick={onRegisterClick} className="font-semibold py-2 px-4 rounded-lg bg-teal-400 text-indigo-900 hover:bg-teal-300 transition-colors">Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};
