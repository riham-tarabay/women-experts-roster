import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { DecisionDto, Role, SearchDto, SubmissionDto, Status, Profile } from './types';

@Injectable()
export class RosterService {
  private profiles: Profile[] = [{ id:'demo-1', email:'demo@example.test', name:'Demo Expert', headlineEn:'Public-sector transformation specialist', headlineAr:'متخصصة في التحول في القطاع العام', bioEn:'Synthetic portfolio data only.', bioAr:'بيانات تجريبية للمشروع فقط.', location:'Beirut', languages:['Arabic','English'], categoryId:'policy', status:'APPROVED', createdAt:new Date().toISOString() }];
  search(dto: SearchDto) { const q=dto.query?.toLowerCase(); return this.profiles.filter(p=>p.status==='APPROVED' && (!q||`${p.name} ${p.headlineEn} ${p.bioEn}`.toLowerCase().includes(q)) && (!dto.category||p.categoryId===dto.category) && (!dto.location||p.location.toLowerCase()===dto.location.toLowerCase()) && (!dto.language||p.languages.includes(dto.language))); }
  submit(dto: SubmissionDto) { const profile:Profile={id:crypto.randomUUID(), ...dto, status:'SUBMITTED', createdAt:new Date().toISOString()}; this.profiles.push(profile); return this.publicProfile(profile); }
  pending() { return this.profiles.filter(p=>p.status==='SUBMITTED'||p.status==='REJECTED').map(p=>({...p})); }
  decide(id:string, dto:DecisionDto, role:Role) { if(role!=='REVIEWER'&&role!=='ADMIN') throw new ForbiddenException('Reviewer role required'); const p=this.profiles.find(x=>x.id===id); if(!p) throw new NotFoundException('Profile not found'); p.status=dto.status; p.reason=dto.reason; return {id:p.id,status:p.status,reason:p.reason,audit:{action:`PROFILE_${dto.status}`,entityId:id,at:new Date().toISOString()}}; }
  publicProfile(p:Profile) { const {email,status,reason,...safe}=p; return safe; }
}
