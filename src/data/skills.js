import {
    SiPython, SiMysql, SiPandas, SiNumpy, SiScikitlearn,
    SiFlask, SiHtml5, SiCss3, SiJavascript, SiMongodb,
    SiFirebase, SiGit, SiGithub, SiVercel, SiOpencv
} from 'react-icons/si';
import {
    FaDatabase, FaChartBar, FaBrain, FaTable, FaProjectDiagram,
    FaFileExcel, FaCode, FaChartLine, FaFilter
} from 'react-icons/fa';

export const skillCategories = [
    {
        id: 'programming-data',
        title: 'Programming & Data',
        description: 'Core languages and scientific libraries for data processing and numerical computing.',
        icon: '🐍',
        skills: [
            { name: 'Python', icon: SiPython, level: 90, color: '#3776AB' },
            { name: 'SQL', icon: FaDatabase, level: 88, color: '#00758F' },
            { name: 'Pandas', icon: SiPandas, level: 88, color: '#150458' },
            { name: 'NumPy', icon: SiNumpy, level: 85, color: '#013243' },
            { name: 'Matplotlib', icon: FaChartLine, level: 85, color: '#11557C' },
            { name: 'Seaborn', icon: FaChartBar, level: 82, color: '#4C72B0' },
        ],
    },
    {
        id: 'data-analytics-bi',
        title: 'Data Analytics & Business Intelligence',
        description: 'Transforming raw data into actionable business insights, dashboards, and KPI metrics.',
        icon: '📊',
        skills: [
            { name: 'Power BI', icon: FaChartBar, level: 88, color: '#F2C811' },
            { name: 'DAX', icon: FaCode, level: 82, color: '#F2C811' },
            { name: 'Power Query', icon: FaFilter, level: 85, color: '#008272' },
            { name: 'Excel', icon: FaFileExcel, level: 88, color: '#217346' },
            { name: 'EDA', icon: FaChartLine, level: 90, color: '#10B981' },
            { name: 'Data Cleaning', icon: FaFilter, level: 90, color: '#3B82F6' },
            { name: 'Data Wrangling', icon: FaTable, level: 86, color: '#8B5CF6' },
            { name: 'Data Visualization', icon: FaChartBar, level: 88, color: '#EC4899' },
            { name: 'Data Modeling', icon: FaProjectDiagram, level: 84, color: '#F59E0B' },
            { name: 'ETL', icon: FaDatabase, level: 82, color: '#06B6D4' },
        ],
    },
    {
        id: 'machine-learning',
        title: 'Machine Learning',
        description: 'Building predictive statistical models, feature pipelines, and evaluation metrics.',
        icon: '🤖',
        skills: [
            { name: 'Scikit-learn', icon: SiScikitlearn, level: 84, color: '#F7931E' },
            { name: 'Regression', icon: FaChartLine, level: 85, color: '#34D399' },
            { name: 'Classification', icon: FaBrain, level: 86, color: '#60A5FA' },
            { name: 'Feature Engineering', icon: FaProjectDiagram, level: 82, color: '#A78BFA' },
            { name: 'Data Preprocessing', icon: FaFilter, level: 88, color: '#F472B6' },
            { name: 'Model Evaluation', icon: FaChartBar, level: 84, color: '#FBBF24' },
        ],
    },
    {
        id: 'database',
        title: 'Database Management',
        description: 'Relational data modeling, querying, optimization, and analytical SQL functions.',
        icon: '🗄️',
        skills: [
            { name: 'MySQL', icon: SiMysql, level: 86, color: '#4479A1' },
            { name: 'Relational Databases', icon: FaDatabase, level: 88, color: '#336791' },
            { name: 'Joins & Subqueries', icon: FaCode, level: 90, color: '#10B981' },
            { name: 'CTEs', icon: FaTable, level: 85, color: '#0EA5E9' },
            { name: 'Aggregations', icon: FaChartBar, level: 88, color: '#8B5CF6' },
            { name: 'Window Functions', icon: FaCode, level: 84, color: '#EC4899' },
        ],
    },
    {
        id: 'development-tools',
        title: 'Development & Tools',
        description: 'Backend frameworks, tools, computer vision, and deployment pipelines.',
        icon: '🛠️',
        skills: [
            { name: 'Flask', icon: SiFlask, level: 80, color: '#000000' },
            { name: 'HTML5 & CSS3', icon: SiHtml5, level: 85, color: '#E34F26' },
            { name: 'JavaScript', icon: SiJavascript, level: 78, color: '#F7DF1E' },
            { name: 'OpenCV', icon: SiOpencv, level: 75, color: '#5C3EE8' },
            { name: 'Pytesseract & OCR', icon: FaBrain, level: 75, color: '#009688' },
            { name: 'MongoDB', icon: SiMongodb, level: 80, color: '#47A248' },
            { name: 'Firebase', icon: SiFirebase, level: 78, color: '#FFCA28' },
            { name: 'Git & GitHub', icon: SiGithub, level: 85, color: '#F05032' },
            { name: 'VS Code', icon: FaCode, level: 90, color: '#007ACC' },
            { name: 'Vercel', icon: SiVercel, level: 82, color: '#FFFFFF' },
        ],
    },
];
