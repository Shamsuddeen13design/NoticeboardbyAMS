// Simulated AI summarizer - extracts key points from content
export const summarizeContent = async (content) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple summarization logic: split into sentences and take first 3, or extract bullet points
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length <= 3) {
    return sentences.map(s => s.trim()).join('\n');
  }
  
  // Take first sentence and up to 2 more that contain important keywords
  const summaryPoints = [sentences[0].trim()];
  
  const importantKeywords = ['important', 'deadline', 'required', 'mandatory', 'announcement', 'update', 'change'];
  
  for (let i = 1; i < sentences.length && summaryPoints.length < 3; i++) {
    const sentence = sentences[i].trim();
    if (importantKeywords.some(keyword => sentence.toLowerCase().includes(keyword))) {
      summaryPoints.push(sentence);
    }
  }
  
  // If we don't have enough important sentences, add more
  for (let i = 1; i < sentences.length && summaryPoints.length < 3; i++) {
    const sentence = sentences[i].trim();
    if (!summaryPoints.includes(sentence)) {
      summaryPoints.push(sentence);
    }
  }
  
  return summaryPoints.join('\n');
};

// Local storage helpers
export const loadAnnouncements = () => {
  const stored = localStorage.getItem('announcements');
  return stored ? JSON.parse(stored) : [];
};

export const saveAnnouncements = (announcements) => {
  localStorage.setItem('announcements', JSON.stringify(announcements));
};