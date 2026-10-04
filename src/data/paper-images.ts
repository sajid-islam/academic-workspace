/**
 * Generates authentic, high-resolution SVG data-URIs representing real scanned/photographed
 * university examination question paper pages for CSE Fall 2026 and past years.
 */
export function generateExamPaperImage({
  courseCode,
  courseTitle,
  examType,
  year,
  term,
  pageNumber,
  totalPages,
  questions,
  seal = "NWU-CSE",
}: {
  courseCode: string;
  courseTitle: string;
  examType: string;
  year: number;
  term?: string;
  pageNumber: number;
  totalPages: number;
  questions: { num: string; text: string; marks: string; subCode?: string }[];
  seal?: string;
}): string {
  const questionsSvg = questions
    .map((q, idx) => {
      const yOffset = 380 + idx * 160;
      return `
      <g transform="translate(60, ${yOffset})">
        <text x="0" y="0" font-family="'Courier New', monospace, serif" font-size="16" font-weight="bold" fill="#1e293b">${q.num}</text>
        <foreignObject x="45" y="-14" width="600" height="90">
          <p xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Times New Roman', serif; font-size: 15px; line-height: 1.45; color: #1e293b; margin: 0;">
            ${q.text}
          </p>
        </foreignObject>
        <text x="655" y="0" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="end">[${q.marks}]</text>
        ${
          q.subCode
            ? `
          <rect x="45" y="55" width="580" height="65" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-dasharray="2,2"/>
          <text x="60" y="76" font-family="'Courier New', monospace" font-size="12" fill="#0f172a">${q.subCode}</text>
        `
            : ""
        }
      </g>
    `;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1130" width="800" height="1130">
    <defs>
      <pattern id="paper-texture-${pageNumber}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="0.7"/>
      </pattern>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.08"/>
      </filter>
    </defs>

    <!-- Paper Sheet -->
    <rect width="800" height="1130" fill="#faf9f5"/>
    <rect x="15" y="15" width="770" height="1100" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" rx="2" filter="url(#shadow)"/>
    <rect x="25" y="25" width="750" height="1080" fill="url(#paper-texture-${pageNumber})" opacity="0.4"/>

    <!-- Subtle University Crest Watermark -->
    <g transform="translate(400, 560)" opacity="0.04" text-anchor="middle">
      <circle r="140" fill="none" stroke="#000000" stroke-width="8"/>
      <circle r="115" fill="none" stroke="#000000" stroke-width="3"/>
      <text y="10" font-family="'Times New Roman', serif" font-size="52" font-weight="bold">NWU</text>
      <text y="45" font-family="'Times New Roman', serif" font-size="20">DEPARTMENT OF CSE</text>
    </g>

    <!-- Top Paper Header -->
    <g transform="translate(400, 70)" text-anchor="middle">
      <text y="0" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" letter-spacing="1.5" fill="#0f172a">AHSANULLAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</text>
      <text y="24" font-family="'Times New Roman', serif" font-size="14" font-weight="600" fill="#334155">Department of Computer Science and Engineering</text>
      <text y="46" font-family="'Times New Roman', serif" font-size="15" font-weight="bold" fill="#0f172a">${examType.toUpperCase()} EXAMINATION, ${term || "FALL"} ${year}</text>
      <text y="68" font-family="'Times New Roman', serif" font-size="14" fill="#1e293b"><tspan font-weight="bold">Course Code:</tspan> ${courseCode}  |  <tspan font-weight="bold">Course Title:</tspan> ${courseTitle}</text>
    </g>

    <!-- Meta Info Line -->
    <line x1="60" y1="160" x2="740" y2="160" stroke="#0f172a" stroke-width="1.5"/>
    <g transform="translate(60, 182)" font-family="'Times New Roman', serif" font-size="13" fill="#334155">
      <text x="0" y="0"><tspan font-weight="bold">Full Marks:</tspan> 70</text>
      <text x="340" y="0" text-anchor="middle"><tspan font-weight="bold">Time:</tspan> 3 Hours</text>
      <text x="680" y="0" text-anchor="end"><tspan font-weight="bold">Page:</tspan> ${pageNumber} of ${totalPages}</text>
    </g>
    <line x1="60" y1="195" x2="740" y2="195" stroke="#cbd5e1" stroke-width="1"/>

    <!-- Exam Instructions -->
    <g transform="translate(60, 222)">
      <rect x="0" y="0" width="680" height="50" rx="3" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="15" y="20" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569">
        Instructions: Figures in the right margin indicate full marks. Answer Question 1 and any FOUR from the rest.
      </text>
      <text x="15" y="38" font-family="'Times New Roman', serif" font-size="12" font-style="italic" fill="#475569">
        Assume reasonable values for missing data. Programmable calculators are strictly forbidden.
      </text>
    </g>

    <!-- Questions Section Header -->
    <g transform="translate(400, 310)" text-anchor="middle">
      <text y="0" font-family="'Times New Roman', serif" font-size="15" font-weight="bold" letter-spacing="1" fill="#0f172a">SECTION — A</text>
      <line x1="-60" y1="8" x2="60" y2="8" stroke="#0f172a" stroke-width="1"/>
    </g>

    <!-- Questions Body -->
    ${questionsSvg}

    <!-- Footer -->
    <g transform="translate(400, 1070)" text-anchor="middle" font-family="'Times New Roman', serif" font-size="12" fill="#64748b">
      <line x1="-340" y1="-20" x2="340" y2="-20" stroke="#e2e8f0" stroke-width="1"/>
      <text y="0">— Page ${pageNumber} of ${totalPages} · Department of CSE · Session Fall 2026 Official Repository —</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
