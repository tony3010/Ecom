import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from "./app/app-routing.module"

bootstrapApplication(AppComponent, {
  providers: [AppRoutingModule]
})
  .catch(err => console.error(err));
