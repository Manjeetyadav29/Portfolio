import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, catchError, of } from "rxjs";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({ providedIn: "root" })
export class ContactFormService {
  private readonly http = inject(HttpClient);

  private readonly GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbzoy-rwpadyRK-1zUyJgkglyL7REutSJYsbFdP8ptqrss6KwGXF0UXUguVp83N3a4re5g/exec";

  send(data: ContactFormData): Observable<{ success: boolean }> {
    return this.http
      .post<{
        result: string;
      }>(this.GOOGLE_SHEETS_URL, data, {
        headers: { "Content-Type": "text/plain" },
      })
      .pipe(
        map(() => ({ success: true })),
        catchError(() => {
          console.error("Failed to submit to Google Sheets");
          return of({ success: false });
        }),
      );
  }
}
