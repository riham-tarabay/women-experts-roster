export type Status = 'DRAFT'|'SUBMITTED'|'APPROVED'|'REJECTED';
export type Role = 'EXPERT'|'REVIEWER'|'ADMIN';
export type Profile = {id:string;email:string;name:string;headlineEn:string;headlineAr:string;bioEn:string;bioAr:string;location:string;languages:string[];categoryId:string;status:Status;reason?:string;createdAt:string};
export type SearchDto = {query?:string;category?:string;location?:string;language?:string};
export type SubmissionDto = {email:string;name:string;headlineEn:string;headlineAr:string;bioEn:string;bioAr:string;location:string;languages:string[];categoryId:string;consentVersion:string};
export type DecisionDto = {status:'APPROVED'|'REJECTED';reason?:string};
