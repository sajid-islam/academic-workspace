import { Subject } from "@/types/subject";

export const initialSubjects: Subject[] = [
  {
    id: "sub-cse1101",
    code: "CSE 1101",
    name: "Structured Programming",
    credit: 3.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500",
    },
    teacher: {
      name: "Prof. Dr. Mohammad Rashedul Islam",
      designation: "Professor & Head",
      email: "rashedul.cse@nwu.edu",
      officeRoom: "Room 704, Dept. of CSE",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    room: "Gallery 302, Academic Bldg 1",
    scheduleSummary: "Sun, Tue (08:30 AM - 09:50 AM)",
    counts: {
      questionPapers: 12,
      notes: 18,
      resources: 14,
    },
    description:
      "Fundamentals of structured programming using C/C++. Covers control structures, modular programming, memory management, pointers, dynamic allocation, structures, and file I/O operations.",
    syllabus: [
      {
        title: "Module 1: Procedural Fundamentals",
        topics: [
          "C syntax & compilers",
          "Data types and expressions",
          "Conditional logic",
          "Looping paradigms",
        ],
      },
      {
        title: "Module 2: Memory & Modularization",
        topics: [
          "Function calling conventions",
          "Recursion & call stack",
          "Arrays and multidimensional indexing",
          "Pointer arithmetic",
        ],
      },
      {
        title: "Module 3: Advanced Storage & Structures",
        topics: [
          "Dynamic memory (malloc/calloc/free)",
          "Custom structures and unions",
          "Linked data basics",
          "Binary & text file streams",
        ],
      },
    ],
  },
  {
    id: "sub-cse1103",
    code: "CSE 1103",
    name: "Digital Logic Design",
    credit: 3.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-500/30",
      dot: "bg-purple-500",
    },
    teacher: {
      name: "Dr. Shamim Ahmed",
      designation: "Associate Professor",
      email: "shamim.ahmed@nwu.edu",
      officeRoom: "Room 712, Academic Bldg 1",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    room: "Room 408, Academic Bldg 2",
    scheduleSummary: "Mon, Wed (10:00 AM - 11:20 AM)",
    counts: {
      questionPapers: 10,
      notes: 15,
      resources: 11,
    },
    description:
      "Number systems, Boolean algebra, logic gates, Karnaugh maps, combinational circuits (adders, multiplexers, decoders), and sequential circuits (flip-flops, registers, counters, finite state machines).",
    syllabus: [
      {
        title: "Module 1: Boolean Algebra & Gate Minimization",
        topics: [
          "Radix conversions & complements",
          "Boolean theorems & canonical forms",
          "K-Map 4/5-variable minimization",
          "Quine-McCluskey method",
        ],
      },
      {
        title: "Module 2: Combinational Logic Networks",
        topics: [
          "Full adders, ripple carry, CLA",
          "Decoders, encoders, priority encoders",
          "Multiplexers & Demultiplexers",
          "ALU design blocks",
        ],
      },
      {
        title: "Module 3: Sequential Logic & FSM",
        topics: [
          "Latches & Edge-triggered Flip-Flops (SR, JK, D, T)",
          "Shift registers & synchronous counters",
          "Mealy vs Moore finite state machines",
          "State reduction and assignment",
        ],
      },
    ],
  },
  {
    id: "sub-math1105",
    code: "MATH 1105",
    name: "Discrete Mathematics",
    credit: 3.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-blue-500/30",
      dot: "bg-blue-500",
    },
    teacher: {
      name: "Dr. Nusrat Parveen",
      designation: "Assistant Professor, Dept of Mathematics",
      email: "nusrat.math@nwu.edu",
      officeRoom: "Room 502, Science Bldg",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    room: "Room 402, Academic Bldg 2",
    scheduleSummary: "Mon, Wed (11:30 AM - 12:50 PM)",
    counts: {
      questionPapers: 9,
      notes: 14,
      resources: 12,
    },
    description:
      "Propositional and predicate calculus, mathematical proofs, set theory, relations and functions, graph theory, trees, combinatorics, recurrence relations, and Boolean structures essential for computing.",
    syllabus: [
      {
        title: "Module 1: Logic & Proof Techniques",
        topics: [
          "Propositional equivalences",
          "Predicates and quantifiers",
          "Direct, contrapositive, and contradiction proofs",
          "Mathematical induction",
        ],
      },
      {
        title: "Module 2: Relations, Functions & Counting",
        topics: [
          "Equivalence relations and partial orders",
          "Injective/surjective functions",
          "Pigeonhole principle & permutations",
          "Solving recurrence relations",
        ],
      },
      {
        title: "Module 3: Graph Theory & Trees",
        topics: [
          "Eulerian and Hamiltonian graphs",
          "Planarity and graph coloring",
          "Spanning trees & traversal algorithms",
          "Network flows",
        ],
      },
    ],
  },
  {
    id: "sub-eee1107",
    code: "EEE 1107",
    name: "Basic Electrical Circuit",
    credit: 3.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-500/30",
      dot: "bg-amber-500",
    },
    teacher: {
      name: "Engr. Tanvir Mahmud",
      designation: "Assistant Professor, EEE",
      email: "tanvir.eee@nwu.edu",
      officeRoom: "Room 610, EEE Bldg",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    room: "Room 501, Academic Bldg 1",
    scheduleSummary: "Tue, Thu (10:00 AM - 11:20 AM)",
    counts: {
      questionPapers: 8,
      notes: 11,
      resources: 9,
    },
    description:
      "DC and AC circuit laws: Ohm's law, Kirchhoff's laws (KVL, KCL), Node and Mesh analysis, Thevenin's and Norton's theorems, Superposition, maximum power transfer, resonance, phasors, and transient RL/RC analysis.",
    syllabus: [
      {
        title: "Module 1: DC Resistive Circuits",
        topics: [
          "KCL and KVL in multi-loop circuits",
          "Nodal & Mesh analysis with dependent sources",
          "Thevenin & Norton equivalent circuits",
          "Maximum power transfer theorem",
        ],
      },
      {
        title: "Module 2: Transient Analysis & Storage Elements",
        topics: [
          "Capacitors & Inductors v-i relationships",
          "First-order RC and RL transient step responses",
          "Time constants and energy dissipation",
          "Second order RLC introduction",
        ],
      },
      {
        title: "Module 3: Sinusoidal AC Circuit Analysis",
        topics: [
          "Phasor transformation & impedance",
          "AC mesh/nodal analysis",
          "Average and complex power, power factor",
          "Series and parallel resonance",
        ],
      },
    ],
  },
  {
    id: "sub-me1109",
    code: "ME 1109",
    name: "Mechanics & Heat Engineering",
    credit: 3.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      text: "text-rose-700 dark:text-rose-400",
      border: "border-rose-500/30",
      dot: "bg-rose-500",
    },
    teacher: {
      name: "Dr. Kazi Mostafa Kamal",
      designation: "Associate Professor, ME",
      email: "mostafa.me@nwu.edu",
      officeRoom: "Room 304, Mechanical Workshop Bldg",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
    room: "Room 405, Academic Bldg 2",
    scheduleSummary: "Sun, Wed (01:00 PM - 02:20 PM)",
    counts: {
      questionPapers: 7,
      notes: 8,
      resources: 7,
    },
    description:
      "Statics of particles and rigid bodies, equilibrium, friction, centroids, moment of inertia. Thermodynamics concepts, first and second laws of thermodynamics, heat engines, Carnot cycle, and refrigeration.",
    syllabus: [
      {
        title: "Module 1: Statics & Equilibrium",
        topics: [
          "Force vectors & equilibrium of particles",
          "Free-body diagrams of rigid structures",
          "Friction and impending motion",
          "Centroids and moments of inertia",
        ],
      },
      {
        title: "Module 2: First Law of Thermodynamics",
        topics: [
          "Thermodynamic systems and boundaries",
          "Work and heat transfer mechanisms",
          "Internal energy & enthalpy in closed/open systems",
          "Steady-flow energy equations",
        ],
      },
      {
        title: "Module 3: Second Law & Thermal Cycles",
        topics: [
          "Heat engines & refrigerators",
          "Kelvin-Planck and Clausius statements",
          "Carnot theorem and reversible cycles",
          "Entropy calculations",
        ],
      },
    ],
  },
  {
    id: "sub-hum1111",
    code: "HUM 1111",
    name: "Technical English & Communication",
    credit: 2.0,
    type: "Theory",
    colorBadge: {
      bg: "bg-teal-500/10 dark:bg-teal-500/20",
      text: "text-teal-700 dark:text-teal-400",
      border: "border-teal-500/30",
      dot: "bg-teal-500",
    },
    teacher: {
      name: "Farhana Sultana",
      designation: "Senior Lecturer, Dept of Humanities",
      email: "farhana.hum@nwu.edu",
      officeRoom: "Room 415, Humanities Bldg",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    room: "Language Lab 2, Academic Bldg 1",
    scheduleSummary: "Thu (08:30 AM - 10:30 AM)",
    counts: {
      questionPapers: 6,
      notes: 10,
      resources: 8,
    },
    description:
      "Technical writing principles, engineering report structuring, scientific documentation, research paper abstracts, formal presentations, CV/resume development, and interpersonal communication in engineering teams.",
    syllabus: [
      {
        title: "Module 1: Technical Writing Mechanics",
        topics: [
          "Conciseness and clarity in technical prose",
          "Audience analysis and technical tone",
          "Document formatting & citations",
          "Executive summaries",
        ],
      },
      {
        title: "Module 2: Professional Communication",
        topics: [
          "Formal email correspondence",
          "Engineering progress reports",
          "Technical proposals",
          "Presentation slide structuring",
        ],
      },
    ],
  },
];
