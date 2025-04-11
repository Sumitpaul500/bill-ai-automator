
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, FileText, ArrowUpDown } from "lucide-react";

const dummyBills = [
  {
    id: "1",
    vendor: "Electric Company Inc.",
    category: "Utility",
    date: "2023-11-15",
    dueDate: "2023-12-01",
    amount: 149.87,
    status: "Pending",
  },
  {
    id: "2",
    vendor: "Internet Services Co.",
    category: "Utility",
    date: "2023-11-10",
    dueDate: "2023-11-30",
    amount: 89.99,
    status: "Paid",
  },
  {
    id: "3",
    vendor: "Office Supplies Ltd.",
    category: "Vendor",
    date: "2023-11-05",
    dueDate: "2023-11-20",
    amount: 234.56,
    status: "Paid",
  },
  {
    id: "4",
    vendor: "City Water Services",
    category: "Utility",
    date: "2023-11-02",
    dueDate: "2023-11-25",
    amount: 78.50,
    status: "Pending",
  },
  {
    id: "5",
    vendor: "Downtown Catering",
    category: "Food",
    date: "2023-10-28",
    dueDate: "2023-11-15",
    amount: 425.00,
    status: "Paid",
  },
  {
    id: "6",
    vendor: "Business Travel Agency",
    category: "Travel",
    date: "2023-10-15",
    dueDate: "2023-11-05",
    amount: 876.22,
    status: "Paid",
  },
  {
    id: "7",
    vendor: "Marketing Solutions Corp",
    category: "Vendor",
    date: "2023-10-10",
    dueDate: "2023-10-30",
    amount: 1250.00,
    status: "Paid",
  },
];

const BillHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof dummyBills[0]; direction: 'asc' | 'desc' }>({
    key: "date",
    direction: "desc",
  });

  const filteredAndSortedBills = useMemo(() => {
    let filtered = [...dummyBills];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        bill =>
          bill.vendor.toLowerCase().includes(lowerCaseSearch) ||
          bill.category.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(bill => bill.category === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      } else {
        return sortConfig.direction === "asc"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
    });
    
    return filtered;
  }, [dummyBills, searchTerm, categoryFilter, sortConfig]);

  const handleSort = (key: keyof typeof dummyBills[0]) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const uniqueCategories = [...new Set(dummyBills.map(bill => bill.category))];

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Bill History
        </CardTitle>
        <CardDescription>
          View and manage all your processed bills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("vendor")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Vendor
                    {sortConfig.key === "vendor" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("category")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Category
                    {sortConfig.key === "category" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("date")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Date
                    {sortConfig.key === "date" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("dueDate")}
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    Due Date
                    {sortConfig.key === "dueDate" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("amount")}
                    className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
                  >
                    Amount
                    {sortConfig.key === "amount" && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedBills.length > 0 ? (
                filteredAndSortedBills.map((bill) => (
                  <TableRow key={bill.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{bill.vendor}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${bill.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No bills found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillHistory;
