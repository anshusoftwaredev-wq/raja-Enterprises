
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    retailPrice: 1199,
    wholesalePrice: 1050,
    moq: 5,
    stock: 45,
    category: 'Phones',
    description: 'The titanium iPhone. Aerospace-grade titanium design. A17 Pro chip. Pro camera system.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    isPopular: true,
    specs: {
      'Processor': 'A17 Pro',
      'Display': '6.7-inch OLED',
      'Camera': '48MP Main',
      'Battery': '29h Video'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    retailPrice: 1299,
    wholesalePrice: 1120,
    moq: 5,
    stock: 30,
    category: 'Phones',
    description: 'Welcome to the era of mobile AI. Built with Titanium for ultimate durability.',
    image: 'https://images.unsplash.com/photo-1707151022228-25504c555541?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Display': '6.8-inch AMOLED',
      'Camera': '200MP Main',
      'S-Pen': 'Included'
    }
  },
  {
    id: '3',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    retailPrice: 249,
    wholesalePrice: 195,
    moq: 10,
    stock: 120,
    category: 'Audio',
    description: 'Active Noise Cancellation and personalized Spatial Audio.',
    image: 'https://images.unsplash.com/photo-1588423770186-80f3ef081970?auto=format&fit=crop&q=80&w=800',
    specs: {
      'Chip': 'H2',
      'Battery': '6h ANC',
      'Charging': 'USB-C / MagSafe'
    }
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    retailPrice: 399,
    wholesalePrice: 310,
    moq: 8,
    stock: 25,
    category: 'Audio',
    description: 'Industry-leading noise cancellation. Your world, nothing else.',
    image: 'https://images.unsplash.com/photo-1675243015494-0136959be70b?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    specs: {
      'Battery': '30 hours',
      'Driver': '30mm',
      'Weight': '250g'
    }
  },
  {
    id: '5',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    retailPrice: 799,
    wholesalePrice: 680,
    moq: 10,
    stock: 50,
    category: 'Phones',
    description: 'Elite performance with 4th Gen Hasselblad Camera for Mobile.',
    image: 'https://images.unsplash.com/photo-1710134447479-79a6d07d19a4?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '16GB LPDDR5X',
      'Charging': '100W SUPERVOOC'
    }
  },
  {
    id: '6',
    name: 'Belkin MagSafe Stand',
    brand: 'Belkin',
    retailPrice: 149,
    wholesalePrice: 95,
    moq: 20,
    stock: 200,
    category: 'Accessories',
    description: 'Fast wireless charging for your Apple ecosystem.',
    image: 'https://images.unsplash.com/photo-1610443906669-0268ecf758f6?auto=format&fit=crop&q=80&w=800',
    specs: {
      'Output': '15W Fast Charging',
      'Compatability': 'iPhone 12+'
    }
  }
];
