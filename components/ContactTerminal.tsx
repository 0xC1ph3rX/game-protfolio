import React from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    name: 'Discord',
    handle: 'Join the squad',
    url: 'https://discord.gg/cyPFQaWV2Y',
    color: 'from-[#5865F2] via-[#3B46C9] to-[#2C2F99]'
  },
  {
    name: 'Instagram',
    handle: '@studio.shodwe',
    url: '#',
    color: 'from-[#FD1D1D] via-[#F56040] to-[#FCAF45]'
  },
  {
    name: 'Pinterest',
    handle: 'Visual Boards',
    url: 'https://www.pinterest.com/pin/1044553707336108152/',
    color: 'from-[#BD081C] via-[#E60023] to-[#FF4D4D]'
  }
];

const ContactTerminal: React.FC = () => {
  const handleOpenLink = (url: string) => {
    // Simulate terminal establishing connection
    const btn = document.activeElement as HTMLButtonElement;
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = 'ESTABLISHING...';
      btn.classList.add('animate-pulse', 'bg-yellow-500', 'text-black');

      setTimeout(() => {
        btn.innerText = 'CONNECTION ESTABLISHED';
        btn.classList.remove('bg-yellow-500');
        btn.classList.add('bg-green-500');

        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove('bg-green-500', 'animate-pulse', 'text-black');
          window.open(url, '_blank');
        }, 1500);
      }, 1000);
    }
  };

  return (
    <section className="relative w-full py-24">
      <div className="container mx-auto px-6 relative hud-frame">
        <div className="hud-corner tl" />
        <div className="hud-corner tr" />
        <div className="hud-corner bl" />
        <div className="hud-corner br" />
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.4em] text-red-500 font-mono uppercase">SOCIAL_UPLINK</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-white mt-2">
            CONNECT TERMINAL
          </h2>
          <p className="text-slate-400 mt-2">Choose a channel to establish a direct link.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-[rgba(5,5,5,0.7)] backdrop-blur-[16px] border border-[rgba(255,69,0,0.3)] shadow-[0_0_40px_rgba(255,69,0,0.2)] p-8 clip-terminal overflow-hidden tilt-card cursor-target"
            >
              <div className="absolute -inset-6 bg-[rgba(255,69,0,0.15)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className={`absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-30 blur-2xl`}></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] text-slate-500 font-mono tracking-[0.3em] uppercase">
                    CHANNEL
                  </span>
                  <span className="text-red-500 text-[10px] tracking-[0.3em] uppercase">ONLINE</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-orbitron font-black uppercase tracking-tight text-white">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 mt-2 text-sm">{item.handle}</p>
                </div>

                <div className="mt-6">
                  <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                    <div className={`h-full w-1/2 bg-gradient-to-r ${item.color} animate-pulse`} />
                  </div>
                </div>

                <button
                  onClick={() => handleOpenLink(item.url)}
                  className="mt-6 w-full py-3 bg-red-600 text-black font-black tracking-[0.25em] uppercase hover:bg-red-500 transition-all cursor-target"
                >
                  OPEN LINK
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .clip-terminal {
          clip-path: polygon(2% 0%, 98% 0%, 100% 6%, 100% 94%, 98% 100%, 2% 100%, 0% 94%, 0% 6%);
        }
      `}</style>
    </section>
  );
};

export default ContactTerminal;
