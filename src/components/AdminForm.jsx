import { useState } from 'react';

const AdminForm = ({ onAddAnnouncement }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      onAddAnnouncement({
        title: title.trim(),
        content: content.trim(),
        category,
      });
      setTitle('');
      setContent('');
      setCategory('General');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-8 border-t-4 border-gradient-to-r from-indigo-500 to-purple-500">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add A New Announcement</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field text-base"
            placeholder="Enter announcement title..."
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="input-field text-base resize-vertical"
            placeholder="Enter announcement content..."
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field text-base"
          >
            <option value="Academic">Academic</option>
            <option value="Events">Events</option>
            <option value="General">General</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary text-base font-bold"
        >
          {isSubmitting ? '⏳ Posting...' : '✨ Publish Announcement'}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;