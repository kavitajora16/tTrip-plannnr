import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, Plane, Plus, DollarSign, X } from 'lucide-react';
import DestinationCard from './DestinationCard';
import ItineraryBuilder from './ItineraryBuilder';
import BudgetTracker from './BudgetTracker';

const TravelPlanner = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customDestination, setCustomDestination] = useState({
    name: '',
    description: '',
    price: '$'
  });

  const featuredDestinations = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      description: 'Experience the perfect blend of traditional culture and modern innovation',
      rating: 4.9,
      price: '$$$'
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
      description: 'Stunning sunsets and white-washed buildings overlooking the Aegean Sea',
      rating: 4.8,
      price: '$$'
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      description: 'Tropical paradise with beautiful beaches and rich cultural heritage',
      rating: 4.7,
      price: '$'
    },
    {
      id: 4,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
      description: 'The City of Light with iconic landmarks and world-class cuisine',
      rating: 4.8,
      price: '$$$'
    },
    {
      id: 5,
      name: 'Iceland',
      image: 'https://images.unsplash.com/photo-1539066436653-8c02e4de9cad?w=400&h=300&fit=crop',
      description: 'Land of fire and ice with breathtaking natural wonders',
      rating: 4.9,
      price: '$$'
    },
    {
      id: 6,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop',
      description: 'Luxury destination with architectural marvels and desert adventures',
      rating: 4.6,
      price: '$$$'
    }
  ];

  const tabs = [
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: DollarSign }
  ];

  const handleDestinationSelect = (destination) => {
    if (!selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const handleDestinationRemove = (destinationId) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== destinationId));
  };

  const handleAddCustomDestination = () => {
    if (customDestination.name.trim()) {
      const newDestination = {
        id: Date.now(), // Simple ID generation
        name: customDestination.name,
        description: customDestination.description || 'Custom destination',
        rating: 4.5,
        price: customDestination.price,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
        isCustom: true
      };
      
      setSelectedDestinations([...selectedDestinations, newDestination]);
      setCustomDestination({ name: '', description: '', price: '$' });
      setIsAddDialogOpen(false);
      console.log('Added custom destination:', newDestination);
    }
  };

  const filteredDestinations = featuredDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Search query updated:', e.target.value);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Plane className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Travel Planner
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Plan your perfect trip with our comprehensive travel planning tool. Discover destinations, build itineraries, and manage your budget all in one place.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-lg border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Destinations Bar */}
      {selectedDestinations.length > 0 && (
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Selected Destinations:</span>
                <div className="flex gap-2 flex-wrap">
                  {selectedDestinations.map((dest) => (
                    <Badge key={dest.id} variant="secondary" className="bg-blue-100 text-blue-800 flex items-center gap-1">
                      {dest.name}
                      {dest.isCustom && (
                        <span className="text-xs bg-orange-200 text-orange-800 px-1 rounded">Custom</span>
                      )}
                      <button
                        onClick={() => handleDestinationRemove(dest.id)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={() => setActiveTab('itinerary')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Plan Itinerary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      {activeTab === 'destinations' && (
        <div>
          {/* Search Bar and Add Custom Button */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search destinations by name or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-400 transition-colors"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Add Custom Destination Button */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Destination
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Custom Destination</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Destination Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Local Beach, Friend's House"
                      value={customDestination.name}
                      onChange={(e) => setCustomDestination({...customDestination, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of this destination..."
                      value={customDestination.description}
                      onChange={(e) => setCustomDestination({...customDestination, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price Range</Label>
                    <select
                      id="price"
                      value={customDestination.price}
                      onChange={(e) => setCustomDestination({...customDestination, price: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="$">$ - Budget</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Expensive</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddCustomDestination}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      Add Destination
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={handleDestinationSelect}
                isSelected={selectedDestinations.some(d => d.id === destination.id)}
              />
            ))}
          </div>

          {filteredDestinations.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No destinations found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'itinerary' && (
        <ItineraryBuilder destinations={selectedDestinations} />
      )}

      {activeTab === 'budget' && (
        <BudgetTracker destinations={selectedDestinations} />
      )}
    </div>
  );
};

export default TravelPlanner;
