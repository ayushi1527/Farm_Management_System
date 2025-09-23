import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockTrainingModules } from '../../data/mockData';

export function TrainingModules() {
  const { t } = useLanguage();
  const [modules, setModules] = useState(mockTrainingModules);
  const [selectedModule, setSelectedModule] = useState(null);

  const startModule = (id) => {
    const module = modules.find(m => m.id === id);
    if (module) {
      setSelectedModule(module);
    }
  };

  const updateProgress = (id, progress) => {
    setModules(prev => prev.map(module =>
      module.id === id
        ? { ...module, progress, completed: progress === 100 }
        : module
    ));
  };

  const completedCount = modules.filter(m => m.completed).length;
  const totalProgress = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

  if (selectedModule) {
    return <ModuleViewer module={selectedModule} onBack={() => setSelectedModule(null)} onProgressUpdate={updateProgress} />;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('training_modules')}</h1>
              <p className="text-gray-600">Interactive biosecurity training and education</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{totalProgress}%</div>
            <div className="text-sm text-gray-600">{completedCount}/{modules.length} completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{totalProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Module Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons} lessons</span>
                  </div>
                </div>
              </div>

              {module.completed && (
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    module.completed
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-purple-500 to-blue-600'
                  }`}
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => startModule(module.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>{module.progress === 0 ? 'Start' : 'Continue'}</span>
              </button>

              {module.completed && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Training Achievements</h3>
            <p className="text-purple-100">Keep learning to unlock more achievements</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{completedCount}</div>
            <div className="text-sm text-purple-100">Modules Completed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{modules.reduce((sum, m) => sum + m.lessons, 0)}</div>
            <div className="text-sm text-purple-100">Total Lessons</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-purple-100">Knowledge Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ModuleViewer = ({ module, onBack, onProgressUpdate }) => {
  const [currentLesson, setCurrentLesson] = useState(1);

  const completeLesson = () => {
    if (currentLesson < module.lessons) {
      setCurrentLesson(prev => prev + 1);
    }
    
    const newProgress = Math.round((currentLesson / module.lessons) * 100);
    onProgressUpdate(module.id, newProgress);
  };

  const lessonContent = {
    1: {
      title: "Introduction to Biosecurity",
      content: "Biosecurity refers to the measures taken to prevent the introduction and spread of diseases on your farm. This includes controlling access, maintaining hygiene, and following proper protocols.",
      video: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg"
    },
    2: {
      title: "Disease Prevention Basics",
      content: "Learn the fundamental principles of disease prevention including quarantine procedures, vaccination schedules, and early detection methods.",
      video: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
    }
  };

  const lesson = lessonContent[currentLesson] || lessonContent[1];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            ← Back to Modules
          </button>
          
          <div className="text-sm text-gray-600">
            Lesson {currentLesson} of {module.lessons}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">{module.title}</h1>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentLesson / module.lessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{lesson.title}</h2>
        
        {/* Video/Image */}
        <div className="mb-6">
          <img
            src={lesson.video}
            alt="Training content"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentLesson(Math.max(1, currentLesson - 1))}
            disabled={currentLesson === 1}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={completeLesson}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentLesson === module.lessons ? 'Complete Module' : 'Next Lesson'}
          </button>
        </div>
      </div>
    </div>
  );
}