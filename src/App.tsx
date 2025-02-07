import { useState } from 'react';
import {
  BookOpen, DollarSign, Settings, ShoppingCart, Users, Database,
  Calendar, TrendingUp, Package, Truck, FileText, Search,
  Plus, Save, Trash, Download, Printer, X, Barcode, Filter,
  ChevronRight, AlertCircle, Bell, HelpCircle, LogOut
} from 'lucide-react';
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from './components/ui/alert';

const EnterpriseBookstoreUI = () => {
  const [activeModule, setActiveModule] = useState('accounts');
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<{ message: string; type: string; } | false>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const modules = {
    accounts: {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Accounts Workflow',
      pages: {
        financial: ['Ledger', 'Daybook', 'Trial Balance', 'Profit & Loss'],
        transactions: ['Payments', 'Receipts', 'Bank Reconciliation'],
        reports: ['Financial Reports', 'Tax Reports', 'Audit Logs']
      }
    },
    retail: {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Retail Workflow',
      pages: {
        inventory: ['Book List', 'Stock Control', 'Categories'],
        procurement: ['Purchase Orders', 'Receive Stock', 'Returns'],
        catalog: ['Author Management', 'Publisher Setup', 'Price Lists']
      }
    },
    sales: {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: 'Sales Workflow',
      pages: {
        operations: ['POS Terminal', 'Quotations', 'Orders'],
        customer: ['Customer Database', 'Loyalty Program', 'Returns'],
        analytics: ['Sales Reports', 'Performance Metrics', 'Forecasting']
      }
    },
    management: {
      icon: <Settings className="w-5 h-5" />,
      title: 'Management Workflow',
      pages: {
        admin: ['User Management', 'Roles & Permissions', 'Audit Trail'],
        settings: ['System Config', 'Backup/Restore', 'Integrations'],
        reports: ['System Reports', 'Error Logs', 'Activity Logs']
      }
    }
  };

  const handleAction = (action: string, data: any = null) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      switch (action) {
        case 'new':
          setTableData([{ id: Date.now(), ...data }, ...tableData]);
          showAlert('New record created successfully');
          break;
        case 'save':
          showAlert('Changes saved successfully');
          break;
        case 'delete':
          showAlert('Record deleted successfully', 'warning');
          break;
        case 'export':
          showAlert('Export started. Check downloads folder.');
          break;
        case 'print':
          window.print();
          break;
      }
      setLoading(false);
    }, 800);
  };

  const showAlert = (message: string, type = 'success') => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(false), 3000);
  };

  const DataTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {getTableHeaders().map(header => (
              <th key={header} className="p-3 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any, index: number) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {Object.values(row).map((cell: any, i: number) => (
                <td key={i} className="p-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const getTableHeaders = () => {
    const headers: Record<string, string[]> = {
      accounts: ['Date', 'Reference', 'Description', 'Debit', 'Credit', 'Balance'],
      retail: ['ISBN', 'Title', 'Author', 'Publisher', 'Stock', 'Price'],
      sales: ['Date', 'Invoice', 'Customer', 'Items', 'Amount', 'Status']
    };
    return headers[activeModule] || [];
  };

  const Toolbar = () => (
    <div className="flex justify-between items-center mb-4 p-4">
      <div className="flex gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-1 px-3 py-2 border rounded hover:bg-gray-50">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>
      <div className="flex gap-2">
        {showNotification && (
          <Alert className="absolute top-4 right-4 w-auto">
            <AlertTitle>{showNotification.type === 'success' ? 'Success' : 'Warning'}</AlertTitle>
            <AlertDescription>{showNotification.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );

  const Header = () => (
    <div className="bg-white border-b">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Bookstore Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="flex gap-2 p-4 bg-gray-50 border-t">
      <button
        onClick={() => handleAction('new')}
        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        <Plus className="w-4 h-4" /> New
      </button>
      <button
        onClick={() => handleAction('save')}
        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={loading}
      >
        <Save className="w-4 h-4" /> Save
      </button>
      <button
        onClick={() => handleAction('delete')}
        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        disabled={loading}
      >
        <Trash className="w-4 h-4" /> Delete
      </button>
      <button
        onClick={() => handleAction('export')}
        className="flex items-center gap-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        disabled={loading}
      >
        <Download className="w-4 h-4" /> Export
      </button>
      <button
        onClick={() => handleAction('print')}
        className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        disabled={loading}
      >
        <Printer className="w-4 h-4" /> Print
      </button>
      {activeModule === 'retail' && (
        <button
          className="flex items-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          disabled={loading}
        >
          <Barcode className="w-4 h-4" /> Barcode
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-800 min-h-screen">
          {Object.entries(modules).map(([key, module]) => (
            <div key={key}>
              <button
                onClick={() => setActiveModule(key)}
                className={`w-full p-3 flex items-center gap-2 text-white hover:bg-gray-700 ${
                  activeModule === key ? 'bg-gray-700' : ''
                }`}
              >
                {module.icon}
                {module.title}
              </button>
              {activeModule === key && (
                <div className="bg-gray-900 py-2">
                  {Object.entries(module.pages).map(([section, pages]) => (
                    <div key={section}>
                      <div className="px-4 py-2 text-xs text-gray-400 uppercase">
                        {section}
                      </div>
                      {pages.map(page => (
                        <button
                          key={page}
                          onClick={() => setActivePage(page)}
                          className={`w-full px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left ${
                            activePage === page ? 'bg-gray-700' : ''
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-6">
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              {modules[activeModule].icon}
              <span>{modules[activeModule].title}</span>
              {activePage && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span>{activePage}</span>
                </>
              )}
            </div>

            {activePage && (
              <div className="bg-white rounded-lg shadow">
                <Toolbar />
                <DataTable />
                <ActionButtons />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseBookstoreUI;