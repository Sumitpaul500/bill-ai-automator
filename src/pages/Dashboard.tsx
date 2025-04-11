
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart, PieChart, Area, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, Receipt, Wallet, ArrowRight, ScanLine, Upload } from "lucide-react";

const BILL_CATEGORIES = [
  { name: "Utility", value: 42, color: "#8b5cf6" },
  { name: "Vendor", value: 28, color: "#3b82f6" },
  { name: "Food", value: 15, color: "#10b981" },
  { name: "Travel", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const MONTHLY_BILLS = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1450 },
  { month: "Mar", amount: 1800 },
  { month: "Apr", amount: 1600 },
  { month: "May", amount: 1950 },
  { month: "Jun", amount: 2100 },
  { month: "Jul", amount: 1800 },
  { month: "Aug", amount: 2300 },
  { month: "Sep", amount: 2500 },
  { month: "Oct", amount: 2100 },
  { month: "Nov", amount: 1900 },
  { month: "Dec", amount: 2400 },
];

const RECENT_BILLS = [
  {
    id: "1",
    vendor: "Electric Company Inc.",
    category: "Utility",
    date: "2023-11-15",
    amount: 149.87,
    status: "Pending",
  },
  {
    id: "2",
    vendor: "Internet Services Co.",
    category: "Utility",
    date: "2023-11-10",
    amount: 89.99,
    status: "Paid",
  },
  {
    id: "3",
    vendor: "Office Supplies Ltd.",
    category: "Vendor",
    date: "2023-11-05",
    amount: 234.56,
    status: "Paid",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const totalBills = RECENT_BILLS.length;
  const totalAmount = RECENT_BILLS.reduce((sum, bill) => sum + bill.amount, 0);
  const pendingBills = RECENT_BILLS.filter(bill => bill.status === "Pending").length;

  return (
    <div className="space-y-6">
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-up">
          <h2 className="text-2xl font-semibold">
            Welcome, {user.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your bill management system
          </p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBills}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +$156.32 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBills}</div>
            <p className="text-xs text-muted-foreground">
              {pendingBills > 0 ? "Requires attention" : "All bills paid"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bill Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BILL_CATEGORIES}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {BILL_CATEGORIES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_BILLS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="amount" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-2">Vendor</th>
                    <th className="text-left font-medium py-2">Category</th>
                    <th className="text-left font-medium py-2">Date</th>
                    <th className="text-right font-medium py-2">Amount</th>
                    <th className="text-left font-medium py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_BILLS.map((bill) => (
                    <tr key={bill.id} className="border-b">
                      <td className="py-3">{bill.vendor}</td>
                      <td className="py-3">{bill.category}</td>
                      <td className="py-3">{bill.date}</td>
                      <td className="text-right py-3">${bill.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bill.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate("/bills")}
              >
                View all bills <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <Card className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <ScanLine className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Scan Bills</h3>
                <p className="text-sm text-primary-foreground/80">
                  Use your camera to scan bills for instant processing
                </p>
              </div>
            </div>
            <Button
              className="mt-4 bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/scan")}
            >
              Start Scanning
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/90 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Upload Bills</h3>
                <p className="text-sm text-white/80">
                  Upload PDF or image files of your bills
                </p>
              </div>
            </div>
            <Button
              className="mt-4 bg-white text-blue-600 hover:bg-white/90"
              onClick={() => navigate("/upload")}
            >
              Upload Files
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
