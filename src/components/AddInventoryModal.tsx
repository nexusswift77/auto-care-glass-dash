
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: any) => void;
}

const AddInventoryModal: React.FC<AddInventoryModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    supplier: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ...formData,
      price: `KSH ${formData.price}`,
      quantity: parseInt(formData.quantity),
      status: parseInt(formData.quantity) > 10 ? 'in-stock' : parseInt(formData.quantity) > 0 ? 'low-stock' : 'out-of-stock',
      lastUpdated: new Date().toISOString(),
    };

    onAddItem(newItem);
    
    toast({
      title: "Success",
      description: "Inventory item added successfully",
    });

    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      supplier: '',
      description: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add Inventory Item</DialogTitle>
          <DialogDescription>
            Add a new item to the inventory
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-input"
              placeholder="e.g., Engine Oil, Brake Pads"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-white">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-200">
                <SelectItem value="engine">Engine Parts</SelectItem>
                <SelectItem value="brakes">Brake System</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="fluids">Fluids & Oils</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-white">Price (KSH) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="glass-input"
              placeholder="Enter price in KSH"
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="text-white">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="glass-input"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <Label htmlFor="supplier" className="text-white">Supplier</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="glass-input"
              placeholder="Enter supplier name"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="glass-input"
              placeholder="Item description"
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="glass-button">
              Cancel
            </Button>
            <Button type="submit" className="glass-button-primary">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryModal;
