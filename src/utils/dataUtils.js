// src/utils/dataUtils.js
export function calculateMetrics(year, permits, schools, transport) {
  const baseYear = 2025;
  const yearDiff = year - baseYear;

  // Total projected population growth
  const totalProjectedPop = permits.reduce((sum, p) => sum + p.projected_population_increase, 0);

  // Housing metric
  const totalDwellings = permits.reduce((sum, p) => sum + p.new_dwellings, 0);
  const housing = Math.min(((totalDwellings + (totalProjectedPop * yearDiff * 0.01)) / 5000) * 100, 100);

  // School capacity
  const totalEnrolments = schools.reduce((sum, s) => sum + (s[`Enrolments_${year}`] || s.Enrolments_2025), 0);
  const totalCapacity = schools.reduce((sum, s) => sum + s.Capacity, 0);
  const schoolsMetric = Math.min((totalEnrolments / totalCapacity) * 100, 100);

  // Transport metric (scaled by projected population growth)
  const transportStops = Object.values(transport).reduce((sum, t) => sum + t.stops.length, 0);
  const transportMetric = Math.min(((transportStops + (yearDiff * totalProjectedPop * 0.0001)) / 100) * 100, 100);

  // Services metric based on cost growth
  const totalCost = permits.reduce((sum, p) => sum + p.total_cost, 0);
  const servicesMetric = Math.min(((totalCost * (1 + yearDiff * 0.02)) / 2000000000) * 100, 100);

  return {
    housing: Math.round(housing),
    schools: Math.round(schoolsMetric),
    transport: Math.round(transportMetric),
    services: Math.round(servicesMetric),
  };
}

export function getSchoolMarkers(year, schools) {
  return schools
    .filter(s => (s[`Enrolments_${year}`] || s.Enrolments_2025) > 50) // Only show active schools
    .map(s => ({
      lat: s.Latitude,
      lng: s.Longitude,
      name: s.School_Name,
    }));
}

export function getTransportMarkers(transport) {
  return Object.values(transport)
    .flatMap(t => t.stops)
    .map(stop => ({
      lat: stop.lat,
      lng: stop.lon,
      name: stop.stop_name,
    }));
}
