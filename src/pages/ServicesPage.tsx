
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, CheckCircle, AlertCircle, User, Plus } from 'lucide-react';

const ServicesPage: React.FC = () => {
  // Mock services data
  const [services] = useState([
    {
      id: 'SRV-001',
      customer: 'John Smith',
      vehicle: '2020 Toyota Camry',
      license: 'ABC-123',
      serviceType: 'Oil Change & Inspection',
      technician: 'Mike Johnson',
      status: 'in-service',
      estimatedTime: '2 hours',
      startTime: '09:00 AM',
      tasks: ['Engine oil change', 'Filter replacement', 'Brake inspection'],
      partsUsed: ['Engine Oil (5L)', 'Oil Filter', 'Air Filter']
    },
    {
      id: 'SRV-002',
      customer: 'Sarah Wilson',
      vehicle: '2019 Honda Civic',
      license: 'XYZ-789',
      serviceType: 'Brake Service',
      technician: 'John Doe',
      status: 'completed',
      estimatedTime: '3 hours',
      startTime: '08:00 AM',
      tasks: ['Brake pad replacement', 'Brake fluid change', 'System check'],
      partsUsed: ['Brake Pads (Set)', 'Brake Fluid (1L)']
    },
    {
      id: 'SRV-003',
      customer: 'Robert Brown',
      vehicle: '2021 Ford F-150',
      license: 'DEF-456',
      serviceType: 'General Maintenance',
      technician: 'Unassigned',
      status: 'pending',
      estimatedTime: '4 hours',
      startTime: '11:00 AM',
      tasks: ['Multi-point inspection', 'Oil change', 'Tire rotation'],
      partsUsed: []
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-service':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'in-service':
        return <Badge className="status-in-service">In Service</Badge>;
      case 'completed':
        return <Badge className="status-completed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Service Management</h1>
            <p className="text-muted-foreground">Track and manage workshop services</p>
          </div>
          <Button className="glass-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Service
          </Button>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Car className="h-5 w-5 text-automotive-blue" />
                      <span>{service.id}</span>
                      {getStatusBadge(service.status)}
                    </CardTitle>
                    <CardDescription>
                      {service.customer} • {service.vehicle} • {service.license}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Start: {service.startTime}</p>
                    <p>Est: {service.estimatedTime}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Service Details */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Service Type</h4>
                      <p className="text-sm text-muted-foreground">{service.serviceType}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Technician</h4>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-automotive-teal" />
                        <span className="text-sm text-muted-foreground">
                          {service.technician || 'Not assigned'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Tasks</h4>
                    <div className="space-y-1">
                      {service.tasks.map((task, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-automotive-blue rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parts Used */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Parts Used</h4>
                    <div className="space-y-1">
                      {service.partsUsed.length > 0 ? (
                        service.partsUsed.map((part, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-automotive-teal rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{part}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No parts logged yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 pt-4 border-t border-glass-200">
                  {service.status === 'pending' && (
                    <Button size="sm" className="glass-button-primary">
                      Assign Technician
                    </Button>
                  )}
                  {service.status === 'in-service' && (
                    <>
                      <Button size="sm" className="glass-button">
                        Add Tasks
                      </Button>
                      <Button size="sm" className="glass-button">
                        Log Parts
                      </Button>
                      <Button size="sm" className="glass-button-primary">
                        Complete Service
                      </Button>
                    </>
                  )}
                  {service.status === 'completed' && (
                    <Button size="sm" className="glass-button">
                      Generate Service Card
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
