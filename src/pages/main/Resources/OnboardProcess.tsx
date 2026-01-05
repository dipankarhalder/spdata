/** icons */
import { useForm, useFieldArray } from 'react-hook-form'
import { Dashboard, Resource, Delete } from '@/icons'

/** components */
import { paths } from '@/config/paths'
import { Breadcrumb } from '@/shared/Breadcrumb'
import { useAuthStore } from '@/store/authStore'

type WorkExperience = {
  company: string
  role: string
  startDate: string
  endDate: string
}

type Education = {
  degree: string
  institution: string
  startYear: string
  endYear: string
}

type Certification = {
  name: string
  authority: string
  year: string
}

type FormValues = {
  basicInfo: {
    firstName: string
    lastName: string
    email: string
    mobile: string
    alternateMobile: string
    dob: string
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
  workExperience: WorkExperience[]
  education: Education[]
  certifications: Certification[]
}

const BANK_OPTIONS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Allahabad Bank',
]

const emptyWork: WorkExperience = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
}

const emptyEducation: Education = {
  degree: '',
  institution: '',
  startYear: '',
  endYear: '',
}

const emptyCertification: Certification = {
  name: '',
  authority: '',
  year: '',
}

const getEmployees = (): FormValues[] => {
  const data = localStorage.getItem('employees')
  return data ? JSON.parse(data) : []
}

const saveEmployee = (employee: FormValues) => {
  const employees = getEmployees()
  employees.push(employee)
  localStorage.setItem('employees', JSON.stringify(employees))
}

export const OnboardProcessPage = () => {
  const { isUsername } = useAuthStore()

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      workExperience: [emptyWork],
      education: [emptyEducation],
      certifications: [emptyCertification],
    },
  })

  const {
    fields: workFields,
    append: addWork,
    remove: removeWork,
  } = useFieldArray({ control, name: 'workExperience' })

  const {
    fields: eduFields,
    append: addEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: 'education' })

  const {
    fields: certFields,
    append: addCert,
    remove: removeCert,
  } = useFieldArray({ control, name: 'certifications' })

  const onSubmit = (data: FormValues) => {
    console.log('EMPLOYEE DATA 👉', data)
    saveEmployee(data)
  }

  return (
    <div className="app_page_inside_cover">
      <div className="app_inside_top_area">
        <Breadcrumb
          items={[
            {
              label: 'Dashboard',
              icon: <Dashboard />,
              to: `/${isUsername}`,
            },
            {
              label: 'Resources Onboard Application Form',
              icon: <Resource />,
              to: `/${isUsername}/${paths.onboard}`,
            },
          ]}
        />
      </div>
      <div className="app_form_area_wrapper">
        <div className="app_cover_onboard_form">
          <h1>Resources Onboard Application Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="app_field_row">
              <h2>Basic Information</h2>
              <div className="app_form_right">
                <div className="app_field">
                  <input
                    placeholder="First Name"
                    {...register('basicInfo.firstName', { required: true })}
                  />
                </div>
                <div className="app_field">
                  <input
                    placeholder="Last Name"
                    {...register('basicInfo.lastName', { required: true })}
                  />
                </div>
                <div className="app_field">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('basicInfo.email')}
                  />
                </div>
                <div className="app_field">
                  <input
                    placeholder="Mobile"
                    {...register('basicInfo.mobile')}
                  />
                </div>
                <div className="app_field">
                  <input
                    placeholder="Alternate Mobile"
                    {...register('basicInfo.alternateMobile')}
                  />
                </div>
                <div className="app_field">
                  <input type="date" {...register('basicInfo.dob')} />
                </div>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Address</h2>
              <div className="app_form_right">
                <div className="app_field">
                  <textarea
                    placeholder="Current Address"
                    {...register('address.current')}
                  />
                </div>
                <div className="app_field">
                  <textarea
                    placeholder="Permanent Address"
                    {...register('address.permanent')}
                  />
                </div>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Skills</h2>
              <div className="app_form_right">
                <div className="app_field">
                  <input
                    placeholder="Primary Skills (React, Node)"
                    {...register('skills.primary')}
                  />
                </div>
                <div className="app_field">
                  <input
                    placeholder="Secondary Skills"
                    {...register('skills.secondary')}
                  />
                </div>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Bank Details</h2>
              <div className="app_form_right">
                <div className="app_field">
                  <select {...register('bank.bankName', { required: true })}>
                    <option value="">Select Bank</option>
                    {BANK_OPTIONS.map(bank => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="app_field">
                  <input
                    placeholder="Account Number"
                    {...register('bank.accountNumber')}
                  />
                </div>
                <div className="app_field">
                  <input placeholder="IFSC Code" {...register('bank.ifsc')} />
                </div>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Work Experience</h2>
              <div className="app_form_right">
                {workFields.map((field, index) => (
                  <div key={field.id} className="app_extra_row">
                    <div className="app_field">
                      <input
                        placeholder="Company"
                        {...register(`workExperience.${index}.company`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="Role"
                        {...register(`workExperience.${index}.role`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        type="date"
                        {...register(`workExperience.${index}.startDate`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        type="date"
                        {...register(`workExperience.${index}.endDate`)}
                      />
                    </div>
                    <div className="app_field_btn">
                      <button type="button" onClick={() => removeWork(index)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addWork(emptyWork)}>
                  +&nbsp; Add Experience
                </button>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Education Qualification</h2>
              <div className="app_form_right">
                {eduFields.map((field, index) => (
                  <div key={field.id} className="app_extra_row">
                    <div className="app_field">
                      <input
                        placeholder="Degree"
                        {...register(`education.${index}.degree`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="Institution"
                        {...register(`education.${index}.institution`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="Start Year"
                        {...register(`education.${index}.startYear`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="End Year"
                        {...register(`education.${index}.endYear`)}
                      />
                    </div>
                    <div className="app_field_btn">
                      <button type="button" onClick={() => removeEdu(index)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addEdu(emptyEducation)}>
                  +&nbsp; Add Education
                </button>
              </div>
            </div>

            <div className="app_field_row">
              <h2>Certifications</h2>
              <div className="app_form_right">
                {certFields.map((field, index) => (
                  <div key={field.id} className="app_extra_row">
                    <div className="app_field">
                      <input
                        placeholder="Certification Name"
                        {...register(`certifications.${index}.name`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="Issued By"
                        {...register(`certifications.${index}.authority`)}
                      />
                    </div>
                    <div className="app_field">
                      <input
                        placeholder="Year"
                        {...register(`certifications.${index}.year`)}
                      />
                    </div>
                    <div className="app_field_btn">
                      <button type="button" onClick={() => removeCert(index)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addCert(emptyCertification)}
                >
                  +&nbsp; Add Certification
                </button>
              </div>
            </div>
            <div className="app_form_btn_info">
              <button type="submit">Submit Information</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
