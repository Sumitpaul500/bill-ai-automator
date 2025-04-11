
import UploadBill from "@/components/bills/UploadBill";

const UploadPage = () => {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-6">
      <h1 className="text-2xl font-bold">Upload Bills</h1>
      <p className="text-muted-foreground">
        Upload PDFs or images of your bills for automatic processing
      </p>
      
      <UploadBill />
    </div>
  );
};

export default UploadPage;
