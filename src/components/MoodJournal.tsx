
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

type MoodJournalProps = {
  onClose: () => void;
};

type MoodEntry = {
  date: Date;
  mood: string;
  note: string;
};

// Mood emojis and their meanings
const moods = [
  { emoji: "😔", label: "Sad" },
  { emoji: "😟", label: "Worried" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😁", label: "Great" }
];

const MoodJournal = ({ onClose }: MoodJournalProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [view, setView] = useState<'calendar' | 'entry' | 'history'>('calendar');
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const saveMoodEntry = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      date: date,
      mood: selectedMood,
      note: note
    };
    
    setEntries([...entries, newEntry]);
    setSelectedMood("");
    setNote("");
    setView('history');
  };

  const viewEntry = (entry: MoodEntry) => {
    setSelectedEntry(entry);
    setView('entry');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-600">Mood Journal</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {view === 'calendar' && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Track how you're feeling over time. Select a date to add a mood entry.
            </p>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border mx-auto"
            />
            
            <div className="mt-4 text-center">
              <Button 
                onClick={() => setView('entry')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Entry for {format(date, 'MMM d, yyyy')}
              </Button>
              
              {entries.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setView('history')}
                  className="ml-2"
                >
                  View History
                </Button>
              )}
            </div>
          </div>
        )}

        {view === 'entry' && (
          <div>
            <h4 className="font-medium mb-2">
              {selectedEntry ? 
                `Viewing entry for ${format(selectedEntry.date, 'MMM d, yyyy')}` : 
                `How are you feeling on ${format(date, 'MMM d, yyyy')}?`}
            </h4>
            
            {!selectedEntry && (
              <>
                <div className="flex justify-center gap-3 my-4">
                  {moods.map((mood) => (
                    <button 
                      key={mood.emoji}
                      onClick={() => setSelectedMood(mood.emoji)}
                      className={`text-3xl p-2 rounded-full transition-all ${selectedMood === mood.emoji ? 'bg-blue-100 scale-125' : 'hover:bg-gray-100'}`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
                
                <div className="text-center mb-4">
                  {selectedMood && (
                    <p className="text-sm font-medium text-blue-700">
                      Feeling: {moods.find(m => m.emoji === selectedMood)?.label}
                    </p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add a note (optional)
                  </label>
                  <textarea 
                    className="w-full h-20 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What's on your mind today?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setView('calendar')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={saveMoodEntry}
                    disabled={!selectedMood}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Entry
                  </Button>
                </div>
              </>
            )}
            
            {selectedEntry && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-4">
                  <div className="text-center text-5xl mb-3">
                    {selectedEntry.mood}
                  </div>
                  {selectedEntry.note && (
                    <p className="text-gray-700 bg-white p-3 rounded-md border border-gray-100">
                      "{selectedEntry.note}"
                    </p>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => setView('history')}
                  >
                    Back to History
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {view === 'history' && (
          <div>
            <h4 className="font-medium mb-2">Your Mood History</h4>
            
            {entries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No entries yet. Start by adding your mood!
              </p>
            ) : (
              <div className="divide-y max-h-80 overflow-y-auto">
                {entries.sort((a, b) => b.date.getTime() - a.date.getTime()).map((entry, index) => (
                  <div 
                    key={index}
                    onClick={() => viewEntry(entry)}
                    className="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{entry.mood}</span>
                      <div>
                        <p className="font-medium">{format(entry.date, 'MMM d, yyyy')}</p>
                        {entry.note && (
                          <p className="text-gray-500 text-xs truncate max-w-44">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-blue-500 text-sm">View</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline"
                onClick={() => setView('calendar')}
              >
                Back
              </Button>
              <Button 
                onClick={() => setView('entry')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add New Entry
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MoodJournal;
