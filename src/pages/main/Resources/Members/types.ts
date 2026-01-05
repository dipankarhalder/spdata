export type MemberTypes = {
  emp_id: string
  basicInfo: {
    firstName: string
    lastName: string
    email: string
    mobile: string
    alternateMobile: string
  }
  address: {
    current: string
    permanent: string
  }
  skills: {
    primary: string
    secondary: string
  }
  bank: {
    bankName: string
    accountNumber: string
    ifsc: string
  }
  workExperience: {
    company: string
    role: string
    startDate: string
    endDate: string
  }[]
  education: {
    degree: string
    institution: string
    startYear: string
    endYear: string
  }[]
  certifications: {
    name: string
    authority: string
    year: string
  }[]
  category: string
  status: 'active' | 'inactive'
}
