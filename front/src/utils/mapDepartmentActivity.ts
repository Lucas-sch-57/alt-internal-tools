import type { Department, User } from '@/types';

export const mapDepartmentActivity = (
  users: User[],
  departments: Department[]
) => {
  return departments.map(department => {
    const activeUsers = users.filter(
      user => user.department_id === department.id && user.active
    );

    return {
      department: department.name,
      users: activeUsers.length,
    };
  });
};
