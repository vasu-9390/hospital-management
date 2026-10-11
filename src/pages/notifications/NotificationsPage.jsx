import React from 'react';
import { useHMSData } from '../../context/DataContext';
import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useHMSData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Notifications & Alerts Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            System alerts, low stock warnings, appointment reminders, and billing receipts
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
          >
            <Trash2 className="w-4 h-4" /> Clear Notifications
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                !notif.read ? 'bg-primary-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl text-white shrink-0 mt-0.5 ${
                    notif.type === 'warning'
                      ? 'bg-amber-500'
                      : notif.type === 'success'
                      ? 'bg-emerald-500'
                      : 'bg-primary-600'
                  }`}
                >
                  {notif.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                  {notif.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                  {notif.type === 'info' && <Info className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {notif.title}
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1.5 block font-medium">
                    {notif.timestamp} • Target: {notif.targetRole}
                  </span>
                </div>
              </div>

              {!notif.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(notif.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg"
                  title="Mark as Read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-30 stroke-1" />
            <p className="text-sm font-bold text-slate-600">No active notifications</p>
            <p className="text-xs text-slate-400">You are all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};
