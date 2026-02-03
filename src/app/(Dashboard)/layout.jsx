import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ClientProvider } from "@/context/clientContext";

export default function DashboardLayout({ children }) {
  
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        
        {/* Navbar */}
        <header className="h-16">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {/* Card-like container */}
          <div className="bg-blue-100/50 rounded-xl shadow-lg p-6 min-h-full">
          <ClientProvider>
            <Header />
            {children}
          </ClientProvider>
          </div>
        </main>

      </div>
    </div>
  );
}
