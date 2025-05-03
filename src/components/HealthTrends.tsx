
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, TrendingUp, TrendingDown, Loader } from 'lucide-react';
import { useHealthTrends } from '../hooks/use-health-trends';
import { symptoms } from '../data/symptoms';

type HealthTrendsProps = {
  onClose: () => void;
};

const outcomeToValue = {
  'success': 1,
  'warning': 2,
  'danger': 3
};

const HealthTrends = ({ onClose }: HealthTrendsProps) => {
  const { 
    symptomHistory, 
    moodHistory, 
    analyzeSymptomTrends,
    isLoaded 
  } = useHealthTrends();

  const trends = analyzeSymptomTrends();
  
  // Format data for charts
  const prepareSymptomData = () => {
    if (symptomHistory.length === 0) return [];
    
    // Group entries by date (simple version - just the date part)
    const entriesByDate = symptomHistory.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date][entry.symptomId] = outcomeToValue[entry.outcome];
      return acc;
    }, {} as Record<string, Record<string, number>>);
    
    // Convert to array format for Recharts
    return Object.entries(entriesByDate).map(([date, symptoms]) => ({
      date,
      ...symptoms
    }));
  };
  
  const prepareMoodData = () => {
    if (moodHistory.length === 0) return [];
    
    return moodHistory.map(entry => {
      const moodValue = entry.mood === 'very-low' ? 4 : 
                       entry.mood === 'low' ? 3 :
                       entry.mood === 'neutral' ? 2 :
                       entry.mood === 'good' ? 1 : 0;
                       
      const anxietyValue = entry.anxiety === 'often' ? 3 :
                           entry.anxiety === 'sometimes' ? 2 :
                           entry.anxiety === 'rarely' ? 1 : 0;
                           
      const sleepValue = entry.sleep === 'significant' ? 3 :
                         entry.sleep === 'some' ? 2 :
                         entry.sleep === 'little' ? 1 : 0;
                         
      return {
        date: new Date(entry.timestamp).toLocaleDateString(),
        mood: moodValue,
        anxiety: anxietyValue,
        sleep: sleepValue,
        outcome: outcomeToValue[entry.outcome]
      };
    });
  };
  
  const symptomData = prepareSymptomData();
  const moodData = prepareMoodData();
  
  // Get symptom name from id
  const getSymptomName = (id: string) => {
    const symptom = symptoms.find(s => s.id === id);
    return symptom ? symptom.name : id;
  };
  
  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'improving': return '✅';
      case 'worsening': return '⚠️';
      case 'persistent': return '📊';
      default: return '📈';
    }
  };

  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
      >
        <div className="bg-white rounded-xl max-w-2xl w-full p-6 flex flex-col items-center justify-center h-96">
          <Loader className="animate-spin h-10 w-10 text-mint mb-4" />
          <p className="text-lg">Loading your health data...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <TrendingUp size={20} className="mr-2 text-mint" />
            Your Health Patterns
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {symptomHistory.length === 0 && moodHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">No data yet</h3>
            <p className="text-gray-600 mb-6">
              Check more symptoms or track your mood to start seeing patterns in your health journey.
            </p>
            <Button onClick={onClose} className="bg-mint hover:bg-mint/80">
              <ChevronLeft size={16} className="mr-1" />
              Go Back
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Symptom Insights */}
            {trends && trends.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {trends.map((trend, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-xl mr-2">{getStatusEmoji(trend.status)}</span>
                        <div>
                          <p className="font-medium">{getSymptomName(trend.symptomId)}</p>
                          <p className="text-sm text-gray-600">
                            {trend.status === 'improving' 
                              ? 'Showing improvement over time' 
                              : trend.status === 'worsening'
                              ? 'May be getting worse - consider a check-up'
                              : trend.status === 'persistent'
                              ? 'This has been consistent - might be worth discussing with a doctor'
                              : 'Shows some fluctuation - keep monitoring'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Physical Symptoms Chart */}
            {symptomHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Physical Symptoms Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={symptomData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 4]} ticks={[1, 2, 3]} 
                        tickFormatter={(value) => {
                          switch(value) {
                            case 1: return 'Good';
                            case 2: return 'Caution';
                            case 3: return 'Warning';
                            default: return '';
                          }
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      {symptoms.filter(s => symptomData.some(d => d[s.id])).map((symptom, index) => (
                        <Line 
                          key={symptom.id}
                          type="monotone" 
                          dataKey={symptom.id} 
                          name={symptom.name}
                          stroke={['#4ade80', '#60a5fa', '#f43f5e', '#8b5cf6', '#fbbf24'][index % 5]} 
                          activeDot={{ r: 8 }} 
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
            
            {/* Mental Health Chart */}
            {moodHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mental Wellness Patterns</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 4]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        name="Mood" 
                        stroke="#f43f5e" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        name="Anxiety" 
                        stroke="#8b5cf6" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        name="Sleep Issues" 
                        stroke="#60a5fa" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
            
            <div className="flex justify-end pt-4">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HealthTrends;
