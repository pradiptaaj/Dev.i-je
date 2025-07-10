"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  X,
  User,
  MapPin,
  Briefcase,
  FileText,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Shield,
  Camera,
  FileImage,
} from "lucide-react"
import type { Deal } from "@/lib/enhanced-deals-scraper"

interface ApplicationFormProps {
  deal: Deal
  onClose: () => void
}

export function ApplicationForm({ deal, onClose }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    citizenshipNumber: "",
    citizenshipIssueDate: "",
    citizenshipIssueDistrict: "",
    phoneNumber: "",
    alternatePhone: "",
    email: "",

    // Address Information
    permanentProvince: "",
    permanentDistrict: "",
    permanentMunicipality: "",
    permanentWard: "",
    permanentTole: "",
    temporaryProvince: "",
    temporaryDistrict: "",
    temporaryMunicipality: "",
    temporaryWard: "",
    temporaryTole: "",
    sameAsPermanent: false,

    // Employment & Loan Information
    occupation: "",
    employerName: "",
    monthlyIncome: "",
    experienceYears: "",
    loanAmount: "",
    loanPurpose: "",
    repaymentPeriod: "",
    collateralType: "",
    collateralValue: "",

    // Documents
    photoUploaded: false,
    citizenshipFrontUploaded: false,
    citizenshipBackUploaded: false,
    incomeProofUploaded: false,
    collateralDocUploaded: false,

    // Terms & Conditions
    agreeToTerms: false,
    agreeToDataProcessing: false,
    agreeToCredit: false,
  })

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    photo: null,
    citizenshipFront: null,
    citizenshipBack: null,
    incomeProof: null,
    collateralDoc: null,
  })

  const steps = [
    { number: 1, title: "Personal Information", icon: User },
    { number: 2, title: "Address Details", icon: MapPin },
    { number: 3, title: "Employment & Loan", icon: Briefcase },
    { number: 4, title: "Documents & Review", icon: FileText },
  ]

  const provinces = [
    "Province 1",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ]

  const occupations = [
    "Government Employee",
    "Private Employee",
    "Business Owner",
    "Farmer",
    "Teacher",
    "Doctor",
    "Engineer",
    "Lawyer",
    "Student",
    "Retired",
    "Other",
  ]

  const loanPurposes = [
    "Business Expansion",
    "Home Purchase",
    "Education",
    "Medical Treatment",
    "Agriculture",
    "Vehicle Purchase",
    "Debt Consolidation",
    "Other",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-copy permanent address to temporary if checkbox is checked
    if (field === "sameAsPermanent" && value === true) {
      setFormData((prev) => ({
        ...prev,
        temporaryProvince: prev.permanentProvince,
        temporaryDistrict: prev.permanentDistrict,
        temporaryMunicipality: prev.permanentMunicipality,
        temporaryWard: prev.permanentWard,
        temporaryTole: prev.permanentTole,
      }))
    }
  }

  const handleFileUpload = (fileType: string, file: File) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }))

    setFormData((prev) => ({
      ...prev,
      [`${fileType}Uploaded`]: true,
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log("Submitting application:", formData)
    console.log("Uploaded files:", uploadedFiles)
    alert("Application submitted successfully! You will receive a confirmation email shortly.")
    onClose()
  }

  const FileUploadComponent = ({
    fileType,
    label,
    icon: Icon,
    accept = "image/*",
    description,
  }: {
    fileType: string
    label: string
    icon: any
    accept?: string
    description?: string
  }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#799584] transition-colors">
      <input
        type="file"
        id={fileType}
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileUpload(fileType, file)
          }
        }}
        className="hidden"
      />
      <label htmlFor={fileType} className="cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          {uploadedFiles[fileType] ? (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">
              {uploadedFiles[fileType] ? `${label} Uploaded` : `Upload ${label}`}
            </p>
            {uploadedFiles[fileType] && <p className="text-sm text-gray-500">{uploadedFiles[fileType]?.name}</p>}
            {description && !uploadedFiles[fileType] && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
        </div>
      </label>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
      {/* Header - Green background matching reference */}
      <CardHeader className="bg-[#799584] text-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Loan Application</CardTitle>
              <p className="text-white/90 text-sm mt-1">
                {deal.organization} - {deal.title}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full w-10 h-10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-8 px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.number
                      ? "bg-white text-[#799584] border-white"
                      : "bg-transparent text-white border-white/50"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-white/90 mt-2 text-center font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-all ${currentStep > step.number ? "bg-white" : "bg-white/30"}`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter middle name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status *</label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Citizenship Number *</label>
                  <input
                    type="text"
                    value={formData.citizenshipNumber}
                    onChange={(e) => handleInputChange("citizenshipNumber", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter citizenship number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
                  <input
                    type="date"
                    value={formData.citizenshipIssueDate}
                    onChange={(e) => handleInputChange("citizenshipIssueDate", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue District *</label>
                  <input
                    type="text"
                    value={formData.citizenshipIssueDistrict}
                    onChange={(e) => handleInputChange("citizenshipIssueDistrict", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter issue district"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                  <input
                    type="tel"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter alternate phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Address Information</h3>

              {/* Permanent Address */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#799584]" />
                  Permanent Address
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
                    <Select
                      value={formData.permanentProvince}
                      onValueChange={(value) => handleInputChange("permanentProvince", value)}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <input
                      type="text"
                      value={formData.permanentDistrict}
                      onChange={(e) => handleInputChange("permanentDistrict", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter district"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Municipality/VDC *</label>
                    <input
                      type="text"
                      value={formData.permanentMunicipality}
                      onChange={(e) => handleInputChange("permanentMunicipality", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter municipality"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward No. *</label>
                    <input
                      type="number"
                      value={formData.permanentWard}
                      onChange={(e) => handleInputChange("permanentWard", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Ward number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tole/Street</label>
                    <input
                      type="text"
                      value={formData.permanentTole}
                      onChange={(e) => handleInputChange("permanentTole", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter tole/street"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Temporary Address */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#799584]" />
                    Temporary Address
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsPermanent"
                      checked={formData.sameAsPermanent}
                      onCheckedChange={(checked) => handleInputChange("sameAsPermanent", checked as boolean)}
                    />
                    <label htmlFor="sameAsPermanent" className="text-sm font-medium text-gray-700">
                      Same as permanent address
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
                    <Select
                      value={formData.temporaryProvince}
                      onValueChange={(value) => handleInputChange("temporaryProvince", value)}
                      disabled={formData.sameAsPermanent}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <input
                      type="text"
                      value={formData.temporaryDistrict}
                      onChange={(e) => handleInputChange("temporaryDistrict", e.target.value)}
                      disabled={formData.sameAsPermanent}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all disabled:bg-gray-100"
                      placeholder="Enter district"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Municipality/VDC *</label>
                    <input
                      type="text"
                      value={formData.temporaryMunicipality}
                      onChange={(e) => handleInputChange("temporaryMunicipality", e.target.value)}
                      disabled={formData.sameAsPermanent}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all disabled:bg-gray-100"
                      placeholder="Enter municipality"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward No. *</label>
                    <input
                      type="number"
                      value={formData.temporaryWard}
                      onChange={(e) => handleInputChange("temporaryWard", e.target.value)}
                      disabled={formData.sameAsPermanent}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all disabled:bg-gray-100"
                      placeholder="Ward number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tole/Street</label>
                    <input
                      type="text"
                      value={formData.temporaryTole}
                      onChange={(e) => handleInputChange("temporaryTole", e.target.value)}
                      disabled={formData.sameAsPermanent}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all disabled:bg-gray-100"
                      placeholder="Enter tole/street"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Employment & Loan Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Employment & Loan Information</h3>

              {/* Employment Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#799584]" />
                  Employment Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) => handleInputChange("occupation", value)}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        {occupations.map((occupation) => (
                          <SelectItem key={occupation} value={occupation}>
                            {occupation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employer/Company Name</label>
                    <input
                      type="text"
                      value={formData.employerName}
                      onChange={(e) => handleInputChange("employerName", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter employer name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (NPR) *</label>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter monthly income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <input
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange("experienceYears", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Years of experience"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Loan Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#799584]" />
                  Loan Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (NPR) *</label>
                    <input
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose *</label>
                    <Select
                      value={formData.loanPurpose}
                      onValueChange={(value) => handleInputChange("loanPurpose", value)}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 rounded-xl">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        {loanPurposes.map((purpose) => (
                          <SelectItem key={purpose} value={purpose}>
                            {purpose}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Period (Years) *</label>
                    <input
                      type="number"
                      value={formData.repaymentPeriod}
                      onChange={(e) => handleInputChange("repaymentPeriod", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Collateral Type</label>
                    <input
                      type="text"
                      value={formData.collateralType}
                      onChange={(e) => handleInputChange("collateralType", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="e.g., Land, Vehicle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Collateral Value (NPR)</label>
                    <input
                      type="number"
                      value={formData.collateralValue}
                      onChange={(e) => handleInputChange("collateralValue", e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
                      placeholder="Estimated value"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Documents & Review</h3>

              {/* Document Upload */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#799584]" />
                  Required Documents
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FileUploadComponent
                    fileType="photo"
                    label="Passport Photo"
                    icon={Camera}
                    accept="image/*"
                    description="Recent passport size photo"
                  />
                  <FileUploadComponent
                    fileType="citizenshipFront"
                    label="Citizenship (Front)"
                    icon={FileImage}
                    accept="image/*"
                    description="Clear image of citizenship front"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FileUploadComponent
                    fileType="citizenshipBack"
                    label="Citizenship (Back)"
                    icon={FileImage}
                    accept="image/*"
                    description="Clear image of citizenship back"
                  />
                  <FileUploadComponent
                    fileType="incomeProof"
                    label="Income Proof"
                    icon={FileText}
                    accept="image/*,.pdf"
                    description="Salary slip, bank statement, etc."
                  />
                </div>

                {formData.collateralType && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadComponent
                      fileType="collateralDoc"
                      label="Collateral Documents"
                      icon={Shield}
                      accept="image/*,.pdf"
                      description="Property papers, vehicle documents"
                    />
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Application Summary */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#799584]" />
                  Application Summary
                </h4>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Applicant Name:</span>
                      <p className="font-semibold">
                        {formData.firstName} {formData.middleName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Loan Amount:</span>
                      <p className="font-semibold">NPR {formData.loanAmount || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Loan Purpose:</span>
                      <p className="font-semibold">{formData.loanPurpose || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Monthly Income:</span>
                      <p className="font-semibold">NPR {formData.monthlyIncome || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Organization:</span>
                      <p className="font-semibold">{deal.organization}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Program:</span>
                      <p className="font-semibold">{deal.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#799584]" />
                  Terms & Conditions
                </h4>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-[#799584] hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      of {deal.organization} and understand the loan terms and conditions.
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToDataProcessing"
                      checked={formData.agreeToDataProcessing}
                      onCheckedChange={(checked) => handleInputChange("agreeToDataProcessing", checked as boolean)}
                    />
                    <label htmlFor="agreeToDataProcessing" className="text-sm text-gray-700 leading-relaxed">
                      I consent to the processing of my personal data for loan application purposes and agree to the{" "}
                      <a href="#" className="text-[#799584] hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToCredit"
                      checked={formData.agreeToCredit}
                      onCheckedChange={(checked) => handleInputChange("agreeToCredit", checked as boolean)}
                    />
                    <label htmlFor="agreeToCredit" className="text-sm text-gray-700 leading-relaxed">
                      I authorize {deal.organization} to check my credit history and verify the information provided in
                      this application.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Navigation */}
      <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-2 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-xl bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-600">
            Step {currentStep} of {steps.length}
          </div>

          <div className="flex items-center gap-4">
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-[#799584] hover:bg-[#6b8473] text-white px-6 py-2 rounded-xl"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms || !formData.agreeToDataProcessing || !formData.agreeToCredit}
                className="flex items-center gap-2 bg-[#799584] hover:bg-[#6b8473] text-white px-8 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
