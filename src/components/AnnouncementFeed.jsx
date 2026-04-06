import AnnouncementCard from './AnnouncementCard';

const AnnouncementFeed = ({ announcements, searchTerm, selectedCategory, onSummarize }) => {
  const filteredAnnouncements = announcements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="space-y-6 animate-fadeIn">
      {filteredAnnouncements.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4 text-5xl">📭</div>
          <p className="text-gray-600 dark:text-gray-400 text-xl font-medium mb-2">No announcements found</p>
          <p className="text-gray-500 dark:text-gray-500 text-base">Try adjusting your search or category filters</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            📍 Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''}
          </p>
          {filteredAnnouncements.map((announcement, index) => (
            <div key={announcement.id} style={{
              animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
            }}>
              <AnnouncementCard
                announcement={announcement}
                onSummarize={onSummarize}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AnnouncementFeed;