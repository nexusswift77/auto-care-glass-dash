
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, Plus, Edit, TrendingDown } from 'lucide-react';

const InventoryPage: React.FC = () => {
  // Mock inventory data
  const inventory = [
    {
      id: 'ITM-001',
      name: 'Engine Oil 5W-30',
      sku: 'OIL-5W30-5L',
      currentStock: 25,
      reorderLevel: 10,
      supplier: 'AutoParts Inc.',
      unitPrice: 45.99,
      category: 'Fluids'
    },
    {
      id: 'ITM-002',
      name: 'Oil Filter',
      sku: 'FLT-OIL-STD',
      currentStock: 5,
      reorderLevel: 15,
      supplier: 'FilterPro',
      unitPrice: 12.50,
      category: 'Filters'
    },
    {
      id: 'ITM-003',
      name: 'Brake Pads (Front Set)',
      sku: 'BRK-PAD-FRT',
      currentStock: 8,
      reorderLevel: 5,
      supplier: 'BrakeTech',
      unitPrice: 89.99,
      category: 'Brake Parts'
    },
    {
      id: 'ITM-004',
      name: 'Air Filter',
      sku: 'FLT-AIR-STD',
      currentStock: 2,
      reorderLevel: 8,
      supplier: 'FilterPro',
      unitPrice: 18.75,
      category: 'Filters'
    },
    {
      id: 'ITM-005',
      name: 'Brake Fluid DOT 4',
      sku: 'BRK-FLD-DOT4',
      currentStock: 18,
      reorderLevel: 5,
      supplier: 'AutoParts Inc.',
      unitPrice: 28.50,
      category: 'Fluids'
    }
  ];

  const getStockStatus = (current: number, reorder: number) => {
    if (current <= reorder) {
      return { 
        status: 'low', 
        badge: <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Low Stock</Badge> 
      };
    } else if (current <= reorder * 1.5) {
      return { 
        status: 'medium', 
        badge: <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Medium</Badge> 
      };
    } else {
      return { 
        status: 'good', 
        badge: <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Good</Badge> 
      };
    }
  };

  const lowStockItems = inventory.filter(item => item.currentStock <= item.reorderLevel);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
            <p className="text-muted-foreground">Track parts and supplies</p>
          </div>
          <Button className="glass-button-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Card className="glass-card border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-300">
                <AlertTriangle className="h-5 w-5" />
                <span>Low Stock Alert</span>
              </CardTitle>
              <CardDescription>
                {lowStockItems.length} item(s) need restocking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg">
                    <span className="text-sm text-white">{item.name}</span>
                    <span className="text-sm text-red-300">{item.currentStock} remaining</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 gap-4">
          {inventory.map((item) => {
            const stockStatus = getStockStatus(item.currentStock, item.reorderLevel);
            
            return (
              <Card key={item.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Item Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-automotive-blue/20 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-automotive-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">{item.sku}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stock Level */}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{item.currentStock}</p>
                      <p className="text-xs text-muted-foreground">Current Stock</p>
                      {stockStatus.badge}
                    </div>

                    {/* Reorder Level */}
                    <div className="text-center">
                      <p className="text-lg font-medium text-white">{item.reorderLevel}</p>
                      <p className="text-xs text-muted-foreground">Reorder Level</p>
                    </div>

                    {/* Supplier & Price */}
                    <div>
                      <p className="text-sm font-medium text-white">{item.supplier}</p>
                      <p className="text-sm text-muted-foreground">${item.unitPrice}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="glass-button">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {item.currentStock <= item.reorderLevel && (
                        <Button size="sm" className="glass-button-primary">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Inventory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-automotive-blue" />
                <span>Total Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{inventory.length}</p>
              <p className="text-sm text-muted-foreground">Tracked items</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>Low Stock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-400">{lowStockItems.length}</p>
              <p className="text-sm text-muted-foreground">Items need restock</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-automotive-teal" />
                <span>Total Value</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">
                ${inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Current inventory value</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
