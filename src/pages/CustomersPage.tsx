
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Car, Calendar, DollarSign, Plus } from 'lucide-react';

const CustomersPage: React.FC = () => {
  // Mock customer data
  const customers = [
    {
      id: 'CUST-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 234 567 8901',
      lastService: '2024-01-10',
      totalServices: 15,
      totalSpent: 2450.75,
      vehicles: [
        { make: 'Toyota', model: 'Camry', year: 2020, license: 'ABC-123' }
      ],
      status: 'active'
    },
    {
      id: 'CUST-002',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 234 567 8902',
      lastService: '2024-01-15',
      totalServices: 8,
      totalSpent: 1320.50,
      vehicles: [
        { make: 'Honda', model: 'Civic', year: 2019, license: 'XYZ-789' }
      ],
      status: 'active'
    },
    {
      id: 'CUST-003',
      name: 'Robert Brown',
      email: 'robert.brown@email.com',
      phone: '+1 234 567 8903',
      lastService: '2023-11-20',
      totalServices: 22,
      totalSpent: 4150.25,
      vehicles: [
        { make: 'Ford', model: 'F-150', year: 2021, license: 'DEF-456' },
        { make: 'Ford', model: 'Explorer', year: 2018, license: 'GHI-789' }
      ],
      status: 'inactive'
    },
    {
      id: 'CUST-004',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 234 567 8904',
      lastService: '2024-01-12',
      totalServices: 5,
      totalSpent: 890.00,
      vehicles: [
        { make: 'BMW', model: 'X3', year: 2022, license: 'JKL-012' }
      ],
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
      : <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">Inactive</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Customer Database</h1>
            <p className="text-muted-foreground">Manage customer information and service history</p>
          </div>
          <Button className="glass-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        {/* Customer Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-white">{customers.length}</p>
                </div>
                <User className="h-8 w-8 text-automotive-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                  <p className="text-2xl font-bold text-white">
                    {customers.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-3 py-1">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-automotive-teal" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Spend</p>
                  <p className="text-2xl font-bold text-white">
                    ${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString()}
                  </p>
                </div>
                <Badge className="bg-automotive-blue/20 text-automotive-blue border-automotive-blue/30 text-lg px-3 py-1">
                  Per Customer
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <div className="grid grid-cols-1 gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-automotive-blue/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-automotive-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{customer.name}</CardTitle>
                      <CardDescription>Customer ID: {customer.id}</CardDescription>
                      <div className="mt-1">
                        {getStatusBadge(customer.status)}
                      </div>
                    </div>
                  </div>
                  <Button className="glass-button">
                    View Profile
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Contact Information</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-automotive-teal" />
                        <span className="text-muted-foreground">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3 text-automotive-teal" />
                        <span className="text-muted-foreground">{customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicles */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Vehicles</h4>
                    <div className="space-y-1">
                      {customer.vehicles.map((vehicle, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Car className="h-3 w-3 text-automotive-blue" />
                          <span className="text-muted-foreground">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service History */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Service History</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-3 w-3 text-automotive-teal" />
                        <span className="text-muted-foreground">
                          Last: {formatDate(customer.lastService)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {customer.totalServices} total services
                      </p>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Financial Summary</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-3 w-3 text-green-400" />
                        <span className="text-muted-foreground">
                          Total: ${customer.totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avg: ${Math.round(customer.totalSpent / customer.totalServices)} per service
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
