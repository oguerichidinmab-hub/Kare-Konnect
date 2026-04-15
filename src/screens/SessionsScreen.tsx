import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { Card, Button, Badge, Modal } from '../components/UI';
import { Calendar, Clock, MapPin, MessageCircle, Phone, Home, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Session } from '../types';

const SessionsScreen = () => {
  const { sessions, cancelSession } = useAppState();
  const [rescheduleSession, setRescheduleSession] = useState<Session | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const upcoming = sessions.filter(s => s.status === 'upcoming');
  const past = sessions.filter(s => s.status === 'completed' || s.status === 'cancelled');

  const typeIcons = {
    chat: MessageCircle,
    call: Phone,
    home: Home,
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRescheduleSession(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="pt-6 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Your Sessions</h1>
        <p className="text-gray-500 text-sm">Manage your upcoming and past support appointments.</p>
      </div>

      {/* Upcoming Sessions */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Upcoming</h2>
        {upcoming.length > 0 ? (
          upcoming.map((session) => {
            const Icon = typeIcons[session.type];
            return (
              <Card key={session.id} className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-sage-50 text-sage-500 rounded-xl flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{session.counselorName}</h3>
                      <p className="text-xs text-sage-600 font-medium capitalize">{session.type} Session</p>
                    </div>
                  </div>
                  <Badge className="bg-sage-100 text-sage-700">Confirmed</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-sage-50">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    {format(parseISO(session.date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    {session.time}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => cancelSession(session.id)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => setRescheduleSession(session)}>
                    Reschedule
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="py-12 text-center space-y-3 bg-white/50 border-dashed border-2 border-sage-100">
            <div className="w-12 h-12 bg-sage-50 text-sage-300 rounded-full flex items-center justify-center mx-auto">
              <Calendar size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-900">No upcoming sessions</p>
              <p className="text-xs text-gray-500">Book a session with a counselor to get started.</p>
            </div>
            <Link to="/counselors" className="inline-block">
              <Button size="sm" variant="outline">Browse Counselors</Button>
            </Link>
          </Card>
        )}
      </section>

      {/* Past Sessions */}
      {past.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">History</h2>
          <div className="space-y-3">
            {past.map((session) => (
              <Card key={session.id} className="flex items-center justify-between py-3 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center">
                    {React.createElement(typeIcons[session.type], { size: 16 })}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{session.counselorName}</h4>
                    <p className="text-[10px] text-gray-500">{format(parseISO(session.date), 'MMM d')}</p>
                  </div>
                </div>
                <Badge className={cn(
                  "text-[9px]",
                  session.status === 'completed' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {session.status}
                </Badge>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Help Section */}
      <Card className="bg-lavender-50 border-lavender-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-lavender-500 mt-0.5" size={18} />
          <div className="space-y-1">
            <p className="text-xs font-bold text-lavender-700">Need to change your session?</p>
            <p className="text-[10px] text-lavender-600 leading-relaxed">
              Cancellations are free up to 24 hours before the session. For home visits, please allow 48 hours for logistics.
            </p>
          </div>
        </div>
      </Card>

      {/* Reschedule Modal */}
      <Modal isOpen={!!rescheduleSession} onClose={() => setRescheduleSession(null)} title="Reschedule Session">
        {rescheduleSession && (
          <form onSubmit={handleRescheduleSubmit} className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Select a new date and time for your {rescheduleSession.type} session with {rescheduleSession.counselorName}.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">New Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required
                    type="date" 
                    className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">New Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required
                    type="time" 
                    className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full py-4 mt-4">Confirm Reschedule</Button>
          </form>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Rescheduled!</h3>
            <p className="text-sm text-gray-500">Your session has been successfully updated.</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setShowSuccess(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default SessionsScreen;
