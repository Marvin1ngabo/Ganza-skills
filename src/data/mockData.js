export const departments = [
  { id: "HR", name: "Human Resources", readiness: 3.4 },
  { id: "FIN", name: "Finance", readiness: 2.8 },
  { id: "OPS", name: "Operations", readiness: 4.1 },
  { id: "IT", name: "Information Technology", readiness: 3.9 },
  { id: "MKT", name: "Marketing", readiness: 2.5 }
];

export const skills = [
  "Digital Literacy",
  "RRA Compliance",
  "Leadership",
  "Data Analysis",
  "Customer Service"
];

export const employees = [
  { id: 1, name: "Aline Uwase", department: "HR", scores: { "Digital Literacy": 3, "RRA Compliance": 4, "Leadership": 2, "Data Analysis": 2, "Customer Service": 5 } },
  { id: 2, name: "Emmanuel Niyonzima", department: "FIN", scores: { "Digital Literacy": 2, "RRA Compliance": 3, "Leadership": 3, "Data Analysis": 4, "Customer Service": 2 } },
  { id: 3, name: "Diane Ingabire", department: "OPS", scores: { "Digital Literacy": 4, "RRA Compliance": 3, "Leadership": 5, "Data Analysis": 3, "Customer Service": 4 } },
  { id: 4, name: "Claude Hirwa", department: "IT", scores: { "Digital Literacy": 5, "RRA Compliance": 2, "Leadership": 3, "Data Analysis": 4, "Customer Service": 3 } },
  { id: 5, name: "Bella Iritare", department: "MKT", scores: { "Digital Literacy": 3, "RRA Compliance": 2, "Leadership": 2, "Data Analysis": 2, "Customer Service": 5 } },
  { id: 6, name: "Patrick Mugisha", department: "OPS", scores: { "Digital Literacy": 4, "RRA Compliance": 3, "Leadership": 4, "Data Analysis": 5, "Customer Service": 3 } },
  { id: 7, name: "Nadine Umutoni", department: "HR", scores: { "Digital Literacy": 3, "RRA Compliance": 4, "Leadership": 3, "Data Analysis": 3, "Customer Service": 4 } },
  { id: 8, name: "Eric Ndereyehe", department: "IT", scores: { "Digital Literacy": 5, "RRA Compliance": 3, "Leadership": 4, "Data Analysis": 5, "Customer Service": 2 } },
  { id: 9, name: "Salome Mukamana", department: "FIN", scores: { "Digital Literacy": 2, "RRA Compliance": 5, "Leadership": 3, "Data Analysis": 4, "Customer Service": 3 } },
  { id: 10, name: "Ishimwe Ganza", department: "MKT", scores: { "Digital Literacy": 4, "RRA Compliance": 2, "Leadership": 3, "Data Analysis": 3, "Customer Service": 4 } }
];

export function computeSkillGaps(allEmployees, skillList) {
  const averages = skillList.map((skill) => {
    const total = allEmployees.reduce((sum, e) => sum + (e.scores[skill] ?? 0), 0);
    return { skill, avg: total / allEmployees.length };
  });
  return averages
    .sort((a, b) => a.avg - b.avg)
    .slice(0, 3)
    .map((s) => ({ skill: s.skill, avg: Number(s.avg.toFixed(1)) }));
}
