import { Component, OnInit } from '@angular/core';
import { broadcastResponseToMainFrame } from '@azure/msal-browser/redirect-bridge';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: '<p class="p-8 text-sm text-cfp-text-muted">Processing sign-in...</p>',
})
export class RedirectComponent implements OnInit {
  ngOnInit(): void {
    broadcastResponseToMainFrame().catch((error: Error) => {
      console.error('Error broadcasting auth response to main frame:', error);
    });
  }
}
