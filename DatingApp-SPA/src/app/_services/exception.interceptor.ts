import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, InjectionToken } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable()
export class exceptioninterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401){
                    return throwError(error.statusText);
          4      }

                if(error instanceof HttpErrorResponse){
                    var applicationerror = error.headers.get('application-error')
                    if(applicationerror!=null)
                        return throwError(applicationerror);

                    const servererror = error.error;
                    let modelerrors = '';
                    if(servererror.errors != null && typeof servererror.errors === 'object'){
                        for (const key in servererror.errors) {
                            if(servererror.errors[key]){
                                modelerrors += servererror.errors[key] + '\n';
                            }                      
                        }
                    }
                    return throwError(modelerrors || servererror);
                }
                return throwError('Server Error');
            })
        )
    }

}