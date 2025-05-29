
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, CreditCard, Smartphone } from 'lucide-react';

interface BulkPaymentProcessorProps {
  selectedPayments: string[];
  onComplete: () => void;
}

const BulkPaymentProcessor = ({ selectedPayments, onComplete }: BulkPaymentProcessorProps) => {
  const [selectedMethod, setSelectedMethod] = useState('revolut');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  const totalAmount = selectedPayments.length * 520; // Example calculation

  const processPayments = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate payment processing
    for (let i = 0; i < selectedPayments.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / selectedPayments.length) * 100);
      
      // Simulate success/failure
      const success = Math.random() > 0.1; // 90% success rate
      setResults(prev => [...prev, {
        id: selectedPayments[i],
        success,
        message: success ? 'Pagamento completato' : 'Errore nel pagamento'
      }]);
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Elaborazione Pagamenti in Blocco</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Pagamenti Selezionati</p>
                <p className="text-2xl font-bold">{selectedPayments.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Importo Totale</p>
                <p className="text-2xl font-bold text-green-600">€{totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Commissione Media</p>
                <p className="text-2xl font-bold">€520</p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-medium">Seleziona Metodo di Pagamento</Label>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="mt-3">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="revolut" id="revolut" />
                  <Label htmlFor="revolut" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Revolut Business</p>
                      <p className="text-sm text-gray-500">Commissioni ridotte, elaborazione veloce</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Consigliato</Badge>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Stripe Connect</p>
                      <p className="text-sm text-gray-500">Elaborazione sicura, tracciabilità completa</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Processing Section */}
          {isProcessing && (
            <div className="space-y-4">
              <div>
                <Label>Progresso Elaborazione</Label>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">
                  {Math.round(progress)}% completato ({results.length}/{selectedPayments.length} pagamenti)
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <Label>Risultati Elaborazione</Label>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>Pagamento #{result.id}</span>
                    </div>
                    <Badge variant={result.success ? 'default' : 'destructive'}>
                      {result.message}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onComplete} disabled={isProcessing}>
              Annulla
            </Button>
            <div className="space-x-3">
              {!isProcessing && results.length === 0 && (
                <Button onClick={processPayments} className="bg-green-600 hover:bg-green-700">
                  Conferma ed Elabora Pagamenti
                </Button>
              )}
              {results.length > 0 && !isProcessing && (
                <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
                  Completa Elaborazione
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkPaymentProcessor;
