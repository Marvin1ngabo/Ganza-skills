import { useMemo, useState } from "react";
import { 
  LayoutDashboard, Table2, Users, GraduationCap, Globe, Building, Plus, Edit2, Trash2, Save, X, Brain, Target, Shield, BookOpen, BarChart3, TestTube,
  User, Search, Code, Activity, Clock, Star, Info, Play, Copy, Trash, Eye, ChevronLeft, ChevronRight,
  Zap, Flame, Award, CheckCircle, TrendingUp, Share2, Check
} from "lucide-react";
import { departments, skills, employees, computeSkillGaps } from "./data/mockData.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TEXTS = {
  en: {
    dashboard: "Dashboard",
    skillsMatrix: "Skills Matrix",
    employeeDirectory: "Employee Directory",
    employeeManagement: "Employee Management",
    learningPaths: "Learning Paths",
    departmentManagement: "Department Management",
    skillsManagement: "Skills Management",
    assessmentCenter: "Assessment Center",
    skillGapAnalysis: "Skill Gap Analysis",
    departmentReadiness: "Department Readiness",
    topSkillGaps: "Top 3 Skills Gaps",
    searchEmployees: "Search employees...",
    language: "Kinyarwanda",
    score: "Score",
    department: "Department",
    addDepartment: "Add Department",
    editDepartment: "Edit Department",
    deleteDepartment: "Delete Department",
    departmentName: "Department Name",
    readiness: "Readiness",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
    addNew: "Add New",
    adminPanel: "Admin Panel",
    employeeName: "Employee Name",
    skills: "Skills",
    addEmployee: "Add Employee",
    editEmployee: "Edit Employee",
    deleteEmployee: "Delete Employee",
    skillLevel: "Skill Level",
    skillName: "Skill Name",
    addSkill: "Add Skill",
    editSkill: "Edit Skill",
    deleteSkill: "Delete Skill",
    averageScore: "Average Score",
    totalEmployees: "Total Employees",
    adaptiveTesting: "Adaptive Testing",
    handsOnSandbox: "Hands-on Sandbox",
    situationalJudgement: "Situational Judgement",
    startAssessment: "Start Assessment",
    questionType: "Question Type",
    difficulty: "Difficulty",
    timeLimit: "Time Limit",
    proctoringEnabled: "Proctoring Enabled",
    antiCheating: "Anti-Cheating",
    aiProctoring: "AI Proctoring",
    browserLockdown: "Browser Lockdown",
    plagiarismDetection: "Plagiarism Detection",
    integrations: "Integrations",
    atsIntegration: "ATS Integration",
    lmsIntegration: "LMS Integration",
    contentLibrary: "Content Library",
    customQuestions: "Custom Questions",
    benchmarking: "Benchmarking",
    industryComparison: "Industry Comparison",
    proficiencyLevel: "Proficiency Level",
    individualAnalysis: "Individual Analysis",
    companyAnalysis: "Company Analysis",
    heatMap: "Heat Map",
    talentDensity: "Talent Density",
    skillMatrix: "Skill Matrix",
    assessmentResults: "Assessment Results",
    testHistory: "Test History",
    performanceMetrics: "Performance Metrics",
    adminDashboard: "Admin Dashboard",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    totalCourses: "Total Courses",
    completionRate: "Completion Rate",
    averageScore: "Average Score",
    topPerformingCourses: "Top Performing Courses",
    strugglingDepartments: "Struggling Departments",
    recentActivity: "Recent Activity",
    userManagement: "User Management",
    courseManagement: "Course Management",
    bulkActions: "Bulk Actions",
    enrollUsers: "Enroll Users",
    removeUsers: "Remove Users",
    exportData: "Export Data",
    importUsers: "Import Users",
    userActivity: "User Activity",
    courseProgress: "Course Progress",
    departmentAnalytics: "Department Analytics",
    skillTrends: "Skill Trends",
    enrollmentStats: "Enrollment Statistics",
    completionStats: "Completion Statistics",
    performanceAlerts: "Performance Alerts",
    auditLog: "Audit Log",
    systemSettings: "System Settings",
    notifications: "Notifications",
    reports: "Reports",
    analytics: "Analytics",
    courses: "Courses",
    enrollments: "Enrollments",
    completions: "Completions",
    performance: "Performance",
    trends: "Trends",
    alerts: "Alerts",
    settings: "Settings",
    logs: "Logs",
    // New user experience features
    skillPassport: "Skill Passport",
    discovery: "Discovery",
    marketplace: "Marketplace",
    activityFeed: "Activity Feed",
    practiceSandbox: "Practice Sandbox",
    powerLevel: "Power Level",
    verifiedSkills: "Verified Skills",
    skillRadar: "Skill Radar",
    growthHistory: "Growth History",
    voluntaryAssessments: "Voluntary Assessments",
    practiceTests: "Practice Tests",
    challengeTests: "Challenge Tests",
    learningPaths: "Learning Paths",
    trendingSkills: "Trending Skills",
    dailyStreak: "Daily Streak",
    upcomingMilestones: "Upcoming Milestones",
    peerBenchmarking: "Peer Benchmarking",
    codePlayground: "Code Playground",
    flashcards: "Flashcards",
    achievements: "Achievements",
    level: "Level",
    xp: "XP",
    badges: "Badges",
    streak: "Streak",
    rank: "Rank",
    topPercentile: "Top Percentile",
    skillVerified: "Skill Verified",
    takeChallenge: "Take Challenge",
    startPractice: "Start Practice",
    viewPath: "View Path",
    daysInARow: "days in a row",
    expiresIn: "expires in",
    refreshCertification: "Refresh Certification",
    warmUp: "Warm Up",
    quickQuestions: "Quick Questions",
    trendingInDepartment: "Trending in Your Department",
    skillJourney: "Skill Journey",
    currentLevel: "Current Level",
    nextMilestone: "Next Milestone",
    progressToNext: "Progress to Next",
    totalXP: "Total XP",
    weeklyGoal: "Weekly Goal",
    completedToday: "Completed Today",
    maintainStreak: "Maintain Streak",
    unlockAchievement: "Unlock Achievement",
    challengeYourself: "Challenge Yourself",
    exploreSkills: "Explore Skills",
    joinCommunity: "Join Community"
  },
  rw: {
    dashboard: "Ibibaho",
    skillsMatrix: "Imbonerahamwe y'Ubumenyi",
    employeeDirectory: "Urutonde rw'Abakozi",
    employeeManagement: "Ukuyobora Abakozi",
    learningPaths: "Inyigisho",
    departmentManagement: "Ukuyobora Amashami",
    skillsManagement: "Ukuyobora Ubumenyi",
    assessmentCenter: "Igihugu c'Ugerageza",
    skillGapAnalysis: "Gusubiramo amakuru y'Ubumenyi",
    departmentReadiness: "Uko Amashami yiteguye",
    topSkillGaps: "Imyanya 3 y'Ubumenyi ibura",
    searchEmployees: "Shakisha abakozi...",
    language: "English",
    score: "Amanota",
    department: "Ishami",
    addDepartment: "Ongeraho Ishami",
    editDepartment: "Hindura Ishami",
    deleteDepartment: "Siba Ishami",
    departmentName: "Izina ry'Ishami",
    readiness: "Ubugenzwe",
    actions: "Ibikorwa",
    save: "Bika",
    cancel: "Kuraho",
    addNew: "Ongeraho",
    adminPanel: "Urwego rwa Muyobozi",
    employeeName: "Izina ry'Umukozi",
    skills: "Ubumenyi",
    addEmployee: "Ongeraho Umukozi",
    editEmployee: "Hindura Umukozi",
    deleteEmployee: "Siba Umukozi",
    skillLevel: "Urwego r'Ubumenyi",
    skillName: "Izina ry'Ubumenyi",
    addSkill: "Ongeraho Ubumenyi",
    editSkill: "Hindura Ubumenyi",
    deleteSkill: "Siba Ubumenyi",
    averageScore: "Mwangavu",
    totalEmployees: "Umubare w'Abakozi",
    adaptiveTesting: "Ugerageza rwihangira",
    handsOnSandbox: "Ahagana mu gukora",
    situationalJudgement: "Ugerageza mu Mibereho",
    startAssessment: "Tangiza ugerageza",
    questionType: "Ubwoko bw'Ikibazo",
    difficulty: "Ububabare",
    timeLimit: "Igihe cy'akazi",
    proctoringEnabled: "Ukurikiranwa kuwugerageza",
    antiCheating: "Kwirinda kwihangira",
    aiProctoring: "AI ukurikiranwa",
    browserLockdown: "Gufunga Mucukumbuzi",
    plagiarismDetection: "Gusanga kwandika",
    integrations: "Zimyangiza",
    atsIntegration: "ATS zimyangiza",
    lmsIntegration: "LMS zimyangiza",
    contentLibrary: "Isomero ry'ibikubiyemo",
    customQuestions: "Ikibazo gihariye",
    benchmarking: "Kugereranya",
    industryComparison: "Kugereranya mu bucuruzi",
    proficiencyLevel: "Urwego r'ubumenyi",
    individualAnalysis: "Gusubiramo umuntu kuwundi",
    companyAnalysis: "Gusubiramo isosiyete",
    heatMap: "Karata y'Umuriro",
    talentDensity: "Ubusumbane bw'Abadufite",
    skillMatrix: "Imbonerahamwe y'Ubumenyi",
    assessmentResults: "Ibisubizo by'Ugerageza",
    testHistory: "Amateka y'Ugerageza",
    performanceMetrics: "ibipimo by'akazi",
    adminDashboard: "Ibibaho bya Muyobozi",
    totalUsers: "Umubare w'Abakoresha",
    activeUsers: "Abakoresha Bari Active",
    totalCourses: "Umubare w'Amasomo",
    completionRate: "Uwihangiro",
    averageScore: "Mwangavu",
    topPerformingCourses: "Amasomo Akora Nea",
    strugglingDepartments: "Amashami Afite Ikibazo",
    recentActivity: "Ibikorwa bya Vuba",
    userManagement: "Ukuyobora Abakoresha",
    courseManagement: "Ukuyobora Amasomo",
    bulkActions: "Ibikorwa byinshi",
    enrollUsers: "Shyiramo Abakoresha",
    removeUsers: "Kuraho Abakoresha",
    exportData: "Kohereza Ibyatanzwe",
    importUsers: "Kuzana Abakoresha",
    userActivity: "Imikorere y'Abakoresha",
    courseProgress: "Aho Amasomo Ageze",
    departmentAnalytics: "Ibyakuriye Amashami",
    skillTrends: "Imihindagurikire y'Ubumenyi",
    enrollmentStats: "Imibare y'Ishyirwa muri Masomo",
    completionStats: "Imibare y'Ikizwa",
    performanceAlerts: "Iburabuzi ry'Akazi",
    auditLog: "Urutonde r'Imikorere",
    systemSettings: "Igenamigambi rya Sisitemu",
    notifications: "Amamenyesho",
    reports: "Icyegeranyo",
    analytics: "Ibyakuriye",
    courses: "Amasomo",
    enrollments: "Ishyirwa muri Masomo",
    completions: "Ikizwa",
    performance: "Akazi",
    trends: "Imihindagurikire",
    alerts: "Iburabuzi",
    settings: "Igenamigambi",
    logs: "Imikorere",
    // New user experience features
    skillPassport: "Pasiporo y'Ubumenyi",
    discovery: "Gusubiramo",
    marketplace: "Ishuri",
    activityFeed: "Imikorere",
    practiceSandbox: "Ahagana yo Gukora",
    powerLevel: "Urwego r'Ubuhamya",
    verifiedSkills: "Ubumenyi Bwemejwe",
    skillRadar: "Radar y'Ubumenyi",
    growthHistory: "Amateka y'Iterambere",
    voluntaryAssessments: "Ugerageza ku Gukunda",
    practiceTests: "Ugerageza yo Gukora",
    challengeTests: "Ugerageza zo Kwihangira",
    learningPaths: "Inzira yo Kwiga",
    trendingSkills: "Ubumenyi Bwiyongera",
    dailyStreak: "Imikorira ya Buri Munsi",
    upcomingMilestones: "Intambwe Zikagera",
    peerBenchmarking: "Kugereranya n'Abandi",
    codePlayground: "Ahagana yo Kwandika",
    flashcards: "Akarita yo Gukora",
    achievements: "Ibyagezweho",
    level: "Urwego",
    xp: "XP",
    badges: "Ibendera",
    streak: "Imikorira",
    rank: "Icyiciro",
    topPercentile: "Imbanziruka",
    skillVerified: "Ubumenyi Bwemejwe",
    takeChallenge: "Tangiza Ikiganiro",
    startPractice: "Tangira Gukora",
    viewPath: "Reba Inzira",
    daysInARow: "iminsi zikurikiranye",
    expiresIn: "izarangira",
    refreshCertification: "Kongera Icyemezo",
    warmUp: "Kwiyongera",
    quickQuestions: "Ibibazo byihuta",
    trendingInDepartment: "Bwiyongera muri Ishami Ryawe",
    skillJourney: "Inzira y'Ubumenyi",
    currentLevel: "Urwego Haracyari",
    nextMilestone: "Intambbe Ikurikira",
    progressToNext: "Aho Wigeze",
    totalXP: "XP Zose",
    weeklyGoal: "Intego y'Icyumweru",
    completedToday: "Byageze Uyu Munsi",
    maintainStreak: "Kubika Imikorira",
    unlockAchievement: "Fungura Ibyagezweho",
    challengeYourself: "Kwihangira",
    exploreSkills: "Gusubiramo Ubumenyi",
    joinCommunity: "Injira muri Itsinda"
  }
};

function Sidebar({ current, onNavigate, t, isAdmin }) {
  const userLinks = [
    { key: "skillPassport", label: t.skillPassport, icon: User },
    { key: "discovery", label: t.discovery, icon: Search },
    { key: "activityFeed", label: t.activityFeed, icon: Activity },
    { key: "practiceSandbox", label: t.practiceSandbox, icon: Code },
    { key: "skillsMatrix", label: t.skillsMatrix, icon: Table2 },
    { key: "learningPaths", label: t.learningPaths, icon: GraduationCap },
    { key: "assessmentCenter", label: t.assessmentCenter, icon: Brain }
  ];

  const adminLinks = [
    { key: "adminDashboard", label: t.adminDashboard, icon: BarChart3 },
    { key: "userManagement", label: t.userManagement, icon: Users },
    { key: "courseManagement", label: t.courseManagement, icon: BookOpen },
    { key: "employeeManagement", label: t.employeeManagement, icon: Users },
    { key: "departmentManagement", label: t.departmentManagement, icon: Building },
    { key: "skillsManagement", label: t.skillsManagement, icon: GraduationCap },
    { key: "integrations", label: t.integrations, icon: Shield },
    { key: "contentLibrary", label: t.contentLibrary, icon: BookOpen },
    { key: "benchmarking", label: t.benchmarking, icon: Target },
    { key: "reports", label: t.reports, icon: BarChart3 },
    { key: "auditLog", label: t.auditLog, icon: Shield }
  ];

  const links = isAdmin ? [...userLinks, ...adminLinks] : userLinks;
  
  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Ganza Skills</span>
        </div>
      </div>
      <nav className="px-2 space-y-1">
        {links.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`nav-link w-full justify-start ${current === key ? "nav-link-active" : ""}`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Dashboard({ t }) {
  const data = departments.map((d) => ({ name: d.name, readiness: d.readiness }));
  const gaps = computeSkillGaps(employees, skills);
  return (
    <div className="space-y-6">
      <section className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{t.departmentReadiness}</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="readiness" fill="#374151" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-3">{t.topSkillGaps}</h2>
        <ul className="divide-y">
          {gaps.map((g) => (
            <li key={g.skill} className="py-3 flex items-center justify-between">
              <span className="font-medium">{g.skill}</span>
              <span className="text-sm text-gray-600">{t.score}: {g.avg}/5</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SkillsMatrix({ t }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return employees.filter(
      (e) => e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)
    );
  }, [query]);

  const colorClass = (score) => {
    if (score <= 1) return "bg-red-500 text-white";
    if (score === 2) return "bg-orange-500 text-white";
    if (score === 3) return "bg-yellow-400 text-gray-900";
    if (score === 4) return "bg-green-400 text-gray-900";
    return "bg-green-600 text-white";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchEmployees}
          className="card px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.employeeDirectory}</th>
              <th className="text-left p-3 border-b">{t.department}</th>
              {skills.map((s) => (
                <th key={s} className="text-left p-3 border-b">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="odd:bg-gray-50">
                <td className="p-3 border-b">{e.name}</td>
                <td className="p-3 border-b">{e.department}</td>
                {skills.map((s) => (
                  <td key={s} className="p-2 border-b">
                    <div className={`rounded-md text-center text-sm px-2 py-1 ${colorClass(e.scores[s] ?? 0)}`}>
                      {e.scores[s] ?? 0}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeDirectory({ t }) {
  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">{t.employeeDirectory}</h2>
      <ul className="divide-y">
        {employees.map((e) => (
          <li key={e.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{e.name}</div>
              <div className="text-sm text-gray-600">{t.department}: {e.department}</div>
            </div>
            <div className="flex gap-2">
              {Object.entries(e.scores).map(([k, v]) => (
                <span key={k} className="text-xs px-2 py-1 rounded bg-gray-100">{k}: {v}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LearningPaths({ t }) {
  const sample = [
    { title: "Digital Literacy Basics", level: "Beginner", duration: "2 weeks" },
    { title: "RRA Compliance Workshop", level: "Intermediate", duration: "1 week" },
    { title: "Leadership Essentials", level: "Intermediate", duration: "3 weeks" }
  ];
  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">{t.learningPaths}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sample.map((c) => (
          <div key={c.title} className="p-4 rounded-lg border border-gray-200">
            <div className="font-semibold text-gray-900">{c.title}</div>
            <div className="text-sm text-gray-700 mt-1">{c.level}</div>
            <div className="text-xs text-gray-500 mt-1">{c.duration}</div>
            <button className="btn btn-primary mt-3">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DepartmentManagement({ t, departments, setDepartments }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", readiness: "" });

  const handleEdit = (dept) => {
    setEditingId(dept.id);
    setFormData({ name: dept.name, readiness: dept.readiness.toString() });
  };

  const handleSave = () => {
    if (editingId === "new") {
      const newDept = {
        id: formData.name.substring(0, 3).toUpperCase(),
        name: formData.name,
        readiness: parseFloat(formData.readiness)
      };
      setDepartments([...departments, newDept]);
    } else {
      setDepartments(departments.map(d => 
        d.id === editingId 
          ? { ...d, name: formData.name, readiness: parseFloat(formData.readiness) }
          : d
      ));
    }
    setEditingId(null);
    setFormData({ name: "", readiness: "" });
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", readiness: "" });
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({ name: "", readiness: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.departmentManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.departmentName}</th>
              <th className="text-left p-3 border-b">{t.readiness}</th>
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.departmentName}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.readiness}
                    onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="0-5"
                  />
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b">
                {editingId === dept.id ? (
                  <>
                    <td className="p-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.readiness}
                        onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn btn-primary">
                          <Save className="h-4 w-4" />
                          {t.save}
                        </button>
                        <button onClick={handleCancel} className="btn">
                          <X className="h-4 w-4" />
                          {t.cancel}
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 font-medium">{dept.name}</td>
                    <td className="p-3">{dept.readiness}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(dept)} 
                          className="btn"
                          title={t.editDepartment}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(dept.id)} 
                          className="btn text-red-600 hover:text-red-800"
                          title={t.deleteDepartment}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeManagement({ t, employees, setEmployees, departments }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    department: "", 
    scores: {} 
  });

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({ 
      name: employee.name, 
      department: employee.department, 
      scores: { ...employee.scores } 
    });
  };

  const handleSave = () => {
    if (editingId === "new") {
      const newEmployee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        name: formData.name,
        department: formData.department,
        scores: formData.scores
      };
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map(e => 
        e.id === editingId 
          ? { ...e, name: formData.name, department: formData.department, scores: formData.scores }
          : e
      ));
    }
    setEditingId(null);
    setFormData({ name: "", department: "", scores: {} });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", department: "", scores: {} });
  };

  const handleAddNew = () => {
    setEditingId("new");
    const initialScores = {};
    skills.forEach(skill => {
      initialScores[skill] = 0;
    });
    setFormData({ name: "", department: "", scores: initialScores });
  };

  const handleSkillChange = (skill, value) => {
    setFormData({
      ...formData,
      scores: {
        ...formData.scores,
        [skill]: parseInt(value) || 0
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.employeeManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.employeeName}</th>
              <th className="text-left p-3 border-b">{t.department}</th>
              {skills.map((skill) => (
                <th key={skill} className="text-left p-3 border-b text-sm">{skill}</th>
              ))}
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.employeeName}
                  />
                </td>
                <td className="p-3">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">{t.department}</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </td>
                {skills.map((skill) => (
                  <td key={skill} className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={formData.scores[skill] || 0}
                      onChange={(e) => handleSkillChange(skill, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                {editingId === employee.id ? (
                  <>
                    <td className="p-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </td>
                    {skills.map((skill) => (
                      <td key={skill} className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={formData.scores[skill] || 0}
                          onChange={(e) => handleSkillChange(skill, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    ))}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn btn-primary">
                          <Save className="h-4 w-4" />
                          {t.save}
                        </button>
                        <button onClick={handleCancel} className="btn">
                          <X className="h-4 w-4" />
                          {t.cancel}
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 font-medium">{employee.name}</td>
                    <td className="p-3">{employee.department}</td>
                    {skills.map((skill) => (
                      <td key={skill} className="p-3">
                        <div className={`rounded-md text-center text-sm px-2 py-1 ${
                          (employee.scores[skill] ?? 0) <= 1 ? "bg-red-500 text-white" :
                          (employee.scores[skill] ?? 0) === 2 ? "bg-orange-500 text-white" :
                          (employee.scores[skill] ?? 0) === 3 ? "bg-yellow-400 text-gray-900" :
                          (employee.scores[skill] ?? 0) === 4 ? "bg-green-400 text-gray-900" :
                          "bg-green-600 text-white"
                        }`}>
                          {employee.scores[skill] ?? 0}
                        </div>
                      </td>
                    ))}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(employee)} 
                          className="btn"
                          title={t.editEmployee}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(employee.id)} 
                          className="btn text-red-600 hover:text-red-800"
                          title={t.deleteEmployee}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkillsManagement({ t, skillsList, setSkillsList, employees }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleEdit = (skill) => {
    setEditingId(skill);
    setFormData({ name: skill });
  };

  const handleSave = () => {
    if (editingId === "new") {
      setSkillsList([...skillsList, formData.name]);
    } else {
      setSkillsList(skillsList.map(s => 
        s === editingId ? formData.name : s
      ));
    }
    setEditingId(null);
    setFormData({ name: "" });
  };

  const handleDelete = (skill) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "" });
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({ name: "" });
  };

  const getSkillStats = (skill) => {
    const employeesWithSkill = employees.filter(e => e.scores[skill] !== undefined);
    const totalScore = employeesWithSkill.reduce((sum, e) => sum + (e.scores[skill] || 0), 0);
    const averageScore = employeesWithSkill.length > 0 ? (totalScore / employeesWithSkill.length).toFixed(1) : 0;
    
    return {
      totalEmployees: employeesWithSkill.length,
      averageScore: parseFloat(averageScore)
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.skillsManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.skillName}</th>
              <th className="text-left p-3 border-b">{t.totalEmployees}</th>
              <th className="text-left p-3 border-b">{t.averageScore}</th>
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.skillName}
                  />
                </td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {skillsList.map((skill) => {
              const stats = getSkillStats(skill);
              return (
                <tr key={skill} className="border-b">
                  {editingId === skill ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="p-3">-</td>
                      <td className="p-3">-</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={handleSave} className="btn btn-primary">
                            <Save className="h-4 w-4" />
                            {t.save}
                          </button>
                          <button onClick={handleCancel} className="btn">
                            <X className="h-4 w-4" />
                            {t.cancel}
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 font-medium">{skill}</td>
                      <td className="p-3">{stats.totalEmployees}</td>
                      <td className="p-3">
                        <div className={`rounded-md text-center text-sm px-2 py-1 inline-block ${
                          stats.averageScore <= 1 ? "bg-red-500 text-white" :
                          stats.averageScore <= 2 ? "bg-orange-500 text-white" :
                          stats.averageScore <= 3 ? "bg-yellow-400 text-gray-900" :
                          stats.averageScore <= 4 ? "bg-green-400 text-gray-900" :
                          "bg-green-600 text-white"
                        }`}>
                          {stats.averageScore}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(skill)} 
                            className="btn"
                            title={t.editSkill}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(skill)} 
                            className="btn text-red-600 hover:text-red-800"
                            title={t.deleteSkill}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssessmentCenter({ t }) {
  const [selectedTestType, setSelectedTestType] = useState("");
  const [testConfig, setTestConfig] = useState({
    skill: "",
    difficulty: "medium",
    timeLimit: 30,
    proctoringEnabled: false,
    adaptiveMode: false
  });

  const testTypes = [
    {
      id: "adaptive",
      name: t.adaptiveTesting,
      description: "Questions adjust difficulty based on performance",
      icon: Brain,
      features: ["Adaptive difficulty", "Real-time adjustment", "Personalized experience"]
    },
    {
      id: "hands-on",
      name: t.handsOnSandbox,
      description: "Practical coding and technical environments",
      icon: TestTube,
      features: ["Live coding environment", "Real-world scenarios", "Performance-based"]
    },
    {
      id: "situational",
      name: t.situationalJudgement,
      description: "Video and text-based scenario testing",
      icon: Target,
      features: ["Soft skills assessment", "Leadership evaluation", "Behavioral analysis"]
    }
  ];

  const handleStartAssessment = () => {
    // Implementation would start the actual assessment
    console.log("Starting assessment with config:", testConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.assessmentCenter}</h2>
      </div>

      {/* Test Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testTypes.map((type) => (
          <div 
            key={type.id}
            className={`card p-4 cursor-pointer transition-all ${
              selectedTestType === type.id ? "ring-2 ring-gray-800" : ""
            }`}
            onClick={() => setSelectedTestType(type.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <type.icon className="h-8 w-8 text-gray-700" />
              <h3 className="font-semibold text-lg">{type.name}</h3>
            </div>
            <p className="text-gray-600 mb-3">{type.description}</p>
            <ul className="space-y-1">
              {type.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Test Configuration */}
      {selectedTestType && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Assessment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.skills}</label>
              <select
                value={testConfig.skill}
                onChange={(e) => setTestConfig({ ...testConfig, skill: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a skill</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t.difficulty}</label>
              <select
                value={testConfig.difficulty}
                onChange={(e) => setTestConfig({ ...testConfig, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t.timeLimit} (minutes)</label>
              <input
                type="number"
                min="5"
                max="180"
                value={testConfig.timeLimit}
                onChange={(e) => setTestConfig({ ...testConfig, timeLimit: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testConfig.adaptiveMode}
                  onChange={(e) => setTestConfig({ ...testConfig, adaptiveMode: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Adaptive Mode</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testConfig.proctoringEnabled}
                  onChange={(e) => setTestConfig({ ...testConfig, proctoringEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">{t.proctoringEnabled}</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleStartAssessment}
              className="btn btn-primary"
              disabled={!testConfig.skill}
            >
              <Brain className="h-4 w-4" />
              {t.startAssessment}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillGapAnalysis({ t, employees, departments, skillsList }) {
  const [analysisType, setAnalysisType] = useState("individual");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const getIndividualAnalysis = (employeeId) => {
    const employee = employees.find(e => e.id === parseInt(employeeId));
    if (!employee) return null;
    
    return {
      name: employee.name,
      department: employee.department,
      skills: Object.entries(employee.scores).map(([skill, score]) => ({
        skill,
        score,
        proficiency: score <= 1 ? "Beginner" : score <= 2 ? "Novice" : score <= 3 ? "Intermediate" : score <= 4 ? "Advanced" : "Expert",
        gap: Math.max(0, 5 - score)
      }))
    };
  };

  const individualData = selectedEmployee ? getIndividualAnalysis(selectedEmployee) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.skillGapAnalysis}</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAnalysisType("individual")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            analysisType === "individual" 
              ? "bg-gray-800 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {t.individualAnalysis}
        </button>
      </div>

      {analysisType === "individual" && (
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Select Employee</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Choose an employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>

          {individualData && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                {individualData.name} - {individualData.department}
              </h3>
              <div className="space-y-3">
                {individualData.skills.map((skillData, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{skillData.skill}</div>
                      <div className="text-sm text-gray-600">{skillData.proficiency}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{skillData.score}</div>
                        <div className="text-xs text-gray-500">Current</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          skillData.gap > 3 ? "text-red-600" : "text-green-600"
                        }`}>
                          {skillData.gap}
                        </div>
                        <div className="text-xs text-gray-500">Gap</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Integrations({ t }) {
  const [integrations, setIntegrations] = useState({
    ats: { enabled: false, apiKey: "", system: "" },
    lms: { enabled: false, apiKey: "", system: "" },
    proctoring: {
      aiProctoring: false,
      browserLockdown: false,
      plagiarismDetection: false
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.integrations}</h2>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t.antiCheating}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.aiProctoring}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Monitor webcam, mic, and screen activity for suspicious behavior
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.aiProctoring}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable AI Proctoring</span>
              </label>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.browserLockdown}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Prevent users from opening Google or ChatGPT in another tab
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.browserLockdown}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable Browser Lockdown</span>
              </label>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.plagiarismDetection}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Check code or text against database of known answers
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.plagiarismDetection}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable Plagiarism Detection</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentLibrary({ t }) {
  const [content, setContent] = useState({
    type: "library",
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    skill: "",
    difficulty: "medium",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    timeLimit: 30
  });

  const sampleQuestions = [
    {
      id: 1,
      type: "multiple-choice",
      skill: "JavaScript",
      difficulty: "medium",
      question: "What is the purpose of the 'useEffect' hook in React?",
      options: [
        "To fetch data from an API",
        "To handle side effects in functional components",
        "To style components",
        "To manage state"
      ],
      correctAnswer: "To handle side effects in functional components",
      category: "Technical"
    },
    {
      id: 2,
      type: "situational",
      skill: "Leadership",
      difficulty: "hard",
      question: "Your team member missed a critical deadline. How do you handle this situation?",
      scenario: "A team member has missed a critical project deadline that affects the entire team's deliverables. The client is expecting the deliverables tomorrow.",
      category: "Soft Skills"
    }
  ];

  const handleAddQuestion = () => {
    setContent(prev => ({
      ...prev,
      questions: [...prev.questions, { ...newQuestion, id: Date.now() }]
    }));
    setNewQuestion({
      type: "multiple-choice",
      skill: "",
      difficulty: "medium",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      timeLimit: 30
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.contentLibrary}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setContent({ ...content, type: "library" })}
            className={`px-4 py-2 rounded-md font-medium transition ${
              content.type === "library" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Question Library
          </button>
          <button
            onClick={() => setContent({ ...content, type: "builder" })}
            className={`px-4 py-2 rounded-md font-medium transition ${
              content.type === "builder" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Plus className="h-4 w-4" />
            {t.customQuestions}
          </button>
        </div>
      </div>

      {content.type === "library" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Question Library</h3>
          <div className="space-y-4">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      q.difficulty === "easy" ? "bg-green-100 text-green-800" :
                      q.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                      q.difficulty === "hard" ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                      {q.skill}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{q.category}</span>
                </div>
                <div className="font-medium mb-2">{q.question}</div>
                {q.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {q.options.map((option, index) => (
                      <div key={index} className={`p-2 border rounded ${
                        option === q.correctAnswer ? "border-green-500 bg-green-50" : "border-gray-300"
                      }`}>
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {q.scenario && (
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm text-gray-700">{q.scenario}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {content.type === "builder" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Question Builder</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question Type</label>
                <select
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="situational">Situational Judgement</option>
                  <option value="coding">Coding Challenge</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skill</label>
                <select
                  value={newQuestion.skill}
                  onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a skill</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={newQuestion.timeLimit}
                  onChange={(e) => setNewQuestion({ ...newQuestion, timeLimit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Enter your question here..."
              />
            </div>

            {newQuestion.type === "multiple-choice" && (
              <div>
                <label className="block text-sm font-medium mb-2">Answer Options</label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder={`Option ${index + 1}`}
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newQuestion.correctAnswer === option}
                          onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: option })}
                        />
                        <span className="text-sm font-medium">Correct</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleAddQuestion} className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Benchmarking({ t }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.benchmarking}</h2>
      </div>
      <div className="card p-6">
        <p>Benchmarking functionality coming soon...</p>
      </div>
    </div>
  );
}

function AdminDashboard({ t, employees, departments, skillsList }) {
  const [timeRange, setTimeRange] = useState("30d");
  
  const dashboardStats = {
    totalUsers: employees.length,
    activeUsers: Math.floor(employees.length * 0.85),
    totalCourses: 12,
    completionRate: 78.5,
    averageScore: 3.4
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.adminDashboard}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalUsers}</p>
              <p className="text-2xl font-bold">{dashboardStats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.activeUsers}</p>
              <p className="text-2xl font-bold">{dashboardStats.activeUsers}</p>
            </div>
            <Brain className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.completionRate}</p>
              <p className="text-2xl font-bold">{dashboardStats.completionRate}%</p>
            </div>
            <Target className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.averageScore}</p>
              <p className="text-2xl font-bold">{dashboardStats.averageScore}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserManagement({ t, employees, setEmployees, departments }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee"
  });

  const handleAddUser = () => {
    const newEmployee = {
      id: Math.max(...employees.map(e => e.id)) + 1,
      ...newUser,
      scores: {}
    };
    setEmployees(prev => [...prev, newEmployee]);
    setNewUser({ name: "", email: "", department: "", role: "employee" });
    setShowAddUser(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.userManagement}</h2>
        <button
          onClick={() => setShowAddUser(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="card p-6">
        <p>User management functionality with bulk operations coming soon...</p>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <select
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="btn"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAddUser}
                className="btn btn-primary"
                disabled={!newUser.name || !newUser.department}
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseManagement({ t }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.courseManagement}</h2>
      </div>
      <div className="card p-6">
        <p>Course management functionality coming soon...</p>
      </div>
    </div>
  );
}

function SkillPassport({ t, employees }) {
  // Mock current user data (in real app, this would come from auth/user context)
  const currentUser = employees[0]; // Using first employee as example
  
  const userStats = {
    level: 12,
    totalXP: 2450,
    streak: 7,
    rank: "Senior Developer",
    topPercentile: 15,
    verifiedSkills: 8,
    totalSkills: 12,
    weeklyGoal: 150,
    weeklyProgress: 89,
    completedToday: 2
  };

  const skillData = [
    { skill: "JavaScript", level: 4.2, verified: true, category: "Technical" },
    { skill: "Python", level: 3.8, verified: true, category: "Technical" },
    { skill: "React", level: 3.5, verified: false, category: "Technical" },
    { skill: "SQL", level: 2.8, verified: false, category: "Technical" },
    { skill: "System Design", level: 2.1, verified: false, category: "Architecture" },
    { skill: "Leadership", level: 3.9, verified: true, category: "Soft Skills" }
  ];

  const growthHistory = [
    { date: "2024-01", xp: 1800, level: 10, newSkills: ["Python"] },
    { date: "2024-02", xp: 1950, level: 11, newSkills: ["React"] },
    { date: "2024-03", xp: 2100, level: 11, newSkills: ["SQL"] },
    { date: "2024-04", xp: 2300, level: 12, newSkills: ["Leadership"] },
    { date: "2024-05", xp: 2450, level: 12, newSkills: [] }
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first assessment", icon: "🎯", unlocked: true },
    { id: 2, name: "Week Warrior", description: "7-day streak", icon: "🔥", unlocked: true },
    { id: 3, name: "Skill Master", description: "Verify 5 skills", icon: "🏆", unlocked: true },
    { id: 4, name: "Team Player", description: "Help 3 colleagues", icon: "🤝", unlocked: false },
    { id: 5, name: "Knowledge Seeker", description: "Complete 10 assessments", icon: "📚", unlocked: false }
  ];

  const getSkillColor = (level) => {
    if (level >= 4) return "text-green-600";
    if (level >= 3) return "text-blue-600";
    if (level >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  const getSkillBgColor = (level) => {
    if (level >= 4) return "bg-green-100";
    if (level >= 3) return "bg-blue-100";
    if (level >= 2) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.skillPassport}</h2>
        <button className="btn btn-primary">
          <Share2 className="h-4 w-4" />
          Share Profile
        </button>
      </div>

      {/* User Profile Header - Matching the image design with new colors */}
      <div className="card p-6">
        <div className="flex items-center gap-6">
          {/* Profile Avatar */}
          <div className="w-20 h-20 skill-radar-active rounded-full flex items-center justify-center text-black text-2xl font-bold">
            JD
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-100">John Doe</h3>
            <p className="text-lg text-gray-400 mb-2">Level {userStats.level} • {userStats.rank}</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-400" />
                <span className="font-semibold text-lg text-gray-100">{userStats.totalXP} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="font-semibold text-lg text-gray-100">{userStats.streak} Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Matching the image layout with new colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 stats-gradient-cyan">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t.dailyStreak}</p>
              <p className="text-2xl font-bold">{userStats.streak}</p>
              <p className="text-xs opacity-75">{t.daysInARow}</p>
            </div>
            <Flame className="h-8 w-8 opacity-80" />
          </div>
        </div>

        <div className="card p-4 stats-gradient-mint">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t.weeklyGoal}</p>
              <p className="text-2xl font-bold">{userStats.weeklyProgress}</p>
              <p className="text-xs opacity-75">of {userStats.weeklyGoal} XP</p>
            </div>
            <Target className="h-8 w-8 opacity-80" />
          </div>
        </div>

        <div className="card p-4 stats-gradient-cyan">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t.completedToday}</p>
              <p className="text-2xl font-bold">{userStats.completedToday}</p>
              <p className="text-xs opacity-75">activities</p>
            </div>
            <CheckCircle className="h-8 w-8 opacity-80" />
          </div>
        </div>

        <div className="card p-4 stats-gradient-grey">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t.totalXP}</p>
              <p className="text-2xl font-bold">{userStats.totalXP}</p>
              <p className="text-xs opacity-75">points earned</p>
            </div>
            <Zap className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">{t.skillRadar}</h3>
          <div className="space-y-3">
            {skillData.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      skill.verified 
                        ? 'skill-radar-active' 
                        : skill.level >= 3 
                          ? 'skill-radar-active' 
                          : 'skill-radar-inactive'
                    }`}>
                      <span className={`text-lg font-bold ${
                        skill.verified || skill.level >= 3 ? 'text-black' : 'text-gray-400'
                      }`}>
                        {skill.level.toFixed(1)}
                      </span>
                    </div>
                    {skill.verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 verified-badge rounded-full flex items-center justify-center">
                        <Check className="h-2 w-2 text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{skill.skill}</div>
                    <div className="text-sm text-gray-400">{skill.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {skill.verified && (
                    <span className="px-2 py-1 verified-badge rounded text-xs font-medium">
                      {t.verified}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    skill.level >= 3 
                      ? 'skill-radar-active' 
                      : 'skill-radar-inactive'
                  }`}>
                    Level {Math.floor(skill.level)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth History */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">{t.growthHistory}</h3>
          <div className="space-y-3">
            {growthHistory.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{month.level}</span>
                  </div>
                  <div>
                    <div className="font-medium">{month.date}</div>
                    <div className="text-sm text-gray-600">{month.xp} XP</div>
                  </div>
                </div>
                <div>
                  {month.newSkills.length > 0 && (
                    <div className="text-sm text-green-600">
                      +{month.newSkills.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t.achievements}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 border rounded-lg text-center ${
                achievement.unlocked 
                  ? "border-gray-600" 
                  : "locked-skill"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="font-medium text-sm">{achievement.name}</div>
              <div className="text-xs text-gray-400 mt-1">{achievement.description}</div>
              {achievement.unlocked && (
                <div className="text-xs text-green-400 mt-2">✓ Unlocked</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{userStats.verifiedSkills}</div>
          <div className="text-sm text-gray-600">{t.verifiedSkills}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{userStats.totalSkills}</div>
          <div className="text-sm text-gray-600">Total Skills</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
          <div className="text-sm text-gray-600">{t.dailyStreak}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{userStats.topPercentile}%</div>
          <div className="text-sm text-gray-600">{t.topPercentile}</div>
        </div>
      </div>
    </div>
  );
}

function Discovery({ t }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.discovery} {t.marketplace}</h2>
      </div>
      <div className="card p-6">
        <p>Discovery marketplace functionality coming soon...</p>
      </div>
    </div>
  );
}

function ActivityFeed({ t }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.activityFeed}</h2>
      </div>
      <div className="card p-6">
        <p>Activity feed functionality coming soon...</p>
      </div>
    </div>
  );
}

function PracticeSandbox({ t }) {
  const [activeTab, setActiveTab] = useState("playground");
  const [code, setCode] = useState("// Welcome to the Code Playground!\n// Try out your JavaScript, Python, or other code here\n\nfunction hello(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(hello('World'));");
  const [language, setLanguage] = useState("javascript");
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      answer: "O(log n) - Binary search divides the search space in half with each iteration",
      category: "Algorithms",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "What is the difference between let and const in JavaScript?",
      answer: "let allows reassignment, const creates a read-only reference. Both are block-scoped.",
      category: "JavaScript",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is a REST API?",
      answer: "A REST API is an architectural style for designing networked applications using HTTP requests to access and use data.",
      category: "Web Development",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "What is the purpose of a database index?",
      answer: "A database index improves the speed of data retrieval operations on a database table.",
      category: "Databases",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "What is the difference between synchronous and asynchronous code?",
      answer: "Synchronous code runs sequentially, blocking execution until completion. Asynchronous code allows other operations to continue while waiting for long-running tasks.",
      category: "Programming Concepts",
      difficulty: "Easy"
    }
  ];

  const codeTemplates = [
    { name: "JavaScript Function", code: "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('Developer'));" },
    { name: "Python Class", code: "class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f'Hello, {self.name}!'\n\np = Person('Alice')\nprint(p.greet())" },
    { name: "React Component", code: "import React from 'react';\n\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default Welcome;" },
    { name: "SQL Query", code: "SELECT name, email\nFROM users\nWHERE created_at >= '2024-01-01'\nORDER BY name;" }
  ];

  const handleNextFlashcard = () => {
    setShowAnswer(false);
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePreviousFlashcard = () => {
    setShowAnswer(false);
    setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.practiceSandbox}</h2>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <Code className="h-4 w-4" />
            {t.warmUp}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("playground")}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === "playground"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          {t.codePlayground}
        </button>
        <button
          onClick={() => setActiveTab("flashcards")}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            activeTab === "flashcards"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          {t.flashcards}
        </button>
      </div>

      {/* Code Playground Tab */}
      {activeTab === "playground" && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.codePlayground}</h3>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="react">React</option>
                  <option value="sql">SQL</option>
                </select>
                <button className="btn btn-primary">
                  <Play className="h-4 w-4" />
                  Run Code
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Code Editor</label>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    <Copy className="h-4 w-4 inline mr-1" />
                    Copy
                  </button>
                </div>
                <div className="border rounded-lg">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-3 font-mono text-sm border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your code here..."
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Output</label>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Clear
                  </button>
                </div>
                <div className="border rounded-lg h-64 p-3 bg-gray-50 font-mono text-sm">
                  <div className="text-gray-500">// Output will appear here...</div>
                  <div className="text-green-600 mt-2">Hello, World!</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Quick Templates:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {codeTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setCode(template.code)}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold mb-2">Practice Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">💡 Experiment Freely</h4>
                <p className="text-gray-600">This is a safe space to try new code without any pressure.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">🎯 Focus on Fundamentals</h4>
                <p className="text-gray-600">Practice basic concepts before moving to complex problems.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">🔄 Iterate and Improve</h4>
                <p className="text-gray-600">Refactor your code to make it more efficient and readable.</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">📚 Learn from Examples</h4>
                <p className="text-gray-600">Use templates and modify them to understand different patterns.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcards Tab */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{t.flashcards} - {t.quickQuestions}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {currentFlashcard + 1} of {flashcards.length}
                </span>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="card p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="text-center">
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(flashcards[currentFlashcard].difficulty)}`}>
                      {flashcards[currentFlashcard].difficulty}
                    </span>
                    <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {flashcards[currentFlashcard].category}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-6">
                    {flashcards[currentFlashcard].question}
                  </h4>

                  {!showAnswer ? (
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="btn btn-primary"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Show Answer
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border">
                        <p className="text-gray-700">{flashcards[currentFlashcard].answer}</p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={handlePreviousFlashcard}
                          className="btn"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </button>
                        <button
                          onClick={handleNextFlashcard}
                          className="btn btn-primary"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {flashcards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentFlashcard(index);
                      setShowAnswer(false);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentFlashcard
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 card p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-semibold mb-4">Study Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">🧠 Active Recall</h4>
                  <p className="text-gray-600">Try to answer before revealing the solution.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">⏰ Spaced Repetition</h4>
                  <p className="text-gray-600">Review cards at increasing intervals for better retention.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">🎯 Focus on Weak Areas</h4>
                  <p className="text-gray-600">Spend more time on topics you find challenging.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TEXTS[lang];
  const [page, setPage] = useState("skillPassport");
  const [isAdmin, setIsAdmin] = useState(false); // Start as normal user
  const [departmentsState, setDepartmentsState] = useState(departments);
  const [employeesState, setEmployeesState] = useState(employees);
  const [skillsState, setSkillsState] = useState(skills);

  return (
    <div className="h-full flex">
      <Sidebar current={page} onNavigate={setPage} t={t} isAdmin={isAdmin} />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">
            {page === "skillPassport" && t.skillPassport}
            {page === "discovery" && `${t.discovery} ${t.marketplace}`}
            {page === "activityFeed" && t.activityFeed}
            {page === "practiceSandbox" && t.practiceSandbox}
            {page === "dashboard" && t.dashboard}
            {page === "adminDashboard" && t.adminDashboard}
            {page === "userManagement" && t.userManagement}
            {page === "courseManagement" && t.courseManagement}
            {page === "skillsMatrix" && t.skillsMatrix}
            {page === "employeeDirectory" && t.employeeDirectory}
            {page === "employeeManagement" && t.employeeManagement}
            {page === "learningPaths" && t.learningPaths}
            {page === "departmentManagement" && t.departmentManagement}
            {page === "skillsManagement" && t.skillsManagement}
            {page === "assessmentCenter" && t.assessmentCenter}
            {page === "skillGapAnalysis" && t.skillGapAnalysis}
            {page === "integrations" && t.integrations}
            {page === "contentLibrary" && t.contentLibrary}
            {page === "benchmarking" && t.benchmarking}
            {page === "reports" && t.reports}
            {page === "auditLog" && t.auditLog}
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                className="btn"
                onClick={() => setIsAdmin(!isAdmin)}
                title="Toggle Admin Mode"
              >
                <span className="text-gray-800 font-medium">{t.adminPanel}</span>
              </button>
            )}
            <button
              className="btn"
              onClick={() => setLang(lang === "en" ? "rw" : "en")}
              aria-label="Toggle language"
              title="Toggle language"
            >
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 font-medium">{t.language}</span>
            </button>
          </div>
        </div>
        {page === "skillPassport" && <SkillPassport t={t} employees={employeesState} />}
        {page === "discovery" && <Discovery t={t} />}
        {page === "activityFeed" && <ActivityFeed t={t} />}
        {page === "practiceSandbox" && <PracticeSandbox t={t} />}
        {page === "dashboard" && <Dashboard t={t} />}
        {page === "adminDashboard" && <AdminDashboard t={t} employees={employeesState} departments={departmentsState} skillsList={skillsState} />}
        {page === "userManagement" && <UserManagement t={t} employees={employeesState} setEmployees={setEmployeesState} departments={departmentsState} />}
        {page === "courseManagement" && <CourseManagement t={t} />}
        {page === "skillsMatrix" && <SkillsMatrix t={t} />}
        {page === "employeeDirectory" && <EmployeeDirectory t={t} />}
        {page === "employeeManagement" && (
          <EmployeeManagement 
            t={t} 
            employees={employeesState} 
            setEmployees={setEmployeesState}
            departments={departmentsState}
          />
        )}
        {page === "learningPaths" && <LearningPaths t={t} />}
        {page === "departmentManagement" && (
          <DepartmentManagement 
            t={t} 
            departments={departmentsState} 
            setDepartments={setDepartmentsState} 
          />
        )}
        {page === "skillsManagement" && (
          <SkillsManagement 
            t={t} 
            skillsList={skillsState} 
            setSkillsList={setSkillsState}
            employees={employeesState}
          />
        )}
        {page === "assessmentCenter" && <AssessmentCenter t={t} />}
        {page === "skillGapAnalysis" && (
          <SkillGapAnalysis 
            t={t} 
            employees={employeesState}
            departments={departmentsState}
            skillsList={skillsState}
          />
        )}
        {page === "integrations" && <Integrations t={t} />}
        {page === "contentLibrary" && <ContentLibrary t={t} />}
        {page === "benchmarking" && <Benchmarking t={t} />}
        {page === "reports" && <div className="card p-6"><p>Reports functionality coming soon...</p></div>}
        {page === "auditLog" && <div className="card p-6"><p>Audit log functionality coming soon...</p></div>}
      </main>
    </div>
  );
}
