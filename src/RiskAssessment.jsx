import React, { useState } from 'react';
import { BarChart3, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockRiskFactors } from '../../data/mockData';
import { calculateRiskScore, getRiskLevel, getRiskColor } from '../../utils/riskCalculator';

export function RiskAssessment() {
  const { t } = useLanguage();
  const [riskFactors, setRiskFactors] = useState(mockRiskFactors);
  const [isEditing, setIsEditing] = useState(false);

  const riskScore = calculateRiskScore(riskFactors);
  const riskLevel = getRiskLevel(riskScore);
  const riskColorClass = getRiskColor(riskLevel);

  const handleFactorChange = (factor, value) => {
    setRiskFactors(prev => ({
      ...prev,
      [factor]: value
    }));
  };

  const factorLabels = {
    nearbyOutbreaks: 'Disease Outbreaks Nearby',
    visitorControl: 'Visitor Access Control',
    animalMovement: 'Animal Movement Control',
    feedSecurity: 'Feed Security & Storage',
    wasteManagement: 'Waste Management',
    staffTraining: 'Staff Training Level'
  };

  const recommendations = {
    low: [
      'Maintain current biosecurity standards',
      'Continue regular monitoring and assessments',
      'Keep up with staff training programs'
    ],
    medium: [
      'Review and strengthen visitor access protocols',
      'Enhance feed storage security measures',
      'Increase staff training frequency'
    ],
    high: [
      'Immediately restrict all non-essential farm access',
      'Review and upgrade disinfection procedures',
      'Implement daily health monitoring protocols'
    ],
    critical: [
      'Consider temporary operation restrictions',
      'Contact veterinary authorities immediately',
      'Implement emergency biosecurity protocols'
    ]
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('risk_assessment')}</h1>
              <p className="text-gray-600">Evaluate your farm's biosecurity risk level</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Update Assessment'}
          </button>
        </div>

        {/* Current Risk Score */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">{riskScore}/100</div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${riskColorClass}`}>
              {t('current_risk_level')}: {t(`${riskLevel}_risk`)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Risk Factors Assessment</h2>
          
          <div className="space-y-6">
            {/* Nearby Outbreaks */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {riskFactors.nearbyOutbreaks ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className="font-medium text-gray-800">{factorLabels.nearbyOutbreaks}</span>
              </div>
              {isEditing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={riskFactors.nearbyOutbreaks}
                    onChange={(e) => handleFactorChange('nearbyOutbreaks', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    riskFactors.nearbyOutbreaks ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      riskFactors.nearbyOutbreaks ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                </label>
              ) : (
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  riskFactors.nearbyOutbreaks
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {riskFactors.nearbyOutbreaks ? 'Yes' : 'No'}
                </span>
              )}
            </div>

            {/* Other Factors */}
            {Object.keys(riskFactors)
              .filter(key => key !== 'nearbyOutbreaks')
              .map((factor) => (
                <div key={factor} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{factorLabels[factor]}</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {riskFactors[factor]}/5
                    </span>
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={riskFactors[factor]}
                      onChange={(e) => handleFactorChange(factor, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  ) : (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(riskFactors[factor] / 5) * 100}%` }}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recommendations</h2>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 ${
              riskLevel === 'low' ? 'border-green-500 bg-green-50' :
              riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              riskLevel === 'high' ? 'border-orange-500 bg-orange-50' :
              'border-red-500 bg-red-50'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className={`h-5 w-5 ${
                  riskLevel === 'low' ? 'text-green-600' :
                  riskLevel === 'medium' ? 'text-yellow-600' :
                  riskLevel === 'high' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
                <span className="font-semibold text-gray-800">
                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk Level
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {recommendations[riskLevel].map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                  <p className="text-gray-700 text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Trend */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-800">Risk Trend</span>
            </div>
            <p className="text-sm text-gray-600">
              Your risk score has improved by 15% over the last month. Continue implementing
              the recommended biosecurity measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}