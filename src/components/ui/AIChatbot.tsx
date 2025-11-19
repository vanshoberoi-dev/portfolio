import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Copy, Check, Sparkles, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import portfolioData from '@/data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `👋 Hi! I'm Vansh's AI assistant. I can help you learn about:

- 🎓 **Education & Experience** - Academic background and work history
- 💼 **Projects** - Featured projects and technical work
- 🛠️ **Skills & Technologies** - Technical expertise and tools
- 📧 **Contact** - How to get in touch

Feel free to ask me anything about Vansh's portfolio!`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Get current date for temporal grounding
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Build knowledge base from portfolio data
  const buildKnowledgeBase = () => {
    const kb = {
      personal: portfolioData.personal,
      experience: portfolioData.experience,
      projects: portfolioData.projects.map(p => ({
        title: p.title,
        description: p.description,
        technologies: p.technologies.map(t => t.name),
        link: p.link,
        github: p.github,
      })),
      education: portfolioData.education,
      skills: portfolioData.skills.map(s => s.name),
      technologies: portfolioData.technologies.map(t => t.name),
      leadership: portfolioData.leadership,
    };
    return JSON.stringify(kb, null, 2);
  };

  // Auto-navigate based on query
  const autoNavigate = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      setTimeout(() => navigate('/projects'), 1500);
      return '/projects';
    } else if (lowerQuery.includes('experience') || lowerQuery.includes('job')) {
      setTimeout(() => navigate('/experience'), 1500);
      return '/experience';
    } else if (lowerQuery.includes('education') || lowerQuery.includes('study')) {
      setTimeout(() => navigate('/about'), 1500);
      return '/about';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
      setTimeout(() => navigate('/contact'), 1500);
      return '/contact';
    }
    return null;
  };

  // Generate AI response using Gemini API
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Support both VITE_ prefixed (local dev) and non-prefixed (Vercel) env vars
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

      console.log('🔑 API Key present:', !!apiKey);
      console.log('🔍 Checking VITE_GEMINI_API_KEY:', !!import.meta.env.VITE_GEMINI_API_KEY);
      console.log('🔍 Checking GEMINI_API_KEY:', !!import.meta.env.GEMINI_API_KEY);

      if (!apiKey) {
        console.error('❌ Gemini API key not found');
        return "I apologize, but I'm currently unable to process your request. Please check the API configuration.";
      }

      const knowledgeBase = buildKnowledgeBase();
      const currentDate = getCurrentDate();
      const navigationHint = autoNavigate(userMessage);

      // Build context from conversation history
      const conversationContext = messages
        .slice(-4) // Last 4 messages for context
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');

      const systemPrompt = `You are Vansh Oberoi's AI assistant on his portfolio website. Today's date is ${currentDate}.

KNOWLEDGE BASE:
${knowledgeBase}

CONVERSATION HISTORY:
${conversationContext}

INSTRUCTIONS:
1. Answer questions about Vansh Oberoi using ONLY the knowledge base provided
2. Be professional, friendly, and concise
3. Use markdown formatting for better readability (bold, lists, code blocks, etc.)
4. If asked about current work, note that he's currently working at EaseMyMed (Dec 2024 - June 2025)
5. When discussing projects, highlight key technologies and achievements
6. If you don't know something, politely say so and suggest checking the relevant page
7. Use emojis sparingly for visual appeal
8. Keep responses under 200 words unless detailed explanation is needed
${navigationHint ? `9. Mention that you're navigating them to the ${navigationHint} page for more details` : ''}

USER QUESTION: ${userMessage}`;

      console.log('📤 Sending request to Gemini API...');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Response received:', data);

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.error('❌ No text in response:', data);
        throw new Error('No response from AI');
      }

      console.log('✅ AI Response:', aiResponse.substring(0, 100) + '...');
      return aiResponse;
    } catch (error) {
      console.error('❌ Error generating response:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      return "I apologize, but I encountered an error processing your request. Please try again or contact Vansh directly.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(userMessage.content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Open AI Chat"
          >
            <MessageCircle size={24} />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles size={20} />
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Powered by Gemini 2.0</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}>
                      {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>

                    {/* Message Content */}
                    <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                      }`}>
                        {message.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                li: ({ children }) => <li className="text-sm">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-primary-600 dark:text-primary-400">{children}</strong>,
                                code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">{children}</code>,
                                pre: ({ children }) => <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg overflow-x-auto text-xs">{children}</pre>,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>

                      {/* Timestamp and Copy Button */}
                      <div className="flex items-center space-x-2 mt-1 px-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {message.timestamp.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Copy message"
                          >
                            {copiedId === message.id ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex space-x-2">
                        <motion.div
                          className="w-2 h-2 bg-primary-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-primary-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end space-x-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Vansh..."
                  className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white max-h-32"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

