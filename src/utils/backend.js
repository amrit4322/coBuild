// Backend API Integration Utility
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Sample permit data structure for testing
const samplePermitData = [
  {
    "lga": "Wyndham",
    "projected_population_increase": 45000,
    "new_dwellings": 18000,
    "infrastructure_strain": "High",
    "housing_stress": "Severe"
  },
  {
    "lga": "Melbourne",
    "projected_population_increase": 25000,
    "new_dwellings": 12000,
    "infrastructure_strain": "Medium",
    "housing_stress": "High"
  },
  {
    "lga": "Melton",
    "projected_population_increase": 30000,
    "new_dwellings": 15000,
    "infrastructure_strain": "High",
    "housing_stress": "High"
  }
];

export const generateBackendReport = async (permitData = samplePermitData) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${backendUrl}/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permitData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', response.status, errorText);
      throw new Error(`Backend API error: ${response.status} - ${errorText}`);
    }

    const rawResponseData = await response.text(); // Get as text first to handle various JSON formats
    console.log('Raw backend response data:', rawResponseData);

    let parsedData;
    try {
      parsedData = JSON.parse(rawResponseData);
      console.log('Initial JSON parse result:', parsedData);
    } catch (e) {
      console.error('Failed to parse raw response as JSON:', e);
      throw new Error('Backend returned non-JSON response.');
    }

    let reportContent = null;

    // Scenario 1: Backend returns { "report": { ...actual_report_object... } }
    if (parsedData && typeof parsedData.report === 'object' && parsedData.report !== null) {
      reportContent = parsedData.report;
      console.log('Report content found in "report" key (object).');
    }
    // Scenario 2: Backend returns { "report": "{ ...actual_report_string... }" }
    else if (parsedData && typeof parsedData.report === 'string') {
      try {
        reportContent = JSON.parse(parsedData.report);
        console.log('Report content parsed from "report" key (string).');
      } catch (e) {
        console.error('Failed to parse report string from "report" key:', e);
      }
    }
    // Scenario 3: Backend returns { ...actual_report_object... } directly (as per user's example)
    else if (parsedData && typeof parsedData === 'object' && parsedData !== null &&
             parsedData.summary && parsedData.key_risks && parsedData.recommendations && parsedData.charts) {
      reportContent = parsedData;
      console.log('Report content found as direct object.');
    }
    // Scenario 4: Backend returns "{ ...actual_report_string... }" directly (less common, but robust)
    else if (typeof parsedData === 'string') {
        try {
            reportContent = JSON.parse(parsedData);
            console.log('Report content parsed from direct string.');
        } catch (e) {
            console.error('Failed to parse direct string as report content:', e);
        }
    }

    // Validate the extracted reportContent
    if (reportContent && reportContent.summary && Array.isArray(reportContent.key_risks) &&
        Array.isArray(reportContent.recommendations) && reportContent.charts) {
      console.log('Valid report content extracted:', reportContent);
      return { report: reportContent }; // Always return wrapped
    } else {
      console.error('Extracted data does not match expected report structure:', reportContent);
      throw new Error('Backend response has an unexpected report structure.');
    }

  } catch (error) {
    console.error('Error in generateBackendReport:', error);
    throw error;
  }
};

// Mock function for testing when backend is not available
export const generateMockBackendReport = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    report: {
      summary: "Victoria shows rapid growth in Wyndham, Melbourne, and Melton LGAs with significant infrastructure challenges. The data indicates a projected population increase of 100,000 people requiring 45,000 new dwellings across these regions.",
      key_risks: [
        "High population increase in growth corridors",
        "Severe infrastructure strain in Wyndham",
        "Housing stress reaching critical levels in Melbourne",
        "Insufficient transport infrastructure in Melton"
      ],
      recommendations: [
        {
          "lga": "Wyndham",
          "recommendation": "Invest in transport infrastructure and schools to accommodate rapid population growth"
        },
        {
          "lga": "Melbourne",
          "recommendation": "Increase housing density in CBD and implement affordable housing initiatives"
        },
        {
          "lga": "Melton",
          "recommendation": "Develop comprehensive urban planning strategy with focus on public transport"
        }
      ],
      charts: {
        population_growth: [
          { lga: "Wyndham", current_population: 250000, projected_population: 295000, growth_percentage: 18.0 },
          { lga: "Melbourne", current_population: 180000, projected_population: 205000, growth_percentage: 13.9 },
          { lga: "Melton", current_population: 120000, projected_population: 150000, growth_percentage: 25.0 }
        ],
        housing_data: [
          { lga: "Wyndham", new_dwellings: 18000, housing_stress: "Severe", affordability_index: 0.3 },
          { lga: "Melbourne", new_dwellings: 12000, housing_stress: "High", affordability_index: 0.4 },
          { lga: "Melton", new_dwellings: 15000, housing_stress: "High", affordability_index: 0.5 }
        ],
        infrastructure_strain: [
          { lga: "Wyndham", strain_level: "Severe", transport_capacity: 0.2, school_capacity: 0.3, health_capacity: 0.4 },
          { lga: "Melbourne", strain_level: "Medium", transport_capacity: 0.6, school_capacity: 0.7, health_capacity: 0.8 },
          { lga: "Melton", strain_level: "High", transport_capacity: 0.4, school_capacity: 0.5, health_capacity: 0.6 }
        ]
      }
    }
  };
};

// Main function that tries backend first, falls back to mock
export const getBackendReport = async (permitData) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  
  try {
    // Try to connect to backend
    const response = await fetch(`${backendUrl}/health`, { 
      method: 'GET',
      timeout: 3000 
    });
    
    if (response.ok) {
      console.log('Backend is available, using real API');
      const result = await generateBackendReport(permitData);
      console.log('Real backend result:', result);
      
      // Ensure the result has the expected structure
      if (result && result.report) {
        return result;
      } else if (result && result.summary && result.key_risks && result.recommendations && result.charts) {
        // If the result itself has the report structure, wrap it
        console.log('Result has report structure, wrapping in report object');
        return { report: result };
      } else {
        console.log('Backend result missing report structure, using mock data');
        return await generateMockBackendReport();
      }
    }
  } catch (error) {
    console.log('Backend not available, using mock data');
  }
  
  // Fallback to mock data
  console.log('Using mock data');
  return await generateMockBackendReport();
};
