
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScanLine, FileText, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="text-primary">Automate</span> your bill processing with AI
              </h1>
              <p className="text-lg text-muted-foreground">
                Save time and reduce errors by automatically extracting data from bills and invoices using our advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" onClick={() => navigate("/register")}>
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur-2xl opacity-30"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-4 text-xs font-medium text-gray-500">BillScan AI</div>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <ScanLine className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold">Electric Bill</div>
                            <div className="text-xs text-gray-500">Processed October 15</div>
                          </div>
                        </div>
                        <div className="text-lg font-bold">$149.87</div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-100 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-100 rounded-md w-5/6"></div>
                        <div className="h-4 bg-gray-100 rounded-md w-4/6"></div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500">Due Date</div>
                            <div className="text-sm font-medium">Nov 30, 2023</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Processed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our AI-powered platform automates the entire bill processing workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <ScanLine className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan or Upload</h3>
              <p className="text-muted-foreground">
                Use your device's camera to scan bills or upload PDFs and images directly.
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI automatically extracts key information like vendor, amount, dates, and categories.
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Review & Save</h3>
              <p className="text-muted-foreground">
                Review the extracted information, make any needed adjustments, and save to your records.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your bill processing?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of businesses saving time and reducing errors with BillScan AI
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/register")}
          >
            Get Started Now
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-secondary text-muted-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">BillScan AI</h3>
              <p className="text-sm mb-4">
                Automating bill processing with artificial intelligence
              </p>
              <p className="text-sm">&copy; {new Date().getFullYear()} BillScan AI. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sales</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
