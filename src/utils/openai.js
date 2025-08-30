// OpenAI API Integration Utility
// Replace with your actual OpenAI API key
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here';

const OPENAI_API_URL = 'https://api.perplexity.ai/chat/completions';

/**
 * Generate AI insights using OpenAI API
 * @param {string} userInput - The user's input/data description
 * @param {string} context - Additional context about the project/data
 * @returns {Promise<string>} - AI generated response
 */
export const generateAIInsights = async (userInput, context = '') => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
             body: JSON.stringify({
         model: 'llama-3.1-sonar-large-128k-online',
         messages: [
           {
             role: 'system',
             content: `You are an expert urban planning and infrastructure analyst for the CoBuild project. 
             You provide detailed, actionable insights based on data analysis. 
             Focus on housing, population growth, infrastructure strain, and development recommendations.
             Always provide structured responses with clear sections for findings, recommendations, and priority areas.
             Use bullet points and numbered lists for clarity.`
           },
           {
             role: 'user',
             content: `Context: ${context}\n\nUser Data/Question: ${userInput}\n\nPlease provide comprehensive analysis and recommendations.`
           }
         ],
         max_tokens: 1000,
         temperature: 0.7,
       }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate AI insights. Please check your API key and try again.');
  }
};

/**
 * Generate a summary report using OpenAI
 * @param {Object} data - The data to summarize
 * @returns {Promise<string>} - Generated summary
 */
export const generateSummaryReport = async (data) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
             body: JSON.stringify({
         model: 'llama-3.1-sonar-large-128k-online',
         messages: [
           {
             role: 'system',
             content: `You are a professional report writer for urban development projects. 
             Create concise, well-structured summaries that highlight key findings and trends.`
           },
           {
             role: 'user',
             content: `Please create a summary report based on this data: ${JSON.stringify(data)}`
           }
         ],
         max_tokens: 500,
         temperature: 0.5,
       }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate summary report.');
  }
};

/**
 * Generate recommendations based on data analysis
 * @param {Object} analysisData - The analysis data
 * @returns {Promise<string>} - Generated recommendations
 */
export const generateRecommendations = async (analysisData) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
             body: JSON.stringify({
         model: 'llama-3.1-sonar-large-128k-online',
         messages: [
           {
             role: 'system',
             content: `You are an expert urban planner providing actionable recommendations. 
             Focus on practical, implementable solutions for housing, infrastructure, and community development.
             Organize recommendations by priority and timeline (immediate, short-term, long-term).`
           },
           {
             role: 'user',
             content: `Based on this analysis data, provide specific recommendations: ${JSON.stringify(analysisData)}`
           }
         ],
         max_tokens: 800,
         temperature: 0.6,
       }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate recommendations.');
  }
};

/**
 * Mock function for development/testing when API key is not available
 * @param {string} userInput - The user's input
 * @returns {Promise<string>} - Mock response
 */
export const generateMockAIInsights = async (userInput) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `Based on the data you've provided, here are my AI-generated insights:

🔍 **Key Findings:**
• Population growth trends indicate a 5.2% increase over the next 5 years
• Housing stress levels are projected to reach critical levels by 2027
• Infrastructure capacity will be exceeded by 2026 at current growth rates

📊 **Recommendations:**
1. **Immediate Actions:**
   - Implement zoning reforms to increase housing density
   - Accelerate infrastructure projects in high-growth areas
   - Establish public-private partnerships for housing development

2. **Medium-term Strategies:**
   - Develop satellite communities with proper infrastructure
   - Invest in smart city technologies for better resource management
   - Create incentives for sustainable development practices

3. **Long-term Planning:**
   - Establish comprehensive urban planning frameworks
   - Invest in renewable energy infrastructure
   - Develop resilient transportation networks

🎯 **Priority Areas:**
• Focus on affordable housing initiatives
• Strengthen public transportation systems
• Enhance digital infrastructure for remote work capabilities

This analysis is based on current trends and predictive modeling. Regular updates are recommended as new data becomes available.`;
};

// Export a function that uses real API if key is available, otherwise uses mock
export const getAIInsights = async (userInput, context = '') => {
  console.log('API Key check:', OPENAI_API_KEY ? 'Present' : 'Missing');
  console.log('API Key value:', OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 10) + '...' : 'None');
  
  if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your-openai-api-key-here' && OPENAI_API_KEY.length > 20) {
    console.log('Using real OpenAI API');
    return await generateAIInsights(userInput, context);
  } else {
    console.warn('Using mock AI insights. Set REACT_APP_OPENAI_API_KEY for real API integration.');
    console.warn('Current API key status:', OPENAI_API_KEY ? 'Invalid format' : 'Not set');
    return await generateMockAIInsights(userInput);
  }
};
