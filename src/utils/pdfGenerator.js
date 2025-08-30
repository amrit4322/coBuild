import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (reportData) => {
  try {
    // Create a temporary container for the PDF content
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = '800px';
    pdfContainer.style.backgroundColor = '#FBDB93';
    pdfContainer.style.padding = '20px';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    
    // Generate the PDF content HTML
    const pdfContent = generatePDFContent(reportData);
    pdfContainer.innerHTML = pdfContent;
    
    // Add to document temporarily
    document.body.appendChild(pdfContainer);
    
    // Convert to canvas
    const canvas = await html2canvas(pdfContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FBDB93',
      width: 800,
      height: pdfContainer.scrollHeight
    });
    
    // Remove temporary container
    document.body.removeChild(pdfContainer);
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    pdf.save(`CoBuild-Report-${timestamp}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

const generatePDFContent = (reportData) => {
  const formatNumber = (num) => num ? num.toLocaleString() : '0';
  
  return `
    <div style="font-family: Arial, sans-serif; color: #641B2E;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #BE5B50; padding-bottom: 20px;">
        <h1 style="color: #641B2E; margin: 0; font-size: 32px;">🏗️ CoBuild</h1>
        <h2 style="color: #8A2D3B; margin: 10px 0; font-size: 24px;">Comprehensive Development Report</h2>
        <p style="color: #8A2D3B; margin: 5px 0; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <!-- Executive Summary -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">📊 Executive Summary</h3>
        <p style="color: #641B2E; line-height: 1.6; margin: 0; font-size: 14px;">
          ${reportData?.summary || 'No summary available'}
        </p>
      </div>
      
      <!-- Key Risks -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">⚠️ Key Risks</h3>
        <ul style="color: #641B2E; line-height: 1.6; margin: 0; padding-left: 20px; font-size: 14px;">
          ${reportData?.key_risks?.map(risk => `<li>${risk}</li>`).join('') || '<li>No risks identified</li>'}
        </ul>
      </div>
      
      <!-- AI Recommendations -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">🤖 AI-Generated Recommendations</h3>
        ${reportData?.recommendations?.map((rec, index) => `
          <div style="margin-bottom: 15px; padding: 15px; background-color: #FBDB93; border-radius: 6px; border-left: 4px solid #BE5B50;">
            <h4 style="color: #641B2E; margin: 0 0 8px 0; font-size: 16px;">${rec.lga} - Priority ${index + 1}</h4>
            <p style="color: #8A2D3B; margin: 0; font-size: 14px; line-height: 1.5;">${rec.recommendation}</p>
          </div>
        `).join('') || '<p style="color: #641B2E; font-size: 14px;">No recommendations available</p>'}
      </div>
      
      <!-- Population Growth Data -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">📈 Population Growth Analysis</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background-color: #BE5B50; color: white;">
              <th style="padding: 10px; text-align: left; border: 1px solid #8A2D3B;">LGA</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #8A2D3B;">Current Population</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #8A2D3B;">Projected Population</th>
              <th style="padding: 10px; text-align: center; border: 1px solid #8A2D3B;">Growth %</th>
            </tr>
          </thead>
          <tbody>
            ${reportData?.charts?.population_growth?.map(item => `
              <tr style="border-bottom: 1px solid #FBDB93;">
                <td style="padding: 10px; color: #641B2E; font-weight: bold; border: 1px solid #FBDB93;">${item.lga}</td>
                <td style="padding: 10px; text-align: right; color: #8A2D3B; border: 1px solid #FBDB93;">${formatNumber(item.current_population)}</td>
                <td style="padding: 10px; text-align: right; color: #8A2D3B; border: 1px solid #FBDB93;">${formatNumber(item.projected_population)}</td>
                <td style="padding: 10px; text-align: center; color: #641B2E; font-weight: bold; border: 1px solid #FBDB93;">${item.growth_percentage}%</td>
              </tr>
            `).join('') || '<tr><td colspan="4" style="padding: 10px; text-align: center; color: #641B2E;">No population data available</td></tr>'}
          </tbody>
        </table>
      </div>
      
      <!-- Housing Data -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">🏠 Housing Analysis</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background-color: #BE5B50; color: white;">
              <th style="padding: 10px; text-align: left; border: 1px solid #8A2D3B;">LGA</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #8A2D3B;">New Dwellings</th>
              <th style="padding: 10px; text-align: center; border: 1px solid #8A2D3B;">Housing Stress</th>
              <th style="padding: 10px; text-align: center; border: 1px solid #8A2D3B;">Affordability Index</th>
            </tr>
          </thead>
          <tbody>
            ${reportData?.charts?.housing_data?.map(item => `
              <tr style="border-bottom: 1px solid #FBDB93;">
                <td style="padding: 10px; color: #641B2E; font-weight: bold; border: 1px solid #FBDB93;">${item.lga}</td>
                <td style="padding: 10px; text-align: right; color: #8A2D3B; border: 1px solid #FBDB93;">${formatNumber(item.new_dwellings)}</td>
                <td style="padding: 10px; text-align: center; border: 1px solid #FBDB93;">
                  <span style="background-color: ${item.housing_stress === 'Severe' ? '#BE5B50' : item.housing_stress === 'High' ? '#8A2D3B' : '#641B2E'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px;">${item.housing_stress}</span>
                </td>
                <td style="padding: 10px; text-align: center; color: #8A2D3B; border: 1px solid #FBDB93;">${Math.round(item.affordability_index * 100)}%</td>
              </tr>
            `).join('') || '<tr><td colspan="4" style="padding: 10px; text-align: center; color: #641B2E;">No housing data available</td></tr>'}
          </tbody>
        </table>
      </div>
      
      <!-- Infrastructure Strain -->
      <div style="margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; border: 2px solid #BE5B50;">
        <h3 style="color: #BE5B50; margin: 0 0 15px 0; font-size: 20px;">🗺️ Infrastructure Strain Analysis</h3>
        ${reportData?.charts?.infrastructure_strain?.map(item => `
          <div style="margin-bottom: 20px; padding: 15px; background-color: #FBDB93; border-radius: 6px; border: 1px solid #BE5B50;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <h4 style="color: #641B2E; margin: 0; font-size: 16px;">${item.lga}</h4>
              <span style="background-color: ${item.strain_level === 'Severe' ? '#BE5B50' : item.strain_level === 'High' ? '#8A2D3B' : '#641B2E'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${item.strain_level} Strain</span>
            </div>
            <div style="display: flex; justify-content: space-around; text-align: center;">
              <div>
                <div style="color: #641B2E; font-size: 12px; font-weight: bold; margin-bottom: 5px;">Transport</div>
                <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #FBDB93; border: 3px solid #BE5B50; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 10px; color: #641B2E; font-weight: bold;">${Math.round(item.transport_capacity * 100)}%</div>
              </div>
              <div>
                <div style="color: #641B2E; font-size: 12px; font-weight: bold; margin-bottom: 5px;">Schools</div>
                <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #FBDB93; border: 3px solid #BE5B50; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 10px; color: #641B2E; font-weight: bold;">${Math.round(item.school_capacity * 100)}%</div>
              </div>
              <div>
                <div style="color: #641B2E; font-size: 12px; font-weight: bold; margin-bottom: 5px;">Healthcare</div>
                <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #FBDB93; border: 3px solid #BE5B50; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 10px; color: #641B2E; font-weight: bold;">${Math.round(item.health_capacity * 100)}%</div>
              </div>
            </div>
          </div>
        `).join('') || '<p style="color: #641B2E; font-size: 14px;">No infrastructure data available</p>'}
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #BE5B50;">
        <p style="color: #8A2D3B; margin: 5px 0; font-size: 12px;">CoBuild - Urban Development & Infrastructure Planning Platform</p>
        <p style="color: #8A2D3B; margin: 5px 0; font-size: 12px;">GovHack 2025 Project</p>
        <p style="color: #8A2D3B; margin: 5px 0; font-size: 12px;">Generated on ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;
};
