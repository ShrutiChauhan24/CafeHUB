import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom'; // If using React Router

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="flex min-h-screen bg-[#FCF9F5]">
      {/* Sidebar - Fixed width on Desktop, Hidden/Drawer on Mobile */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* If using routes, use <Outlet />, otherwise render components based on activeTab */}
        <div className="max-w-(--breakpoint-2xl) mx-auto">
           {/* Your page content (like AdminMenuItems) goes here */}
           <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;