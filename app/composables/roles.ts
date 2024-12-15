export async function useRoles() {
  const roles = useState<Role[]>("roles", () => []);

  if (!roles.value?.length) {
    const { data } = await useFetch<Role[]>("/api/roles", {
      default: () => []
    });
    roles.value = data.value;
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
