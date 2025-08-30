# backend.py
import os
import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI Client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Request schema
class PermitDataRequest(BaseModel):
    permitData: list

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Backend is running"}

@app.post("/generate-report")
async def generate_report(request: PermitDataRequest):
    data = request.permitData
    
    # Optional: compute quick stats
    total_population = sum(item["projected_population_increase"] for item in data)
    total_dwellings = sum(item["new_dwellings"] for item in data)
    
    # Prompt for OpenAI
    prompt = f"""
You are a data analyst. Analyze the following council permit dataset and create a detailed report with visualizations:

- Identify regions with the highest growth, housing stress, and infrastructure strain.
- Highlight areas requiring urgent attention.
- Provide an executive summary and bullet-point recommendations.
- Generate chart data for population growth, housing data table, and infrastructure strain map.

Dataset:
{json.dumps(data, indent=2)}

Total projected population increase: {total_population}
Total new dwellings: {total_dwellings}

Respond in JSON with this format:
{{
  "summary": "Short executive summary",
  "key_risks": ["risk1", "risk2"],
  "recommendations": [
    {{"lga": "Melbourne", "recommendation": "Action item here"}}
  ],
  "charts": {{
    "population_growth": [
      {{"lga": "Wyndham", "current_population": 250000, "projected_population": 295000, "growth_percentage": 18.0}},
      {{"lga": "Melbourne", "current_population": 180000, "projected_population": 205000, "growth_percentage": 13.9}},
      {{"lga": "Melton", "current_population": 120000, "projected_population": 150000, "growth_percentage": 25.0}}
    ],
    "housing_data": [
      {{"lga": "Wyndham", "new_dwellings": 18000, "housing_stress": "Severe", "affordability_index": 0.3}},
      {{"lga": "Melbourne", "new_dwellings": 12000, "housing_stress": "High", "affordability_index": 0.4}},
      {{"lga": "Melton", "new_dwellings": 15000, "housing_stress": "High", "affordability_index": 0.5}}
    ],
    "infrastructure_strain": [
      {{"lga": "Wyndham", "strain_level": "Severe", "transport_capacity": 0.2, "school_capacity": 0.3, "health_capacity": 0.4}},
      {{"lga": "Melbourne", "strain_level": "Medium", "transport_capacity": 0.6, "school_capacity": 0.7, "health_capacity": 0.8}},
      {{"lga": "Melton", "strain_level": "High", "transport_capacity": 0.4, "school_capacity": 0.5, "health_capacity": 0.6}}
    ]
  }}
}}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=700,
        )
        
        content = response.choices[0].message.content

        # Try parsing into JSON
        try:
            result = json.loads(content)
        except json.JSONDecodeError:
            result = {"summary": content}  # fallback

        return {"report": result}

    except Exception as e:
        return {"error": str(e)}
