export const isAdmin = (id?: number) => {
  if (!process.env?.ADMIN_ID || !id) return false;
  return id === +process.env.ADMIN_ID;
};
