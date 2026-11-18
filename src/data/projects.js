import biometricHero from "../Assets/projects/biometric/hero.jpg";
import biometricDetail1 from "../Assets/projects/biometric/detail-1.jpg";
import biometricDetail2 from "../Assets/projects/biometric/detail-2.jpg";
import careIotHero from "../Assets/projects/care-iot/hero.jpg";
import careIotDetail1 from "../Assets/projects/care-iot/detail-1.jpg";
import careIotDetail2 from "../Assets/projects/care-iot/detail-2.jpg";
import arGlassesHero from "../Assets/projects/ar-glasses/hero.jpg";
import arGlassesDetail1 from "../Assets/projects/ar-glasses/detail-1.jpg";
import arGlassesDetail2 from "../Assets/projects/ar-glasses/detail-2.jpg";
import sleepAnalyticsHero from "../Assets/projects/sleep-analytics/hero.jpg";
import sleepAnalyticsDetail1 from "../Assets/projects/sleep-analytics/detail-1.jpg";
import sleepAnalyticsDetail2 from "../Assets/projects/sleep-analytics/detail-2.jpg";
import energyManagementHero from "../Assets/projects/energy-management/hero.jpg";
import energyManagementDetail1 from "../Assets/projects/energy-management/detail-1.jpg";
import energyManagementDetail2 from "../Assets/projects/energy-management/detail-2.jpg";

export const projects = [
  {
    title: "AI & Biometric Authentication Platform",
    image: biometricHero,
    gallery: [biometricDetail1, biometricDetail2],
    description:
      "Web platform integrating AI and biometric devices, with tools for user administration, authentication history, and access permissions.",
    details: [
      "Built an administration interface with React, Next.js, and TypeScript.",
      "Designed APIs with Node.js, NestJS, and Python to connect biometric devices and external AI services.",
      "Designed PostgreSQL and MongoDB storage for authentication information and history.",
      "Supported AWS development environments, API testing, code reviews, and releases.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Python", "PostgreSQL", "MongoDB", "AWS"],
    links: {},
  },
  {
    title: "Care & Medical IoT Monitoring System",
    image: careIotHero,
    gallery: [careIotDetail1, careIotDetail2],
    description:
      "Web system for managing user condition data collected from IoT sensors in care and medical settings.",
    details: [
      "Built a React and TypeScript dashboard for user information, sensor status, measurements, and alert history.",
      "Implemented Node.js and Express APIs to receive, store, and retrieve sensor data.",
      "Added real-time updates and anomaly notifications using WebSocket technologies.",
      "Designed MongoDB and PostgreSQL data management and AWS development and staging environments.",
      "Coordinated offshore work through English translations of Japanese specifications, progress management, and pull request reviews.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "WebSocket", "MongoDB", "PostgreSQL", "AWS"],
    links: {},
  },
  {
    title: "AR Smart Glasses Platform",
    image: arGlassesHero,
    gallery: [arGlassesDetail1, arGlassesDetail2],
    description:
      "Cloud web platform connecting AR smart glasses with device and user management and live connection status.",
    details: [
      "Built a device administration dashboard with React, Next.js, and TypeScript.",
      "Designed REST APIs with Node.js and NestJS for device and user records.",
      "Implemented real-time device connection and operational status views using WebSocket technologies.",
      "Designed PostgreSQL and MongoDB storage and supported AWS deployment.",
      "Coordinated API specifications, technical issues, progress, and code reviews with mobile and embedded teams.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "WebSocket", "PostgreSQL", "MongoDB", "AWS"],
    links: {},
  },
  {
    title: "Healthcare & Sleep Data Analytics Platform",
    image: sleepAnalyticsHero,
    gallery: [sleepAnalyticsDetail1, sleepAnalyticsDetail2],
    description:
      "Web platform to manage and analyze sleep and health data collected from connected devices.",
    details: [
      "Built React and Next.js dashboards visualizing sleep duration, sleep state, and measurement history.",
      "Developed Node.js and Python APIs integrating external devices and data-analysis services.",
      "Designed PostgreSQL and MongoDB storage and used Redis to improve data retrieval efficiency.",
      "Implemented charts and data visualization with D3.js and coordinated requirements, database and API design, reviews, and releases.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "D3.js"],
    links: {},
  },
  {
    title: "Environmental & Energy Management Platform",
    image: energyManagementHero,
    gallery: [energyManagementDetail1, energyManagementDetail2],
    description:
      "Web platform for managing operational and electricity data collected from energy equipment.",
    details: [
      "Built a React and Next.js dashboard for equipment, electricity usage, operations, and analysis results.",
      "Developed Node.js, Express, and Python APIs integrating external equipment and data collection services.",
      "Designed PostgreSQL and MongoDB storage and used Redis to improve data processing efficiency.",
      "Implemented D3.js visualizations and alerts for abnormal values and equipment status.",
      "Supported AWS environments, testing, code reviews, and releases.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "Redis", "D3.js", "AWS"],
    links: {},
  },
];
