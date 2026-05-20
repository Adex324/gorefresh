import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import background from '../assets/background.svg';

// ── Icons ────────────────────────────────────────────────────
const AccountIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const InboxIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// ── Account Panel ─────────────────────────────────────────────
const AccountPanel = ({ user }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-[#1a1a1a]">My Gorefresh Account</h2>
    {user ? (
      <div className="flex flex-col gap-4">
        {[
          { label: 'First Name', value: user.first_name },
          { label: 'Last Name',  value: user.last_name  },
          { label: 'Email',      value: user.email      },
          { label: 'Status',     value: user.is_active ? 'Active' : 'Inactive' },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1 border-b border-gray-100 pb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-medium text-[#1a1a1a]">{value}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-400">Loading your details...</p>
    )}
  </div>
);

// ── Orders Panel ──────────────────────────────────────────────
const OrdersPanel = () => {
  // replace with real data when backend endpoint is ready
  const orders = [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[#1a1a1a]">Orders</h2>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <OrdersIcon />
          <p className="text-gray-400 text-sm">You have no orders yet.</p>
          <a href="#marketplace" className="btn-orange text-sm">Shop Now</a>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl">
              <img src={order.image} alt={order.name} className="w-14 h-14 object-contain rounded-lg bg-gray-100" />
              <div className="flex-1">
                <p className="font-medium text-sm">{order.name}</p>
                <p className="text-xs text-gray-400">{order.weight}</p>
                <p className="text-sm font-bold text-[#1a1a1a] mt-1">₦{order.price}</p>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <TrashIcon />
              </button>
            </div>
          ))}
          <button className="w-full bg-[#0C850C] text-white font-semibold py-3 rounded-xl hover:bg-[#075207] transition-colors mt-2">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

// ── Inbox Panel ───────────────────────────────────────────────
const InboxPanel = () => {
  // replace with real data when backend endpoint is ready
  const messages = [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[#1a1a1a]">Inbox</h2>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <InboxIcon />
          <p className="text-gray-400 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className="p-4 border border-gray-200 rounded-xl">
              <p className="font-medium text-sm">{msg.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{msg.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Dashboard Page ────────────────────────────────────────────
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        console.log(response.data.data);
        setUser(response.data.data);
      } catch {
        navigate('/login');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const tabs = [
    { id: 'account', label: 'My Gorefresh Account', icon: <AccountIcon /> },
    { id: 'orders',  label: 'Orders',               icon: <OrdersIcon />  },
    { id: 'inbox',   label: 'Inbox',                icon: <InboxIcon />   },
  ];

  return (
    <div className="min-h-screen font-geist bg-white">
      <Navbar logo={logo} />

     <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 min-h-[calc(100vh-80px)]">

        {/* Sidebar */}
        <aside className="w-full md:w-60 flex-shrink-0 flex flex-col">
          <div className="bg-[#0C850C] rounded-2xl p-4 flex flex-col gap-2 shadow-lg flex-1">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200
                  ${activeTab === id
                    ? 'bg-[#075207] text-white'
                    : 'text-white/80 hover:bg-[#075207]/60 hover:text-white'
                  }`}
              >
                {icon}
                {label}
              </button>
            ))}

            <div className="mt-auto pt-16">
              <button
                onClick={handleLogout}
                className="w-full border border-white text-white text-sm font-medium py-2.5 rounded-full hover:bg-white hover:text-[#0C850C] transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
  className="flex-1 rounded-2xl p-6 shadow-sm bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${background})` }}
>
          {activeTab === 'account' && <AccountPanel user={user} />}
          {activeTab === 'orders'  && <OrdersPanel />}
          {activeTab === 'inbox'   && <InboxPanel />}
        </main>

      </div>
    </div>
  );
};

export default Dashboard;