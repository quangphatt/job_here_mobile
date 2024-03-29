// Authentication
export const getSessionURL = '/user/getSession';
export const signInURL = '/auth/login';
export const signUpURL = '/auth/register';
export const authCodeURL = '/auth/authenticateCode';
export const refreshTokenURL = '/auth/refreshToken';

// Dropdown
export const genderDropdownURL = '/dropdown/gender';
export const unitDropdownURL = '/dropdown/unit';
export const industryDropdownURL = '/dropdown/industry';
export const skillDropdownURL = '/dropdown/skill';
export const experienceDropdownURL = '/dropdown/experience';
export const titleDropdownURL = '/dropdown/title';
export const jobtypeDropdownURL = '/dropdown/jobtype';
export const cityDropdownURL = '/dropdown/city';

// Job
export const getListNewJobURL = '/job/getListNewJob';
export const getListJobInterestingURL = '/job/getListJobInteresting';
export const getJobInfoURL = '/job/getJobInfo';
export const saveJobURL = '/user/saveJob';
export const unsavedJobURL = '/user/unSaveJob';
export const getSavedJobURL = '/user/getSavedJob';
export const getAllSavedJobIdURL = '/user/getAllSavedJobId';
export const findJobURL = '/job/findJob';

// Company
export const getTopCompanyURL = '/company/getListTopCompanyHome';
export const getCompanyInfoURL = '/company/getCompanyInfo';
export const getAllJobOfCompanyURL = '/company/getAllJobOfCompany';
export const getListCompanyURL = '/company/getListCompany';
export const getCompanyScoreURL = '/company/getCompanyScore';
export const getListCommentURL = '/company/getListComment';
export const addCommentURL = '/company/addComment';

// User
export const getAppliedJobURL = '/user/getListApplicationHistory';
export const saveCVURL = '/user/uploadCV';
export const deleteCVURL = '/user/deleteCV';
export const applyJobURL = '/user/applyJob';
export const updateUserInfoURL = '/user/updateInfo';
export const changePasswordURL = '/user/changePassword';

// CV
export const getListCVURL = '/cv/getListOwnerCV';
export const getCVContentURL = '/cv/getCVContent';

// Upload
export const uploadCVURL = '/user/upload/uploadCV';
export const uploadImageURL = '/user/upload/uploadImage';

// Message
export const getListMessageURL = '/chat';
export const sendMessageURL = '/chat/send';
export const countUnreadMessageURL = '/chat/count';
export const viewAllMessageURL = '/chat/view/user';
export const deleteMessageURL = '/chat/delete';

// Notification
export const countNotificationURL = '/notification/user';
export const getLastsNotificationOfUserURL = '/notification/all/user';
export const viewNotificationURL = '/notification/view';
export const viewNotificationOfUserURL = '/notification/view/user';

// Blog
export const getBlogByIdURL = '/blog';
export const blogSearchURL = '/blog/search';

// Report
export const getTotalJobByIndustryURL = '/report/getTotalJobByIndustry';
