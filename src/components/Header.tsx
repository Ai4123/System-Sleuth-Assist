const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Symptom Sleuth Assist</h1>
          </div>
          <p className="text-gray-600">Your AI-powered healthcare assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
