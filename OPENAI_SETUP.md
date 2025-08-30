# OpenAI Integration Setup for CoBuild

This guide explains how to set up OpenAI integration in the CoBuild project for AI-powered insights and analysis.

## 🚀 Quick Setup

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in your dashboard
4. Create a new API key
5. Copy the API key (keep it secure!)

### 2. Configure Environment Variables

Create a `.env` file in the root directory of your project:

```bash
# .env
REACT_APP_OPENAI_API_KEY=your-actual-openai-api-key-here
```

**Important:** 
- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- The `REACT_APP_` prefix is required for React to recognize the environment variable

### 3. Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm start
```

## 🔧 How It Works

### Current Implementation

The OpenAI integration is currently implemented in:

1. **`src/utils/openai.js`** - Core API utility functions
2. **`src/components/Report.js`** - Report page with AI insights feature

### Features

- **AI-Powered Insights**: Users can input data descriptions and get AI-generated analysis
- **Urban Planning Focus**: Specialized prompts for housing, infrastructure, and development
- **Structured Responses**: Organized recommendations with clear sections
- **Fallback Mode**: Mock responses when API key is not available

### API Functions

```javascript
// Generate AI insights
import { getAIInsights } from '../utils/openai';

const response = await getAIInsights(userInput, context);

// Generate summary reports
import { generateSummaryReport } from '../utils/openai';

const summary = await generateSummaryReport(data);

// Generate recommendations
import { generateRecommendations } from '../utils/openai';

const recommendations = await generateRecommendations(analysisData);
```

## 🎯 Usage Examples

### Basic Usage

1. Navigate to the Report page
2. Scroll to the "AI-Powered Insights" section
3. Enter your data description or question
4. Click "Generate AI Insights"
5. View the AI-generated analysis

### Example Inputs

```
"Population growth in Melbourne has increased by 15% over the last 5 years, 
with housing prices rising 25%. What are the implications for infrastructure planning?"

"Housing stress levels are at 85% in the CBD area. 
What immediate actions should be taken to address this crisis?"

"Infrastructure capacity is at 95% utilization. 
Provide recommendations for sustainable development strategies."
```

## 🔒 Security Best Practices

1. **API Key Protection**:
   - Never expose API keys in client-side code
   - Use environment variables
   - Consider using a backend proxy for production

2. **Rate Limiting**:
   - Implement rate limiting to prevent abuse
   - Monitor API usage and costs

3. **Input Validation**:
   - Validate user inputs before sending to API
   - Sanitize data to prevent injection attacks

## 💰 Cost Management

OpenAI API costs are based on:
- **Model used**: GPT-4 is more expensive than GPT-3.5
- **Tokens used**: Both input and output tokens count
- **API calls**: Each request incurs a cost

### Cost Optimization Tips

1. **Use appropriate models**: GPT-3.5 for simple tasks, GPT-4 for complex analysis
2. **Limit response length**: Set appropriate `max_tokens`
3. **Cache responses**: Store common queries to avoid repeated API calls
4. **Monitor usage**: Set up alerts for high usage

## 🛠️ Customization

### Modifying Prompts

Edit the system prompts in `src/utils/openai.js`:

```javascript
{
  role: 'system',
  content: `You are an expert urban planning and infrastructure analyst for the CoBuild project. 
  You provide detailed, actionable insights based on data analysis. 
  Focus on housing, population growth, infrastructure strain, and development recommendations.
  Always provide structured responses with clear sections for findings, recommendations, and priority areas.
  Use bullet points and numbered lists for clarity.`
}
```

### Adding New AI Features

1. Create new functions in `src/utils/openai.js`
2. Add UI components in the relevant pages
3. Update the styling to match the color palette

## 🚨 Troubleshooting

### Common Issues

1. **"Failed to generate AI insights"**
   - Check if API key is set correctly
   - Verify API key has sufficient credits
   - Check network connectivity

2. **"Using mock AI insights"**
   - API key not set or invalid
   - Check `.env` file configuration
   - Restart development server

3. **Rate limiting errors**
   - Implement delays between requests
   - Check OpenAI account limits
   - Consider upgrading API plan

### Debug Mode

Enable debug logging by adding to your `.env`:

```bash
REACT_APP_DEBUG=true
```

## 📈 Future Enhancements

Potential improvements for the AI integration:

1. **Backend Integration**: Move API calls to backend for better security
2. **Response Caching**: Cache common queries to reduce costs
3. **Multi-language Support**: Add support for different languages
4. **Advanced Analytics**: Integrate with data visualization tools
5. **Custom Models**: Fine-tune models for specific urban planning tasks

## 📞 Support

For issues with:
- **OpenAI API**: Contact OpenAI support
- **CoBuild Integration**: Check the project documentation
- **Setup Issues**: Review this guide and common troubleshooting steps

---

**Note**: This integration is designed for the GovHack 2025 CoBuild project. Ensure compliance with OpenAI's usage policies and your organization's data handling requirements.
