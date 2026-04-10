//interface of system
export interface login {
  LoginId: number;
  Email: string;
  Password: string;
  createdAt: string;
}

export interface user {
  email: string;
  password: string;
  role: 'admin' | 'students';
  createdAt: string;
  department?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  emailVerified?: boolean;
  profilePictureUrl?: string;
  contactNumber?: string;
  blocked?: boolean;
  yearLevel?: string;
  status?: string;
  loginid?: number;
  program?: string;
}

export interface candidates {
  userId: number;
  candidateName: string;
  positionId: number;
  electionId: number;
  photoUrl: string;
  partyname: string;
}

export interface results {
  id: number;
  candidateName: string;
  votes: number;
}

export interface election {
  electionname: string;
  startDate: string;
  endDate: string;
  positionId: string;
}

export interface vote {
  userId: number;
  candidateId: number;
  electionId: number;
  timestamp: string;
}

export interface department {
  departmentId: number;
  departmentName: string;
}

export interface program {
  programId: number;
  programName: string;
}

export interface position {
  id: number;
  name: string;
}
