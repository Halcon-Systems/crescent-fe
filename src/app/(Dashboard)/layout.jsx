import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ClientProvider } from "@/context/clientContext";

export default function DashboardLayout({ children }) {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-4 left-4 z-50">
      </div>

      <aside className="fixed left-0 top-0 h-screen z-30 w-64">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="w-full lg:ml-64 transition-all duration-300">
        
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Card-like container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 min-h-[calc(100vh-100px)]">
            <ClientProvider>
              <Header />
              <div className="mt-4 md:mt-6">
                {children}
              </div>
            </ClientProvider>
          </div>
        </main>
      </div>
    </div>
  );
}