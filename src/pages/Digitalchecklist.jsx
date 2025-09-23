import React, { useState } from 'react';
import { CheckSquare, Square, Calendar, AlertCircle, Filter } from 'lucide-react';
// import { ChecklistItem } from '../../types'; // Not needed in JSX
import { useLanguage } from "../context/LanguageContext";
import { mockChecklistItems } from "../data/mockData";

export function DigitalChecklist() {
  const { t } = useLanguage();
  const [items, setItems] = useState(mockChecklistItems);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const toggleItem = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const filteredItems = items.filter(item => {
    // Status filter
    if (filter === 'completed' && !item.completed) return false;
    if (filter === 'pending' && item.completed) return false;
    if (filter === 'overdue' && (!isOverdue(item.dueDate) || item.completed)) return false;

    // Category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

    return true;
  });

  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / items.length) * 100);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('digital_checklist')}</h1>
              <p className="text-gray-600">Track compliance with biosecurity requirements</p>
            </div>
          </div>

          {/* Progress */}
          <div className="text-center lg:text-right">
            <div className="text-2xl font-bold text-gray-800">{progressPercentage}%</div>
            <div className="text-sm text-gray-600">{completedCount}/{items.length} completed</div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tasks match your current filters</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const overdueStatus = !item.completed && isOverdue(item.dueDate);
            
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
                  item.completed 
                    ? 'border-green-200 bg-green-50/50' 
                    : overdueStatus 
                      ? 'border-red-200 bg-red-50/50'
                      : 'border-gray-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`flex-shrink-0 mt-1 ${
                      item.completed ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {item.completed ? (
                      <CheckSquare className="h-6 w-6" />
                    ) : (
                      <Square className="h-6 w-6" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className={`text-lg font-medium ${
                          item.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                        }`}>
                          {item.task}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {/* Category */}
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {item.category}
                          </span>
                          
                          {/* Priority */}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                            {item.priority.toUpperCase()}
                          </span>

                          {/* Due Date */}
                          <div className={`flex items-center space-x-1 text-xs ${
                            overdueStatus ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            <Calendar className="h-3 w-3" />
                            <span>Due: {item.dueDate}</span>
                            {overdueStatus && <AlertCircle className="h-3 w-3" />}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        {item.completed ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        ) : overdueStatus ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}