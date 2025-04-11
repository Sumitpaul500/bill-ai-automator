
import ScanBill from "@/components/bills/ScanBill";

const ScanPage = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-6">
      <h1 className="text-2xl font-bold">Scan Bills</h1>
      <p className="text-muted-foreground">
        Use your device's camera to scan bills and automatically extract information
      </p>
      
      <ScanBill />
    </div>
  );
};

export default ScanPage;
