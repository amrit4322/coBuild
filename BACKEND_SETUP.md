# Backend Integration Setup

## Overview
This project now includes a FastAPI backend that generates AI-powered reports from permit data. The backend integrates with OpenAI to analyze housing, population, and infrastructure data.

## Backend Features

### 1. Health Check Endpoint
- **GET** `/health` - Check if backend is running
- Returns: `{"status": "healthy", "message": "Backend is running"}`

### 2. Report Generation Endpoint
- **POST** `/generate-report` - Generate AI analysis from permit data
- Input: JSON with `permitData` array
- Output: AI-generated report with summary, risks, and recommendations

## Setup Instructions

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Environment Variables
Create a `.env` file in the root directory:
```bash
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Run the Backend
```bash
uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

### 4. Test the Backend
```bash
# Health check
curl http://localhost:8000/health

# Generate report
curl -X POST http://localhost:8000/generate-report \
  -H "Content-Type: application/json" \
  -d '{"permitData": [{"lga": "Wyndham", "projected_population_increase": 45000, "new_dwellings": 18000, "infrastructure_strain": "High", "housing_stress": "Severe"}]}'
```

## Frontend Integration

The React frontend automatically:
1. **Checks backend availability** on page load
2. **Uses real backend** if available
3. **Falls back to mock data** if backend is unavailable
4. **Displays loading states** during API calls
5. **Shows error messages** if API fails

## Expected Response Format

The backend returns data in this structure:
```json
{
  "report": {
    "summary": "Victoria shows rapid growth in Wyndham, Melbourne, and Melton LGAs...",
    "key_risks": [
      "High population increase in growth corridors",
      "Severe infrastructure strain in Wyndham"
    ],
    "recommendations": [
      {
        "lga": "Wyndham",
        "recommendation": "Invest in transport and schools"
      },
      {
        "lga": "Melbourne", 
        "recommendation": "Increase housing density in CBD"
      }
    ]
  }
}
```

## Troubleshooting

### Backend Won't Start
- Check if port 8000 is available
- Verify Python dependencies are installed
- Ensure `.env` file exists with valid API key

### Frontend Can't Connect
- Verify backend is running on `http://localhost:8000`
- Check CORS settings in backend
- Look for network errors in browser console

### API Key Issues
- Ensure OpenAI API key is valid
- Check `.env` file format
- Verify API key has sufficient credits

## Development

### Adding New Endpoints
1. Add new route in `backend.py`
2. Update frontend utility in `src/utils/backend.js`
3. Test with curl or Postman
4. Update frontend components

### Modifying Report Format
1. Update the prompt in `generate_report` function
2. Adjust JSON parsing logic
3. Update frontend display components
4. Test with sample data
