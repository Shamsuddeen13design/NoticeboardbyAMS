import { useState } from 'react';

const AnnouncementCard = ({ announcement, onSummarize }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');

  const categoryColors = {
    Academic: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    Events: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    General: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  };

  const categoryBgGradient = {
    Academic: 'from-blue-500 to-blue-600',
    Events: 'from-green-500 to-green-600',
    General: 'from-amber-500 to-amber-600',
  };

  const handleSummarize = async () => {
    if (!summary) {
      const generatedSummary = await onSummarize(announcement.content);
      setSummary(generatedSummary);
    }
    setShowSummary(!showSummary);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="group card border-l-4 border-indigo-500 hover:-translate-y-1 cursor-default">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            {announcement.title}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[announcement.category]} whitespace-nowrap`}>
          {announcement.category}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-base">
        {announcement.content}
      </p>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          📅 {formatDate(announcement.timestamp)}
        </span>
        {announcement.content.length > 200 && (
          <button
            onClick={handleSummarize}
            className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
          >
            {showSummary ? '✕ Hide' : '✨ Summarize'}
          </button>
        )}
      </div>
      
      {showSummary && summary && (
        <div className="mt-5 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-indigo-500 animate-slideIn">
          <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-3 flex items-center gap-2">
            <span>🎯</span> Key Points
          </h4>
          <ul className="text-indigo-800 dark:text-indigo-200 space-y-2">
            {summary.split('\n').filter(point => point.trim()).map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-500 font-bold mt-0.5">•</span>
                <span>{point.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;