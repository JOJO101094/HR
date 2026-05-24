# 🏗 Construction Store POS

Complete Offline-First POS Web Application for Construction Store - Production Ready

## 📋 Features

### Core POS System
- ✅ Professional POS Interface with product grid
- ✅ Barcode scanner support
- ✅ Real-time inventory tracking
- ✅ Multiple payment methods (Cash, Card, QR)
- ✅ Receipt printing and preview
- ✅ Daily sales summary

### Inventory Management
- ✅ Add, edit, delete products
- ✅ Product categorization
- ✅ Stock level tracking
- ✅ Low stock alerts
- ✅ Barcode generation
- ✅ Profit margin calculation

### Dashboard & Analytics
- ✅ Real-time sales charts
- ✅ Monthly revenue analysis
- ✅ Top products report
- ✅ Daily transaction history
- ✅ Key performance indicators

### Reports & Export
- ✅ Sales Report
- ✅ Inventory Report
- ✅ Profit Report
- ✅ Customer Debt Report
- ✅ PDF Export
- ✅ Excel Export

### Offline-First Technology
- ✅ Works without internet connection
- ✅ SQLite local database
- ✅ IndexedDB caching
- ✅ Service Worker offline support
- ✅ Auto-sync when internet returns

### PWA Capabilities
- ✅ Installable on Windows PC
- ✅ Installable on Android
- ✅ Installable on iPhone
- ✅ Works on Tablets
- ✅ Responsive design
- ✅ Fast performance

### Security
- ✅ Role-based access control (Admin, Cashier, Warehouse)
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Session management

### Multi-Platform Support
- ✅ Windows PC (Full feature)
- ✅ Android (Full feature)
- ✅ iPhone/iPad (Full feature)
- ✅ Tablets (Responsive)

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2** - React framework
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Recharts** - Data visualization
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express.js** - Server framework
- **Next.js API Routes** - Backend API

### Database
- **SQLite** - Local database
- **Prisma ORM** - Database ORM
- **IndexedDB** - Browser cache

### Offline & PWA
- **Service Worker** - Offline support
- **next-pwa** - PWA configuration
- **Workbox** - Cache management

### Export & Reports
- **jsPDF** - PDF generation
- **XLSX** - Excel export
- **Recharts** - Charts & graphs

## 📦 Installation

### Prerequisites
- Node.js 18+ or higher
- npm or yarn

### Step 1: Clone or Download Project

```bash
cd construction-pos
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npm run seed
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📱 Using on Different Devices

### Windows PC
1. Open http://localhost:3000 in browser
2. Click "Install" button or press F11 for fullscreen
3. Or save to desktop for quick access

### Android
1. Open http://[your-pc-ip]:3000 in Chrome
2. Click menu → "Install app"
3. App will be installed to home screen

### iPhone/iPad
1. Open http://[your-pc-ip]:3000 in Safari
2. Tap Share → "Add to Home Screen"
3. App will be installed to home screen

### Tablet
1. Same process as mobile devices
2. Responsive layout adapts to tablet screens

## 🔐 Default Login Credentials

```
Admin User:
  Email: admin@pos.com
  Password: 123456
  Role: Admin (Full access)

Cashier User:
  Email: cashier@pos.com
  Password: 123456
  Role: Cashier (Sales only)

Warehouse User:
  Email: warehouse@pos.com
  Password: 123456
  Role: Warehouse (Inventory only)
```

**Important:** Change these credentials in production!

## 📂 Project Structure

```
construction-pos/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── pos/               # POS page
│   ├── inventory/         # Inventory page
│   ├── reports/           # Reports page
│   └── settings/          # Settings page
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and stores
├── prisma/                # Database schema
├── public/                # Static files
├── services/              # API services
├── styles/                # Global styles
├── utils/                 # Utility functions
└── offline/               # Offline functionality
```

## 🗄️ Database Schema

### Tables
- **users** - User accounts with roles
- **categories** - Product categories
- **products** - Product inventory
- **customers** - Customer records
- **sales** - Sales transactions
- **sale_items** - Items in each sale
- **payments** - Payment records
- **inventory_logs** - Stock movement logs
- **settings** - Store configuration

## 🔄 Offline Mode

### How It Works
1. All data is stored in SQLite local database
2. Service Worker caches API responses
3. IndexedDB stores recent transactions
4. When offline, uses cached data
5. Auto-syncs when internet returns

### What Works Offline
- ✅ Browse products
- ✅ Add to cart
- ✅ Process sales
- ✅ Print receipts
- ✅ View dashboard
- ✅ Manage inventory

### Data Sync
- Automatic sync when connection detected
- Manual sync button in settings
- Sync status indicator

## 📊 Dashboard Features

### Real-Time Metrics
- Total sales count
- Total revenue
- Total orders
- Low stock alerts

### Charts
- Daily sales bar chart
- Top products pie chart
- Monthly revenue line chart
- Transaction history

### Quick Actions
- Go to POS
- Go to Inventory
- View Reports

## 💳 Payment Methods

### Cash Payment
- Manual cash entry
- Change calculation

### Card Payment
- Reference number storage
- Card type tracking

### QR Payment
- QR code generation
- Reference number storage

## 📄 Receipt Features

### Receipt Format
- Store name and info
- Transaction date & time
- Product list with quantities
- Subtotal, discount, tax
- Final amount
- Payment method
- Custom header/footer

### Printing
- Thermal printer support (58-80mm width)
- Print preview before printing
- Custom receipt formatting

## 📈 Reports

### Sales Report
- Date range filtering
- Order details
- Amount breakdown
- Payment method analysis

### Inventory Report
- Stock levels
- Low stock highlighting
- Inventory value
- Product status

### Profit Report
- Profit margins
- Revenue analysis
- Cost analysis
- Profit trends

### Customer Debt Report
- Outstanding balances
- Payment history
- Collection status

## ⚙️ Configuration

### Store Settings
- Store name
- Phone number
- Address
- Currency
- Tax rate
- Receipt header/footer

### System Settings
- Auto-backup schedule
- Database backup/restore
- User management
- Password management

## 🛡️ Security Features

### Authentication
- Email/password login
- JWT token-based
- Session management
- Auto logout after inactivity

### Authorization
- Role-based access control
- Admin: Full access
- Cashier: Sales operations
- Warehouse: Inventory management

### Data Protection
- Password hashing
- Secure session tokens
- HTTPS ready
- SQL injection prevention (Prisma ORM)

## 🔧 Development

### Add New Product
1. Go to Inventory
2. Click "Add Product"
3. Fill product details
4. Select category
5. Set price and cost
6. Click "Save Product"

### Create New User
1. Go to Settings
2. Click "Add User"
3. Enter email and password
4. Assign role
5. Save

### Export Data
1. Go to Reports
2. Select report type
3. Set date range
4. Click "Export PDF" or "Export Excel"

## 📱 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1 | Search products |
| F9 | Checkout |
| Ctrl+S | Save |
| Escape | Close modal |

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm run dev
```

### Database Error
```bash
# Reset database
rm prisma/construction_pos.db
npx prisma migrate dev --name init
npm run seed
```

### Build Error
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Offline Not Working
1. Check Service Worker registration
2. Verify browser support
3. Check DevTools Application tab
4. Verify HTTPS (required in production)

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Self-Hosted
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t construction-pos .
docker run -p 3000:3000 construction-pos
```

## 📞 Support

For issues and questions:
1. Check troubleshooting section
2. Review logs in DevTools Console
3. Check browser console for errors
4. Verify database connection

## 📄 License

This project is provided as-is for commercial use.

## 🎯 Production Checklist

Before deploying to production:

- [ ] Change admin password
- [ ] Update store name and address
- [ ] Configure tax rate
- [ ] Set up regular backups
- [ ] Enable HTTPS
- [ ] Update JWT secret
- [ ] Configure email notifications
- [ ] Test on target devices
- [ ] Performance optimization
- [ ] Security audit
- [ ] User training
- [ ] Support documentation

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Core POS functionality
- Inventory management
- Dashboard and reports
- Offline-first support
- PWA capabilities

## 💡 Tips for Best Performance

1. **Network Speed**
   - Ensure fast internet for cloud sync
   - Use 4G or WiFi

2. **Device Storage**
   - Keep at least 100MB free space
   - Regularly backup database

3. **Regular Maintenance**
   - Clear cache monthly
   - Archive old transactions
   - Update to latest version

4. **Data Backup**
   - Enable auto-backup
   - Manual backup weekly
   - Store backups securely

## 🌟 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Customer loyalty program
- [ ] Multi-store support
- [ ] API integration
- [ ] SMS notifications
- [ ] Email receipts
- [ ] Inventory forecasting

## 📞 Contact & Support

Website: [Your Website]
Email: [Your Email]
Phone: [Your Phone]

---

Made with ❤️ for Construction Stores
Version 1.0.0 | 2024
