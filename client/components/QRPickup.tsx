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
  QrCode,
  Clock,
  CheckCircle,
  AlertTriangle,
  Scan,
  Timer,
  User,
  Calendar,
} from "lucide-react";

interface QRCodeData {
  id: string;
  parentName: string;
  childName: string;
  expiryTime: Date;
  isValid: boolean;
  generatedAt: Date;
}

interface PickupRecord {
  id: string;
  childName: string;
  parentName: string;
  pickupTime: Date;
  staffMember: string;
  qrCodeUsed: boolean;
}

export function QRGenerator() {
  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (qrCode && qrCode.isValid) {
      const timer = setInterval(() => {
        const now = new Date();
        const remaining = Math.max(
          0,
          Math.floor((qrCode.expiryTime.getTime() - now.getTime()) / 1000),
        );
        setTimeRemaining(remaining);

        if (remaining === 0) {
          setQrCode((prev) => (prev ? { ...prev, isValid: false } : null));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [qrCode]);

  const generateQRCode = () => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour validity

    const newQRCode: QRCodeData = {
      id: `QR_${Date.now()}`,
      parentName: "John Smith", // This would come from user context
      childName: "Emma Smith", // This would come from user context
      expiryTime: expiry,
      isValid: true,
      generatedAt: now,
    };

    setQrCode(newQRCode);
    setTimeRemaining(60 * 60); // 1 hour in seconds
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="w-5 h-5" />
          <span>Pickup QR Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!qrCode || !qrCode.isValid ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Generate a secure QR code for child pickup
            </p>
            <Button onClick={generateQRCode} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Generate Pickup QR Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <Timer className="h-4 w-4" />
              <AlertDescription>
                QR Code expires in: <strong>{formatTime(timeRemaining)}</strong>
              </AlertDescription>
            </Alert>

            {/* Mock QR Code Display */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
              <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">QR Code</p>
                  <p className="text-xs text-gray-400 font-mono">{qrCode.id}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Parent:</span>
                  <span className="font-medium">{qrCode.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Child:</span>
                  <span className="font-medium">{qrCode.childName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valid until:</span>
                  <span className="font-medium">
                    {qrCode.expiryTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Show this QR code to nursery staff during pickup. Do not share
                with others.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => setQrCode(null)}
              variant="outline"
              className="w-full"
            >
              Generate New Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [pickupRecords, setPickupRecords] = useState<PickupRecord[]>([
    {
      id: "1",
      childName: "Emma Smith",
      parentName: "John Smith",
      pickupTime: new Date(),
      staffMember: "Sarah Johnson",
      qrCodeUsed: true,
    },
    {
      id: "2",
      childName: "Oliver Brown",
      parentName: "Lisa Brown",
      pickupTime: new Date(Date.now() - 30 * 60 * 1000),
      staffMember: "Mike Wilson",
      qrCodeUsed: true,
    },
  ]);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanResult("Valid QR Code - Emma Smith pickup authorized");

      // Add to pickup records
      const newRecord: PickupRecord = {
        id: Date.now().toString(),
        childName: "Emma Smith",
        parentName: "John Smith",
        pickupTime: new Date(),
        staffMember: "Current Staff",
        qrCodeUsed: true,
      };
      setPickupRecords((prev) => [newRecord, ...prev]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scan className="w-5 h-5" />
            <span>QR Code Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-64 h-64 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              {scanning ? (
                <div className="text-center animate-pulse">
                  <Scan className="w-16 h-16 mx-auto text-nursery-purple mb-2" />
                  <p className="text-sm text-gray-600">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Scan className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Point camera at QR code
                  </p>
                </div>
              )}
            </div>

            {scanResult && (
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{scanResult}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={simulateScan}
              disabled={scanning}
              className="w-full"
            >
              {scanning ? "Scanning..." : "Simulate QR Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Pickups */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Pickups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pickupRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {record.childName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Picked up by {record.parentName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {record.pickupTime.toLocaleTimeString()}
                  </p>
                  <Badge variant="secondary">
                    {record.qrCodeUsed ? "QR Used" : "Manual"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QRPickupSystem() {
  const [userRole, setUserRole] = useState<string>("parent");

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "parent";
    setUserRole(role);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {userRole === "parent" ? <QRGenerator /> : <QRScanner />}

      {/* Info Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">How QR Pickup Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Generate QR Code</h4>
              <p className="text-sm text-gray-600">
                Parents generate a time-bound QR code before pickup
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Show to Staff</h4>
              <p className="text-sm text-gray-600">
                Present the QR code to nursery staff during pickup
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Quick Verification</h4>
              <p className="text-sm text-gray-600">
                Staff scan the code for instant verification and logging
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
