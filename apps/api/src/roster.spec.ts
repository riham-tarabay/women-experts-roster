import { describe, expect, it } from 'vitest';
import { RosterService } from './roster.service';

describe('roster workflow', () => {
  const submission=(name:string)=>({email:`${name.toLowerCase().replace(' ','')}@example.test`,name,headlineEn:'Researcher',headlineAr:'باحثة',bioEn:'Bio',bioAr:'السيرة',location:'Beirut',languages:['Arabic'],categoryId:'policy',consentVersion:'v1'});
  it('keeps submitted profiles out of public search until approved', () => { const service=new RosterService(); const submitted=service.submit(submission('New Expert')); expect(service.search({query:'New Expert'})).toHaveLength(0); expect(service.pending().some(p=>p.id===submitted.id)).toBe(true); service.decide(submitted.id,{status:'APPROVED'},'REVIEWER'); expect(service.search({query:'New Expert'})).toHaveLength(1); });
  it('rejects non-reviewer moderation attempts', () => { const service=new RosterService(); const submitted=service.submit(submission('Another Expert')); expect(()=>service.decide(submitted.id,{status:'APPROVED'},'EXPERT')).toThrow(); });
});
