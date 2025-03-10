import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  console.log('Role from localStorage:', role); // 🔹 הדפסת התפקיד לקונסול

  if (role === 'teacher') {
    console.log('Access granted'); // 🔹 אם מורה - אמור להיכנס
    return true; 
  } else {
    console.log('Access denied, redirecting...'); // 🔹 אם לא - אמור להיחסם
    router.navigate(['/']); 
    return false; 
  }
};

