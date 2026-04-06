import { useState, useEffect } from 'react';
import AdminForm from './components/AdminForm';
import SearchFilter from './components/SearchFilter';
import AnnouncementFeed from './components/AnnouncementFeed';
import { summarizeContent, loadAnnouncements, saveAnnouncements } from './utils/summarizer';

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load announcements from localStorage on mount
  useEffect(() => {
    const loadedAnnouncements = loadAnnouncements();
    setAnnouncements(loadedAnnouncements);
  }, []);

  // Auto-refresh: check for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentStored = loadAnnouncements();
      if (JSON.stringify(currentStored) !== JSON.stringify(announcements)) {
        setAnnouncements(currentStored);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [announcements]);

  const handleAddAnnouncement = (newAnnouncement) => {
    const announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      timestamp: new Date().toISOString(),
    };
    
    const updatedAnnouncements = [announcement, ...announcements];
    setAnnouncements(updatedAnnouncements);
    saveAnnouncements(updatedAnnouncements);
  };

  const handleSummarize = async (content) => {
    return await summarizeContent(content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 animate-fadeIn">
          <div className="mb-4">
            <span className="text-5xl">Noticeboard</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Virtual Noticeboard — by AMS
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
            ✨ Stay updated with the latest announcements
          </p>
        </header>

        <AdminForm onAddAnnouncement={handleAddAnnouncement} />
        
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <AnnouncementFeed
          announcements={announcements}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSummarize={handleSummarize}
        />
      </div>
    </div>
  );
}

export default App;
