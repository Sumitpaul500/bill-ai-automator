
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Check, File, FileText, Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const UploadBill = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    setError(null);
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or image file (JPEG, PNG, HEIC).");
      return;
    }
    
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }
    
    setFile(selectedFile);
  };

  const processBill = () => {
    if (!file) return;
    
    setProcessing(true);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 10;
        if (nextProgress >= 100) {
          clearInterval(progressInterval);
          
          // After processing complete, simulate a result
          setTimeout(() => {
            setProcessing(false);
            setResult({
              vendor: "Internet Services Co.",
              billNumber: "INV-2023-78542",
              date: "2023-11-10",
              dueDate: "2023-11-30",
              amount: 89.99,
              category: "Utility",
              items: [
                { description: "Internet service - monthly", amount: 79.99 },
                { description: "Equipment rental", amount: 10.00 },
              ]
            });
            
            toast({
              title: "File processed successfully",
              description: "All details have been extracted from your bill.",
            });
          }, 500);
        }
        return nextProgress;
      });
    }, 200);
  };

  const resetUpload = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setProcessing(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            <span>Upload Bill</span>
          </CardTitle>
          <CardDescription>
            Upload a PDF or image of your bill for automatic processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!file && !result ? (
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-secondary/30 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleFileSelected(e.target.files[0])}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.heic"
              />
              <div className="flex flex-col items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg">Drag & Drop or Click to Upload</h3>
                <p className="text-muted-foreground mt-1">Support for PDF, JPEG, PNG, HEIC (max 10MB)</p>
              </div>
            </div>
          ) : file && !processing && !result ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded">
                  <File className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          
          {processing && (
            <div className="space-y-2 my-4">
              <div className="flex justify-between text-sm">
                <span>Processing file...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {result && (
            <div className="mt-4 border rounded-lg p-4 bg-secondary/50 animate-fade-up">
              <h3 className="font-semibold text-lg mb-2">Extracted Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-medium">{result.vendor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bill Number</p>
                  <p className="font-medium">{result.billNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{result.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{result.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{result.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${result.amount}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          {!file && !result ? (
            <Button 
              className="w-full sm:w-auto" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Select File
            </Button>
          ) : file && !processing && !result ? (
            <>
              <Button 
                className="w-full sm:w-auto" 
                onClick={processBill}
              >
                Process Bill
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={resetUpload}
              >
                Cancel
              </Button>
            </>
          ) : result ? (
            <>
              <Button 
                className="w-full sm:w-auto" 
                onClick={() => {
                  toast({
                    title: "Bill saved",
                    description: "The bill has been added to your records.",
                  });
                }}
              >
                <Check className="mr-2 h-4 w-4" /> Save Bill
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={resetUpload}
              >
                Upload Another Bill
              </Button>
            </>
          ) : processing ? (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadBill;
