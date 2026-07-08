'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui';
import { initialProfileData } from '../mocks/mocks';

export function PublicProfileCard() {
  const [profile, setProfile] = useState(initialProfileData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <Card 
      variant="default" 
      className="p-6 md:p-8 bg-[#0c1328]/50 border border-white/5 shadow-2xl relative overflow-hidden"
    >
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[70px] pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Card Header title */}
        <div className="space-y-1 select-none">
          <h2 className="text-xl font-bold text-white tracking-tight">Public Profile</h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        {/* Layout container */}
        <div className="flex flex-col md:flex-row gap-8 items-start pt-2">
          
          {/* Left Avatar upload widget */}
          <div className="flex flex-col items-center gap-3 shrink-0 select-none mx-auto md:mx-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/10 relative shadow-md">
              <Image 
                src={profile.avatarUrl || '/developer_avatar.png'} 
                alt="User Avatar"
                fill
                priority
                className="object-cover"
              />
            </div>
            <button
              type="button"
              className="text-[11px] font-black tracking-wider text-accent-cyan hover:underline uppercase transition-all cursor-pointer"
            >
              Change Avatar
            </button>
          </div>

          {/* Right Inputs list */}
          <div className="flex-1 w-full space-y-4">
            
            {/* First & Last Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block select-none">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full h-11 px-4 bg-[#070b16] border border-purple-950/60 focus:border-primary/45 text-xs font-bold text-white rounded-xl outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block select-none">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full h-11 px-4 bg-[#070b16] border border-purple-950/60 focus:border-primary/45 text-xs font-bold text-white rounded-xl outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block select-none">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-11 px-4 bg-[#070b16] border border-purple-950/60 focus:border-primary/45 text-xs font-bold text-white rounded-xl outline-none transition-all"
                required
              />
            </div>

            {/* Professional Role */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block select-none">
                Professional Role
              </label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full h-11 px-4 bg-[#070b16] border border-purple-950/60 focus:border-primary/45 text-xs font-bold text-white rounded-xl outline-none transition-all"
                required
              />
            </div>

            {/* Save Changes button footer row */}
            <div className="flex justify-end pt-4 select-none">
              <button
                type="submit"
                className="px-6 h-11 text-xs font-black uppercase tracking-wider text-black bg-[#8BFF7D] rounded-xl hover:brightness-110 shadow-[0_4px_20px_rgba(139,255,125,0.25)] transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>

          </div>

        </div>

      </form>
    </Card>
  );
}
