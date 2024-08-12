import { useLocation } from 'react-router-dom';
import AdminSidebar from './adminSidebar';
import TeacherSidebar from './teacherSidebar';
import StudentSidebar from './studentSidebar';

const Layout = ({ children }) => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isTeacherRoute = location.pathname.startsWith('/t-');
  const isStudentRoute = location.pathname.startsWith('/s-');

  return (
    <div className="flex">
      {isAdminRoute && <AdminSidebar />}
      {isTeacherRoute && <TeacherSidebar />}
      {isStudentRoute && <StudentSidebar />}
      <div className="flex-1 overflow-auto p-0">
        {children}
      </div>
    </div>
  );
};

export default Layout;

