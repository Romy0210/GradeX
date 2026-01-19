
"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { students, admin, type Student } from '@/lib/data';
import { useStudentData } from './use-student-data';

type User = (Student & { role: 'student' }) | (typeof admin & { role: 'admin' });

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { students: allStudents, isLoading: studentsLoading } = useStudentData();

  useEffect(() => {
    if (studentsLoading) return;

    const userRole = localStorage.getItem('userRole') as 'student' | 'admin' | null;
    const userEmail = localStorage.getItem('userEmail');

    if (userRole && userEmail) {
      let foundUser: User | undefined;
      if (userRole === 'student') {
        const student = allStudents.find(s => s.email === userEmail);
        if (student) {
            foundUser = {...student, role: 'student'};
        }
      } else if (userRole === 'admin' && admin.email === userEmail) {
        foundUser = {...admin, role: 'admin'};
      }

      if (foundUser) {
        setUser(foundUser);
      } else {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        if (pathname !== '/') {
            router.push('/');
        }
      }
    } else {
        if (pathname !== '/') {
            router.push('/');
        }
    }
    setIsLoading(false);
  }, [router, pathname, allStudents, studentsLoading]);

  const logout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUser(null);
    router.push('/');
  };

  return { user, role: user?.role ?? null, logout, isLoading };
}
