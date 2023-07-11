import { useUserStore } from '@/store/user';

export default async function (to, from, next) {
  let isAuthenticated = useUserStore().isLoggedIn;
  const isAuthRequired = to.name !== 'login';

  if (!isAuthenticated && isAuthRequired) {
    // attempt to re-populate the user store, will succeed if authed
    await loadUserState();
    isAuthenticated = useUserStore().isLoggedIn;
  }

  if (!isAuthenticated && isAuthRequired) {
    next({ name: 'login' });
  } else if (isAuthenticated && !isAuthRequired) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
}

function loadUserState() {
  return Promise.all([
    useUserStore().fetchUser(),
  ]).catch(() => {}); // ignore unauthed error
}

