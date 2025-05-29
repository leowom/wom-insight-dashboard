
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Target, Users, DollarSign, Image, Globe, CheckCircle } from 'lucide-react';

interface CampaignCreationWizardProps {
  onClose: () => void;
}

const CampaignCreationWizard = ({ onClose }: CampaignCreationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    terapista: '',
    objective: '',
    campaignName: '',
    targetAudience: {
      locations: [] as string[],
      ageRange: { min: 25, max: 65 },
      interests: [] as string[]
    },
    budget: {
      daily: 25,
      total: 750,
      schedule: 'continuous'
    },
    creative: {
      videos: [] as string[],
      images: [] as string[]
    },
    landingPage: ''
  });

  const totalSteps = 6;

  const terapisti = [
    { id: '1', name: 'Dr. Mario Rossi', specialization: 'Fisioterapia', avatar: '/placeholder.svg' },
    { id: '2', name: 'Dr. Anna Bianchi', specialization: 'Osteopatia', avatar: '/placeholder.svg' },
    { id: '3', name: 'Dr. Giuseppe Verdi', specialization: 'Massoterapia', avatar: '/placeholder.svg' },
    { id: '4', name: 'Dr. Laura Neri', specialization: 'Chiropratica', avatar: '/placeholder.svg' }
  ];

  const objectives = [
    { id: 'lead_generation', name: 'Lead Generation', description: 'Genera contatti qualificati', icon: Target },
    { id: 'brand_awareness', name: 'Brand Awareness', description: 'Aumenta la visibilità del brand', icon: Globe },
    { id: 'traffic', name: 'Traffic', description: 'Porta traffico al sito web', icon: Users }
  ];

  const locations = [
    'Milano', 'Roma', 'Torino', 'Napoli', 'Bologna', 'Firenze', 'Palermo', 'Genova', 'Bari', 'Catania'
  ];

  const interests = [
    'Salute e Benessere', 'Sport e Fitness', 'Medicina Alternativa', 'Riabilitazione', 
    'Dolore Cronico', 'Prevenzione', 'Benessere Mentale', 'Nutrizione', 'Yoga', 'Pilates'
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating campaign with data:', formData);
    // Here you would typically send the data to your API
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Seleziona Terapista e Obiettivo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Terapista</label>
                  <div className="grid grid-cols-2 gap-3">
                    {terapisti.map((terapista) => (
                      <div
                        key={terapista.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.terapista === terapista.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData({ ...formData, terapista: terapista.id })}
                      >
                        <div className="flex items-center space-x-3">
                          <img src={terapista.avatar} alt={terapista.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-medium">{terapista.name}</div>
                            <div className="text-sm text-gray-500">{terapista.specialization}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Obiettivo Campagna</label>
                  <div className="space-y-3">
                    {objectives.map((objective) => {
                      const IconComponent = objective.icon;
                      return (
                        <div
                          key={objective.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.objective === objective.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData({ ...formData, objective: objective.id })}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{objective.name}</div>
                              <div className="text-sm text-gray-500">{objective.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome Campagna</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Es: Dr. Rossi - Fisioterapia Milano"
                    value={formData.campaignName}
                    onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Targeting Audience</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Località</label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {locations.map((location) => (
                      <div
                        key={location}
                        className={`p-2 text-sm border rounded cursor-pointer transition-colors ${
                          formData.targetAudience.locations.includes(location) 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          const newLocations = formData.targetAudience.locations.includes(location)
                            ? formData.targetAudience.locations.filter(l => l !== location)
                            : [...formData.targetAudience.locations, location];
                          setFormData({
                            ...formData,
                            targetAudience: { ...formData.targetAudience, locations: newLocations }
                          });
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fascia d'Età</label>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="text-xs text-gray-500">Da</label>
                      <input
                        type="number"
                        min="18"
                        max="65"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        value={formData.targetAudience.ageRange.min}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAudience: { 
                            ...formData.targetAudience, 
                            ageRange: { ...formData.targetAudience.ageRange, min: parseInt(e.target.value) }
                          }
                        })}
                      />
                    </div>
                    <span>-</span>
                    <div>
                      <label className="text-xs text-gray-500">A</label>
                      <input
                        type="number"
                        min="18"
                        max="65"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        value={formData.targetAudience.ageRange.max}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAudience: { 
                            ...formData.targetAudience, 
                            ageRange: { ...formData.targetAudience.ageRange, max: parseInt(e.target.value) }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interessi</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className={`p-2 text-sm border rounded cursor-pointer transition-colors ${
                          formData.targetAudience.interests.includes(interest) 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          const newInterests = formData.targetAudience.interests.includes(interest)
                            ? formData.targetAudience.interests.filter(i => i !== interest)
                            : [...formData.targetAudience.interests, interest];
                          setFormData({
                            ...formData,
                            targetAudience: { ...formData.targetAudience, interests: newInterests }
                          });
                        }}
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Budget e Programmazione</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Giornaliero (€)</label>
                    <input
                      type="number"
                      min="5"
                      step="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.budget.daily}
                      onChange={(e) => setFormData({
                        ...formData,
                        budget: { ...formData.budget, daily: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Totale (€)</label>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.budget.total}
                      onChange={(e) => setFormData({
                        ...formData,
                        budget: { ...formData.budget, total: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Programmazione</label>
                  <div className="space-y-2">
                    {['continuous', 'scheduled'].map((schedule) => (
                      <div
                        key={schedule}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.budget.schedule === schedule ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData({
                          ...formData,
                          budget: { ...formData.budget, schedule }
                        })}
                      >
                        <div className="font-medium">
                          {schedule === 'continuous' ? 'Continua' : 'Programmata'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {schedule === 'continuous' 
                            ? 'La campagna viene eseguita continuamente' 
                            : 'Imposta date di inizio e fine specifiche'
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Stima Performance</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Reach Stimato</div>
                      <div className="font-bold">2,500 - 4,200</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Click Stimati</div>
                      <div className="font-bold">45 - 85</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Lead Stimati</div>
                      <div className="font-bold">8 - 15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Selezione Creative</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Video Creative</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <div className="text-sm text-gray-500">
                      Trascina qui i tuoi video o clicca per selezionare
                    </div>
                    <Button variant="outline" className="mt-2">
                      Seleziona Video
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Immagini di Backup</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <div className="text-sm text-gray-500">
                      Trascina qui le tue immagini o clicca per selezionare
                    </div>
                    <Button variant="outline" className="mt-2">
                      Seleziona Immagini
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Consigli per i Creative</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Usa video di massimo 15 secondi per migliori performance</li>
                    <li>• Includi sempre sottotitoli nei video</li>
                    <li>• Le immagini devono essere di alta qualità (min 1080x1080)</li>
                    <li>• Mostra il terapista in azione per creare fiducia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connessione Landing Page</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Seleziona Landing Page</label>
                  <div className="space-y-2">
                    {['landing-page-1', 'landing-page-2', 'landing-page-3'].map((page, index) => (
                      <div
                        key={page}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.landingPage === page ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData({ ...formData, landingPage: page })}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Landing Page {index + 1}</div>
                            <div className="text-sm text-gray-500">
                              https://terapista.com/dr-rossi-{index + 1}
                            </div>
                          </div>
                          <Badge variant="outline">Live</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Optimizzazione Landing Page</h4>
                  <div className="text-sm text-yellow-700">
                    Assicurati che la landing page sia ottimizzata per mobile e che il form di contatto sia prominente.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Revisione e Lancio</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Riepilogo Campagna</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Terapista</div>
                        <div className="font-medium">
                          {terapisti.find(t => t.id === formData.terapista)?.name || 'Non selezionato'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Obiettivo</div>
                        <div className="font-medium">
                          {objectives.find(o => o.id === formData.objective)?.name || 'Non selezionato'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Budget Giornaliero</div>
                        <div className="font-medium">€{formData.budget.daily}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Località Target</div>
                        <div className="font-medium">
                          {formData.targetAudience.locations.length} città selezionate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Tutto Pronto!</h4>
                    <p className="text-gray-600">
                      La tua campagna è pronta per essere lanciata. Verrà attivata entro 24 ore dalla revisione.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Step {currentStep} di {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% completato</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>

        {currentStep === totalSteps ? (
          <Button onClick={handleSubmit}>
            Lancia Campagna
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Avanti
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CampaignCreationWizard;
