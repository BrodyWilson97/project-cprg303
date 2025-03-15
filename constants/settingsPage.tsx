import { Home } from 'lucide-react';

export default function SettingsPage() {
  const menuItems = ["Account", "Content and Display", "Privacy", "Storage", "Notifications", "About"];

  return (
    <div className="min-h-screen bg-purple-200 p-6">
      <header className="flex justify-between items-center mb-8">
        <span className="text-lg font-medium">9:30</span>
        <Home size={32} />
      </header>

      <div className="space-y-6">
        {menuItems.map((item, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">{item}</span>
              <span>&#9654;</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-10 w-full bg-purple-600 text-white py-3 rounded-2xl">
        Log Out
      </button>
    </div>
  );
}
