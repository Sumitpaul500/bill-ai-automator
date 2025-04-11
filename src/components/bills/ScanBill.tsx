
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Camera, Check, Loader2, ScanLine } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const ScanBill = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Could not access camera. Please ensure you've granted camera permissions.");
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (!cameraActive) return;
    
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Simulate processing
          setScanning(false);
          processBill();
        }
      }
    }, 1500);
  };

  const processBill = () => {
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
              vendor: "Electric Company Inc.",
              billNumber: "INV-2023-04851",
              date: "2023-11-15",
              dueDate: "2023-12-01",
              amount: 149.87,
              category: "Utility",
              items: [
                { description: "Electricity usage", amount: 142.50 },
                { description: "Service fee", amount: 7.37 },
              ]
            });
            
            toast({
              title: "Bill scanned successfully",
              description: "All details have been extracted from your bill.",
            });
          }, 500);
        }
        return nextProgress;
      });
    }, 200);
  };

  const resetScan = () => {
    setResult(null);
    setProgress(0);
    setProcessing(false);
    setScanning(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-card shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            <span>Scan Bill</span>
          </CardTitle>
          <CardDescription>
            Position your bill in view and click the scan button
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
          
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-video mb-4">
            {cameraActive ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
                {scanning && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center scanning-effect">
                    <div className="bg-white p-2 rounded-full animate-pulse-slow">
                      <ScanLine className="h-6 w-6 animate-rotate-scan text-primary" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-6">
                <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-center text-muted-foreground">
                  {result ? "Scan completed" : "Camera preview will appear here"}
                </p>
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          {processing && (
            <div className="space-y-2 my-4">
              <div className="flex justify-between text-sm">
                <span>Processing bill...</span>
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
          {!cameraActive && !result ? (
            <Button 
              className="w-full sm:w-auto" 
              onClick={startCamera}
              disabled={cameraActive}
            >
              <Camera className="mr-2 h-4 w-4" /> Start Camera
            </Button>
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
                onClick={() => {
                  resetScan();
                  startCamera();
                }}
              >
                Scan Another Bill
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="w-full sm:w-auto" 
                onClick={captureImage}
                disabled={scanning || processing}
              >
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <ScanLine className="mr-2 h-4 w-4" /> 
                    Scan Bill
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => {
                  stopCamera();
                  resetScan();
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScanBill;
