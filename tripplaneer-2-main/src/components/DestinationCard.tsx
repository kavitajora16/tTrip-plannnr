
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Check } from 'lucide-react';

const DestinationCard = ({ destination, onSelect, isSelected }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {destination.price}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="font-semibold">{destination.name}</span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {'★'.repeat(Math.floor(destination.rating))}
            </div>
            <span className="text-sm">{destination.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>
        
        <Button
          onClick={() => onSelect(destination)}
          disabled={isSelected}
          className={`w-full transition-all ${
            isSelected
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Selected
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add to Trip
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
