import { NextRequest, NextResponse } from 'next/server'

// Mock drugs database - replace with actual database
let mockDrugs = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    manufacturer: 'MediSupply Co.',
    strength: '500mg',
    form: 'Tablet',
    category: 'Analgesic',
    description: 'Pain reliever and fever reducer',
    price: 0.25,
    stockQuantity: 5000,
    minStockLevel: 100,
    expiryDate: '2025-12-31',
    batchNumber: 'BATCH123',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    manufacturer: 'PharmaTech Inc.',
    strength: '250mg',
    form: 'Capsule',
    category: 'Antibiotic',
    description: 'Broad-spectrum antibiotic',
    price: 0.50,
    stockQuantity: 3000,
    minStockLevel: 200,
    expiryDate: '2025-06-30',
    batchNumber: 'BATCH124',
    isActive: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-14T10:00:00Z',
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    manufacturer: 'Global Meds Ltd.',
    strength: '400mg',
    form: 'Tablet',
    category: 'NSAID',
    description: 'Anti-inflammatory pain reliever',
    price: 0.35,
    stockQuantity: 4000,
    minStockLevel: 150,
    expiryDate: '2025-09-15',
    batchNumber: 'BATCH125',
    isActive: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-13T10:00:00Z',
  },
  {
    id: '4',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    manufacturer: 'MediSupply Co.',
    strength: '20mg',
    form: 'Capsule',
    category: 'Proton Pump Inhibitor',
    description: 'Reduces stomach acid production',
    price: 1.20,
    stockQuantity: 2000,
    minStockLevel: 100,
    expiryDate: '2025-11-30',
    batchNumber: 'BATCH126',
    isActive: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-12T10:00:00Z',
  },
  {
    id: '5',
    name: 'Metformin 500mg',
    genericName: 'Metformin',
    manufacturer: 'PharmaTech Inc.',
    strength: '500mg',
    form: 'Tablet',
    category: 'Antidiabetic',
    description: 'Oral diabetes medicine',
    price: 0.80,
    stockQuantity: 1500,
    minStockLevel: 75,
    expiryDate: '2025-08-20',
    batchNumber: 'BATCH127',
    isActive: true,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-11T10:00:00Z',
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const manufacturer = searchParams.get('manufacturer')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredDrugs = [...mockDrugs]

    // Apply filters
    if (category) {
      filteredDrugs = filteredDrugs.filter(drug => drug.category === category)
    }

    if (manufacturer) {
      filteredDrugs = filteredDrugs.filter(drug => drug.manufacturer === manufacturer)
    }

    if (search) {
      filteredDrugs = filteredDrugs.filter(drug =>
        drug.name.toLowerCase().includes(search.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDrugs = filteredDrugs.slice(startIndex, endIndex)

    return NextResponse.json({
      drugs: paginatedDrugs,
      pagination: {
        page,
        limit,
        total: filteredDrugs.length,
        totalPages: Math.ceil(filteredDrugs.length / limit),
      },
    })
  } catch (error) {
    console.error('Get drugs error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const drugData = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'genericName', 'manufacturer', 'strength', 'form', 'category', 'price']
    for (const field of requiredFields) {
      if (!drugData[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new drug
    const newDrug = {
      id: (mockDrugs.length + 1).toString(),
      ...drugData,
      stockQuantity: drugData.stockQuantity || 0,
      minStockLevel: drugData.minStockLevel || 100,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDrugs.push(newDrug)

    return NextResponse.json({
      drug: newDrug,
      message: 'Drug created successfully',
    })
  } catch (error) {
    console.error('Create drug error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 