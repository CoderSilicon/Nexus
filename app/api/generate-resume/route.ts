import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeSchemaVals } from "@/lib/FormSchema";

// Initialize the Google Generative AI with your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const resumeData = data.resumeData as ResumeSchemaVals;

    // Extract name from firstName and lastName
    const name = `${resumeData.firstName || ""} ${
      resumeData.lastName || ""
    }`.trim();

    // Prepare skills as comma-separated string
    const skills = resumeData.skills ? resumeData.skills.join(", ") : "";

    // Format work experience
    const formattedExperience = resumeData.workExperience
      ? resumeData.workExperience
          .map((job: any) => {
            const startDate = job.startDate
              ? new Date(job.startDate).toLocaleDateString()
              : "";
            const endDate = job.endDate
              ? new Date(job.endDate).toLocaleDateString()
              : "Present";
            return `${job.position || ""} at ${
              job.company || ""
            }\n${startDate} - ${endDate}\n${job.description || ""}`;
          })
          .join("\n\n")
      : "";

    // Format education
    const formattedEducation = resumeData.education
      ? resumeData.education
          .map((edu: any) => {
            const startDate = edu.startDate
              ? new Date(edu.startDate).toLocaleDateString()
              : "";
            const endDate = edu.endDate
              ? new Date(edu.endDate).toLocaleDateString()
              : "Present";
            return `${edu.degree || ""} at ${
              edu.school || ""
            }\n${startDate} - ${endDate}\n${edu.description || ""}`;
          })
          .join("\n\n")
      : "";

    // Generate professional summary using Gemini 1.5 Flash model

    const prompt = `Generate a professional summary for a resume with the following details:
      Name: ${name}
      Job Title: ${resumeData.jobTitle || ""}
      Skills: ${skills}
      Experience: ${formattedExperience}
      Summary: ${resumeData.summary || ""}
      
      Create a concise, professional summary that highlights key strengths and career goals. The summary should be 2-3 paragraphs maximum.`;

    const result = await model.generateContent(prompt);
    const generatedContent = result.response.text();

    // Create a well-structured HTML template for the resume
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} - Resume</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #000;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
          }
          .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
          }
          h1 {
            color: #000;
            margin-bottom: 8px;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .contact-info {
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 500;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            color: #000;
            border-bottom: 1.5px solid #000;
            padding-bottom: 8px;
            margin-bottom: 12px;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .content {
            font-size: 14px;
          }
          ul {
            padding-left: 20px;
            margin-top: 8px;
            list-style-type: square;
          }
          li {
            margin-bottom: 6px;
          }
          .job-title {
            font-weight: bold;
            text-decoration: underline;
          }
          .location {
            font-weight: 500;
          }
          p {
            margin: 8px 0;
            text-align: justify;
          }
          .date {
            font-weight: bold;
          }
          @page {
            size: letter;
            margin: 0.5in;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${name}</h1>
          <div class="contact-info">
            ${resumeData.email || ""} ${
      resumeData.email && resumeData.phone ? "•" : ""
    } ${resumeData.phone || ""}
            ${resumeData.jobTitle ? ` • ${resumeData.jobTitle}` : ""}
            ${
              resumeData.city || resumeData.country
                ? ` • ${resumeData.city || ""} ${
                    resumeData.city && resumeData.country ? "," : ""
                  } ${resumeData.country || ""}`
                : ""
            }
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <div class="content">
            ${generatedContent
              .split("\n")
              .map((line) => `<p>${line}</p>`)
              .join("")}
          </div>
        </div>
        
        ${
          skills
            ? `
        <div class="section">
          <h2 class="section-title">Core Competencies</h2>
          <div class="content">
            ${formatSkills(skills)}
          </div>
        </div>
        `
            : ""
        }
        
        ${
          formattedExperience
            ? `
        <div class="section">
          <h2 class="section-title">Professional Experience</h2>
          <div class="content">
            ${formatExperience(formattedExperience)}
          </div>
        </div>
        `
            : ""
        }
        
        ${
          formattedEducation
            ? `
        <div class="section">
          <h2 class="section-title">Academic Background</h2>
          <div class="content">
            ${formatEducation(formattedEducation)}
          </div>
        </div>
        `
            : ""
        }
        
        ${
          resumeData.summary
            ? `
        <div class="section">
          <h2 class="section-title">Additional Qualifications</h2>
          <div class="content">
            <p>${resumeData.summary}</p>
          </div>
        </div>
        `
            : ""
        }
      </body>
      </html>
    `;

    // Send the HTML to AI for validation and improvement
    const validationPrompt = `
    Review the following HTML resume and return ONLY the corrected HTML. 
    Do not INCLUDE ANY commentary or explanation even starting like {'''html'''}. 
    If no corrections are needed, return the exact same HTML.
    
    HTML:
    ${htmlContent}
  `;

    const validationResult = await model.generateContent(validationPrompt);
    const validatedHtml = validationResult.response.text();

    // Use the validated HTML or fall back to original if AI response doesn't look like HTML
    const finalHtml = validatedHtml.includes("<!DOCTYPE html>")
      ? validatedHtml
      : htmlContent;

    // Launch a headless browser with minimal settings for serverless environment
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set content and wait for rendering
    await page.setContent(finalHtml, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    });

    await browser.close();

    // Return the PDF
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name.replace(
          /\s+/g,
          "_"
        )}_resume.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to generate PDF", details: errorMessage },
      { status: 500 }
    );
  }
}

// Helper functions to format content
function formatSkills(skills: string): string {
  if (!skills) return "";

  const skillsList = skills.split(/[,\n]/).filter((skill) => skill.trim());
  if (skillsList.length === 0) return skills;

  return `<ul>${skillsList
    .map((skill) => `<li>${skill.trim()}</li>`)
    .join("")}</ul>`;
}

function formatExperience(experience: string): string {
  if (!experience) return "";

  const paragraphs = experience.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      // Extract job title and company if available
      const lines = p.split("\n");
      if (lines.length >= 2) {
        const jobLine = lines[0];
        const dateLine = lines[1];
        const description = lines.slice(2).join("<br>");

        return `
        <div class="job-entry">
          <p class="job-title">${jobLine}</p>
          <p class="date">${dateLine}</p>
          <p>${description}</p>
        </div>
      `;
      }
      return `<p>${p.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function formatEducation(education: string): string {
  if (!education) return "";

  const paragraphs = education.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      // Extract degree and school if available
      const lines = p.split("\n");
      if (lines.length >= 2) {
        const degreeLine = lines[0];
        const dateLine = lines[1];
        const description = lines.slice(2).join("<br>");

        return `
        <div class="education-entry">
          <p class="job-title">${degreeLine}</p>
          <p class="date">${dateLine}</p>
          <p>${description}</p>
        </div>
      `;
      }
      return `<p>${p.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}
