
import BillHistory from "@/components/bills/BillHistory";

const BillsPage = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Bills</h1>
      <p className="text-muted-foreground">
        View, filter, and manage all your processed bills
      </p>
      
      <BillHistory />
    </div>
  );
};

export default BillsPage;
