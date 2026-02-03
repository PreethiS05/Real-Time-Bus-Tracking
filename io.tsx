import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bus, MapPin, Navigation, Clock, Users, MessageSquare } from "lucide-react";

// Mock bus data
const mockBuses = [
  {
    id: "PB01-1234",
    route: "route1",
    routeName: "Amritsar → Jalandhar",
    nextStop: "Golden Temple Complex",
    eta: "2 min",
    capacity: 85,
    occupancy: 65,
    status: "On Time"
  },
  {
    id: "PB02-5678",
    route: "route2", 
    routeName: "Ludhiana → Chandigarh",
    nextStop: "Ludhiana Junction",
    eta: "5 min",
    capacity: 80,
    occupancy: 45,
    status: "Delayed"
  },
  {
    id: "PB03-9012",
    route: "route3",
    routeName: "Patiala → Ludhiana", 
    nextStop: "Patiala Bus Stand",
    eta: "1 min",
    capacity: 75,
    occupancy: 70,
    status: "On Time"
  }
];

const routes = [
  { value: "all", label: "All Routes" },
  { value: "route1", label: "Amritsar → Jalandhar" },
  { value: "route2", label: "Ludhiana → Chandigarh" },
  { value: "route3", label: "Patiala → Ludhiana" },
  { value: "route4", label: "Bathinda → Mansa" }
];

const BusTracking = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState("all");
  const [selectedBus, setSelectedBus] = useState<any>(null);

  const filteredBuses = selectedRoute === "all" 
    ? mockBuses 
    : mockBuses.filter(bus => bus.route === selectedRoute);

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage < 50) return "bg-secondary";
    if (percentage < 80) return "bg-transit-amber";
    return "bg-transit-rose";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time": return "bg-secondary";
      case "Delayed": return "bg-transit-amber";
      case "Cancelled": return "bg-transit-rose";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-4 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Bus className="w-6 h-6" />
          <h1 className="text-xl font-bold">Sarathi Bus</h1>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-48 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {routes.map((route) => (
                <SelectItem key={route.value} value={route.value}>
                  {route.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="sm" variant="secondary" className="btn-emerald">
            <Navigation className="w-4 h-4 mr-2" />
            Locate Me
          </Button>

          <Button size="sm" className="btn-rose">
            <MessageSquare className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Live Bus Tracking</h2>
          <p className="text-muted-foreground">Real-time locations and arrival times for Punjab buses</p>
        </div>

        {/* Bus List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBuses.map((bus) => (
            <Card
              key={bus.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedBus(bus)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">{bus.id}</h3>
                    <p className="text-sm text-muted-foreground">{bus.routeName}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(bus.status)}>
                  {bus.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Stop:</span>
                  <span className="font-medium">{bus.nextStop}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-medium text-primary">{bus.eta}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy:</span>
                    <span className="text-sm">{bus.occupancy}/{bus.capacity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getOccupancyColor(bus.occupancy, bus.capacity)}`}
                      style={{ width: `${(bus.occupancy / bus.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <Bus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No buses found</h3>
            <p className="text-muted-foreground">Try selecting a different route or check back later.</p>
          </div>
        )}
      </div>

      {/* Bus Details Sheet */}
      <Sheet open={!!selectedBus} onOpenChange={() => setSelectedBus(null)}>
        <SheetContent side="right" className="w-full sm:w-96">
          {selectedBus && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Bus className="w-5 h-5" />
                  Bus {selectedBus.id}
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Route</span>
                      <span className="font-medium">{selectedBus.routeName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(selectedBus.status)}>
                        {selectedBus.status}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Next Stop</span>
                      <div className="text-right">
                        <p className="font-medium">{selectedBus.nextStop}</p>
                        <p className="text-sm text-muted-foreground">ETA: {selectedBus.eta}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Occupancy</span>
                        <span className="text-sm">{selectedBus.occupancy}/{selectedBus.capacity}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getOccupancyColor(selectedBus.occupancy, selectedBus.capacity)}`}
                          style={{ width: `${(selectedBus.occupancy / selectedBus.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid gap-2">
                  <Button className="w-full" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button className="w-full btn-rose" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BusTracking;