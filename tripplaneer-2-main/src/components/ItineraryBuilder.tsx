
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, Trash2 } from 'lucide-react';

const ItineraryBuilder = ({ destinations }) => {
  const [itinerary, setItinerary] = useState([]);
  const [newActivity, setNewActivity] = useState({
    destination: '',
    date: '',
    time: '',
    activity: '',
    description: '',
    duration: ''
  });

  const handleAddActivity = () => {
    if (newActivity.destination && newActivity.date && newActivity.activity) {
      setItinerary([...itinerary, { ...newActivity, id: Date.now() }]);
      setNewActivity({
        destination: '',
        date: '',
        time: '',
        activity: '',
        description: '',
        duration: ''
      });
    }
  };

  const handleRemoveActivity = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  const groupedItinerary = itinerary.reduce((acc, item) => {
    const date = item.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Sort activities by time within each date
  Object.keys(groupedItinerary).forEach(date => {
    groupedItinerary[date].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  });

  if (destinations.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Destinations Selected</h3>
          <p className="text-gray-600 mb-4">
            Select some destinations first to start building your itinerary.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Go Back to Destinations
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Activity Form */}
      <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Add New Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Destination</label>
              <select
                value={newActivity.destination}
                onChange={(e) => setNewActivity({ ...newActivity, destination: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.name}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
              <Input
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Time</label>
              <Input
                type="time"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Activity</label>
              <Input
                placeholder="e.g., Visit Eiffel Tower"
                value={newActivity.activity}
                onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Duration</label>
              <Input
                placeholder="e.g., 2 hours"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <Textarea
              placeholder="Add notes or details about this activity..."
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              className="focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          
          <Button 
            onClick={handleAddActivity}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </CardContent>
      </Card>

      {/* Itinerary Display */}
      {Object.keys(groupedItinerary).length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Itinerary</h2>
          {Object.keys(groupedItinerary)
            .sort()
            .map((date) => (
              <Card key={date} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {groupedItinerary[date].map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`p-4 ${
                        index !== groupedItinerary[date].length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {activity.time && (
                              <Badge variant="outline" className="mr-2">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.time}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="mr-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              {activity.destination}
                            </Badge>
                            {activity.duration && (
                              <Badge variant="outline">
                                {activity.duration}
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-lg text-gray-800 mb-1">
                            {activity.activity}
                          </h4>
                          {activity.description && (
                            <p className="text-gray-600 text-sm">
                              {activity.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveActivity(activity.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent>
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Activities Added</h3>
            <p className="text-gray-600">
              Add your first activity to start building your itinerary.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItineraryBuilder;
