import { useState } from 'react';

export const AuthForm = ({ isLogin, onSubmit, onSwitchMode, error, loading }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (isLogin) { onSubmit(email, password); } else { onSubmit(name, email, password); } };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-violet-400">{isLogin ? 'Welcome Back' : 'Join the Journey'}</h2>
            {!isLogin && <div><label className="block text-sm font-medium text-gray-300">Full Name</label><input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"/></div>}
            <div><label className="block text-sm font-medium text-gray-300">Email address</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"/></div>
            <div><label className="block text-sm font-medium text-gray-300">Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-400"/></div>
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <div><button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 rounded-md font-medium text-indigo-900 bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-400 disabled:bg-gray-500 transition-all">{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</button></div>
            <div className="text-center text-sm"><button type="button" onClick={onSwitchMode} className="font-medium text-teal-300 hover:text-teal-200">{isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}</button></div>
        </form>
    );
};
