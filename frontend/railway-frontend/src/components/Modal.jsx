import { XIcon } from './Icons.jsx';

export const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
        <div className="glass-card w-full max-w-md mx-auto text-white" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 transition-colors"><XIcon /></button>
            <div className="p-8">{children}</div>
        </div>
    </div>
);
