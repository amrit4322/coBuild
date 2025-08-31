import React, { useState, useEffect } from "react";
import { Download, Robot, Lightning, Lightbulb, GraphUp, FileText, ExclamationTriangle, CheckCircle } from "react-bootstrap-icons";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAIInsights } from "../utils/openai";
import { getBackendReport } from "../utils/backend";
import { generatePDF } from "../utils/pdfGenerator";

const ReportPage = () => {
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Backend report states
  const [backendReport, setBackendReport] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState("");
  
  // PDF download states
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState("");

  // OpenAI API integration
  const generateAIInsights = async (input) => {
    setIsLoading(true);
    setError("");
    
    try {
      const context = "CoBuild is an urban development and infrastructure planning platform for GovHack 2025. The project focuses on analyzing housing, population growth, and infrastructure data to provide actionable insights for city planning and development.";
      const response = await getAIInsights(input, context);
      setAiResponse(response);
    } catch (err) {
      setError("Failed to generate AI insights. Please try again.");
      console.error("AI Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (aiInput.trim()) {
      generateAIInsights(aiInput);
    }
  };

  // Backend report generation
  const generateBackendReport = async () => {
    setIsGeneratingReport(true);
    setReportError("");
    
    try {
      const responseData = await getBackendReport(); // This should now reliably return { report: actualReportObject }
      console.log("Backend responseData received by ReportPage:", responseData);
      
      if (responseData && responseData.report && typeof responseData.report === 'object') {
        setBackendReport(responseData.report);
      } else {
        // This else block should ideally not be hit if generateBackendReport is robust
        console.error("Invalid report structure received from backend utility:", responseData);
        setReportError("Invalid report data received from backend.");
      }
    } catch (err) {
      setReportError(`Failed to generate backend report: ${err.message || 'Unknown error'}. Please try again.`);
      console.error("Backend Report Error:", err);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // PDF download function
  const handleDownloadPDF = async () => {
    if (!backendReport) {
      setPdfError("No report data available. Please generate a report first.");
      return;
    }
    
    setIsGeneratingPDF(true);
    setPdfError("");
    
    try {
      await generatePDF(backendReport);
    } catch (err) {
      setPdfError(`Failed to generate PDF: ${err.message || 'Unknown error'}`);
      console.error("PDF Generation Error:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Auto-generate report on component mount
  useEffect(() => {
    generateBackendReport();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-4" style={{ backgroundColor: '#FBDB93' }}>
      {/* NAVBAR */}
      <Navbar expand="lg" className="navbar-enhanced mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-enhanced">
            <div className="brand-icon-wrapper">
              <div className="brand-icon">🏗️</div>
            </div>
            <span className="brand-text">CoBuild</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="nav-enhanced ">
              <Nav.Link as={Link} to="/" className="nav-link-enhanced">
                Home
              </Nav.Link>
              
              <Nav.Link as={Link} to="/dashboard" className="nav-link-enhanced">
                Dashboard
              </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid="lg">
        {/* Header Section */}
        <Row className="align-items-center mb-4">
          <Col md={8}>
            <h1 className="fw-bold" style={{ color: '#641B2E' }}>Comprehensive Report</h1>
            <p style={{ color: '#8A2D3B' }}>
              Generated from Dashboard Data &amp; AI-Powered Insights
            </p>
          </Col>
                     <Col md={4} className="text-md-end mt-3 mt-md-0">
             <Button 
               variant="primary" 
               className="fw-bold"
               onClick={handleDownloadPDF}
               disabled={isGeneratingPDF || !backendReport}
               style={{ backgroundColor: '#BE5B50', borderColor: '#BE5B50' }}
             >
               {isGeneratingPDF ? (
                 <>
                   <Spinner animation="border" size="sm" className="me-2" />
                   Generating PDF...
                 </>
               ) : (
                 <>
                   <Download className="me-2" />
                   Download PDF Report
                 </>
               )}
             </Button>
             {pdfError && (
               <Alert variant="danger" className="mt-2" style={{ fontSize: '0.8rem' }}>
                 {pdfError}
               </Alert>
             )}
           </Col>
        </Row>

        <Row className="g-4">
          {/* Left Column - Key Metrics + Summary */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  <GraphUp className="me-2" />
                  Key Metrics
                </Card.Title>
                <div className="mt-3">
                  <h6 style={{ color: '#8A2D3B' }}>Population Growth</h6>
                  <p className="fs-4 fw-bold" style={{ color: '#641B2E' }}>5.2%</p>
                </div>
                <div className="mt-3">
                  <h6 style={{ color: '#8A2D3B' }}>Housing Stress</h6>
                  <p className="fs-4 fw-bold" style={{ color: '#641B2E' }}>High</p>
                </div>
                <div className="mt-3">
                  <h6 style={{ color: '#8A2D3B' }}>Infrastructure Strain</h6>
                  <p className="fs-4 fw-bold" style={{ color: '#641B2E' }}>Severe</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  <FileText className="me-2" />
                  Backend Report Summary
                </Card.Title>
                
                {isGeneratingReport ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span style={{ color: '#641B2E' }}>Generating Report...</span>
                  </div>
                ) : reportError ? (
                  <Alert variant="danger" className="mt-3">
                    {reportError}
                  </Alert>
                ) : backendReport ? (
                  <>
                    <Card.Text style={{ color: '#641B2E' }}>
                      {backendReport.summary}
                    </Card.Text>
                    
                                         <div className="mt-3">
                       <h6 style={{ color: '#8A2D3B' }}>
                         <ExclamationTriangle className="me-2" />
                         Key Risks
                       </h6>
                       <ListGroup className="mt-2">
                         {backendReport.key_risks && Array.isArray(backendReport.key_risks) && backendReport.key_risks.map((risk, index) => (
                           <ListGroup.Item 
                             key={index} 
                             style={{ 
                               backgroundColor: '#FBDB93',
                               color: '#641B2E',
                               border: '1px solid #BE5B50'
                             }}
                           >
                             {risk}
                           </ListGroup.Item>
                         ))}
                       </ListGroup>
                     </div>
                  </>
                ) : (
                  <Card.Text style={{ color: '#641B2E' }}>
                    No report data available. Click "Generate Report" to create a new analysis.
                  </Card.Text>
                )}
                
                <Button 
                  onClick={generateBackendReport}
                  disabled={isGeneratingReport}
                  className="mt-3 w-100"
                  style={{ 
                    backgroundColor: '#BE5B50', 
                    borderColor: '#BE5B50',
                    color: 'white'
                  }}
                >
                  {isGeneratingReport ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="me-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </Card.Body>
            </Card>

            {/* AI Insights Section */}
            <Card className="border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  <Robot className="me-2" />
                  AI-Powered Insights
                </Card.Title>
                <Form onSubmit={handleSubmit} className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#641B2E' }}>Describe your data or ask for insights:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Enter your data description, questions, or specific areas you'd like analyzed..."
                      style={{ 
                        borderColor: '#BE5B50',
                        backgroundColor: '#FBDB93',
                        color: '#641B2E'
                      }}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !aiInput.trim()}
                    className="w-100"
                    style={{ 
                      backgroundColor: '#BE5B50', 
                      borderColor: '#BE5B50',
                      color: 'white'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Generating Insights...
                      </>
                    ) : (
                      <>
                        <Lightning className="me-2" />
                        Generate AI Insights
                      </>
                    )}
                  </Button>
                </Form>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                {aiResponse && (
                  <div className="mt-3">
                    <Badge bg="success" className="mb-2">
                      <Robot className="me-1" />
                      AI Generated
                    </Badge>
                    <div 
                      className="p-3 rounded"
                      style={{ 
                        backgroundColor: '#FBDB93',
                        color: '#641B2E',
                        border: '1px solid #BE5B50'
                      }}
                    >
                      <pre style={{ 
                        whiteSpace: 'pre-wrap', 
                        fontFamily: 'inherit',
                        margin: 0
                      }}>
                        {aiResponse}
                      </pre>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Full Analysis + Charts */}
          <Col lg={8}>
            {/* Backend Recommendations */}
            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  <CheckCircle className="me-2" />
                  AI-Generated Recommendations
                </Card.Title>
                
                                 {backendReport && backendReport.recommendations && Array.isArray(backendReport.recommendations) ? (
                   <div>
                     {backendReport.recommendations.map((rec, index) => (
                      <Card 
                        key={index} 
                        className="mb-3"
                        style={{ 
                          backgroundColor: '#FBDB93',
                          border: '1px solid #BE5B50'
                        }}
                      >
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 style={{ color: '#641B2E', fontWeight: 'bold' }}>
                                {rec.lga}
                              </h6>
                              <p style={{ color: '#8A2D3B', margin: 0 }}>
                                {rec.recommendation}
                              </p>
                            </div>
                            <Badge 
                              bg="success" 
                              style={{ backgroundColor: '#BE5B50' }}
                            >
                              Priority {index + 1}
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card.Text style={{ color: '#641B2E' }}>
                    No recommendations available. Generate a report to see AI-powered recommendations.
                  </Card.Text>
                )}
              </Card.Body>
            </Card>

            {/* Population Growth Chart */}
            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  📈 Population Growth Chart
                </Card.Title>
                                 {backendReport && backendReport.charts && backendReport.charts.population_growth && Array.isArray(backendReport.charts.population_growth) ? (
                   <div className="mt-3">
                     {backendReport.charts.population_growth.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 style={{ color: '#641B2E', margin: 0 }}>{item.lga}</h6>
                          <Badge 
                            style={{ 
                              backgroundColor: item.growth_percentage > 20 ? '#BE5B50' : '#8A2D3B',
                              color: 'white'
                            }}
                          >
                            {item.growth_percentage}% Growth
                          </Badge>
                        </div>
                        <div className="d-flex justify-content-between text-sm mb-1">
                          <span style={{ color: '#8A2D3B' }}>Current: {item.current_population.toLocaleString()}</span>
                          <span style={{ color: '#8A2D3B' }}>Projected: {item.projected_population.toLocaleString()}</span>
                        </div>
                        <ProgressBar 
                          now={item.growth_percentage} 
                          max={30}
                          style={{ 
                            height: '8px',
                            backgroundColor: '#FBDB93'
                          }}
                          className="mb-2"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div style={{ color: '#641B2E' }}>Loading population data...</div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Housing Data Table */}
            <Card className="border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  🏠 Housing Data Table
                </Card.Title>
                                 {backendReport && backendReport.charts && backendReport.charts.housing_data && Array.isArray(backendReport.charts.housing_data) ? (
                   <div className="mt-3">
                     <div className="table-responsive">
                       <table className="table table-borderless">
                         <thead>
                           <tr style={{ borderBottom: '2px solid #BE5B50' }}>
                             <th style={{ color: '#641B2E', fontWeight: 'bold' }}>LGA</th>
                             <th style={{ color: '#641B2E', fontWeight: 'bold' }}>New Dwellings</th>
                             <th style={{ color: '#641B2E', fontWeight: 'bold' }}>Housing Stress</th>
                             <th style={{ color: '#641B2E', fontWeight: 'bold' }}>Affordability</th>
                           </tr>
                         </thead>
                         <tbody>
                           {backendReport.charts.housing_data.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #FBDB93' }}>
                              <td style={{ color: '#641B2E', fontWeight: 'bold' }}>{item.lga}</td>
                              <td style={{ color: '#8A2D3B' }}>{item.new_dwellings.toLocaleString()}</td>
                              <td>
                                <Badge 
                                  style={{ 
                                    backgroundColor: item.housing_stress === 'Severe' ? '#BE5B50' : 
                                                   item.housing_stress === 'High' ? '#8A2D3B' : '#641B2E',
                                    color: 'white'
                                  }}
                                >
                                  {item.housing_stress}
                                </Badge>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div 
                                    className="me-2" 
                                    style={{ 
                                      width: '60px', 
                                      height: '8px', 
                                      backgroundColor: '#FBDB93',
                                      borderRadius: '4px',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <div 
                                      style={{ 
                                        width: `${item.affordability_index * 100}%`, 
                                        height: '100%', 
                                        backgroundColor: '#BE5B50' 
                                      }}
                                    />
                                  </div>
                                  <span style={{ color: '#8A2D3B', fontSize: '0.9em' }}>
                                    {Math.round(item.affordability_index * 100)}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div style={{ color: '#641B2E' }}>Loading housing data...</div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Infrastructure Strain Map */}
            <Card className="border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: '#BE5B50' }}>
                  🗺️ Infrastructure Strain Map
                </Card.Title>
                                 {backendReport && backendReport.charts && backendReport.charts.infrastructure_strain && Array.isArray(backendReport.charts.infrastructure_strain) ? (
                   <div className="mt-3">
                     {backendReport.charts.infrastructure_strain.map((item, index) => (
                      <div key={index} className="mb-4 p-3" style={{ 
                        backgroundColor: '#FBDB93', 
                        borderRadius: '8px',
                        border: '1px solid #BE5B50'
                      }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 style={{ color: '#641B2E', margin: 0, fontWeight: 'bold' }}>{item.lga}</h6>
                          <Badge 
                            style={{ 
                              backgroundColor: item.strain_level === 'Severe' ? '#BE5B50' : 
                                             item.strain_level === 'High' ? '#8A2D3B' : '#641B2E',
                              color: 'white'
                            }}
                          >
                            {item.strain_level} Strain
                          </Badge>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-4">
                            <div className="text-center">
                              <div style={{ color: '#641B2E', fontSize: '0.9em', fontWeight: 'bold' }}>Transport</div>
                              <div className="mt-2">
                                <div 
                                  style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%',
                                    backgroundColor: '#FBDB93',
                                    border: '3px solid #BE5B50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    fontSize: '0.8em',
                                    color: '#641B2E',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {Math.round(item.transport_capacity * 100)}%
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="text-center">
                              <div style={{ color: '#641B2E', fontSize: '0.9em', fontWeight: 'bold' }}>Schools</div>
                              <div className="mt-2">
                                <div 
                                  style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%',
                                    backgroundColor: '#FBDB93',
                                    border: '3px solid #BE5B50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    fontSize: '0.8em',
                                    color: '#641B2E',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {Math.round(item.school_capacity * 100)}%
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="text-center">
                              <div style={{ color: '#641B2E', fontSize: '0.9em', fontWeight: 'bold' }}>Healthcare</div>
                              <div className="mt-2">
                                <div 
                                  style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%',
                                    backgroundColor: '#FBDB93',
                                    border: '3px solid #BE5B50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    fontSize: '0.8em',
                                    color: '#641B2E',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {Math.round(item.health_capacity * 100)}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div style={{ color: '#641B2E' }}>Loading infrastructure data...</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportPage;
