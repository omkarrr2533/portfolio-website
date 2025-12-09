/**
 * Database utility functions
 * For now, using JSON files as database
 * Can be easily migrated to real database later
 */

import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import certificationsData from '@/data/certifications.json'
import galleryData from '@/data/gallery.json'
import personalData from '@/data/personal.json'

/**
 * Get all projects
 */
export function getAllProjects() {
  return projectsData
}

/**
 * Get project by ID
 */
export function getProjectById(id) {
  return projectsData.find(project => project.id === parseInt(id))
}

/**
 * Get featured projects
 */
export function getFeaturedProjects() {
  return projectsData.filter(project => project.featured === true)
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category) {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
}

/**
 * Search projects
 */
export function searchProjects(query) {
  const searchLower = query.toLowerCase()
  return projectsData.filter(project =>
    project.name.toLowerCase().includes(searchLower) ||
    project.description.toLowerCase().includes(searchLower) ||
    project.techStack.some(tech => tech.toLowerCase().includes(searchLower))
  )
}

/**
 * Get all skills
 */
export function getAllSkills() {
  return skillsData
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category) {
  const categoryData = skillsData.categories.find(cat => cat.name === category)
  return categoryData ? categoryData.skills : []
}

/**
 * Get all certifications
 */
export function getAllCertifications() {
  return certificationsData
}

/**
 * Get certification by ID
 */
export function getCertificationById(id) {
  return certificationsData.find(cert => cert.id === parseInt(id))
}

/**
 * Get all gallery images
 */
export function getAllGalleryImages() {
  return galleryData
}

/**
 * Get gallery images by category
 */
export function getGalleryImagesByCategory(category) {
  if (category === 'All') return galleryData
  return galleryData.filter(image => image.category === category)
}

/**
 * Get personal information
 */
export function getPersonalInfo() {
  return personalData
}

/**
 * Get project categories
 */
export function getProjectCategories() {
  const categories = new Set(projectsData.map(project => project.category))
  return ['All', ...Array.from(categories)]
}

/**
 * Get gallery categories
 */
export function getGalleryCategories() {
  const categories = new Set(galleryData.map(image => image.category))
  return ['All', ...Array.from(categories)]
}

/**
 * Get tech stack from all projects
 */
export function getAllTechStack() {
  const techStack = new Set()
  projectsData.forEach(project => {
    project.techStack.forEach(tech => techStack.add(tech))
  })
  return Array.from(techStack).sort()
}

/**
 * Get project statistics
 */
export function getProjectStats() {
  return {
    total: projectsData.length,
    featured: projectsData.filter(p => p.featured).length,
    completed: projectsData.filter(p => p.status === 'completed').length,
    inProgress: projectsData.filter(p => p.status === 'in-progress').length,
  }
}

export default {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  getProjectsByCategory,
  searchProjects,
  getAllSkills,
  getSkillsByCategory,
  getAllCertifications,
  getCertificationById,
  getAllGalleryImages,
  getGalleryImagesByCategory,
  getPersonalInfo,
  getProjectCategories,
  getGalleryCategories,
  getAllTechStack,
  getProjectStats,
}