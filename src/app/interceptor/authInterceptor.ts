import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('Interceptando requisição para:', req.url);
  console.log('Token encontrado:', token);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Requisição modificada com Authorization:', clonedRequest.headers.get('Authorization'));
    return next(clonedRequest);
  }

  return next(req);
};
