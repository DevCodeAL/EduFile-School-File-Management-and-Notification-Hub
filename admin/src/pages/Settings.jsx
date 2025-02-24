function Settings() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Settings</h1>
          <div className="flex flex-col items-center space-x-4">
            <div className="w-12 h-12 border border-indigo-600 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/image/Leomar .jpg"
                alt="User Profile"
              />
            </div>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
          </div>
        </header>
        </main>
        </div>
    );
  }
  
  export default Settings;
  