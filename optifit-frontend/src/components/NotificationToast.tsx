import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type?: 'info' | 'warning' | 'success';
    show: boolean;
    onClose: () => void;
}

export default function NotificationToast({ message, type = 'info', show, onClose }: ToastProps) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
        if (show) {
            // Also try browser notification
            if (Notification.permission === 'granted') {
                new Notification('OptiFit Alert', { body: message });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission();
            }

            const timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, message, onClose]);

    if (!visible) return null;

    const bgColors = {
        info: 'bg-blue-500/90',
        warning: 'bg-orange-500/90',
        success: 'bg-emerald-500/90'
    };

    return (
        <div className={`fixed top-24 right-6 z-50 transform transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className={`${bgColors[type]} backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm border border-white/20`}>
                <div className="bg-white/20 p-2 rounded-full">
                    {type === 'warning' && <span className="text-xl">⚠️</span>}
                    {type === 'success' && <span className="text-xl">✅</span>}
                    {type === 'info' && <span className="text-xl">💡</span>}
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider opacity-90">{type}</h4>
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button onClick={() => setVisible(false)} className="text-white/50 hover:text-white ml-2">✕</button>
            </div>
        </div>
    );
}
