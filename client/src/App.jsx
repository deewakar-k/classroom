import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './pages/Hero'
import AdminDashboard from './pages/AdminDashboard'
import Signin from './pages/Signin'
import Classroom from './components/custom/classroom'
import Teacher from './components/custom/teacher'
import { Toaster } from './components/ui/sonner'
import Student from './components/custom/student'
import AdminTimetable from './components/custom/adminTimetable'
import TeacherClassroom from './components/custom/teacherClassroom'
import Layout from './components/custom/Layout'
import TeacherTimetable from './components/custom/teacherTimetable'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentClassroom from './components/custom/studentClassroom'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/admin-classroom' element={<Classroom />} />
            <Route path='/admin-students' element={<Student />} />
            <Route path='/admin-teachers' element={<Teacher />} />
            <Route path='/admin-timetable' element={<AdminTimetable />} />
            <Route path='/t-dashboard' element={<TeacherDashboard />} />
            <Route path='/t-classroom' element={<TeacherClassroom />} />
            <Route path='/t-timetable' element={<TeacherTimetable />} />
            <Route path='/s-classroom' element={<StudentClassroom />} />
            <Route path='/s-dashboard' element={<StudentDashboard />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
