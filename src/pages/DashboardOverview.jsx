import React, { useState, useEffect } from 'react';
import { BarChart3, CheckSquare, BookOpen, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import { mockRiskFactors, mockChecklistItems, mockTrainingModules, mockAlerts } from '../data/mockData';
import { calculateRiskScore, getRiskLevel, getRiskColor } from "../utils/riskCalculator";

export function DashboardOverview() {
  const { t } = useLanguage();
  const [riskScore] = useState(calculateRiskScore(mockRiskFactors));
  const [checklistProgress] = useState(() => {
    const completed = mockChecklistItems.filter(item => item.completed).length;
    return Math.round((completed / mockChecklistItems.length) * 100);
  });
  const [trainingProgress] = useState(() => {
    const totalProgress = mockTrainingModules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(totalProgress / mockTrainingModules.length);
  });

  const riskLevel = getRiskLevel(riskScore);
  const riskColorClass = getRiskColor(riskLevel);
  const activeAlerts = mockAlerts.filter(alert => alert.severity === 'high' || alert.severity === 'critical').length;

  const stats = [
    {
      title: t('risk_score'),
      value: `${riskScore}/100`,
      subtitle: t(`${riskLevel}_risk`),
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'bg-red-500',
      colorLight: 'bg-red-50',
      textColor: riskColorClass
    },
    {
      title: t('checklist_progress'),
      value: `${checklistProgress}%`,
      subtitle: `${mockChecklistItems.filter(item => item.completed).length}/${mockChecklistItems.length} completed`,
      icon: <CheckSquare className="h-8 w-8" />,
      color: 'bg-blue-500',
      colorLight: 'bg-blue-50',
      textColor: 'text-blue-600 bg-blue-100'
    },
    {
      title: t('training_progress'),
      value: `${trainingProgress}%`,
      subtitle: `${mockTrainingModules.filter(m => m.completed).length}/${mockTrainingModules.length} completed`,
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-green-500',
      colorLight: 'bg-green-50',
      textColor: 'text-green-600 bg-green-100'
    },
    {
      title: t('active_alerts'),
      value: activeAlerts.toString(),
      subtitle: 'Critical notifications',
      icon: <AlertTriangle className="h-8 w-8" />,
      color: 'bg-orange-500',
      colorLight: 'bg-orange-50',
      textColor: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('farm_overview')}</h2>
            <p className="text-green-100">Monitor your farm's biosecurity status and compliance</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl">
            <Shield className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.colorLight} p-3 rounded-lg`}>
                <div className={`${stat.color.replace('bg-', 'text-')}`}>
                  {stat.icon}
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.textColor}`}>
                {stat.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {mockAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'critical' ? 'bg-red-100' :
                  alert.severity === 'high' ? 'bg-orange-100' :
                  alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.severity === 'critical' ? 'text-red-600' :
                    alert.severity === 'high' ? 'text-orange-600' :
                    alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{alert.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {mockChecklistItems.filter(item => !item.completed).slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  item.priority === 'high' ? 'bg-red-500' :
                  item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{item.task}</h4>
                  <p className="text-xs text-gray-600">{item.category} • Due: {item.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}