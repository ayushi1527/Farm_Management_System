export const calculateRiskScore = (factors) => {
  let score = 0;
  
  if (factors.nearbyOutbreaks) {
    score += 30;
  }
  
  score += (6 - factors.visitorControl) * 8;
  score += (6 - factors.animalMovement) * 6;
  score += (6 - factors.feedSecurity) * 8;
  score += (6 - factors.wasteManagement) * 6;
  score += (6 - factors.staffTraining) * 7;
  
  return Math.min(100, score);
};

export const getRiskLevel = (score) => {
  if (score <= 25) return 'low';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'high';
  return 'critical';
};

export const getRiskColor = (level) => {
  switch (level) {
    case 'low': return 'text-green-600 bg-green-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'critical': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};