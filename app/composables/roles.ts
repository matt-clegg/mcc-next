export async function useRoles() {
  const roles = useState<Role[]>("roles", () => []);

  if (!roles.value) {
    const { data } = await useFetch("/api/roles");
    roles.value = data;
  }

  function getRoleById(roleId: string) {
    return roles.value.find(r => r.id === roleId);
  }

  function getRoleByName(roleName: string) {
    return roles.value.find(r => r.name === roleName);
  }

  return {
    roles,
    getRoleById,
    getRoleByName
  };
}
