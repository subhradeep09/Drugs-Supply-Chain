'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AddMedicine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Medicine</h1>
        <p className="text-muted-foreground">Add a new medicine to your catalog</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Medicine Name</label>
                <Input placeholder="Enter medicine name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Generic Name</label>
                <Input placeholder="Enter generic name" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analgesic">Analgesic</SelectItem>
                    <SelectItem value="antibiotic">Antibiotic</SelectItem>
                    <SelectItem value="antiviral">Antiviral</SelectItem>
                    <SelectItem value="antifungal">Antifungal</SelectItem>
                    <SelectItem value="antihistamine">Antihistamine</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dosage Form</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="syrup">Syrup</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="cream">Cream</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Strength</label>
                <Input placeholder="e.g., 500mg" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Manufacturing Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Batch Number</label>
                <Input placeholder="Enter batch number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Storage Conditions</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room_temp">Room Temperature</SelectItem>
                    <SelectItem value="refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter medicine description, including usage instructions and side effects"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price per Unit</label>
                <Input type="number" placeholder="Enter price" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Order Quantity</label>
                <Input type="number" placeholder="Enter minimum quantity" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Required Documents</label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm">Certificate of Analysis</label>
                  <Input type="file" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Quality Assurance Certificate</label>
                  <Input type="file" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Add Medicine</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 