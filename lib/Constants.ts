export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/api'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

// Meta Data
export const PROJECT_NAME = 'FinCompare | Depot'

// auth routes
export const SIGN_IN_OTP = '/auth/signin-otp'
export const SIGN_IN_VERIFY = '/auth/signin-verify'
export const SIGN_UP = '/auth/sign-up'
export const RESEND_OTP = '/auth/resend-otp'
export const INVEStMENT_CREATE = '/onboarding/create-investment'
export const PENDING_USER_CREATE = '/onboarding/create-pending-user'
export const VERIFY_OTP_AND_CREATE_USER = '/onboarding/verify-otp-create-user'
export const LOGOUT = '/auth/logout'
export const PASSWORD_SETUP = '/auth/set-password'
export const SIGN_IN_PASSWORD = '/auth/signin-password'
export const CHANGE_PASSWORD = '/auth/change-password'
export const FORGOT_PASSWORD = '/auth/forgot-password'
export const RESET_PASSWORD = '/auth/reset-password'

// Get All user
export const GET_ALL_USERS = '/auth/admin/users'
// Get single user
export const GET_SINGLE_USER = '/auth/admin/users'

export const KYC_APPROVE_REJECT = '/user-info'

// profile routes
export const GET_USER_PROFILE = '/auth/profile'
export const GET_USER_PROFILE_INFO = '/user-info'
export const ADMIN_UPDATE_PROFILE_INFO = '/user-info/:id'

// onboarding flow routes (based on API documentation)
export const CREATE_INVESTMENT = '/onboarding/create-investment'
export const CREATE_PENDING_USER = '/onboarding/create-pending-user'
export const VERIFY_OTP_CREATE_USER = '/onboarding/verify-otp-create-user'

// legacy registration flow routes (keeping for reference)
export const STEP_ONE_SUBMIT = '/registration/step-one'
export const GET_OFFERS = '/offer'
export const SELECT_OFFER = '/offer/select-offer'

// Create Offer
export const CREATE_OFFER = '/offer'
export const MY_OFFER = '/offer/my-offers'
export const SINGLE_OFFER = '/offer/:id'
// file upload
export const UPLOAD_FILE = '/document/image/blob'
// Investment
export const GET_INVESTMENTS = '/investment'
export const UPDATE_INVESTMENT = '/investment'
export const DELETE_INVESTMENT = '/investment'
// upload document
export const UPLOAD_DOCUMENT = '/document/image'
// upload pdf file (also used for Word documents)
export const UPLOAD_PDF_FILE = '/document/pdf'

// bank routes
export const BANKS_ALL = '/bank/all'
export const BANKS_ADMIN = '/bank/admin'
export const BANK_CREATE = '/bank'
export const BANK_BY_ID = '/bank'
export const BANK_UPDATE = '/bank'
export const BANK_DELETE = '/bank'
export const KYC_INFORMATION = '/user-info/kyc'
// contact paper
export const CONTACT_PAPER = '/offer/:id/contract'
export const CONTACT_PAPER_INFORMATION = '/offer/:id/contract-paper'
// Proof of payment
export const PROOF_OF_PAYMENT = '/offer/:id/proof-of-payment'

export const GET_SITE_CONFIG = '/site-config'
export const UPSERT_SITE_CONFIG = '/site-config'

// portfolio routes
export const GET_MY_PORTFOLIO = '/portfolio'
export const GET_PORTFOLIO_BY_ID = (id: string) => `/portfolio/${id}`

// email templates
export const EMAIL_TEMPLATE = '/email-template'

// offer portfolio routes
export const GET_COMPLETED_OFFERS = (userId: string) => `/offer/${userId}/completed-offers`
export const GET_PORTFOLIO_OFFER = (offerId: string) => `/offer/${offerId}/portfolio-offer`
