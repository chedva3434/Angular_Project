import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { EditLessonComponent } from '../components/edit-lesson/edit-lesson.component';
import { EditCourseComponent } from '../components/edit-course/edit-course.component';
import { AddCoursesComponent } from '../components/add-courses/add-courses.component';
import { teacherGuard } from '../guards/teacher.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/:courseId/lessons', component: LessonsComponent },
    { path: 'lessons/:courseId', component: LessonsComponent },
    { path: 'add-courses', component: AddCoursesComponent ,canActivate: [teacherGuard]},
    { path: 'add-lesson/:courseId', component: AddLessonComponent },
    { path: 'edit-lesson/:courseId/:lessonId', component: EditLessonComponent },
    { path: 'edit-course/:id', component: EditCourseComponent }


];
