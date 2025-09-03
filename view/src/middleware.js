import { getSession } from './lib/session.js';

export async function onRequest(context, next) {
  // Hidrata user en locals si existe cookie de sesión
  const sid = context.cookies.get('sid')?.value || null;
  const s = getSession(sid);
  if (s) context.locals.user = s.user;

  // Protección de rutas: todo lo que empiece por /app requiere sesión
  const path = context.url.pathname;
  if (path.startsWith('/app') && !context.locals.user) {
    return context.redirect('/login');
  }

  // (Opcional) ejemplo de zona admin:
  // if (path.startsWith('/admin') && !context.locals.user?.roles?.includes('admin')) {
  //   return context.redirect('/forbidden');
  // }

  return next();
}