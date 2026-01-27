import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

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
        <header className="h-16 ">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
