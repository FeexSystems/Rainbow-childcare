import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useChildren, useQRPickups, generateQRCode } from "@/hooks/useData";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInMinutes, parseISO, isAfter } from "date-fns";
import {
  QrCode,
  Clock,
  CheckCircle,
  AlertTriangle,
  Scan,
  Timer,
  User,
  Calendar,
  RefreshCw,
} from "lucide-react";

export function QRGenerator() {
  const { user, profile } = useAuth();
  const { children, loading: childrenLoading } = useChildren();
  const { pickups, loading: pickupsLoading, setPickups } = useQRPickups();
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [generatingCode, setGeneratingCode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { toast } = useToast();

  const activePickup = pickups.find(
    (p) =>
      p.child_id === selectedChildId &&
      p.is_active &&
      isAfter(parseISO(p.expires_at), new Date()),
  );

  useEffect(() => {
    if (activePickup) {
      const timer = setInterval(() => {
        const now = new Date();
        const expiry = parseISO(activePickup.expires_at);
        const minutes = differenceInMinutes(expiry, now);
        setTimeRemaining(Math.max(0, minutes));

        if (minutes <= 0) {
          // Mark as expired
          setPickups(
            pickups.map((p) =>
              p.id === activePickup.id ? { ...p, is_active: false } : p,
            ),
          );
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activePickup, pickups, setPickups]);

  const handleGenerateQR = async () => {
    if (!selectedChildId || !user) return;

    setGeneratingCode(true);
    try {
      const newPickup = await generateQRCode(selectedChildId, user.id);
      setPickups([newPickup, ...pickups]);

      toast({
        title: "QR Code Generated",
        description: "Your pickup QR code is ready! Valid for 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingCode(false);
    }
  };

  const selectedChild = children.find((c) => c.id === selectedChildId);

  if (!user || !profile) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Please log in to generate pickup QR codes.
        </AlertDescription>
      </Alert>
    );
  }

  if (childrenLoading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nursery-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your children...</p>
        </CardContent>
      </Card>
    );
  }

  if (children.length === 0) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          No children found. Please contact the nursery to add your child to the
          system.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="w-5 h-5" />
          <span>Generate Pickup QR Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Child Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Child</label>
          <Select value={selectedChildId} onValueChange={setSelectedChildId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a child..." />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.first_name} {child.last_name} ({child.nursery_location}
                  )
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active QR Code */}
        {activePickup && (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                QR Code is active and ready for pickup
              </AlertDescription>
            </Alert>

            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-mono tracking-wider">
                  {activePickup.qr_code.substring(0, 8).toUpperCase()}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                QR Code for {selectedChild?.first_name}{" "}
                {selectedChild?.last_name}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Timer className="w-4 h-4 text-orange-500" />
                <span className="font-medium">
                  {timeRemaining > 60
                    ? `${Math.floor(timeRemaining / 60)}h ${timeRemaining % 60}m remaining`
                    : `${timeRemaining}m remaining`}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Generated{" "}
                {format(parseISO(activePickup.generated_at), "MMM d, h:mm a")}
              </p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Show this QR code to nursery staff for secure pickup. The code
                expires in 24 hours.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Generate New Code */}
        {!activePickup && (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              {selectedChild
                ? `Generate a secure QR code for picking up ${selectedChild.first_name}`
                : "Select a child to generate a pickup QR code"}
            </p>
            <Button
              onClick={handleGenerateQR}
              disabled={!selectedChildId || generatingCode}
              className="bg-green-600 hover:bg-green-700"
            >
              {generatingCode ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </>
              )}
            </Button>
          </div>
        )}

        {/* Recent Pickups */}
        {pickups.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-900">
              Recent Pickup Codes
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {pickups.slice(0, 5).map((pickup) => {
                const child = children.find((c) => c.id === pickup.child_id);
                const isExpired = !isAfter(
                  parseISO(pickup.expires_at),
                  new Date(),
                );
                const wasUsed = !!pickup.used_at;

                return (
                  <div
                    key={pickup.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {child?.first_name} {child?.last_name}
                      </span>
                      <Badge
                        variant={
                          wasUsed
                            ? "default"
                            : isExpired
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {wasUsed ? "Used" : isExpired ? "Expired" : "Active"}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(parseISO(pickup.generated_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function QRScanner() {
  const { profile } = useAuth();
  const [scannedCode, setScannedCode] = useState("");
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(
    null,
  );
  const [pickupDetails, setPickupDetails] = useState<any>(null);

  const isStaff =
    profile?.role &&
    ["teacher", "admin", "support_staff"].includes(profile.role);

  const handleScan = async () => {
    if (!scannedCode.trim()) return;

    try {
      // TODO: Implement actual QR code validation with Supabase
      // For now, simulate the process
      const isValid = scannedCode.length >= 8;

      if (isValid) {
        setScanResult("success");
        setPickupDetails({
          childName: "Emma Johnson",
          parentName: "Michael Thompson",
          generatedAt: new Date(),
        });
      } else {
        setScanResult("error");
      }
    } catch (error) {
      setScanResult("error");
    }
  };

  if (!isStaff) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          QR code scanning is only available to nursery staff.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scan className="w-5 h-5" />
          <span>Scan Pickup QR Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter QR Code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value.toUpperCase())}
                placeholder="Scan or enter QR code..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nursery-purple"
              />
              <Button onClick={handleScan} disabled={!scannedCode.trim()}>
                Verify
              </Button>
            </div>
          </div>

          {scanResult === "success" && pickupDetails && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-1">
                  <p className="font-medium">Valid pickup code!</p>
                  <p>Child: {pickupDetails.childName}</p>
                  <p>Parent: {pickupDetails.parentName}</p>
                  <p className="text-sm">
                    Generated:{" "}
                    {format(pickupDetails.generatedAt, "MMM d, h:mm a")}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {scanResult === "error" && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Invalid or expired QR code. Please ask the parent to generate a
                new one.
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Pickup Process</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Ask parent to show their QR code</li>
              <li>2. Scan or manually enter the code above</li>
              <li>3. Verify parent identity matches the code</li>
              <li>4. Complete pickup and mark as collected</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main QR Pickup component that shows both generator and scanner based on user role
export default function QRPickup() {
  const { profile } = useAuth();
  const isStaff =
    profile?.role &&
    ["teacher", "admin", "support_staff"].includes(profile.role);

  return (
    <div className="space-y-6">
      {!isStaff && <QRGenerator />}
      {isStaff && (
        <>
          <QRScanner />
          <QRGenerator />
        </>
      )}
    </div>
  );
}
